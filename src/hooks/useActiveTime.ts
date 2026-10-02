import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  ActiveDays, accrueActiveTime, localYMD, mergeRemoteSeconds, normaliseGoal,
  pruneDays, secondsOn, DEFAULT_GOAL_MINUTES,
} from '@/lib/activeTime';

// Both keys are listed in USER_DATA_KEYS (src/lib/userStorage.ts)
export const ACTIVE_TIME_KEY = 'english-active-time-v1';
export const DAILY_GOAL_KEY  = 'english-daily-goal-minutes-v1';

const TICK_MS    = 1_000;
const SYNC_MS    = 30_000;
const PERSIST_MS = 5_000;
/** React state is refreshed in steps of this many seconds to avoid re-rendering every tick. */
const PUBLISH_STEP_S = 15;

const INTERACTION_EVENTS = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel', 'scroll'] as const;

function loadDays(): ActiveDays {
  try {
    const raw = JSON.parse(localStorage.getItem(ACTIVE_TIME_KEY) || '{}');
    return raw && typeof raw === 'object' ? raw as ActiveDays : {};
  } catch { return {}; }
}

function saveDays(days: ActiveDays) {
  try { localStorage.setItem(ACTIVE_TIME_KEY, JSON.stringify(days)); } catch { /* storage unavailable */ }
}

function loadGoal(): number {
  try {
    const raw = localStorage.getItem(DAILY_GOAL_KEY);
    return raw == null ? DEFAULT_GOAL_MINUTES : normaliseGoal(raw);
  } catch { return DEFAULT_GOAL_MINUTES; }
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return localYMD(d);
}

export interface ActiveTime {
  /** Today's local date (YYYY-MM-DD). */
  today: string;
  todaySeconds: number;
  /** Active seconds per local date, last ~14 days. */
  secondsByDate: Record<string, number>;
  goalMinutes: number;
  setGoalMinutes: (minutes: number) => void;
}

/**
 * Tracks the signed-in user's active learning time. Use once, at app level.
 * Persists locally and syncs today's total to activity_log.active_seconds
 * about every 30 s and when the page is hidden. Supabase failures are ignored
 * (local data is kept).
 */
