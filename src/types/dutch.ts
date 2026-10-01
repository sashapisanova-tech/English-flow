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

/** Module ID, e.g. 'a1-flatmates' (see content/CURRICULUM.md). */
export type Module = string;

export interface ReadingText {
  id: string;
  title: string;
  titleTranslation: string;
  level: Level;
  module?: Module;
  moduleTitle?: string;
  content: string;
  words: Record<string, { english: string; plural?: string; example?: string; exampleTranslation?: string }>;
  /** Multi-word chunks whose words stand together in the text (highlighted green). */
  expressions?: Record<string, { english: string }>;
  /** Two words of one chunk separated in the sentence, e.g. "turn it off" (highlighted green). */
  splitExpressions?: { word1: string; word2: string; english: string; display?: string }[];
  /** Short grammar spotlight in the learner's language, pointing at a sentence in the text. */
  grammarNote?: string;
  comprehensionQuestions?: {
    question: string;
    /** The question in the learner's language (A1). */
    questionTranslation?: string;
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
