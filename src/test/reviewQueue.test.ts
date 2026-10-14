import { describe, it, expect } from 'vitest';
import { isDueForReview } from '@/lib/reviewQueue';
import type { DutchWord } from '@/types/dutch';

const word = (extra: Partial<DutchWord>): DutchWord => ({
  dutch: 'flatmate', english: 'сосед по квартире', status: 'learning',
  timesEncountered: 1, reviewInterval: 1, stability: 3, dueDate: '2026-10-14', ...extra,
});

describe('isDueForReview', () => {
  it('a learning word is due on its due date', () => {
    expect(isDueForReview(word({}), '2026-10-14')).toBe(true);
  });
  it('a word is not due before its due date', () => {
    expect(isDueForReview(word({ dueDate: '2026-10-20' }), '2026-10-14')).toBe(false);
  });
  it('a known word still comes back when it is due (long-term review)', () => {
    expect(isDueForReview(word({ status: 'known', stability: 35, dueDate: '2026-11-18' }), '2026-11-18')).toBe(true);
  });
  it('archived words never come back', () => {
    expect(isDueForReview(word({ status: 'ignored' }), '2026-10-14')).toBe(false);
  });
  it('words never reviewed are new cards, not due reviews', () => {
    expect(isDueForReview(word({ stability: undefined }), '2026-10-14')).toBe(false);
  });
});
