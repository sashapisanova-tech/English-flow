import { FlashcardSet } from '@/types/dutch';
import { a1VerbSets } from './a1-verbs';
import { a1NounSets } from './a1-nouns';
import { a1AdjectiveSets } from './a1-adjectives';
import { a1CoreSet } from './a1-core';
import { a2VerbSets } from './a2-verbs';
import { a2NounSets } from './a2-nouns';
import { a2AdjectiveSets } from './a2-adjectives';

export const flashcardSets: FlashcardSet[] = [
  a1CoreSet,
  ...a1VerbSets,
  ...a1NounSets,
  ...a1AdjectiveSets,
  ...a2VerbSets,
  ...a2NounSets,
  ...a2AdjectiveSets,
];
