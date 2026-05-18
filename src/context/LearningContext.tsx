import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { DutchWord, WordStatus, DailyGoal, ReadingText } from '@/types/dutch';
import { sampleTexts } from '@/data/texts';
import { getLevelInfo } from '@/utils/levels';
import { fsrsReview, FSRSCard, FSRSRating } from '@/utils/fsrs';

const VOCAB_STORAGE_KEY = 'dutch-vocabulary-v1';
const STATS_STORAGE_KEY = 'dutch-player-stats-v1';
const TEXT_PROGRESS_KEY = 'dutch-text-progress-v1';

// ── UTC date helpers ─────────────────────────────────────────────────────────

/** Returns today's date as a UTC date string e.g. "2026-05-18" */
function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

// ── Context interface ────────────────────────────────────────────────────────

interface LearningState {
  vocabulary: Record<string, DutchWord>;
  texts: ReadingText[];
  dailyGoal: DailyGoal;
  xp: number;
  level: number;
  dueCount: number;
  addXP:                (amount: number) => void;
  addWord:              (dutch: string, english: string, extras?: Partial<DutchWord>) => void;
  removeWord:           (dutch: string) => void;
  updateWordStatus:     (dutch: string, status: WordStatus) => void;
  getWordsForReview:    () => DutchWord[];
  getWordsDueForReview: () => DutchWord[];
  enrollWord:           (dutch: string, english: string) => void;
  reviewWordSRS:        (dutch: string, rating: 'again' | 'good' | 'easy') => void;
  markTextCompleted:    (textId: string) => void;
  incrementFlashcards:  () => void;
  reviewWord:           (dutch: string, correct: boolean) => void;
}

