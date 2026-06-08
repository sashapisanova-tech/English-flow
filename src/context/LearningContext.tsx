import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { DutchWord, WordStatus, DailyGoal, ReadingText } from '@/types/dutch';
import { sampleTexts } from '@/data/texts';
import { getLevelInfo } from '@/utils/levels';
import { fsrsReview, FSRSCard, FSRSRating } from '@/utils/fsrs';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const VOCAB_STORAGE_KEY     = 'dutch-vocabulary-v1';
const STATS_STORAGE_KEY     = 'dutch-player-stats-v1';
const TEXT_PROGRESS_KEY     = 'dutch-text-progress-v1';
const GOALS_STORAGE_KEY     = 'dutch-daily-goals-v1';
const NEW_CARDS_TODAY_KEY   = 'dutch-new-cards-today-v1';
const DELETED_WORDS_KEY     = 'dutch-deleted-words-v1';

function getDeletedWords(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(DELETED_WORDS_KEY) || '[]')); } catch { return new Set(); }
}
function addDeletedWord(key: string) {
  try {
    const s = getDeletedWords(); s.add(key);
    localStorage.setItem(DELETED_WORDS_KEY, JSON.stringify([...s]));
  } catch {}
}
function clearDeletedWord(key: string) {
  try {
    const s = getDeletedWords(); s.delete(key);
    localStorage.setItem(DELETED_WORDS_KEY, JSON.stringify([...s]));
  } catch {}
}

export const NEW_CARDS_DAILY_LIMIT = 20;

// ── UTC date helpers ─────────────────────────────────────────────────────────

/** Returns today's date as a UTC date string e.g. "2026-05-18" */
function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

// ── Supabase row ↔ DutchWord converters ─────────────────────────────────────

function wordToRow(userId: string, w: DutchWord) {
  return {
    user_id:           userId,
    dutch:             w.dutch,
    english:           w.english,
    status:            w.status,
    review_interval:   w.reviewInterval,
    next_review:       w.nextReview  ? new Date(w.nextReview).toISOString() : null,
    last_review:       w.lastReview  ?? null,
    stability:         w.stability   ?? null,
    difficulty:        w.difficulty  ?? null,
    fsrs_state:        w.fsrsState   ?? null,
    times_encountered: w.timesEncountered,
    example:           w.example     ?? null,
    plural:            w.plural      ?? null,
    due_date:          w.dueDate     ?? null,
    interval:          w.interval    ?? null,
    updated_at:        new Date().toISOString(),
  };
}

function rowToWord(row: Record<string, unknown>): DutchWord {
  return {
    dutch:            row.dutch              as string,
    english:          row.english            as string,
    status:           (row.status            as WordStatus) ?? 'new',
    reviewInterval:   (row.review_interval   as number)     ?? 1,
    timesEncountered: (row.times_encountered as number)     ?? 1,
    nextReview:       row.next_review  ? new Date(row.next_review as string) : undefined,
    lastReview:       row.last_review  ? (row.last_review  as string)        : undefined,
    stability:        row.stability   != null ? (row.stability   as number)  : undefined,
    difficulty:       row.difficulty  != null ? (row.difficulty  as number)  : undefined,
    fsrsState:        row.fsrs_state  ? (row.fsrs_state as DutchWord['fsrsState']) : undefined,
    example:          row.example     ? (row.example    as string)           : undefined,
    plural:           row.plural      ? (row.plural     as string)           : undefined,
    dueDate:          row.due_date    ? (row.due_date   as string)           : undefined,
    interval:         row.interval   != null ? (row.interval    as number)   : undefined,
  };
}

// ── Context interface ────────────────────────────────────────────────────────

export interface PastError {
  type: string;
  example: string;
  date: string;
}

