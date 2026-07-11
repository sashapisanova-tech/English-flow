export type WordStatus = 'new' | 'learning' | 'known' | 'ignored';

export interface DutchWord {
  dutch: string;
  english: string;
  plural?: string;
  example?: string;
  exampleTranslation?: string;
  status: WordStatus;
  timesEncountered: number;
  nextReview?: Date;
  reviewInterval: number; // days (computed by FSRS, kept for display)
  // FSRS fields
  stability?:  number;  // days until retrievability drops to 90%
  difficulty?: number;  // 1–10
  fsrsState?:  'new' | 'learning' | 'review' | 'relearning';
  lastReview?: string;  // ISO date string of the most recent review
  // SRS scheduling fields
  dueDate?:  string;  // UTC date string e.g. "2026-05-18" — when this word is next due
  interval?: number;  // current interval in days (for the simplified Again/Good/Easy system)
  // Example sentence provenance
  sentenceSource?: 'text' | 'ai';  // 'text' = extracted from reading, 'ai' = generated
  sourceTextId?:   string;         // reading text ID when sentenceSource is 'text'
}

export type Level = 'A0' | 'A1' | 'A2' | 'B1' | 'B2';

export type Module =
  | 'daily-survival'
  | 'social-life'
  | 'shopping-food'
  | 'transport-city'
  | 'work-study'
  | 'everyday-conversations'
  | 'a2-independence'
  | 'a2-social'
  | 'a2-living'
  | 'a2-work'
  | 'a2-adventures'
  | 'b1-sleep-habits'
  | 'b1-city-change'
  | 'b1-food-health'
  | 'b1-tech-attention'
  | 'b1-art-creativity'
  | 'b1-nature-landscape';

export interface ReadingText {
  id: string;
  title: string;
  titleTranslation: string;
  level: Level;
  module?: Module;
  moduleTitle?: string;
  content: string;
  words: Record<string, { english: string; plural?: string; example?: string; exampleTranslation?: string }>;
  comprehensionQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  completed: boolean;
  lastRead?: Date;
}

export interface DailyGoal {
  textsRead: number;
  textsGoal: number;
  flashcardsReviewed: number;
  flashcardsGoal: number;
  streak: number;
  lastPractice?: Date;
}

export interface FlashcardSession {
  word: DutchWord;
  showAnswer: boolean;
}

export interface VerbConjugation {
  ik: string;
  jij: string;
  hij: string;
  wij: string;
  jullie: string;
  zij: string;
}

export interface FlashcardSetWord {
  dutch: string;
  english: string;
  example?: string;
  exampleTranslation?: string;
  plural?: string;
  article?: 'de' | 'het';
  nounTip?: string;
  verbType?: 'reg' | 'irr' | 'sep' | 'mod';
  verbNote?: string;
  conjugation?: VerbConjugation;
  pastTense?: string;       // e.g. "werkte / werkten"
  pastParticiple?: string;  // e.g. "gewerkt"
  inflected?: string;
  neverInflects?: boolean;
}

export type FlashcardSetCategory = 'verbs' | 'adjectives' | 'nouns' | 'numbers' | 'location';

export interface FlashcardSet {
  id: string;
  title: string;
  category: FlashcardSetCategory;
  emoji: string;
  words: FlashcardSetWord[];
  level?: string;
  folder?: string;
}