const LearningContext = createContext<LearningState | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function LearningProvider({ children }: { children: ReactNode }) {

  // ── XP ──────────────────────────────────────────────────────────────────

  const [xp, setXP] = useState<number>(() => {
    try { return JSON.parse(localStorage.getItem(STATS_STORAGE_KEY) || '{}').xp ?? 0; } catch { return 0; }
  });
  const level = getLevelInfo(xp).level;

  useEffect(() => {
    try { localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify({ xp })); } catch {}
  }, [xp]);

  const addXP = useCallback((amount: number) => {
    setXP(prev => prev + amount);
  }, []);

  // ── Vocabulary ───────────────────────────────────────────────────────────

  const [vocabulary, setVocabulary] = useState<Record<string, DutchWord>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(VOCAB_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    try { localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(vocabulary)); } catch {}
  }, [vocabulary]);

  // ── Mutations ────────────────────────────────────────────────────────────

  const addWord = useCallback((dutch: string, english: string, extras?: Partial<DutchWord>) => {
    setVocabulary(prev => {
      const existing = prev[dutch.toLowerCase()];
      if (existing) {
        const updated: DutchWord = {
          ...existing,
          timesEncountered: existing.timesEncountered + 1,
          dueDate: existing.dueDate ?? todayUTC(),
          interval: existing.interval ?? 1,
        };
        return { ...prev, [dutch.toLowerCase()]: updated };
      }
      addXP(2);
      const newWord: DutchWord = {
        dutch: dutch.toLowerCase(), english,
        status: 'new', timesEncountered: 1, reviewInterval: 1,
        dueDate: todayUTC(), interval: 1,
        ...extras,
      };
      return { ...prev, [dutch.toLowerCase()]: newWord };
    });
  }, [addXP]);

  const removeWord = useCallback((dutch: string) => {
    const key = dutch.toLowerCase();
    setVocabulary(prev => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const updateWordStatus = useCallback((dutch: string, status: WordStatus) => {
    setVocabulary(prev => {
      const updated = { ...prev[dutch.toLowerCase()], status };
      return { ...prev, [dutch.toLowerCase()]: updated as DutchWord };
    });
  }, []);

  const getWordsForReview = useCallback(() => {
    const now = new Date();
    return Object.values(vocabulary)
      .filter(w => w.status !== 'known')
      .filter(w => !w.nextReview || new Date(w.nextReview) <= now)
      .sort((a, b) => {
        if (!a.nextReview && b.nextReview) return -1;
        if (a.nextReview && !b.nextReview) return 1;
        return new Date(a.nextReview!).getTime() - new Date(b.nextReview!).getTime();
      });
  }, [vocabulary]);

  /** Returns all words whose dueDate <= today UTC (including overdue / no dueDate). */
  const getWordsDueForReview = useCallback((): DutchWord[] => {
    const today = todayUTC();
    return Object.values(vocabulary)
      .filter(w => !w.dueDate || w.dueDate <= today)
      .sort((a, b) => {
        if (!a.dueDate && b.dueDate) return -1;
        if (a.dueDate && !b.dueDate) return 1;
        if (!a.dueDate || !b.dueDate) return 0;
        return a.dueDate.localeCompare(b.dueDate);
      });
  }, [vocabulary]);

  /**
   * Adds a word to the vocabulary with dueDate = today if not already tracked.
   * Safe to call repeatedly — a no-op if the word already exists.
   */
  const enrollWord = useCallback((dutch: string, english: string) => {
    const key = dutch.toLowerCase();
    setVocabulary(prev => {
      if (prev[key]) {
        // Already tracked — ensure dueDate is set (backfill old entries)
        const existing = prev[key];
        if (existing.dueDate) return prev; // already enrolled, nothing to do
        const updated: DutchWord = { ...existing, dueDate: todayUTC(), interval: existing.interval ?? 1 };
        return { ...prev, [key]: updated };
      }
      addXP(2);
      const newWord: DutchWord = {
        dutch: key, english,
        status: 'new', timesEncountered: 1, reviewInterval: 1,
        dueDate: todayUTC(), interval: 1,
      };
      return { ...prev, [key]: newWord };
    });
  }, [addXP]);

  /**
   * Rate a word with Again / Good / Easy and update its dueDate accordingly.
   * - Again → due tomorrow (interval stays 1)
   * - Good  → interval = max(3, lastInterval * 2), due in interval days
   * - Easy  → interval = max(7, lastInterval * 3), due in interval days
   */
  const reviewWordSRS = useCallback((dutch: string, rating: 'again' | 'good' | 'easy') => {
    const key = dutch.toLowerCase();
    setVocabulary(prev => {
      const word = prev[key];
      if (!word) return prev;

      const lastInterval = word.interval ?? 1;
      let newInterval: number;
      if (rating === 'again') {
        newInterval = 1;
      } else if (rating === 'good') {
        newInterval = Math.max(3, lastInterval * 2);
      } else {
        newInterval = Math.max(7, lastInterval * 3);
      }

      // Compute new due date in UTC
      const now = new Date();
      const dueDateObj = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + newInterval,
      ));
      const dueDate = dueDateObj.toISOString().slice(0, 10);

      const updated: DutchWord = {
        ...word,
        interval:   newInterval,
        dueDate,
        lastReview: now.toISOString(),
      };
      return { ...prev, [key]: updated };
    });
    incrementFlashcards();
    if (rating !== 'again') addXP(5);
  }, [incrementFlashcards, addXP]);

  const [texts, setTexts] = useState<ReadingText[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TEXT_PROGRESS_KEY) || '{}') as Record<string, { completed: boolean; lastRead: string }>;
      return sampleTexts.map(t => saved[t.id] ? { ...t, completed: true, lastRead: new Date(saved[t.id].lastRead) } : t);
    } catch { return sampleTexts; }
  });
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({
    textsRead: 0, textsGoal: 2,
    flashcardsReviewed: 0, flashcardsGoal: 15,
    streak: 3, lastPractice: new Date(),
  });

  const markTextCompleted = useCallback((textId: string) => {
    setTexts(prev => {
      const updated = prev.map(t => t.id === textId ? { ...t, completed: true, lastRead: new Date() } : t);
      try {
        const progress: Record<string, { completed: boolean; lastRead: string }> = {};
        updated.forEach(t => { if (t.completed && t.lastRead) progress[t.id] = { completed: true, lastRead: (t.lastRead as Date).toISOString() }; });
        localStorage.setItem(TEXT_PROGRESS_KEY, JSON.stringify(progress));
      } catch {}
      return updated;
    });
    setDailyGoal(prev => ({ ...prev, textsRead: prev.textsRead + 1 }));
    addXP(20);
  }, [addXP]);

  const incrementFlashcards = useCallback(() => {
    setDailyGoal(prev => ({ ...prev, flashcardsReviewed: prev.flashcardsReviewed + 1 }));
  }, []);

  const reviewWord = useCallback((dutch: string, correct: boolean) => {
    const now = new Date();
    setVocabulary(prev => {
      const word = prev[dutch.toLowerCase()];
      if (!word) return prev;

      const card: FSRSCard | null = word.stability != null ? {
        stability:  word.stability,
        difficulty: word.difficulty ?? 5,
        state:      word.fsrsState  ?? 'learning',
        lastReview: word.lastReview ? new Date(word.lastReview) : now,
      } : null;

      const rating: FSRSRating = correct ? 3 : 1;
      const result = fsrsReview(card, rating, now);
      const newStatus: WordStatus =
        result.state === 'review' && result.stability >= 21 ? 'known' : 'learning';

      if (correct) {
        if (newStatus === 'known' && word.status !== 'known') addXP(10);
        else addXP(5);
      }

      const updated: DutchWord = {
        ...word,
        status:         newStatus,
        reviewInterval: result.interval,
        stability:      result.stability,
        difficulty:     result.difficulty,
        fsrsState:      result.state,
        lastReview:     now.toISOString(),
        nextReview:     new Date(now.getTime() + result.interval * 86_400_000),
      };
      return { ...prev, [dutch.toLowerCase()]: updated };
    });
    incrementFlashcards();
  }, [incrementFlashcards, addXP]);

  const dueCount = React.useMemo(() => {
    const today = todayUTC();
    return Object.values(vocabulary).filter(w => !w.dueDate || w.dueDate <= today).length;
  }, [vocabulary]);

  return (
    <LearningContext.Provider value={{
      vocabulary, texts, dailyGoal, xp, level, dueCount,
      addXP, addWord, removeWord, updateWordStatus,
      getWordsForReview, getWordsDueForReview, enrollWord, reviewWordSRS,
      markTextCompleted, incrementFlashcards, reviewWord,
    }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error('useLearning must be used within LearningProvider');
  return ctx;
}
