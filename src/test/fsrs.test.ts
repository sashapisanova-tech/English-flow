import { describe, it, expect } from 'vitest';
import { fsrsReview, fsrsPreviewInterval, FSRSCard } from '@/utils/fsrs';

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Simulate one full review, return the updated card ready for the next round. */
function doReview(
  card: FSRSCard | null,
  rating: 1 | 2 | 3 | 4,
  now: Date,
): { card: FSRSCard; interval: number; dueDate: Date } {
  const result = fsrsReview(card, rating, now);
  const nextNow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + result.interval,
  ));
  const nextCard: FSRSCard = {
    stability:  result.stability,
    difficulty: result.difficulty,
    state:      result.state,
    lastReview: now,
  };
  return { card: nextCard, interval: result.interval, dueDate: nextNow };
}

// ── First review (new card) ────────────────────────────────────────────────────

describe('new card — first review', () => {
  it('Again (1) → interval = 1 day, state = learning', () => {
    const r = fsrsReview(null, 1);
    expect(r.interval).toBe(1);
    expect(r.state).toBe('learning');
    expect(r.stability).toBeGreaterThan(0);
    expect(r.difficulty).toBeGreaterThan(0);
  });

  it('Hard (2) → interval = 1 day, state = learning', () => {
    const r = fsrsReview(null, 2);
    expect(r.interval).toBe(1);
    expect(r.state).toBe('learning');
  });

  it('Good (3) → interval = 3 days, state = review (graduates immediately per FSRS spec)', () => {
    const r = fsrsReview(null, 3);
    expect(r.interval).toBe(3);
    expect(r.state).toBe('review');
    expect(r.stability).toBeCloseTo(3.174, 1);
  });

  it('Easy (4) → interval ≥ 15 days, state = review (graduates immediately)', () => {
    const r = fsrsReview(null, 4);
    expect(r.interval).toBeGreaterThanOrEqual(15);
    expect(r.state).toBe('review');
  });

  it('interval is always ≥ 1 for all ratings', () => {
    for (const rating of [1, 2, 3, 4] as const) {
      expect(fsrsReview(null, rating).interval).toBeGreaterThanOrEqual(1);
    }
  });

  it('stability is always > 0 for all ratings', () => {
    for (const rating of [1, 2, 3, 4] as const) {
      expect(fsrsReview(null, rating).stability).toBeGreaterThan(0);
    }
  });
});

// ── Due date is always in the future ──────────────────────────────────────────

describe('due date computation', () => {
  it('Good rating on new card → due date is tomorrow or later', () => {
    const now = new Date('2026-07-17T10:00:00Z');
    const r = fsrsReview(null, 3, now);
    const dueDateObj = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + r.interval,
    ));
    const dueDate = dueDateObj.toISOString().slice(0, 10);
    const today = now.toISOString().slice(0, 10);
    expect(dueDate > today).toBe(true);            // strictly in the future
    expect(dueDate).toBe('2026-07-20');          // today + 3 days
  });

  it('Again rating → due tomorrow (interval = 1), not re-queued today', () => {
    const now = new Date('2026-07-17T10:00:00Z');
    const r = fsrsReview(null, 1, now);
    const dueDate = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + r.interval,
    )).toISOString().slice(0, 10);
    expect(dueDate).toBe('2026-07-18'); // tomorrow, NOT today
  });

  it('Easy rating → due well in the future (≥ 15 days)', () => {
    const now = new Date('2026-07-17T10:00:00Z');
    const r = fsrsReview(null, 4, now);
    expect(r.interval).toBeGreaterThanOrEqual(15);
    const dueDate = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + r.interval,
    )).toISOString().slice(0, 10);
    expect(dueDate > '2026-07-31').toBe(true);
  });
});

// ── State machine ──────────────────────────────────────────────────────────────

describe('state transitions', () => {
  it('Good on new card → graduates directly to review (FSRS 4.5 spec)', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    const { card, interval } = doReview(null, 3, now);
    expect(card.state).toBe('review');
    expect(interval).toBe(3);

    // Second Good review on a review-state card → stays review, interval grows
    const now2 = new Date(now.getTime() + interval * 86_400_000);
    const r2 = fsrsReview(card, 3, now2);
    expect(r2.state).toBe('review');
    expect(r2.interval).toBeGreaterThanOrEqual(interval);
  });

  it('learning → review once stability ≥ 5 (Easy rating)', () => {
    const r = fsrsReview(null, 4); // Easy: stability = 15.69, state = review
    expect(r.state).toBe('review');
  });

  it('review state + Again → relearning', () => {
    const reviewCard: FSRSCard = {
      stability:  10,
      difficulty: 5,
      state:      'review',
      lastReview: new Date(Date.now() - 10 * 86_400_000),
    };
    const r = fsrsReview(reviewCard, 1);
    expect(r.state).toBe('relearning');
    expect(r.stability).toBeGreaterThan(0);
  });

  it('review state + Good → stays review', () => {
    const reviewCard: FSRSCard = {
      stability:  10,
      difficulty: 5,
      state:      'review',
      lastReview: new Date(Date.now() - 10 * 86_400_000),
    };
    const r = fsrsReview(reviewCard, 3);
    expect(r.state).toBe('review');
    expect(r.stability).toBeGreaterThan(10); // stability grows
  });

  it('relearning state + Good → graduates to review (using stabilityAfterRecall)', () => {
    const relearningCard: FSRSCard = {
      stability:  1,
      difficulty: 5,
      state:      'relearning',
      lastReview: new Date(Date.now() - 1 * 86_400_000),
    };
    const r = fsrsReview(relearningCard, 3);
    // stabilityAfterRecall grows stability and graduates to review
    expect(r.state).toBe('review');
    expect(r.stability).toBeGreaterThan(0);
  });
});

