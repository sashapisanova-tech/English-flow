/**
 * FSRS-4.5 — Free Spaced Repetition Scheduler
 * Simplified for a binary rating: Again (1) | Good (3)
 * Reference: https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm
 */

// Default pre-trained weights (FSRS-4.5)
const W = [
  0.40255,  // w0:  initial stability — rating 1 (Again)
  1.18385,  // w1:  initial stability — rating 2 (Hard)
  3.17395,  // w2:  initial stability — rating 3 (Good)
  15.69105, // w3:  initial stability — rating 4 (Easy)
  7.1949,   // w4:  initial difficulty
  0.5345,   // w5:  initial difficulty scaling
  1.4604,   // w6:  difficulty update weight
  0.0046,   // w7:  mean-reversion weight
  1.54575,  // w8:  recall stability multiplier
  0.1192,   // w9:  stability decay exponent
  1.01925,  // w10: retrievability exponent
  1.9395,   // w11: forget stability base
  0.11,     // w12: forget difficulty exponent
  0.29605,  // w13: forget stability exponent
  2.2700,   // w14: forget retrievability exponent
  0.2315,   // w15: hard penalty
  2.9898,   // w16: easy bonus
  0.51655,
  0.6621,
];

// Forgetting-curve parameters (FSRS standard)
const DECAY  = -0.5;
const FACTOR = 19 / 81; // derived so R(S,S) = 0.9

export const DESIRED_RETENTION = 0.9;

export type FSRSRating = 1 | 2 | 3 | 4; // Again | Hard | Good | Easy
export type FSRSState  = 'new' | 'learning' | 'review' | 'relearning';

export interface FSRSCard {
  stability:  number;   // S: days until retrievability drops to 90%
  difficulty: number;   // D: 1–10
  state:      FSRSState;
  lastReview: Date;
}

// ── Core formulas ────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function initStability(rating: FSRSRating): number {
  return Math.max(0.1, W[rating - 1]);
}

function initDifficulty(rating: FSRSRating): number {
  return clamp(W[4] - Math.exp(W[5] * (rating - 1)) + 1, 1, 10);
}

function retrievability(elapsedDays: number, s: number): number {
  return Math.pow(1 + FACTOR * elapsedDays / s, DECAY);
}

function updateDifficulty(d: number, rating: FSRSRating): number {
  const delta          = -W[6] * (rating - 3);
  const meanReversion  =  W[7] * (initDifficulty(4) - d);
  return clamp(d + delta + meanReversion, 1, 10);
}

function stabilityAfterRecall(d: number, s: number, r: number, rating: FSRSRating): number {
  const base = s * (
    Math.exp(W[8]) *
    (11 - d) *
    Math.pow(s, -W[9]) *
    (Math.exp(W[10] * (1 - r)) - 1) + 1
  );
  // Apply hard penalty (w15) or easy bonus (w16) per FSRS-4.5 spec
  if (rating === 2) return base * W[15];
  if (rating === 4) return base * W[16];
  return base;
}

function stabilityAfterForgetting(d: number, s: number, r: number): number {
  return (
    W[11] *
    Math.pow(d,     -W[12]) *
    (Math.pow(s + 1, W[13]) - 1) *
    Math.exp(W[14] * (1 - r))
  );
}

// With desired_retention = 0.9 and the FSRS forgetting curve, interval = stability (days)
function nextInterval(s: number): number {
  return Math.max(1, Math.round(s));
}

// ── Public API ───────────────────────────────────────────────────────────────

export interface FSRSResult {
  stability:  number;
  difficulty: number;
  state:      FSRSState;
  interval:   number; // days until next review
}

/**
 * Compute the next FSRS state after a review.
 * Pass `null` for `card` on the very first review of a word.
 */
export function fsrsReview(
  card:   FSRSCard | null,
  rating: FSRSRating,
  now:    Date = new Date(),
): FSRSResult {
  // ── First-ever review (new card) ──
  // FSRS 4.5 spec: Again/Hard → learning step, Good/Easy → graduate directly to review.
  if (!card || card.state === 'new') {
    const s = initStability(rating);
    const d = initDifficulty(rating);
    const state: FSRSState = rating >= 3 ? 'review' : 'learning';
    return { stability: s, difficulty: d, state, interval: nextInterval(s) };
  }

  const elapsedDays = Math.max(0,
    (now.getTime() - new Date(card.lastReview).getTime()) / 86_400_000,
  );
  const r = retrievability(elapsedDays, card.stability);

  let s: number;
  let newState: FSRSState;
  const d = updateDifficulty(card.difficulty, rating);

  if (card.state === 'learning' || card.state === 'relearning') {
    if (rating === 1) {
      // Again — restart the learning step
      s        = initStability(1);
      newState = 'learning';
    } else {
      // Hard / Good / Easy — graduate to review using the recall formula.
      // Using stabilityAfterRecall (same as review state) grows stability correctly
      // instead of the old Math.max(stability, initStability) which kept stability frozen.
      s        = clamp(stabilityAfterRecall(card.difficulty, card.stability, r, rating), 0.1, 365);
      newState = 'review';
    }
  } else {
    // card.state === 'review'
    if (rating === 1) {
      s        = clamp(stabilityAfterForgetting(card.difficulty, card.stability, r), 0.1, 365);
      newState = 'relearning';
    } else {
      s        = clamp(stabilityAfterRecall(card.difficulty, card.stability, r, rating), 0.1, 365);
      newState = 'review';
    }
  }

  return { stability: s, difficulty: d, state: newState, interval: nextInterval(s) };
}

/**
 * Preview the next interval without mutating anything.
 * Use for "Got it → in X days / Again → tomorrow" hints.
 */
export function fsrsPreviewInterval(
  card:   FSRSCard | null,
  rating: FSRSRating,
  now:    Date = new Date(),
): number {
  return fsrsReview(card, rating, now).interval;
}
