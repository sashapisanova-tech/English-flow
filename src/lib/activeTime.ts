// Pure accounting for the daily active-time goal (no React, no Supabase).
// Time counts only while the page is visible AND the user interacted within IDLE_MS.

export const IDLE_MS = 60_000;
/** Longest gap between two ticks that is credited (guards against sleep / frozen timers). */
export const MAX_TICK_MS = 10_000;

export const GOAL_OPTIONS = [5, 10, 15, 20] as const;
export const DEFAULT_GOAL_MINUTES = 10;

/** Milliseconds of active time per local date (YYYY-MM-DD). */
export type ActiveDays = Record<string, number>;

/** YYYY-MM-DD in the device's local timezone. */
export function localYMD(t: number | Date): string {
  const d = typeof t === 'number' ? new Date(t) : t;
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Timestamp of the local midnight that follows `t`. */
function nextLocalMidnight(t: number): number {
  const d = new Date(t);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime();
}

export function normaliseGoal(v: unknown): number {
  const n = Number(v);
  return (GOAL_OPTIONS as readonly number[]).includes(n) ? n : DEFAULT_GOAL_MINUTES;
}

export interface AccrueInput {
  /** Time of the previous tick. */
  lastTick: number;
  /** Time of this tick. */
  now: number;
  /** Was the page visible during this interval? */
  visible: boolean;
  /** Time of the user's most recent pointer / key / scroll / touch. */
  lastInteraction: number;
}

/**
 * Credits the interval [lastTick, now] to `days`, but only the part that is
 * within IDLE_MS of the last interaction and only while visible. An interval
 * that crosses local midnight is split between the two dates.
 * Returns a new object (or the same one if nothing was credited).
 */
export function accrueActiveTime(days: ActiveDays, input: AccrueInput): ActiveDays {
  const { lastTick, now, visible, lastInteraction } = input;
  if (!visible || now <= lastTick) return days;
  const start = Math.max(lastTick, now - MAX_TICK_MS);
  const end = Math.min(now, lastInteraction + IDLE_MS);
  if (end <= start) return days;

  const next = { ...days };
  let from = start;
  while (from < end) {
    const to = Math.min(end, nextLocalMidnight(from));
    const key = localYMD(from);
    next[key] = (next[key] ?? 0) + (to - from);
    from = to;
  }
  return next;
}

/** Whole seconds of active time on `date`. */
export function secondsOn(days: ActiveDays, date: string): number {
  return Math.floor((days[date] ?? 0) / 1000);
}

/** Keeps only the most recent `keep` days (by date string). */
export function pruneDays(days: ActiveDays, keep = 14): ActiveDays {
  const keys = Object.keys(days).sort().slice(-keep);
  const out: ActiveDays = {};
  for (const k of keys) out[k] = days[k];
  return out;
}

/** Combines local ms with remote whole seconds, taking the larger per date. */
export function mergeRemoteSeconds(days: ActiveDays, remote: { date: string; active_seconds: number | null }[]): ActiveDays {
  const next = { ...days };
  for (const r of remote) {
    const ms = (r.active_seconds ?? 0) * 1000;
    if (ms > (next[r.date] ?? 0)) next[r.date] = ms;
  }
  return next;
}

export function goalReached(seconds: number, goalMinutes: number): boolean {
  return seconds >= goalMinutes * 60;
}