interface LearningState {
  vocabulary: Record<string, DutchWord>;
  texts: ReadingText[];
  dailyGoal: DailyGoal;
  xp: number;
  level: number;
  syncing: boolean;
  dueCount: number;
  newCardsToday: number;
  pastErrors: PastError[];
  addXP:                (amount: number) => void;
  addWord:              (dutch: string, english: string, extras?: Partial<DutchWord>) => void;
  removeWord:           (dutch: string) => void;
  updateWord:           (oldDutch: string, newDutch: string, newEnglish: string) => void;
  updateWordStatus:     (dutch: string, status: WordStatus) => void;
  getWordsForReview:    () => DutchWord[];
  getWordsDueForReview: () => DutchWord[];
  enrollWord:           (dutch: string, english: string) => void;
  reviewWordSRS:        (dutch: string, rating: 'again' | 'hard' | 'good' | 'easy') => void;
  markTextCompleted:    (textId: string) => void;
  incrementFlashcards:  () => void;
  reviewWord:           (dutch: string, correct: boolean) => void;
  setGoals:             (textsGoal: number, flashcardsGoal: number) => void;
  addPastError:         (error: PastError) => void;
}

const LearningContext = createContext<LearningState | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function LearningProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  const [syncing, setSyncing] = useState(false);

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

  // ── Load from Supabase on login ──────────────────────────────────────────

  useEffect(() => {
    if (!user) return;
    (async () => {
      setSyncing(true);
      try {
        // Fetch stats (xp + text_progress) and vocabulary in parallel
        const [statsRes, vocabRes] = await Promise.all([
          supabase.from('user_stats').select('xp, text_progress').eq('user_id', user.id).maybeSingle(),
          supabase.from('vocabulary').select('*').eq('user_id', user.id),
        ]);

        // ── XP ──
        if (statsRes.data?.xp != null) {
          setXP(statsRes.data.xp);
        }

        // ── Text progress ──
        const remoteTextProgress = statsRes.data?.text_progress as Record<string, { completed: boolean; lastRead: string }> | null;
        if (remoteTextProgress && Object.keys(remoteTextProgress).length > 0) {
          setTexts(sampleTexts.map(t =>
            remoteTextProgress[t.id]
              ? { ...t, completed: true, lastRead: new Date(remoteTextProgress[t.id].lastRead) }
              : t
          ));
          // Also persist to localStorage so it's available offline
          try { localStorage.setItem(TEXT_PROGRESS_KEY, JSON.stringify(remoteTextProgress)); } catch {}
        } else {
          // No remote text progress yet — push local progress to Supabase
          const localProgress = (() => { try { return JSON.parse(localStorage.getItem(TEXT_PROGRESS_KEY) || '{}'); } catch { return {}; } })();
          if (Object.keys(localProgress).length > 0) {
            const { error } = await supabase.from('user_stats').upsert({
              user_id: user.id,
              text_progress: localProgress,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' });
            if (error) console.error('[sync] text_progress push error:', error);
          }
        }

        // ── Vocabulary ──
        const vocabData = vocabRes.data;
        if (vocabData && vocabData.length > 0) {
          // Filter out any words the user deleted locally — they may not have
          // synced to Supabase yet (fire-and-forget delete race on reload)
          const deleted = getDeletedWords();
          const remoteVocab: Record<string, DutchWord> = {};
          for (const row of vocabData) {
            if (!deleted.has(row.dutch as string)) remoteVocab[row.dutch] = rowToWord(row);
          }
          setVocabulary(remoteVocab);
          // Retry any pending deletes — blocklist entries stay until user manually re-adds
          if (deleted.size > 0) {
            for (const key of deleted) {
              supabase.from('vocabulary').delete().match({ user_id: user.id, dutch: key });
            }
          }
        } else {
          // Nothing in Supabase yet — push local vocabulary up
          const localWords = Object.values((() => { try { const r = localStorage.getItem(VOCAB_STORAGE_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; } })()) as DutchWord[];
          if (localWords.length > 0) {
            const { error } = await supabase.from('vocabulary').upsert(localWords.map(w => wordToRow(user.id, w)), { onConflict: 'user_id,dutch' });
            if (error) console.error('[sync] initial vocab push error:', error);
          }
          const localXP: number = (() => { try { return JSON.parse(localStorage.getItem(STATS_STORAGE_KEY) || '{}').xp ?? 0; } catch { return 0; } })();
          const { error: xpErr } = await supabase.from('user_stats').upsert({ user_id: user.id, xp: localXP, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
          if (xpErr) console.error('[sync] initial xp push error:', xpErr);
        }
      } catch (e) {
        console.error('Supabase load error:', e);
      }
      setSyncing(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // ── Sync XP to Supabase (debounced) ─────────────────────────────────────

  const xpSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!userRef.current) return;
    if (xpSyncTimer.current) clearTimeout(xpSyncTimer.current);
    xpSyncTimer.current = setTimeout(async () => {
      if (!userRef.current) return;
      const { error } = await supabase.from('user_stats').upsert(
        { user_id: userRef.current.id, xp, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
      if (error) console.error('[sync] xp upsert error:', error);
    }, 2000);
  }, [xp]);

  // ── Sync a single word to Supabase ──────────────────────────────────────

  const syncWord = useCallback((word: DutchWord) => {
    const u = userRef.current;
    if (!u) return;
    supabase.from('vocabulary')
      .upsert(wordToRow(u.id, word), { onConflict: 'user_id,dutch' })
      .then(({ error }) => { if (error) console.error('[sync] vocab upsert error:', error); });
  }, []);

  // ── Mutations ────────────────────────────────────────────────────────────

  const addWord = useCallback((dutch: string, english: string, extras?: Partial<DutchWord>) => {
    // If the user re-saves a previously deleted word, remove it from the blocklist
    clearDeletedWord(dutch.toLowerCase());
    setVocabulary(prev => {
      const existing = prev[dutch.toLowerCase()];
      if (existing) {
        const updated: DutchWord = {
          ...existing,
          timesEncountered: existing.timesEncountered + 1,
          dueDate: existing.dueDate ?? todayUTC(),
          interval: existing.interval ?? 1,
        };
        syncWord(updated);
        return { ...prev, [dutch.toLowerCase()]: updated };
      }
      addXP(2);
      const newWord: DutchWord = {
        dutch: dutch.toLowerCase(), english,
        status: 'new', timesEncountered: 1, reviewInterval: 1,
        dueDate: todayUTC(), interval: 1,
        ...extras,
      };
      syncWord(newWord);
      return { ...prev, [dutch.toLowerCase()]: newWord };
    });
  }, [addXP, syncWord]);

  const removeWord = useCallback((dutch: string) => {
    const key = dutch.toLowerCase();
    // Write to blocklist FIRST — this is permanent until the user manually re-adds the word
    addDeletedWord(key);
    setVocabulary(prev => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
    // Fire-and-forget delete — if it fails, the blocklist still keeps the word out on reload
    const u = userRef.current;
    if (u) {
      supabase.from('vocabulary').delete().match({ user_id: u.id, dutch: key })
        .then(({ error }) => { if (error) console.error('[sync] vocab delete error:', error); });
    }
  }, []);

  const updateWord = useCallback((oldDutch: string, newDutch: string, newEnglish: string) => {
    const oldKey = oldDutch.toLowerCase();
    const newKey = newDutch.toLowerCase();
    const u = userRef.current;
    setVocabulary(prev => {
      const existing = prev[oldKey];
      if (!existing) return prev;
      const updated: DutchWord = { ...existing, dutch: newKey, english: newEnglish };
      if (oldKey === newKey) {
        // Only the English changed — just upsert in place, no delete needed
        syncWord(updated);
        return { ...prev, [newKey]: updated };
      } else {
        // Dutch word changed — delete old key, insert new one
        if (u) supabase.from('vocabulary').delete().match({ user_id: u.id, dutch: oldKey });
        syncWord(updated);
        const { [oldKey]: _, ...rest } = prev;
        return { ...rest, [newKey]: updated };
      }
    });
  }, [syncWord]);

  const updateWordStatus = useCallback((dutch: string, status: WordStatus) => {
    setVocabulary(prev => {
      const updated = { ...prev[dutch.toLowerCase()], status } as DutchWord;
      syncWord(updated);
      return { ...prev, [dutch.toLowerCase()]: updated };
    });
  }, [syncWord]);

  // ── Daily new-cards counter ────────────────────────────────────────────────
  const [newCardsToday, setNewCardsToday] = useState<number>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(NEW_CARDS_TODAY_KEY) || 'null') as { date: string; count: number } | null;
      if (stored && stored.date === todayUTC()) return stored.count;
    } catch {}
    return 0;
  });

  const incrementNewCards = useCallback(() => {
    setNewCardsToday(prev => {
      const next = prev + 1;
      try { localStorage.setItem(NEW_CARDS_TODAY_KEY, JSON.stringify({ date: todayUTC(), count: next })); } catch {}
      return next;
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

  /** Returns due reviews + new cards (up to daily limit), sorted: relearning → overdue → new. */
  const getWordsDueForReview = useCallback((): DutchWord[] => {
    const today = todayUTC();
    const newAllowed = Math.max(0, NEW_CARDS_DAILY_LIMIT - newCardsToday);

    const dueReviews = Object.values(vocabulary)
      .filter(w => w.stability != null && w.dueDate && w.dueDate <= today && w.status !== 'known')
      .sort((a, b) => {
        const aRelearn = a.fsrsState === 'relearning' ? 0 : 1;
        const bRelearn = b.fsrsState === 'relearning' ? 0 : 1;
        if (aRelearn !== bRelearn) return aRelearn - bRelearn;
        return (a.dueDate ?? '').localeCompare(b.dueDate ?? '');
      });

    const newCards = Object.values(vocabulary)
      .filter(w => !w.stability && w.status !== 'known')
      .slice(0, newAllowed);

    return [...dueReviews, ...newCards];
  }, [vocabulary, newCardsToday]);

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
        syncWord(updated);
        return { ...prev, [key]: updated };
      }
      addXP(2);
      const newWord: DutchWord = {
        dutch: key, english,
        status: 'new', timesEncountered: 1, reviewInterval: 1,
        dueDate: todayUTC(), interval: 1,
      };
      syncWord(newWord);
      return { ...prev, [key]: newWord };
    });
  }, [addXP, syncWord]);

  const [texts, setTexts] = useState<ReadingText[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TEXT_PROGRESS_KEY) || '{}') as Record<string, { completed: boolean; lastRead: string }>;
      return sampleTexts.map(t => saved[t.id] ? { ...t, completed: true, lastRead: new Date(saved[t.id].lastRead) } : t);
    } catch { return sampleTexts; }
  });
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(GOALS_STORAGE_KEY) || '{}');
      return {
        textsRead: 0, textsGoal: saved.textsGoal ?? 2,
        flashcardsReviewed: 0, flashcardsGoal: saved.flashcardsGoal ?? 15,
        streak: 3, lastPractice: new Date(),
      };
    } catch {
      return { textsRead: 0, textsGoal: 2, flashcardsReviewed: 0, flashcardsGoal: 15, streak: 3, lastPractice: new Date() };
    }
  });

  const markTextCompleted = useCallback((textId: string) => {
    setTexts(prev => {
      const updated = prev.map(t => t.id === textId ? { ...t, completed: true, lastRead: new Date() } : t);
      try {
        const progress: Record<string, { completed: boolean; lastRead: string }> = {};
        updated.forEach(t => { if (t.completed && t.lastRead) progress[t.id] = { completed: true, lastRead: (t.lastRead as Date).toISOString() }; });
        localStorage.setItem(TEXT_PROGRESS_KEY, JSON.stringify(progress));
        // Sync to Supabase so other devices see the update
        const u = userRef.current;
        if (u) {
          supabase.from('user_stats').upsert({
            user_id: u.id,
            text_progress: progress,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' })
          .then(({ error }) => { if (error) console.error('[sync] text_progress upsert error:', error); });
        }
      } catch {}
      return updated;
    });
    setDailyGoal(prev => ({ ...prev, textsRead: prev.textsRead + 1 }));
    addXP(20);
  }, [addXP]);

  const incrementFlashcards = useCallback(() => {
    setDailyGoal(prev => ({ ...prev, flashcardsReviewed: prev.flashcardsReviewed + 1 }));
  }, []);

  /**
   * Rate a word with Again / Hard / Good / Easy using full FSRS-4.5.
   * Replaces the old simple-multiplier approach.
   */
  const reviewWordSRS = useCallback((dutch: string, rating: 'again' | 'hard' | 'good' | 'easy') => {
    const key = dutch.toLowerCase();
    const now = new Date();
    setVocabulary(prev => {
      const word = prev[key];
      if (!word) return prev;

      const card: FSRSCard | null = word.stability != null ? {
        stability:  word.stability,
        difficulty: word.difficulty ?? 5,
        state:      word.fsrsState  ?? 'learning',
        lastReview: word.lastReview ? new Date(word.lastReview) : now,
      } : null;

      const fsrsRating: FSRSRating = rating === 'again' ? 1 : rating === 'hard' ? 2 : rating === 'good' ? 3 : 4;

      // Track new cards before the word has any stability (first real review)
      const isNewCard = !word.stability;

      const result = fsrsReview(card, fsrsRating, now);
      const newStatus: WordStatus =
        result.state === 'review' && result.stability >= 21 ? 'known' : 'learning';

      const dueDateObj = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + result.interval,
      ));
      const dueDate = result.state === 'relearning'
        ? todayUTC()
        : dueDateObj.toISOString().slice(0, 10);

      const updated: DutchWord = {
        ...word,
        status:     newStatus,
        stability:  result.stability,
        difficulty: result.difficulty,
        fsrsState:  result.state,
        interval:   result.interval,
        dueDate,
        lastReview: now.toISOString(),
      };
      syncWord(updated);

      if (isNewCard) {
        // Side-effect: increment new cards counter (deferred to avoid setState-in-setState)
        setTimeout(() => incrementNewCards(), 0);
      }

      return { ...prev, [key]: updated };
    });
    incrementFlashcards();
    if (rating === 'easy') addXP(10);
    else if (rating !== 'again') addXP(5);
  }, [incrementFlashcards, addXP, syncWord, incrementNewCards]);

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

      // Compute dueDate from FSRS interval so the SRS queue reads it correctly
      const dueDateObj = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + result.interval,
      ));
      const dueDate = dueDateObj.toISOString().slice(0, 10);

      const updated: DutchWord = {
        ...word,
        status:         newStatus,
        reviewInterval: result.interval,
        interval:       result.interval,
        stability:      result.stability,
        difficulty:     result.difficulty,
        fsrsState:      result.state,
        lastReview:     now.toISOString(),
        nextReview:     new Date(now.getTime() + result.interval * 86_400_000),
        dueDate,
      };
      syncWord(updated);
      return { ...prev, [dutch.toLowerCase()]: updated };
    });
    incrementFlashcards();
  }, [incrementFlashcards, addXP, syncWord]);

  const setGoals = useCallback((textsGoal: number, flashcardsGoal: number) => {
    setDailyGoal(prev => ({ ...prev, textsGoal, flashcardsGoal }));
    try { localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify({ textsGoal, flashcardsGoal })); } catch {}
  }, []);

  const dueCount = React.useMemo(() => {
    const today = todayUTC();
    const reviews = Object.values(vocabulary).filter(
      w => w.stability != null && w.dueDate && w.dueDate <= today && w.status !== 'known'
    ).length;
    const newWords = Object.values(vocabulary).filter(w => !w.stability && w.status !== 'known').length;
    const newAllowed = Math.max(0, NEW_CARDS_DAILY_LIMIT - newCardsToday);
    return reviews + Math.min(newWords, newAllowed);
  }, [vocabulary, newCardsToday]);

  const [pastErrors, setPastErrors] = useState<PastError[]>(() => {
    try { return JSON.parse(localStorage.getItem('dutch-past-errors-v1') || '[]'); } catch { return []; }
  });

  const addPastError = useCallback((error: PastError) => {
    setPastErrors(prev => {
      const updated = [...prev, error].slice(-50); // keep last 50
      try { localStorage.setItem('dutch-past-errors-v1', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  return (
    <LearningContext.Provider value={{
      vocabulary, texts, dailyGoal, xp, level, syncing, dueCount, newCardsToday,
      pastErrors, addPastError,
      addXP, addWord, removeWord, updateWord, updateWordStatus,
      getWordsForReview, getWordsDueForReview, enrollWord, reviewWordSRS,
      markTextCompleted, incrementFlashcards, reviewWord, setGoals,
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