// ── Interval growth across chained reviews ────────────────────────────────────

describe('interval growth', () => {
  it('Good ratings grow the interval monotonically over 6 reviews', () => {
    let now = new Date('2026-01-01T00:00:00Z');
    let card: FSRSCard | null = null;
    let prevInterval = 0;

    for (let i = 0; i < 6; i++) {
      const { card: next, interval, dueDate } = doReview(card, 3, now);
      expect(interval).toBeGreaterThanOrEqual(1);
      if (i > 0) expect(interval).toBeGreaterThanOrEqual(prevInterval);
      prevInterval = interval;
      card = next;
      now = dueDate;
    }
    // After 6 Good reviews the interval should be many days
    expect(prevInterval).toBeGreaterThan(7);
  });

  it('Hard rating results in a shorter interval than Good', () => {
    const good = fsrsReview(null, 3);
    const hard = fsrsReview(null, 2);
    expect(hard.interval).toBeLessThanOrEqual(good.interval);
  });

  it('Easy rating results in a longer interval than Good', () => {
    const good = fsrsReview(null, 3);
    const easy = fsrsReview(null, 4);
    expect(easy.interval).toBeGreaterThan(good.interval);
  });
});

// ── Stability and difficulty are well-formed ──────────────────────────────────

describe('output ranges', () => {
  it('difficulty stays within [1, 10] across all rating paths', () => {
    for (const firstRating of [1, 2, 3, 4] as const) {
      const r1 = fsrsReview(null, firstRating);
      expect(r1.difficulty).toBeGreaterThanOrEqual(1);
      expect(r1.difficulty).toBeLessThanOrEqual(10);

      const card: FSRSCard = { stability: r1.stability, difficulty: r1.difficulty, state: r1.state, lastReview: new Date() };
      for (const secondRating of [1, 2, 3, 4] as const) {
        const r2 = fsrsReview(card, secondRating);
        expect(r2.difficulty).toBeGreaterThanOrEqual(1);
        expect(r2.difficulty).toBeLessThanOrEqual(10);
      }
    }
  });

  it('stability stays within (0, 365] for review-state cards', () => {
    const reviewCard: FSRSCard = {
      stability:  30,
      difficulty: 5,
      state:      'review',
      lastReview: new Date(Date.now() - 30 * 86_400_000),
    };
    for (const rating of [1, 2, 3, 4] as const) {
      const r = fsrsReview(reviewCard, rating);
      expect(r.stability).toBeGreaterThan(0);
      expect(r.stability).toBeLessThanOrEqual(365);
    }
  });
});

// ── fsrsPreviewInterval matches fsrsReview ────────────────────────────────────

describe('fsrsPreviewInterval', () => {
  it('preview matches actual review interval for all ratings (new card)', () => {
    for (const rating of [1, 2, 3, 4] as const) {
      expect(fsrsPreviewInterval(null, rating)).toBe(fsrsReview(null, rating).interval);
    }
  });

  it('preview matches actual review interval for existing review card', () => {
    const card: FSRSCard = {
      stability:  7,
      difficulty: 5,
      state:      'review',
      lastReview: new Date(Date.now() - 7 * 86_400_000),
    };
    for (const rating of [1, 2, 3, 4] as const) {
      expect(fsrsPreviewInterval(card, rating)).toBe(fsrsReview(card, rating).interval);
    }
  });
});

// ── Timezone safety — dueDate computed in UTC ─────────────────────────────────

describe('UTC dueDate computation', () => {
  it('dueDate uses UTC date arithmetic, unaffected by local hour', () => {
    // Simulate user at UTC+12 reviewing at 11pm local (= next UTC day)
    const nowUTCMidnight = new Date('2026-07-17T00:00:00Z');
    const nowLateNight   = new Date('2026-07-17T23:59:00Z');

    const r1 = fsrsReview(null, 3, nowUTCMidnight);
    const r2 = fsrsReview(null, 3, nowLateNight);

    // Both produce the same interval (3 days)
    expect(r1.interval).toBe(r2.interval);

    // dueDate strings computed the same way
    const makeDue = (now: Date, interval: number) => new Date(Date.UTC(
      now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + interval,
    )).toISOString().slice(0, 10);

    // Both should produce "2026-07-20" regardless of the time component
    expect(makeDue(nowUTCMidnight, r1.interval)).toBe('2026-07-20');
    expect(makeDue(nowLateNight,   r2.interval)).toBe('2026-07-20');
  });
});
