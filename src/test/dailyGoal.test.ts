import { describe, it, expect } from 'vitest';
import {
  accrueActiveTime, localYMD, secondsOn, mergeRemoteSeconds, normaliseGoal, goalReached,
  IDLE_MS, MAX_TICK_MS,
} from '@/lib/activeTime';
import { applyGoalMet, StreakRow } from '@/lib/streakRule';

const t0 = new Date(2026, 9, 3, 14, 0, 0).getTime(); // 3 Oct 2026 14:00 local
const DAY = localYMD(t0);

describe('active time accounting', () => {
  it('counts time while visible with a recent interaction', () => {
    const d = accrueActiveTime({}, { lastTick: t0, now: t0 + 1000, visible: true, lastInteraction: t0 });
    expect(d[DAY]).toBe(1000);
  });

  it('does not count while hidden', () => {
    const d = accrueActiveTime({}, { lastTick: t0, now: t0 + 1000, visible: false, lastInteraction: t0 + 500 });
    expect(d).toEqual({});
  });

  it('stops counting 60 s after the last interaction', () => {
    let days = {};
    let last = t0;
    for (let s = 1; s <= 120; s++) {
      const now = t0 + s * 1000;
      days = accrueActiveTime(days, { lastTick: last, now, visible: true, lastInteraction: t0 });
      last = now;
    }
    expect(secondsOn(days, DAY)).toBe(IDLE_MS / 1000);
  });

  it('credits only the part of a tick that is within the idle window', () => {
    const d = accrueActiveTime({}, {
      lastTick: t0 + IDLE_MS - 300, now: t0 + IDLE_MS + 700, visible: true, lastInteraction: t0,
    });
    expect(d[DAY]).toBe(300);
  });

  it('caps a long gap between ticks (sleep / frozen timer)', () => {
    const d = accrueActiveTime({}, { lastTick: t0, now: t0 + 5 * 60_000, visible: true, lastInteraction: t0 + 5 * 60_000 });
    expect(d[DAY]).toBe(MAX_TICK_MS);
  });

  it('splits time across local midnight', () => {
    const midnight = new Date(2026, 9, 4, 0, 0, 0).getTime();
    const d = accrueActiveTime({}, {
      lastTick: midnight - 2000, now: midnight + 3000, visible: true, lastInteraction: midnight,
    });
    expect(d[localYMD(midnight - 1)]).toBe(2000);
    expect(d[localYMD(midnight)]).toBe(3000);
    expect(localYMD(midnight)).toBe('2026-10-04');
  });

  it('merges remote totals by taking the max per day', () => {
    const merged = mergeRemoteSeconds({ [DAY]: 90_000, '2026-10-02': 1000 }, [
      { date: DAY, active_seconds: 60 },
      { date: '2026-10-02', active_seconds: 300 },
      { date: '2026-10-01', active_seconds: null },
    ]);
    expect(merged[DAY]).toBe(90_000);
    expect(merged['2026-10-02']).toBe(300_000);
  });

  it('normalises the goal and checks it', () => {
    expect(normaliseGoal(15)).toBe(15);
    expect(normaliseGoal('20')).toBe(20);
    expect(normaliseGoal(7)).toBe(10);
    expect(normaliseGoal(null)).toBe(10);
    expect(goalReached(599, 10)).toBe(false);
    expect(goalReached(600, 10)).toBe(true);
  });
});

describe('streak rule', () => {
  const base: StreakRow = {
    currentStreak: 3, longestStreak: 5, freezesAvailable: 0, freezesUsedTotal: 0, lastActivityDate: '2026-10-02',
  };

  it('goal met on the next day: +1', () => {
    const u = applyGoalMet(base, '2026-10-03');
    expect(u.changed).toBe(true);
    expect(u.next.currentStreak).toBe(4);
    expect(u.next.lastActivityDate).toBe('2026-10-03');
  });

  it('counts only once per day', () => {
    const first = applyGoalMet(base, '2026-10-03');
    const second = applyGoalMet(first.next, '2026-10-03');
    expect(second.changed).toBe(false);
    expect(second.next.currentStreak).toBe(4);
  });

  it('goal not met: no change', () => {
    const u = applyGoalMet(base, '2026-10-03', false);
    expect(u.changed).toBe(false);
    expect(u.next).toEqual(base);
  });

  it('first ever goal starts the streak at 1', () => {
    const u = applyGoalMet({ ...base, currentStreak: 0, longestStreak: 0, lastActivityDate: null }, '2026-10-03');
    expect(u.next.currentStreak).toBe(1);
    expect(u.next.longestStreak).toBe(1);
  });

  it('one missed day is bridged by a freeze', () => {
    const u = applyGoalMet({ ...base, freezesAvailable: 1, lastActivityDate: '2026-10-01' }, '2026-10-03');
    expect(u.next.currentStreak).toBe(4);
    expect(u.freezeConsumed).toBe(true);
    expect(u.bridgedDate).toBe('2026-10-02');
    expect(u.next.freezesAvailable).toBe(0);
    expect(u.next.freezesUsedTotal).toBe(1);
  });

  it('one missed day without a freeze resets to 1', () => {
    const u = applyGoalMet({ ...base, lastActivityDate: '2026-10-01' }, '2026-10-03');
    expect(u.next.currentStreak).toBe(1);
    expect(u.freezeConsumed).toBe(false);
    expect(u.next.longestStreak).toBe(5);
  });

  it('two missed days reset even with a freeze', () => {
    const u = applyGoalMet({ ...base, freezesAvailable: 2, lastActivityDate: '2026-09-30' }, '2026-10-03');
    expect(u.next.currentStreak).toBe(1);
    expect(u.next.freezesAvailable).toBe(2);
  });

  it('awards a freeze at 7 days', () => {
    const u = applyGoalMet({ ...base, currentStreak: 6 }, '2026-10-03');
    expect(u.next.currentStreak).toBe(7);
    expect(u.next.freezesAvailable).toBe(1);
    expect(u.next.longestStreak).toBe(7);
  });
});