export function useActiveTime(userId: string | null): ActiveTime {
  const daysRef = useRef<ActiveDays>(pruneDays(loadDays()));
  const lastTickRef = useRef(Date.now());
  const lastInteractionRef = useRef(Date.now()); // opening the app counts as an interaction
  const visibleRef = useRef(typeof document === 'undefined' || document.visibilityState === 'visible');
  const lastPersistRef = useRef(0);
  const publishedRef = useRef('');
  /** Seconds last written to Supabase, per date. */
  const syncedRef = useRef<Record<string, number>>({});
  const syncingRef = useRef(false);
  /** Turns off syncing for this session if the active_seconds column is missing. */
  const remoteDisabledRef = useRef(false);

  const snapshot = () => {
    const out: Record<string, number> = {};
    for (const [date, ms] of Object.entries(daysRef.current)) out[date] = Math.floor(ms / 1000);
    return out;
  };

  const [state, setState] = useState(() => ({ today: localYMD(Date.now()), secondsByDate: snapshot() }));
  const [goalMinutes, setGoalState] = useState<number>(loadGoal);

  const publish = useCallback((force = false) => {
    const today = localYMD(Date.now());
    const key = `${today}:${Math.floor(secondsOn(daysRef.current, today) / PUBLISH_STEP_S)}`;
    if (!force && key === publishedRef.current) return;
    publishedRef.current = key;
    setState({ today, secondsByDate: snapshot() });
  }, []);

  const persist = useCallback(() => {
    daysRef.current = pruneDays(daysRef.current);
    saveDays(daysRef.current);
    lastPersistRef.current = Date.now();
  }, []);

  /** Credits time since the last tick, using the visibility that applied during it. */
  const tick = useCallback(() => {
    const now = Date.now();
    daysRef.current = accrueActiveTime(daysRef.current, {
      lastTick: lastTickRef.current,
      now,
      visible: visibleRef.current,
      lastInteraction: lastInteractionRef.current,
    });
    lastTickRef.current = now;
    if (now - lastPersistRef.current >= PERSIST_MS) persist();
    publish();
  }, [persist, publish]);

  const sync = useCallback(async () => {
    if (!userId || remoteDisabledRef.current || syncingRef.current) return;
    // Today, plus yesterday in case the session crossed midnight
    const dates = [daysAgo(1), daysAgo(0)];
    const rows = dates
      .map(date => ({ user_id: userId, date, active_seconds: secondsOn(daysRef.current, date) }))
      .filter(r => r.active_seconds > (syncedRef.current[r.date] ?? 0));
    if (rows.length === 0) return;
    syncingRef.current = true;
    try {
      // Only active_seconds is written on conflict, so goal_met is never overwritten
      const { error } = await supabase.from('activity_log').upsert(rows, { onConflict: 'user_id,date' });
      if (error) {
        if (/active_seconds/.test(error.message ?? '')) remoteDisabledRef.current = true;
        return;
      }
      for (const r of rows) syncedRef.current[r.date] = r.active_seconds;
    } catch { /* offline: keep local */ } finally {
      syncingRef.current = false;
    }
  }, [userId]);

  // Load remote totals + goal; take the max of local and remote per day
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      try {
        const [logsRes, statsRes] = await Promise.all([
          supabase.from('activity_log').select('date, active_seconds').eq('user_id', userId).gte('date', daysAgo(13)),
          supabase.from('user_stats').select('daily_goal_minutes').eq('user_id', userId).maybeSingle(),
        ]);
        if (cancelled) return;

        if (logsRes.error) {
          if (/active_seconds/.test(logsRes.error.message ?? '')) remoteDisabledRef.current = true;
        } else {
          const remote = (logsRes.data ?? []) as { date: string; active_seconds: number | null }[];
          for (const r of remote) syncedRef.current[r.date] = r.active_seconds ?? 0;
          daysRef.current = pruneDays(mergeRemoteSeconds(daysRef.current, remote));
          persist();
          publish(true);
        }

        if (!statsRes.error) {
          const remoteGoal = (statsRes.data as { daily_goal_minutes?: number | null } | null)?.daily_goal_minutes;
          if (remoteGoal != null) {
            const g = normaliseGoal(remoteGoal);
            setGoalState(g);
            try { localStorage.setItem(DAILY_GOAL_KEY, String(g)); } catch { /* ignore */ }
          } else {
            // Nothing remote yet: push a goal chosen on this device (e.g. before the SQL was run)
            let local: string | null = null;
            try { local = localStorage.getItem(DAILY_GOAL_KEY); } catch { /* ignore */ }
            if (local != null) {
              await supabase.from('user_stats').upsert(
                { user_id: userId, daily_goal_minutes: normaliseGoal(local), updated_at: new Date().toISOString() },
                { onConflict: 'user_id' },
              );
            }
          }
        }
      } catch { /* offline: keep local */ }
    })();
    return () => { cancelled = true; };
  }, [userId, persist, publish]);

  // Tick, interaction tracking, visibility, periodic sync
  useEffect(() => {
    const onInteract = () => { lastInteractionRef.current = Date.now(); };
    const flush = () => { tick(); persist(); void sync(); };
    const onVisibility = () => {
      tick(); // credit the interval with the visibility it had
      visibleRef.current = document.visibilityState === 'visible';
      if (visibleRef.current) {
        lastTickRef.current = Date.now();
        publish(true); // the date may have changed while hidden
      } else {
        persist();
        void sync();
      }
    };

    for (const ev of INTERACTION_EVENTS) {
      window.addEventListener(ev, onInteract, { passive: true, capture: true });
    }
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flush);
    const tickTimer = setInterval(tick, TICK_MS);
    const syncTimer = setInterval(() => { void sync(); }, SYNC_MS);

    return () => {
      for (const ev of INTERACTION_EVENTS) {
        window.removeEventListener(ev, onInteract, { capture: true });
      }
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
      clearInterval(tickTimer);
      clearInterval(syncTimer);
      // No persist here: on sign-out this runs around clearUserData() and must not write progress back
    };
  }, [tick, persist, publish, sync]);

  const setGoalMinutes = useCallback((minutes: number) => {
    const g = normaliseGoal(minutes);
    setGoalState(g);
    try { localStorage.setItem(DAILY_GOAL_KEY, String(g)); } catch { /* ignore */ }
    if (!userId) return;
    supabase.from('user_stats')
      .upsert({ user_id: userId, daily_goal_minutes: g, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
      .then(({ error }) => { if (error) console.warn('[goal] daily_goal_minutes not saved remotely:', error.message); });
  }, [userId]);

  return {
    today: state.today,
    todaySeconds: state.secondsByDate[state.today] ?? 0,
    secondsByDate: state.secondsByDate,
    goalMinutes,
    setGoalMinutes,
  };
}
