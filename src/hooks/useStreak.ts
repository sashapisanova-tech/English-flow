import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

/** Returns YYYY-MM-DD in the user's local timezone, optionally shifted by N days */
function localDate(tz: string, offsetDays = 0): string {
  const d = new Date();
  if (offsetDays) d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-CA', { timeZone: tz });
}

/** Integer day gap between two YYYY-MM-DD strings (uses noon to avoid DST issues) */
function daysBetween(from: string, to: string): number {
  return Math.round(
    (new Date(`${to}T12:00:00`).getTime() - new Date(`${from}T12:00:00`).getTime())
    / 86_400_000
  );
}

export interface StreakState {
  currentStreak:    number;
  longestStreak:    number;
  freezesAvailable: number;
  freezesUsedTotal: number;
  lastActivityDate: string | null;
  activityDates:    string[]; // YYYY-MM-DD strings for heatmap
}

export const STREAK_INITIAL: StreakState = {
  currentStreak:    0,
  longestStreak:    0,
  freezesAvailable: 0,
  freezesUsedTotal: 0,
  lastActivityDate: null,
  activityDates:    [],
};

export function useStreak(userId: string | null) {
  const [state, setState] = useState<StreakState>(STREAK_INITIAL);
  // Prevents redundant Supabase round-trips when recordActivity fires many times per day
  const todayLoggedRef = useRef<string | null>(null);
  // Mutex: prevents two concurrent recordActivity calls from double-writing the streak
  const isWritingRef = useRef(false);

  /** Load streak + 60-day activity history from Supabase on login. */
  const loadStreak = useCallback(async () => {
    if (!userId) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const since = localDate(tz, -60);

    const [{ data: row }, { data: logs }] = await Promise.all([
      supabase.from('user_streaks').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('activity_log').select('date').eq('user_id', userId).gte('date', since).order('date', { ascending: false }),
    ]);

    const today = localDate(tz);
    if (row?.last_activity_date === today) todayLoggedRef.current = today;

    setState({
      currentStreak:    row?.current_streak     ?? 0,
      longestStreak:    row?.longest_streak     ?? 0,
      freezesAvailable: row?.freezes_available  ?? 0,
      freezesUsedTotal: row?.freezes_used_total ?? 0,
      lastActivityDate: row?.last_activity_date ?? null,
      activityDates:    (logs ?? []).map((r: { date: string }) => r.date),
    });
  }, [userId]);

  /**
   * Call whenever the user completes any learning activity.
   * Safe to call many times per day — only does real work (Supabase writes) once per day.
   * Returns whether a streak freeze was auto-consumed.
   */
  const recordActivity = useCallback(async (): Promise<{ freezeConsumed: boolean }> => {
    if (!userId) return { freezeConsumed: false };

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = localDate(tz);

    // Synchronous fast-path: already logged today in this session
    if (todayLoggedRef.current === today) return { freezeConsumed: false };

    // Mutex: skip if another call is already in progress
    if (isWritingRef.current) return { freezeConsumed: false };
    isWritingRef.current = true;

    try {
      const { data: row } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      const last = (row?.last_activity_date as string | null) ?? null;

      // Another device may have already logged today
      if (last === today) {
        todayLoggedRef.current = today;
        return { freezeConsumed: false };
      }

      let currentStreak    = (row?.current_streak     as number) ?? 0;
      let longestStreak    = (row?.longest_streak     as number) ?? 0;
      let freezesAvailable = (row?.freezes_available  as number) ?? 0;
      let freezesUsedTotal = (row?.freezes_used_total as number) ?? 0;
      let freezeConsumed   = false;

      if (!last) {
        // First ever activity
        currentStreak = 1;
      } else {
        const gap = daysBetween(last, today);
        if (gap === 1) {
          // Consecutive day
          currentStreak += 1;
        } else if (gap === 2 && freezesAvailable > 0) {
          // Exactly one missed day — bridge with a freeze
          currentStreak += 1;
          freezesAvailable -= 1;
          freezesUsedTotal += 1;
          freezeConsumed = true;
          // Log the bridged day so the heatmap stays visually continuous
          await supabase.from('activity_log').upsert(
            { user_id: userId, date: localDate(tz, -1) },
            { onConflict: 'user_id,date' }
          );
        } else {
          // Gap too large or no freeze available — reset
          currentStreak = 1;
        }
      }

      // Award a freeze at every 7-day milestone (capped at 2)
      if (currentStreak % 7 === 0 && freezesAvailable < 2) {
        freezesAvailable = Math.min(2, freezesAvailable + 1);
      }

      longestStreak = Math.max(longestStreak, currentStreak);

      await Promise.all([
        supabase.from('user_streaks').upsert(
          {
            user_id:            userId,
            current_streak:     currentStreak,
            longest_streak:     longestStreak,
            last_activity_date: today,
            freezes_available:  freezesAvailable,
            freezes_used_total: freezesUsedTotal,
            timezone:           tz,
            updated_at:         new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        ),
        supabase.from('activity_log').upsert(
          { user_id: userId, date: today },
          { onConflict: 'user_id,date' }
        ),
      ]);

      todayLoggedRef.current = today;

      setState(prev => ({
        currentStreak,
        longestStreak,
        freezesAvailable,
        freezesUsedTotal,
        lastActivityDate: today,
        activityDates: prev.activityDates.includes(today)
          ? prev.activityDates
          : [today, ...prev.activityDates],
      }));

      return { freezeConsumed };
    } finally {
      isWritingRef.current = false;
    }
  }, [userId]);

  return { streakState: state, loadStreak, recordActivity };
}
