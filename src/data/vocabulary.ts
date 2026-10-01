// Curated A1 keyword vocabulary per text (from dutch_a1_vocabulary.pdf).
// Keys must be exact lowercase token forms as they appear in the text content —
// the tokenizer matches word-by-word, so "kookt" ≠ "koken".

export type KeywordMap = Record<string, string>;

// Emptied: these held Dutch Flow content keyed by text ID. English texts carry
// their own words/expressions; IDs can collide (e.g. b1m1-1), so these must stay empty.
export const textKeywords: Record<string, KeywordMap> = {
};

export function getKeywordsForText(textId: string): KeywordMap {
  return textKeywords[textId] || {};
}

// ─── Separable Verbs ────────────────────────────────────────────────────────
// Maps the conjugated VERB STEM token (as it appears in the text) to the
// full separable verb. Only the stem is highlighted; the separated prefix
// stays in its natural position. Clicking reveals the full infinitive.

export interface SeparableVerbEntry {
  infinitive: string;  // full form: "opstaan"
  english: string;     // "to get up"
  prefix: string;      // separated prefix: "op"
}

// Emptied: these held Dutch Flow content keyed by text ID. English texts carry
// their own words/expressions; IDs can collide (e.g. b1m1-1), so these must stay empty.
export const textSeparableVerbs: Record<string, Record<string, SeparableVerbEntry>> = {
};

export function getSeparableVerbsForText(textId: string): Record<string, SeparableVerbEntry> {
  return textSeparableVerbs[textId] || {};
}

// ─── Fixed Expressions ──────────────────────────────────────────────────────
// Multi-word fixed expressions per text. Keys are the exact phrase as it
// appears in the text (lowercase). Used to render green highlights.

export interface FixedExpressionEntry {
  english: string;
}

// Emptied: these held Dutch Flow content keyed by text ID. English texts carry
// their own words/expressions; IDs can collide (e.g. b1m1-1), so these must stay empty.
export const textFixedExpressions: Record<string, Record<string, FixedExpressionEntry>> = {
};

export function getFixedExpressionsForText(textId: string): Record<string, FixedExpressionEntry> {
  return textFixedExpressions[textId] || {};
}

// ─── Split Expressions ───────────────────────────────────────────────────────
// Two non-adjacent words in the same sentence that together form a fixed
// expression. Both words are highlighted green when they co-occur in a sentence.

export interface SplitExpressionEntry {
  word1: string;    // first word (lowercase token form)
  word2: string;    // second word (lowercase token form)
  english: string;  // translation shown in popup
  display?: string; // optional override for the phrase shown in popup & saved to flashcards
}

// Emptied: these held Dutch Flow content keyed by text ID. English texts carry
// their own words/expressions; IDs can collide (e.g. b1m1-1), so these must stay empty.
export const textSplitExpressions: Record<string, SplitExpressionEntry[]> = {
};

export function getSplitExpressionsForText(textId: string): SplitExpressionEntry[] {
  return textSplitExpressions[textId] || [];
}
