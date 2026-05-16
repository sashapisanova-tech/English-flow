import { FlashcardSet } from '@/types/dutch';
import { a1VerbSets } from './a1-verbs';
import { a1NounSets } from './a1-nouns';

// Only the A1 level sets are included — the built-in generic sets (verbs,
// adjectives, nouns, numbers, location) have been removed so the flashcard
// browser focuses on the structured A1 curriculum.
export const flashcardSets: FlashcardSet[] = [
  ...a1VerbSets,
  ...a1NounSets,
];
