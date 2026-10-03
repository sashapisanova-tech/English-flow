import { getTextReadHistory } from '@/lib/textReadHistory';
import type { ReadingText } from '@/types/dutch';

export interface ContinueText {
  text: ReadingText;
  label: string;
  cta: string;
}

/** Continue reading: the most recently opened text; if finished, the next unfinished one. */
export function getContinueText(texts: ReadingText[]): ContinueText | null {
  const history = getTextReadHistory();
  let lastIdx = -1;
  let lastAt = '';
  texts.forEach((t, i) => {
    const rec = history[t.id];
    if (rec && rec.lastReadAt > lastAt) { lastAt = rec.lastReadAt; lastIdx = i; }
  });
  if (lastIdx >= 0 && !texts[lastIdx].completed) {
    return { text: texts[lastIdx], label: 'Continue reading', cta: 'Continue' };
  }
  const next = texts.slice(lastIdx + 1).find(t => !t.completed) ?? texts.find(t => !t.completed);
  return next ? { text: next, label: lastIdx >= 0 ? 'Up next' : 'Start reading', cta: 'Start reading' } : null;
}
