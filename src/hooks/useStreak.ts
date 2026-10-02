import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { localYMD } from '@/lib/activeTime';
import { applyGoalMet } from '@/lib/streakRule';

/** YYYY-MM-DD in the user's local timezone, optionally shifted by N days */
function localDate(offsetDays = 0): string {
  const d = new Date();
  if (offsetDays) d.setDate(d.getDate() + offsetDays);
  return localYMD(d);
}

export interface StreakState {
  currentStreak:    number;
  longestStreak:    number;
  freezesAvailable: number;
  freezesUsedTotal: number;
  lastActivityDate: string | null;
  activityDates:    string[]; // YYYY-MM-DD days where the daily goal was met (or bridged by a freeze)
}

export const STREAK_INITIAL: StreakState = {
  currentStreak:    0,
  longestStreak:    0,
  freezesAvailable: 0,
  freezesUsedTotal: 0,
  lastActivityDate: null,
  activityDates:    [],
};

/**
 * Marks a day as goal-met in activity_log. Only the goal_met column is written,
 * so active_seconds (written by useActiveTime) is left alone. Falls back to a
 * plain date row if the goal_met column does not exist yet.
 */
async function markDayGoalMet(userId: string, date: string) {
  const { error } = await supabase.from('activity_log').upsert(
    { user_id: userId, date, goal_met: true },
    { onConflict: 'user_id,date' },
  );
  if (error) {
    await supabase.from('activity_log').upsert({ user_id: userId, date }, { onConflict: 'user_id,date' });
  }
}

export function useStreak(userId: string | null) {
  const [state, setState] = useState<StreakState>(STREAK_INITIAL);
  // Prevents redundant Supabase round-trips once today has been counted
  const todayLoggedRef = useRef<string | null>(null);
  // Mutex: prevents two concurrent recordGoalMet calls from double-writing the streak
  const isWritingRef = useRef(false);

  /** Load streak + 60-day goal history from Supabase on login. */
  const loadStreak = useCallback(async () => {
    if (!userId) return;
    const since = localDate(-60);

    const logsQuery = (cols: string) => supabase
      .from('activity_log').select(cols).eq('user_id', userId).gte('date', since).order('date', { ascending: false });

    const [{ data: row }, logsRes] = await Promise.all([
      supabase.from('user_streaks').select('*').eq('user_id', userId).maybeSingle(),
      logsQuery('date, goal_met'),
    ]);
    // Before supabase-daily-goal.sql is run there is no goal_met column:
    // every row then counts as an active day (the old rule).
    let logs = logsRes.data as unknown as { date: string; goal_met?: boolean | null }[] | null;
    if (logsRes.error) logs = ((await logsQuery('date')).data as unknown as { date: string }[] | null) ?? [];

    const today = localDate();
    if (row?.last_activity_date === today) todayLoggedRef.current = today;

    setState({
      currentStreak:    row?.current_streak     ?? 0,
      longestStreak:    row?.longest_streak     ?? 0,
      freezesAvailable: row?.freezes_available  ?? 0,
      freezesUsedTotal: row?.freezes_used_total ?? 0,
      lastActivityDate: row?.last_activity_date ?? null,
      activityDates:    (logs ?? []).filter(r => r.goal_met !== false).map(r => r.date),
    });
  }, [userId]);

  /**
   * Call when today's active time reaches the daily goal.
   * Safe to call repeatedly — the streak changes at most once per day.
   */
  const recordGoalMet = useCallback(async (): Promise<{ recorded: boolean; freezeConsumed: boolean }> => {
    const none = { recorded: false, freezeConsumed: false };
    if (!userId) return none;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = localDate();

    if (todayLoggedRef.current === today) return none;
    if (isWritingRef.current) return none;
    isWritingRef.current = true;

    try {
      const { data: row, error: readErr } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      // Don't risk resetting the streak on a failed read; we'll retry on the next tick
      if (readErr) return none;

      const update = applyGoalMet({
        currentStreak:    (row?.current_streak     as number) ?? 0,
        longestStreak:    (row?.longest_streak     as number) ?? 0,
        freezesAvailable: (row?.freezes_available  as number) ?? 0,
        freezesUsedTotal: (row?.freezes_used_total as number) ?? 0,
        lastActivityDate: (row?.last_activity_date as string | null) ?? null,
      }, today);

      // Another device may have already counted today
      if (!update.changed) {
        todayLoggedRef.current = today;
        return none;
      }

      const { next, bridgedDate, freezeConsumed } = update;
      const { error: writeErr } = await supabase.from('user_streaks').upsert(
        {
          user_id:            userId,
          current_streak:     next.currentStreak,
          longest_streak:     next.longestStreak,
          last_activity_date: today,
          freezes_available:  next.freezesAvailable,
          freezes_used_total: next.freezesUsedTotal,
          timezone:           tz,
          updated_at:         new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );
      if (writeErr) return none;

      await Promise.all([
        markDayGoalMet(userId, today),
        bridgedDate ? markDayGoalMet(userId, bridgedDate) : Promise.resolve(),
      ]);

      todayLoggedRef.current = today;

      setState(prev => {
        const dates = new Set(prev.activityDates);
        dates.add(today);
        if (bridgedDate) dates.add(bridgedDate);
        return {
          ...next,
          activityDates: [...dates].sort().reverse(),
        };
      });

      return { recorded: true, freezeConsumed };
    } catch {
      return none;
    } finally {
      isWritingRef.current = false;
    }
  }, [userId]);

  return { streakState: state, loadStreak, recordGoalMet };
}
