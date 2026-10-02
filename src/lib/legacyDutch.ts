// English Flow was copied from Dutch Flow, and accounts used before the switch still
// hold Dutch data (saved words, custom sets, text progress, practice sessions).
// These helpers recognise that data so it can be removed when an account loads.

import { lookupWord } from '@/lib/dictionary';
import { sampleTexts } from '@/data/texts';
import type { PracticeSessionRow } from '@/lib/practiceSession';

const CYRILLIC = /[а-яё]/i;

// Common Dutch words that never appear in English sentences
const DUTCH_WORDS = /\b(ik|het|een|niet|zijn|jij|je|jullie|wij|zij|hij|mijn|jouw|dit|deze|dat|wat|waar|hoe|met|naar|voor|bij|uit|ook|maar|nog|wel|geen|heb|heeft|ben|bent|zal|wil|kan|moet|gaat|gaan|heet|graag|veel|goed|dag|vandaag|morgen|huis|fiets|winkel|eten|drinken|werk|school)\b/i;

// Dutch grammar topics used by Dutch Flow's practice sessions
const DUTCH_GRAMMAR = /\b(v2|perfectum|imperfectum|de\/het|separable|scheidbare?|adjective endings|inflection|diminutive)\b/i;

/**
 * A saved word is Dutch-era data when its translation isn't Russian (English Flow
 * translates into Russian; Dutch Flow translated into English) and it either isn't
 * an English word or its example sentence is Dutch.
 */
export function isLegacyDutchWord(word: string, translation: string | undefined, example?: string): boolean {
  if (CYRILLIC.test(translation ?? '')) return false;
  return lookupWord(word) === null || DUTCH_WORDS.test(example ?? '');
}

const englishTextIds = new Set(sampleTexts.map(t => t.id));

/** Text progress keys that don't belong to an English Flow text. */
export function isLegacyTextId(id: string): boolean {
  return !englishTextIds.has(id);
}

export function isLegacyPracticeSession(row: Pick<PracticeSessionRow, 'grammar_focus' | 'hard_grammar_targets'>): boolean {
  return [row.grammar_focus ?? '', ...(row.hard_grammar_targets ?? [])].some(t => DUTCH_GRAMMAR.test(t));
}
