import type { DutchWord } from '@/types/dutch';

/**
 * A reviewed word is due when its due date has come. "Known" words stay in the
 * queue too: they come back at long intervals (35, 100, 270 days…), which is what
 * keeps them known. Only archived ("ignored") words are left out.
 */
export function isDueForReview(w: DutchWord, today: string): boolean {
  return w.stability != null && !!w.dueDate && w.dueDate <= today && w.status !== 'ignored';
}
