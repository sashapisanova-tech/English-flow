// Pure streak rule. A day counts once its active time reaches the daily goal;
// the update is applied once per day, at the moment the goal is reached.

export interface StreakRow {
  currentStreak:    number;
  longestStreak:    number;
  freezesAvailable: number;
  freezesUsedTotal: number;
  lastActivityDate: string | null; // last day the goal was met (YYYY-MM-DD)
}

export interface StreakUpdate {
  /** false = today already counted, nothing to write. */
  changed: boolean;
  next: StreakRow;
  freezeConsumed: boolean;
  /** Missed day bridged by a freeze (to mark in the calendar), if any. */
  bridgedDate: string | null;
}

/** Integer day gap between two YYYY-MM-DD strings (uses noon to avoid DST issues). */
export function daysBetween(from: string, to: string): number {
  return Math.round(
    (new Date(`${to}T12:00:00`).getTime() - new Date(`${from}T12:00:00`).getTime()) / 86_400_000,
  );
}

function previousDay(ymd: string): string {
  const d = new Date(`${ymd}T12:00:00`);
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString('en-CA');
}

/** Applies "today's goal was met" to the streak row. */
export function applyGoalMet(prev: StreakRow, today: string, goalMet = true): StreakUpdate {
  if (!goalMet || prev.lastActivityDate === today) {
    return { changed: false, next: prev, freezeConsumed: false, bridgedDate: null };
  }

  let { currentStreak, longestStreak, freezesAvailable, freezesUsedTotal } = prev;
  let freezeConsumed = false;
  let bridgedDate: string | null = null;
  const last = prev.lastActivityDate;

  if (!last) {
    currentStreak = 1;
  } else {
    const gap = daysBetween(last, today);
    if (gap === 1) {
      currentStreak += 1;
    } else if (gap === 2 && freezesAvailable > 0) {
      // Exactly one missed day: bridge it with a freeze
      currentStreak += 1;
      freezesAvailable -= 1;
      freezesUsedTotal += 1;
      freezeConsumed = true;
      bridgedDate = previousDay(today);
    } else {
      currentStreak = 1;
    }
  }

  // Award a freeze at every 7-day milestone (capped at 2)
  if (currentStreak % 7 === 0 && freezesAvailable < 2) {
    freezesAvailable = Math.min(2, freezesAvailable + 1);
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  return {
    changed: true,
    next: { currentStreak, longestStreak, freezesAvailable, freezesUsedTotal, lastActivityDate: today },
    freezeConsumed,
    bridgedDate,
  };
}
