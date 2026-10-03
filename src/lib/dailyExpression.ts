// Expression of the day: once per local day the learner can ask the AI for one useful
// English word or fixed phrase at their level, with a Russian translation and an example.
// The result is kept for the day (on the device and in user_stats.daily_expression), and
// the last expressions are sent with the request so the AI doesn't repeat itself.

import { supabase } from '@/lib/supabase';
import { claudeFetch } from '@/lib/ai';

export interface DailyExpression {
  /** The English word or phrase, e.g. "fancy a cuppa?" */
  expression: string;
  /** Russian translation. */
  translation: string;
  /** When and how it's used, in simple Russian. */
  note: string;
  /** Example sentence in British English, and its Russian translation. */
  example: string;
  exampleTranslation: string;
  level: string;
}

export interface DailyExpressionState {
  /** Local date (YYYY-MM-DD) of today's expression, if one was generated. */
  date: string | null;
  today: DailyExpression | null;
  /** Earlier expressions (newest first), sent to the AI to avoid repeats. */
  history: string[];
}

export const DAILY_EXPRESSION_KEY = 'english-daily-expression-v1';
const HISTORY_LIMIT = 30;
const CYRILLIC = /[а-яё]/i;

export const EMPTY_STATE: DailyExpressionState = { date: null, today: null, history: [] };

export function localDate(d = new Date()): string {
  return d.toLocaleDateString('en-CA');
}

/** True when today's chance is still unused. */
export function canGenerate(state: DailyExpressionState, today = localDate()): boolean {
  return state.date !== today || state.today === null;
}

/** Stores a new expression for today and moves it into the history. */
export function withNewExpression(state: DailyExpressionState, item: DailyExpression, today = localDate()): DailyExpressionState {
  const history = [item.expression, ...state.history.filter(h => h.toLowerCase() !== item.expression.toLowerCase())].slice(0, HISTORY_LIMIT);
  return { date: today, today: item, history };
}

export function buildPrompt(level: string, history: string[]): { system: string; user: string } {
  return {
    system: `You pick an "expression of the day" for a learner of British English whose native language is Russian.
Choose ONE genuinely useful word, collocation, phrasal verb or fixed expression that real British people use in everyday life, appropriate for level ${level} (CEFR). Prefer something lively and memorable over textbook words. Avoid slang that is rude, dated or rare, and avoid anything already learned (listed by the user).
Reply with JSON only, no markdown:
{"expression":"...","translation":"natural Russian translation","note":"one or two short sentences in simple Russian: when and how it is used, and any trap for Russian speakers","example":"one natural example sentence in British English (max 14 words) using the expression","exampleTranslation":"Russian translation of the example"}`,
    user: history.length
      ? `Level: ${level}. Already learned (don't repeat): ${history.join('; ')}`
      : `Level: ${level}. This is the learner's first expression.`,
  };
}

/** Parses and checks the AI's reply; returns null if it isn't usable. */
export function parseExpression(raw: string, level: string): DailyExpression | null {
  const text = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  let data: Record<string, unknown>;
  try { data = JSON.parse(text); } catch { return null; }
  const str = (k: string) => (typeof data[k] === 'string' ? (data[k] as string).trim() : '');
  const item: DailyExpression = {
    expression: str('expression'),
    translation: str('translation'),
    note: str('note'),
    example: str('example'),
    exampleTranslation: str('exampleTranslation'),
    level,
  };
  // English expression and example; Russian translation and explanation
  if (!item.expression || !item.example || CYRILLIC.test(item.expression) || CYRILLIC.test(item.example)) return null;
  if (!CYRILLIC.test(item.translation) || !CYRILLIC.test(item.exampleTranslation)) return null;
  return item;
}

export async function generateExpression(level: string, history: string[]): Promise<DailyExpression> {
  const { system, user } = buildPrompt(level, history);
  const res = await claudeFetch({
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`AI request failed (${res.status})`);
  const data = await res.json() as { content: { text: string }[] };
  const item = parseExpression(data.content?.[0]?.text ?? '', level);
  if (!item) throw new Error('The AI reply could not be read');
  return item;
}

// ── Storage: device first, account second ───────────────────────────────────

export function loadLocal(): DailyExpressionState {
  try {
    const raw = localStorage.getItem(DAILY_EXPRESSION_KEY);
    return raw ? { ...EMPTY_STATE, ...JSON.parse(raw) } : EMPTY_STATE;
  } catch { return EMPTY_STATE; }
}

export function saveLocal(state: DailyExpressionState) {
  try { localStorage.setItem(DAILY_EXPRESSION_KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
}

/** Reads the account's copy; null when unavailable (e.g. the column isn't created yet). */
export async function loadRemote(userId: string): Promise<DailyExpressionState | null> {
  const { data, error } = await supabase.from('user_stats').select('daily_expression').eq('user_id', userId).maybeSingle();
  if (error || !data?.daily_expression) return null;
  return { ...EMPTY_STATE, ...(data.daily_expression as DailyExpressionState) };
}

export async function saveRemote(userId: string, state: DailyExpressionState) {
  const { error } = await supabase.from('user_stats').upsert(
    { user_id: userId, daily_expression: state, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' },
  );
  if (error) console.error('[daily-expression] save error:', error);
}

/** The newer of two states: a generated expression for a later date wins. */
export function newerState(a: DailyExpressionState, b: DailyExpressionState): DailyExpressionState {
  if (!a.date) return b;
  if (!b.date) return a;
  return a.date >= b.date ? a : b;
}
