import { useState, useMemo, useRef, type ReactNode } from 'react';
import { Pip } from '@/components/Pip';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Check, X, RotateCcw, ArrowLeft, ArrowRight, ChevronRight, ArrowLeftRight, GraduationCap, Plus, ChevronDown, Shuffle, BookmarkPlus, RefreshCw, Volume2, Trash2, Pencil, Search, Bookmark, Archive, Folder, FolderOpen, CircleCheck, BookOpen, SlidersHorizontal } from 'lucide-react';
import { playDutch, stopDutch } from '@/utils/playDutch';
import { useLearning } from '@/context/LearningContext';
import { flashcardSets } from '@/data/flashcardSets';
import { FlashcardSet, FlashcardSetWord, DutchWord } from '@/types/dutch';
import { useCustomSets } from '@/hooks/useCustomSets';
import { getSetIcon } from '@/lib/setIcons';
import type { CustomSet } from '@/hooks/useCustomSets';
import { CustomSetEditor, CreateSetModal } from '@/components/CustomSetEditor';
import { fsrsPreviewInterval, FSRSCard, FSRSRating } from '@/utils/fsrs';
import { NEW_CARDS_DAILY_LIMIT } from '@/context/LearningContext';
import { CoachMark } from '@/components/CoachMark';
import { useCoachMark } from '@/hooks/useCoachMark';
import { TIP_KEYS } from '@/lib/coachMarks';

type SRSRating = 'again' | 'hard' | 'good' | 'easy';

type FlashcardMode = 'browse' | 'my-words' | 'set-practice' | 'learned' | 'word-list' | 'archive' | 'custom-editor' | 'create-set';
type Direction = 'en-to-ru' | 'ru-to-en';

/** Wrap occurrences of `word` in the sentence with <strong> for emphasis. */
function highlightWord(sentence: string, word: string): ReactNode {
  const wordLower = word.toLowerCase();
  const parts = sentence.split(new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === wordLower
      ? <strong key={i} className="text-foreground font-semibold not-italic">{part}</strong>
      : part
  );
}

const LEVELS = ['A1', 'A2', 'B1'] as const;
// Folders shown as collapsible groups inside an opened level; 'Core' sets are listed directly.
const FOLDERS = ['Verbs', 'Nouns', 'Adjectives'] as const;
const LEVEL_NAMES: Record<string, string> = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate' };
// Level badges: navy, red, gold (as the story covers in Read)
const LEVEL_TONES: Record<string, { bg: string; ink: string; bar: string }> = {
  A1: { bg: 'bg-accent', ink: 'text-primary', bar: 'bg-primary' },
  A2: { bg: 'bg-highlight-soft', ink: 'text-highlight', bar: 'bg-highlight' },
  B1: { bg: 'bg-gold-soft', ink: 'text-gold-ink', bar: 'bg-gold-ink' },
};

/** About 17 seconds a card. */
function reviewMinutes(cards: number): string {
  const min = Math.max(1, Math.round((cards * 17) / 60));
  return `About ${min} minute${min !== 1 ? 's' : ''}`;
}

/** Three stacked cards with the next word on top (Cards hero). */
function CardStack({ word }: { word: string }) {
  return (
    <div className="relative h-[104px] w-24 shrink-0" aria-hidden="true">
      <div className="absolute left-3.5 top-0.5 h-[92px] w-[70px] rotate-[10deg] rounded-[10px] bg-white/[0.18]" />
      <div className="absolute left-2 top-1.5 h-[92px] w-[70px] rotate-[4deg] rounded-[10px] bg-white/35" />
      <div className="absolute left-1 top-2.5 flex h-[92px] w-[70px] -rotate-[4deg] flex-col items-center justify-center gap-1 rounded-[10px] bg-white px-1.5 shadow-[0_8px_16px_-8px_hsl(220_62%_10%/0.5)]">
        <span className="max-w-full truncate font-heading text-sm font-semibold text-[hsl(20_20%_14%)]">{word}</span>
        <span className="h-0.5 w-[18px] rounded-sm bg-[hsl(354_72%_46%)]" />
      </div>
    </div>
  );
}

/** Sliders button → card direction and shuffle. */
function CardSettings({ direction, onDirectionChange, shuffle, onShuffleChange }: {
  direction: Direction;
  onDirectionChange: (d: Direction) => void;
  shuffle: boolean;
  onShuffleChange: (on: boolean) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" aria-label="Card settings" className="-mr-2.5 rounded-xl p-2.5 text-foreground transition-colors hover:bg-secondary">
          <SlidersHorizontal className="h-[22px] w-[22px]" strokeWidth={2.25} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-72 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-foreground">Card front shows</span>
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-secondary p-1" role="radiogroup" aria-label="Card front shows">
            {([['ru-to-en', 'Russian'], ['en-to-ru', 'English']] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={direction === value}
                onClick={() => onDirectionChange(value)}
                className={`h-8 rounded-md text-[13px] font-semibold transition-colors ${
                  direction === value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center justify-between gap-3">
          <span className="flex flex-col">
            <span className="text-[13px] font-semibold text-foreground">Shuffle sets</span>
            <span className="text-xs text-muted-foreground">Mix the order of words in a set</span>
          </span>
          <Switch checked={shuffle} onCheckedChange={onShuffleChange} />
        </label>
      </PopoverContent>
    </Popover>
  );
}

/** Toggle `key` in a Set held in state. */
function toggleIn(setter: (fn: (prev: Set<string>) => Set<string>) => void, key: string) {
  setter(prev => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });
}

export function FlashcardView() {
  const { getWordsForReview, getWordsDueForReview, reviewWordSRS, vocabulary, addWord, removeWord, updateWord, updateWordStatus, dueCount, newCardsToday } = useLearning();
  const { sets: customSets, createSet, deleteSet, addWordToSet, removeWordFromSet, updateWordInSet } = useCustomSets();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [flipped, setFlipped]           = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [direction, setDirection]       = useState<Direction>('ru-to-en');
  const [mode, setMode]                 = useState<FlashcardMode>('browse');
  const [activeSet, setActiveSet]       = useState<FlashcardSet | null>(null);
  const [activeCustomSet, setActiveCustomSet] = useState<CustomSet | null>(null);
  const [openLevels, setOpenLevels]   = useState<Set<string>>(new Set());
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  // Tip, once, on the overview when nothing is due
  // (needs saved words: "All caught up" means nothing left to review, not an empty deck)
  const caughtUpTip = useCoachMark(TIP_KEYS.cardsCaughtUp, mode === 'browse' && dueCount === 0 && Object.keys(vocabulary).length > 0);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null); // laptop: level shown in the side panel
  const [practiceQueue, setPracticeQueue] = useState<FlashcardSetWord[]>([]);
  const [isShuffled, setIsShuffled]     = useState(false);
  // Settings sheet: start prepared and custom sets shuffled
  const [shufflePref, setShufflePref]   = useState(false);
  const [savedWords, setSavedWords]     = useState<Set<string>>(new Set());
  // My-Words session state
  const [sessionQueue,    setSessionQueue]    = useState<DutchWord[]>([]);
  const [originalSession, setOriginalSession] = useState<DutchWord[]>([]);
  const [againKeys,       setAgainKeys]       = useState<Set<string>>(new Set());
  // Swipe gesture state
  const touchStartX = useRef<number | null>(null);
  const [swipeDeltaX, setSwipeDeltaX] = useState(0);
  // Disable flip animation for one frame when advancing cards
  const [noFlipAnim, setNoFlipAnim] = useState(false);
  // Word-list state
  const [wordListSearch, setWordListSearch] = useState('');
  const [editingWord, setEditingWord]       = useState<string | null>(null); // dutch key being edited
  const [editDutch, setEditDutch]           = useState('');
  const [editEnglish, setEditEnglish]       = useState('');
  const [confirmDeleteWord, setConfirmDeleteWord] = useState<string | null>(null);

  const allWords       = useMemo(() => Object.values(vocabulary), [vocabulary]);
  const learnedWords   = useMemo(() => allWords.filter(w => w.status === 'known'), [allWords]);
  const ignoredWords   = useMemo(() => allWords.filter(w => w.status === 'ignored'), [allWords]);
  const scheduledWords = useMemo(() => {
    const now = new Date();
    return allWords.filter(w => w.status !== 'known' && w.status !== 'ignored' && w.nextReview && new Date(w.nextReview) > now);
  }, [allWords]);

  const currentWord    = mode === 'my-words' ? sessionQueue[currentIndex] ?? null : null;
  const currentSetWord = mode === 'set-practice' && practiceQueue.length > 0 ? practiceQueue[currentIndex] : null;
  const totalCards     = mode === 'my-words' ? sessionQueue.length : practiceQueue.length;

  // Snap card to front without flip animation, then re-enable for next card
  const advanceCard = (nextIndex: number) => {
    setNoFlipAnim(true);
    setFlipped(false);
    stopDutch(); setIsPlaying(false);
    setCurrentIndex(nextIndex);
    requestAnimationFrame(() => requestAnimationFrame(() => setNoFlipAnim(false)));
  };

  const handleAnswer = (correct: boolean) => {
    const rating: SRSRating = correct ? 'good' : 'again';
    if (mode === 'my-words' && currentWord) {
      reviewWordSRS(currentWord.dutch, rating);
      if (!correct) setAgainKeys(prev => new Set(prev).add(currentWord.dutch.toLowerCase()));
    }
    if (mode === 'set-practice' && currentSetWord) {
      reviewWordSRS(currentSetWord.dutch, rating, currentSetWord.english);
    }
    advanceCard(currentIndex < totalCards - 1 ? currentIndex + 1 : totalCards);
  };

  const handleSRSRating = (rating: SRSRating) => {
    if (mode === 'my-words' && currentWord) {
      reviewWordSRS(currentWord.dutch, rating);
      if (rating === 'again') setAgainKeys(prev => new Set(prev).add(currentWord.dutch.toLowerCase()));
    }
    if (mode === 'set-practice' && currentSetWord) {
      reviewWordSRS(currentSetWord.dutch, rating, currentSetWord.english);
    }
    advanceCard(currentIndex < totalCards - 1 ? currentIndex + 1 : totalCards);
  };

  const resetDeck = () => { setCurrentIndex(0); setFlipped(false); };

  function handleListen(dutch: string) {
    if (isPlaying) { stopDutch(); setIsPlaying(false); return; }
    playDutch(dutch, {
      onStart: () => setIsPlaying(true),
      onEnd:   () => setIsPlaying(false),
    });
  }

  const goBack = () => {
    if (mode === 'set-practice' && activeCustomSet) {
      setMode('custom-editor');
      setActiveSet(null);
      setPracticeQueue([]);
      setCurrentIndex(0);
      setFlipped(false);
      setIsShuffled(false);
      setSavedWords(new Set());
      return;
    }
    setMode('browse'); setActiveSet(null); setActiveCustomSet(null);
    setPracticeQueue([]); setCurrentIndex(0); setFlipped(false);
    setIsShuffled(false); setSavedWords(new Set());
    setSessionQueue([]); setOriginalSession([]); setAgainKeys(new Set());
  };

  const startSet = (set: FlashcardSet) => {
    setActiveSet(set);
    setPracticeQueue(shufflePref ? [...set.words].sort(() => Math.random() - 0.5) : [...set.words]);
    setIsShuffled(shufflePref);
    setSavedWords(new Set());
    setMode('set-practice');
    setCurrentIndex(0);
    setFlipped(false);
  };

  const startCustomSetPractice = (customSet: CustomSet) => {
    const asFlashcardSet: FlashcardSet = {
      id: customSet.id,
      title: customSet.title,
      emoji: customSet.emoji,
      category: 'nouns',
      words: customSet.words,
    };
    setActiveCustomSet(customSet);
    startSet(asFlashcardSet);
  };

  function toggleShuffle() {
    if (isShuffled) {
      setPracticeQueue(activeSet ? [...activeSet.words] : []);
      setIsShuffled(false);
    } else {
      setPracticeQueue(q => [...q].sort(() => Math.random() - 0.5));
      setIsShuffled(true);
    }
    setCurrentIndex(0);
    setFlipped(false);
  }

  function saveCurrentWord() {
    if (!currentSetWord || savedWords.has(currentSetWord.dutch)) return;
    addWord(currentSetWord.dutch, currentSetWord.english, {
      example: currentSetWord.example,
      plural: currentSetWord.plural,
    });
    setSavedWords(prev => new Set(prev).add(currentSetWord.dutch));
  }

  const startMyWords = () => {
    const words = getWordsDueForReview();
    setSessionQueue(words);
    setOriginalSession(words);
    setAgainKeys(new Set());
    setMode('my-words');
    setCurrentIndex(0);
    setFlipped(false);
  };
  const startLearned  = () => { setMode('learned'); };

  const startLearningAll = () => {
    const words = allWords.filter(w => w.status !== 'known' && w.status !== 'ignored');
    setSessionQueue(words);
    setOriginalSession(words);
    setAgainKeys(new Set());
    setMode('my-words');
    setCurrentIndex(0);
    setFlipped(false);
  };

  const goPrevCard = () => {
    if (currentIndex <= 0) return;
    stopDutch(); setIsPlaying(false);
    setCurrentIndex(prev => prev - 1);
    setFlipped(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setSwipeDeltaX(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setSwipeDeltaX(e.touches[0].clientX - touchStartX.current);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current !== null
      ? e.changedTouches[0].clientX - touchStartX.current
      : 0;
    touchStartX.current = null;
    setSwipeDeltaX(0);
    if (Math.abs(dx) < 60) return;
    // Swipe left = "again", swipe right = "good"
    const knewIt = dx > 0;
    if (mode === 'my-words') handleSRSRating(knewIt ? 'good' : 'again');
    else handleAnswer(knewIt);
  };

  const openCustomEditor = (cs: CustomSet) => { setActiveCustomSet(cs); setMode('custom-editor'); };
  const openCreateSet    = () => setMode('create-set');

  function toggleDirection() {
    setDirection(d => d === 'en-to-ru' ? 'ru-to-en' : 'en-to-ru');
  }

  // Preview next interval using FSRS for a given rating
  function previewInterval(word: DutchWord | null, rating: FSRSRating): number {
    if (!word) return 1;
    const card: FSRSCard | null = word.stability != null ? {
      stability:  word.stability,
      difficulty: word.difficulty ?? 5,
      state:      word.fsrsState  ?? 'learning',
      lastReview: word.lastReview ? new Date(word.lastReview) : new Date(),
    } : null;
    return fsrsPreviewInterval(card, rating);
  }

  function formatDays(days: number): string {
    if (days === 1) return 'tomorrow';
    if (days < 7)  return `in ${days} days`;
    if (days < 14) return 'in 1 week';
    if (days < 30) return `in ${Math.round(days / 7)} weeks`;
    return `in ${Math.round(days / 30)} month${Math.round(days / 30) !== 1 ? 's' : ''}`;
  }

  // ===== CREATE SET MODE =====
  if (mode === 'create-set') {
    return (
      <CreateSetModal
        onCancel={() => setMode('browse')}
        onCreate={(title, emoji) => {
          const newSet = createSet(title, emoji);
          setActiveCustomSet(newSet);
          setMode('custom-editor');
        }}
      />
    );
  }

  // ===== CUSTOM SET EDITOR MODE =====
  if (mode === 'custom-editor' && activeCustomSet) {
    // Sync activeCustomSet with latest data from hook
    const latestSet = customSets.find(s => s.id === activeCustomSet.id) ?? activeCustomSet;
    return (
      <CustomSetEditor
        set={latestSet}
        onBack={() => { setActiveCustomSet(null); setMode('browse'); }}
        onAddWord={addWordToSet}
        onRemoveWord={removeWordFromSet}
        onUpdateWord={updateWordInSet}
        onStartPractice={startCustomSetPractice}
        onDelete={(id) => { deleteSet(id); setActiveCustomSet(null); setMode('browse'); }}
      />
    );
  }

  // ===== BROWSE MODE (design: 'sets' / 'setsOpen') =====
  if (mode === 'browse') {
    const today = new Date().toISOString().slice(0, 10);
    const activeWords = allWords.filter(w => w.status !== 'known' && w.status !== 'ignored');
    const newWords    = activeWords.filter(w => !w.stability);
    const newAllowed  = Math.max(0, NEW_CARDS_DAILY_LIMIT - newCardsToday);
    const newDue      = Math.min(newWords.length, newAllowed);
    const reviewDue   = activeWords.filter(w => w.stability && w.dueDate && w.dueDate <= today).length;

    const learnedIn = (words: FlashcardSetWord[]) =>
      words.filter(w => vocabulary[w.dutch.toLowerCase()]?.status === 'known').length;

    const levels = LEVELS
      .map(level => {
        const sets = flashcardSets.filter(s => s.level === level);
        const words = sets.flatMap(s => s.words);
        return { level, sets, total: words.length, learned: learnedIn(words) };
      })
      .filter(l => l.sets.length > 0);
    const unlevelledSets = flashcardSets.filter(s => !s.level);

    const sectionLabel = 'text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground';
    const rowClass = 'flex items-center gap-3 border-t border-border py-[11px] first:border-t-0';
    const iconTile = 'grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-accent text-primary';

    const setRow = (set: FlashcardSet) => {
      const learned = learnedIn(set.words);
      const total = set.words.length;
      const SetIcon = getSetIcon(set);
      return (
        <button key={set.id} type="button" onClick={() => startSet(set)} className={`${rowClass} w-full text-left`}>
          <div className={iconTile} aria-hidden><SetIcon className="h-[19px] w-[19px]" /></div>
          <div className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="truncate text-[15px] font-semibold text-foreground">{set.title}</span>
            <span className="text-xs text-muted-foreground">{total} word{total !== 1 ? 's' : ''}</span>
          </div>
          {total > 0 && learned >= total ? (
            <CircleCheck className="h-5 w-5 shrink-0 fill-success text-card" aria-label="All learned" />
          ) : learned > 0 ? (
            <span className="shrink-0 text-[13px] text-muted-foreground">{learned} / {total}</span>
          ) : (
            <span className="shrink-0 text-[13px] font-semibold text-accent-foreground">Start</span>
          )}
        </button>
      );
    };

    const myRow = (key: string, icon: ReactNode, title: string, sub: string, onOpen: () => void, extra?: ReactNode) => (
      <div key={key} className={rowClass}>
        <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <div className={iconTile}>{icon}</div>
          <div className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="truncate text-[15px] font-semibold text-foreground">{title}</span>
            <span className="text-xs text-muted-foreground">{sub}</span>
          </div>
        </button>
        {extra}
        <ChevronRight className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground" onClick={onOpen} />
      </div>
    );
    const plural = (n: number, word: string) => `${n} ${word}${n !== 1 ? 's' : ''}`;
    // Vocabulary keeps insertion order, so the last saved words come last
    const recentWords = activeWords.slice(-6).reverse();
    const dueSample = getWordsDueForReview()[0]?.dutch ?? recentWords[0]?.dutch ?? 'flatmate';
    const openWordList = (search: string) => {
      setWordListSearch(search); setEditingWord(null); setConfirmDeleteWord(null); setMode('word-list');
    };

    // Laptop (lg): the selected level's sets are shown in a panel next to the level cards.
    const deskLevel = levels.find(l => l.level === selectedLevel) ?? levels[0];

    // Laptop set card (design: FlowDesktop 'cards'): icon tile, title, word count, status.
    const setCard = (set: FlashcardSet) => {
      const learned = learnedIn(set.words);
      const total = set.words.length;
      const SetIcon = getSetIcon(set);
      return (
        <button
          key={set.id}
          type="button"
          onClick={() => startSet(set)}
          className="card-hover flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-accent text-primary" aria-hidden>
            <SetIcon className="h-5 w-5" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="truncate text-[15px] font-semibold text-foreground">{set.title}</span>
            <span className="text-xs text-muted-foreground">{total} word{total !== 1 ? 's' : ''}</span>
          </div>
          {total > 0 && learned >= total ? (
            <CircleCheck className="h-5 w-5 shrink-0 fill-success text-card" aria-label="All learned" />
          ) : learned > 0 ? (
            <span className="shrink-0 text-[13px] text-muted-foreground">{learned} of {total}</span>
          ) : (
            <span className="shrink-0 text-[13px] font-semibold text-accent-foreground">Start</span>
          )}
        </button>
      );
    };

    return (
      <div className="animate-fade-in mx-auto flex max-w-md flex-col gap-[22px] pb-6 lg:grid lg:max-w-none lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start lg:gap-10 lg:pb-28 lg:pt-1">
        <div className="flex flex-col gap-[22px] lg:gap-6">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.015em] text-foreground lg:text-4xl lg:tracking-[-0.02em]">Cards</h1>
          <CardSettings
            direction={direction}
            onDirectionChange={setDirection}
            shuffle={shufflePref}
            onShuffleChange={setShufflePref}
          />
        </div>

        {/* Due today (spaced repetition) */}
        {allWords.length === 0 ? (
          <div className="flex items-center gap-3.5 rounded-[14px] bg-hero px-[18px] py-4 text-hero-foreground">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-80">Your cards</span>
              <span className="font-heading text-[22px] font-semibold leading-tight">No words yet</span>
              <span className="text-[13px] leading-snug opacity-85">Tap a word while reading and press Save, or start a prepared set below.</span>
            </div>
            <CardStack word="flatmate" />
          </div>
        ) : dueCount > 0 ? (
          <div className="flex items-center gap-3.5 rounded-[14px] bg-hero px-[18px] py-3.5 text-hero-foreground lg:p-[22px]">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-80">Due today</span>
              <span className="font-heading text-[30px] font-semibold leading-none">{plural(dueCount, 'card')}</span>
              <span className="text-[13px] opacity-85">
                {reviewMinutes(dueCount)} · {reviewDue} to review, {newDue} new
              </span>
              <button
                type="button"
                onClick={startMyWords}
                className="mt-1 flex h-9 items-center gap-1.5 self-start rounded-[10px] bg-white px-4 text-sm font-semibold text-[hsl(220_62%_28%)] transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                Review <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>
            <CardStack word={dueSample} />
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-[14px] bg-hero px-[18px] py-3.5 text-hero-foreground lg:p-[22px]">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-80">Due today</span>
              <span className="font-heading text-[26px] font-semibold leading-none">All caught up</span>
              <span className="text-[13px] opacity-85">{plural(activeWords.length, 'word')} in review · come back tomorrow</span>
              {activeWords.length > 0 && (
                <button
                  type="button"
                  onClick={startLearningAll}
                  className="mt-1 flex h-9 items-center gap-1.5 self-start rounded-[10px] bg-white px-4 text-sm font-semibold text-[hsl(220_62%_28%)] transition-opacity hover:opacity-90 active:scale-[0.98]"
                >
                  Practise anyway <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              )}
            </div>
            <Pip pose="sleepy" size={96} className="-my-2 -mr-2" decorative />
          </div>
        )}

        {/* Tip, once: nothing due → new words come from stories */}
        {caughtUpTip.show && (
          <CoachMark
            icon={BookOpen}
            title="All caught up. New words come from your stories"
            ru="Всё повторено. Новые слова — из ваших историй."
            arrow="top"
            onDismiss={caughtUpTip.dismiss}
          />
        )}

        {/* My words: recent saved words as chips; then custom sets, learned, archive */}
        <div className="flex flex-col gap-2.5">
          <Card className="flex flex-col gap-3 px-4 py-3.5">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => openWordList('')}
                disabled={activeWords.length === 0}
                className="flex min-w-0 items-center gap-2.5 text-left disabled:cursor-default"
              >
                <Bookmark className="h-[22px] w-[22px] shrink-0 text-highlight" strokeWidth={1.75} />
                <span className="font-heading text-[17px] font-semibold text-foreground">My words</span>
                <span className="text-[13px] text-muted-foreground">{activeWords.length}</span>
                {activeWords.length > 0 && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />}
              </button>
              <button
                type="button"
                onClick={openCreateSet}
                className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-accent-foreground transition-opacity hover:opacity-80"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} /> New set
              </button>
            </div>
            {activeWords.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {recentWords.map(w => (
                  <button
                    key={w.dutch}
                    type="button"
                    onClick={() => openWordList(w.dutch)}
                    className="flex h-8 items-center whitespace-nowrap rounded-full border border-border bg-card px-3 font-heading text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    {w.dutch}
                  </button>
                ))}
                {activeWords.length > recentWords.length && (
                  <button
                    type="button"
                    onClick={() => openWordList('')}
                    className="flex h-8 items-center rounded-full px-2 text-[13px] font-semibold text-accent-foreground hover:opacity-80"
                  >
                    +{activeWords.length - recentWords.length} more
                  </button>
                )}
              </div>
            ) : (
              <span className="text-sm leading-snug text-muted-foreground">
                Words you save while reading land here. Or make your own set.
              </span>
            )}
          </Card>

          {(customSets.length > 0 || learnedWords.length > 0 || ignoredWords.length > 0) && (
            <Card className="flex flex-col px-4 py-1">
              {customSets.map(cs => confirmDeleteId === cs.id ? (
                <div key={cs.id} className={`${rowClass} justify-between`}>
                  <p className="min-w-0 truncate text-sm font-medium text-destructive">Delete “{cs.title}”?</p>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => setConfirmDeleteId(null)} className="px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground">Cancel</button>
                    <button type="button" onClick={() => { deleteSet(cs.id); setConfirmDeleteId(null); }} className="rounded-md bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90">Delete</button>
                  </div>
                </div>
              ) : myRow(
                cs.id,
                <span className="text-[19px] leading-none" aria-hidden>{cs.emoji}</span>,
                cs.title,
                plural(cs.words.length, 'word'),
                () => openCustomEditor(cs),
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(cs.id)}
                  className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Delete ${cs.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>,
              ))}
              {learnedWords.length > 0 && myRow(
                'learned',
                <GraduationCap className="h-[19px] w-[19px]" />,
                'Learned words',
                `${plural(learnedWords.length, 'word')} mastered`,
                startLearned,
              )}
              {ignoredWords.length > 0 && myRow(
                'archive',
                <Archive className="h-[19px] w-[19px]" />,
                'Archive',
                `${plural(ignoredWords.length, 'removed word')} · tap to restore`,
                () => setMode('archive'),
              )}
            </Card>
          )}
        </div>

        {/* Prepared sets, by level. Phone: each level card expands in place.
            Laptop: the level cards select which level's sets show in the panel on the right. */}
        <div className="flex flex-col gap-2.5">
          <span className={sectionLabel}>Prepared sets</span>
          {levels.map(({ level, sets, total, learned }) => {
            const isOpen = openLevels.has(level);
            const isSelected = deskLevel?.level === level;
            const pct = total > 0 ? Math.round((learned / total) * 100) : 0;
            const coreSets = sets.filter(s => !s.folder || s.folder === 'Core');
            const folders = FOLDERS
              .map(folder => ({ folder, sets: sets.filter(s => s.folder === folder) }))
              .filter(f => f.sets.length > 0);
            const tone = LEVEL_TONES[level] ?? LEVEL_TONES.A1;
            const levelHeader = (
              <>
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-[11px] ${tone.bg}`}>
                  <span className={`font-heading text-[19px] font-semibold leading-none ${tone.ink}`}>{level}</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[15px] font-semibold text-foreground">{LEVEL_NAMES[level] ?? level}</span>
                    <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">{learned} / {total}</span>
                  </div>
                  <div className="h-[5px] overflow-hidden rounded-full bg-track">
                    <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${Math.max(pct, learned > 0 ? 2 : 0)}%` }} />
                  </div>
                </div>
              </>
            );
            return (
              <div key={level}>
                {/* Laptop: selectable level card */}
                <button
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  aria-pressed={isSelected}
                  className={`card-hover hidden w-full items-center gap-3.5 rounded-xl border bg-card px-[18px] py-4 text-left lg:flex ${
                    isSelected ? 'border-primary hover:border-primary' : 'border-border'
                  }`}
                >
                  {levelHeader}
                  <ChevronRight className={`h-4 w-4 shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={2.5} />
                </button>

                {/* Phone: expandable level card */}
                <Card className="flex flex-col gap-2.5 px-3.5 py-2.5 lg:hidden">
                <button
                  type="button"
                  onClick={() => toggleIn(setOpenLevels, level)}
                  className="flex w-full items-center gap-3 text-left"
                  aria-expanded={isOpen}
                >
                  {levelHeader}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                </button>

                {isOpen && (
                  <div className="mt-0.5 flex flex-col border-t border-border">
                    {coreSets.map(setRow)}
                    {folders.map(({ folder, sets: folderSets }) => {
                      const key = `${level}-${folder}`;
                      const folderOpen = openFolders.has(key);
                      const words = folderSets.reduce((t, s) => t + s.words.length, 0);
                      return (
                        <div key={key} className="flex flex-col border-t border-border first:border-t-0">
                          <button
                            type="button"
                            onClick={() => toggleIn(setOpenFolders, key)}
                            className="flex w-full items-center gap-3 py-[11px] text-left"
                            aria-expanded={folderOpen}
                          >
                            <div className={iconTile}>
                              {folderOpen ? <FolderOpen className="h-[19px] w-[19px]" /> : <Folder className="h-[19px] w-[19px]" />}
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-px">
                              <span className="truncate text-[15px] font-semibold text-foreground">{folder}</span>
                              <span className="text-xs text-muted-foreground">{plural(folderSets.length, 'set')} · {words} words</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${folderOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                          </button>
                          {folderOpen && (
                            <div className="flex flex-col border-t border-border pl-4">
                              {folderSets.map(setRow)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                </Card>
              </div>
            );
          })}

          {/* Sets without a level (none at the moment; kept so they still show) */}
          {unlevelledSets.length > 0 && (
            <Card className="flex flex-col px-4 py-1 lg:hidden">
              {unlevelledSets.map(setRow)}
            </Card>
          )}
        </div>
        </div>

        {/* Laptop: the selected level's sets */}
        {deskLevel && (() => {
          const { level, sets, total, learned } = deskLevel;
          const coreSets = sets.filter(s => !s.folder || s.folder === 'Core');
          const folders = FOLDERS
            .map(folder => ({ folder, sets: sets.filter(s => s.folder === folder) }))
            .filter(f => f.sets.length > 0);
          return (
            <section className="hidden flex-col gap-[18px] pt-2 lg:flex" aria-label={`${level} sets`}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-[26px] font-semibold text-foreground">
                  {level}{LEVEL_NAMES[level] ? ` · ${LEVEL_NAMES[level]}` : ''}
                </h2>
                <span className="shrink-0 text-sm text-muted-foreground">{learned} of {total} words learned</span>
              </div>
              {coreSets.length > 0 && (
                <div className="grid grid-cols-2 gap-3">{coreSets.map(setCard)}</div>
              )}
              {folders.map(({ folder, sets: folderSets }) => {
                const key = `${level}-${folder}`;
                const folderOpen = openFolders.has(key);
                const words = folderSets.reduce((t, s) => t + s.words.length, 0);
                return (
                  <div key={key} className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => toggleIn(setOpenFolders, key)}
                      className="card-hover flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left"
                      aria-expanded={folderOpen}
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-accent text-primary">
                        {folderOpen ? <FolderOpen className="h-5 w-5" /> : <Folder className="h-5 w-5" />}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-px">
                        <span className="truncate text-[15px] font-semibold text-foreground">{folder}</span>
                        <span className="text-xs text-muted-foreground">{plural(folderSets.length, 'set')} · {words} words</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${folderOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                    </button>
                    {folderOpen && (
                      <div className="grid grid-cols-2 gap-3">{folderSets.map(setCard)}</div>
                    )}
                  </div>
                );
              })}
              {unlevelledSets.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className={sectionLabel}>Other sets</span>
                  <div className="grid grid-cols-2 gap-3">{unlevelledSets.map(setCard)}</div>
                </div>
              )}
            </section>
          );
        })()}
      </div>
    );
  }

  // ===== WORD LIST MODE =====
  if (mode === 'word-list') {
    const learningWords = allWords
      .filter(w => w.status !== 'known' && w.status !== 'ignored')
      .sort((a, b) => (a.stability ?? -1) - (b.stability ?? -1)); // weakest / newest first

    const filtered = wordListSearch.trim()
      ? learningWords.filter(w =>
          w.dutch.includes(wordListSearch.toLowerCase()) ||
          w.english.toLowerCase().includes(wordListSearch.toLowerCase())
        )
      : learningWords;

    return (
      <div className="animate-fade-in mx-auto w-full max-w-2xl space-y-4 pb-6 lg:pb-28">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="text-xs text-muted-foreground">{learningWords.length} word{learningWords.length !== 1 ? 's' : ''}</span>
        </div>

        <h2 className="font-heading text-xl font-bold text-foreground">My Words</h2>

        {/* Practice button */}
        {learningWords.length > 0 && (
          <Button variant="outline" className="w-full gap-2" onClick={startLearningAll}>
            Free practice — all words ({learningWords.length})
          </Button>
        )}

        {/* Search */}
        {learningWords.length > 4 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
            <input
              type="text"
              value={wordListSearch}
              onChange={e => setWordListSearch(e.target.value)}
              placeholder="Search words…"
              autoComplete="off"
              className="w-full rounded-xl border border-border bg-card pl-8 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        )}

        {/* Word list */}
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No words found.</p>
        ) : (
          <div className="space-y-1.5">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-3 pb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Russian</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">English</span>
              <span className="w-14" />
            </div>

            {filtered.map(word => (
              <Card key={word.dutch} className="px-3 py-2.5">
                {editingWord === word.dutch ? (
                  // ── Edit row ──
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={editEnglish}
                        onChange={e => setEditEnglish(e.target.value)}
                        placeholder="Russian"
                        autoComplete="off"
                        className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <input
                        value={editDutch}
                        onChange={e => setEditDutch(e.target.value)}
                        placeholder="English"
                        autoComplete="off"
                        className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 h-7 text-xs"
                        disabled={!editDutch.trim() || !editEnglish.trim()}
                        onClick={() => {
                          if (editDutch.trim() && editEnglish.trim()) {
                            updateWord(word.dutch, editDutch.trim(), editEnglish.trim());
                            setEditingWord(null);
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingWord(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : confirmDeleteWord === word.dutch ? (
                  // ── Delete confirm row ──
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-muted-foreground font-medium truncate">Archive "{word.dutch}"?</p>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setConfirmDeleteWord(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1">Cancel</button>
                      <button
                        onClick={() => { removeWord(word.dutch); setConfirmDeleteWord(null); }}
                        className="text-xs font-semibold text-foreground bg-muted hover:bg-muted/80 border border-border transition-colors px-3 py-1 rounded-md"
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                ) : (
                  // ── Normal row ──
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                    <span className="text-sm text-muted-foreground truncate">{word.english}</span>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-foreground truncate block">{word.dutch}</span>
                      {word.stability != null && (
                        <span className="text-[10px] text-muted-foreground/60">
                          {word.fsrsState === 'relearning' ? 'relearning' : `stability ${Math.round(word.stability)}d`}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => { setEditingWord(word.dutch); setEditDutch(word.dutch); setEditEnglish(word.english); setConfirmDeleteWord(null); }}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => { setConfirmDeleteWord(word.dutch); setEditingWord(null); }}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ===== ARCHIVE MODE =====
  if (mode === 'archive') {
    return (
      <div className="animate-fade-in mx-auto w-full max-w-2xl space-y-4 pb-6 lg:pb-28">
        <div className="flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="text-xs text-muted-foreground">{ignoredWords.length} word{ignoredWords.length !== 1 ? 's' : ''}</span>
        </div>

        <h2 className="font-heading text-xl font-bold text-foreground">Archive</h2>
        <p className="text-sm text-muted-foreground">These words are removed from your review queue. Restore any word to add it back to learning.</p>

        {ignoredWords.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground">No archived words.</p>
          </Card>
        ) : (
          <div className="space-y-1.5">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-3 pb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Russian</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">English</span>
              <span className="w-16" />
            </div>
            {ignoredWords.map(word => (
              <Card key={word.dutch} className="px-3 py-2.5">
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <span className="text-sm text-muted-foreground truncate">{word.english}</span>
                  <span className="text-sm font-medium text-foreground truncate">{word.dutch}</span>
                  <button
                    onClick={() => updateWordStatus(word.dutch, 'new')}
                    className="shrink-0 text-xs font-semibold text-primary border border-primary/30 rounded-lg px-2.5 py-1 hover:bg-primary/10 transition-colors"
                  >
                    Restore
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ===== LEARNED WORDS MODE =====
  if (mode === 'learned') {
    return (
      <div className="animate-fade-in mx-auto w-full max-w-2xl space-y-4 pb-6 lg:pb-28">
        <div className="flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Learned Words</span>
          </div>
        </div>

        <Card className="p-4 bg-accent border-transparent">
          <p className="text-sm text-accent-foreground">
            {learnedWords.length === 0
              ? 'No learned words yet — keep reviewing your flashcards!'
              : `${learnedWords.length} word${learnedWords.length !== 1 ? 's' : ''} mastered. These have been removed from your daily review.`}
          </p>
        </Card>

        {learnedWords.length > 0 && (
          <div className="space-y-2">
            {learnedWords.map(word => (
              <Card key={word.dutch} className="p-3 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">{word.dutch}</span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-sm text-muted-foreground">{word.english}</span>
                  </div>
                  {word.example && (
                    <p className="text-xs text-muted-foreground italic mt-0.5 truncate">"{word.example}"</p>
                  )}
                </div>
                <button
                  onClick={() => updateWordStatus(word.dutch, 'learning')}
                  className="shrink-0 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Re-learn
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ===== MY WORDS: empty / done states =====
  if (mode === 'my-words') {
    // No saved words at all
    if (allWords.filter(w => w.status !== 'known' && w.status !== 'ignored').length === 0) {
      return (
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center py-20 text-center animate-fade-in">
          <Button variant="ghost" className="self-start mb-4" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <Pip pose="think" size={128} className="mb-3" decorative />
          <h3 className="font-heading text-xl font-semibold text-foreground">No words yet</h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Practice any flashcard set below — every card you rate will be automatically added to your spaced repetition queue.
          </p>
          <Button onClick={goBack} variant="outline" className="mt-4">Browse sets</Button>
        </div>
      );
    }

    // Session finished (or nothing was due when session started)
    if (!currentWord || currentIndex >= sessionQueue.length) {
      const nothingWasDue = sessionQueue.length === 0;
      const nextDue = scheduledWords.length > 0
        ? scheduledWords.reduce((earliest, w) => {
            const d = new Date(w.nextReview!);
            return d < earliest ? d : earliest;
          }, new Date(scheduledWords[0].nextReview!))
        : null;
      const hoursUntil = nextDue
        ? Math.ceil((nextDue.getTime() - Date.now()) / 3_600_000)
        : null;

      const reviewAgain = () => {
        setSessionQueue([...originalSession]);
        setAgainKeys(new Set());
        setCurrentIndex(0);
        setFlipped(false);
      };
      const continueWithAgain = () => {
        const words = Array.from(againKeys)
          .map(k => vocabulary[k])
          .filter(Boolean) as DutchWord[];
        setSessionQueue(words);
        setAgainKeys(new Set());
        setCurrentIndex(0);
        setFlipped(false);
      };

      return (
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center py-20 text-center animate-fade-in">
          <Button variant="ghost" className="self-start mb-4" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <Pip pose={nothingWasDue ? 'sleepy' : 'happy'} size={128} className="mb-3" decorative />
          <h3 className="font-heading text-xl font-semibold text-foreground">
            {nothingWasDue ? 'Nothing due today' : 'All caught up!'}
          </h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            {nothingWasDue
              ? hoursUntil != null && hoursUntil <= 24
                ? `Your next review is in ~${hoursUntil}h.`
                : `${scheduledWords.length} word${scheduledWords.length !== 1 ? 's' : ''} scheduled — come back tomorrow.`
              : againKeys.size > 0
                ? `${againKeys.size} word${againKeys.size !== 1 ? 's' : ''} marked "Again". Keep going or come back later.`
                : 'Perfect session! All words scheduled for later.'
            }
          </p>
          <div className="flex flex-col items-center gap-2 mt-5">
            {againKeys.size > 0 && (
              <Button onClick={continueWithAgain} className="gap-2 w-52">
                <RefreshCw className="h-4 w-4" />
                Continue learning ({againKeys.size})
              </Button>
            )}
            {!nothingWasDue && originalSession.length > 0 && (
              <Button onClick={reviewAgain} variant="outline" className="gap-2 w-52">
                <RotateCcw className="h-4 w-4" /> Review again
              </Button>
            )}
            <Button onClick={goBack} variant="ghost" className="text-muted-foreground">
              Back to Cards
            </Button>
          </div>
        </div>
      );
    }
  }

  // ===== SET PRACTICE: done state =====
  if (mode === 'set-practice' && (!currentSetWord || currentIndex >= totalCards)) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center py-20 text-center animate-fade-in">
        <Button variant="ghost" className="self-start mb-4" onClick={goBack}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Pip pose="happy" size={128} className="mb-3" decorative />
        <h3 className="font-heading text-xl font-semibold text-foreground">Set complete!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          You've finished "{activeSet?.title}".
          {savedWords.size > 0 && ` ${savedWords.size} word${savedWords.size !== 1 ? 's' : ''} saved to My Words.`}
        </p>
        <div className="flex gap-3 mt-4">
          <Button onClick={resetDeck} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Again
          </Button>
          <Button onClick={goBack}>{activeCustomSet ? 'Back to Set' : 'More Sets'}</Button>
        </div>
      </div>
    );
  }

  // ===== CARD PRACTICE (shared for both modes) =====
  // Saved words lack the set-only fields (plural, past forms, notes); type both as one shape
  const displayWord: (DutchWord | FlashcardSetWord) & Partial<FlashcardSetWord> = mode === 'my-words' ? currentWord : currentSetWord;
  if (!displayWord) return null;

  const exampleSentence = displayWord.example;
  const englishWord = displayWord.dutch;
  const cardTag = displayWord.verbType === 'sep' || /\s/.test(englishWord.trim()) ? 'Phrase' : 'Word';
  const sourceLabel = mode === 'set-practice' && activeSet ? activeSet.title : 'My words';
  const progressPct = totalCards > 0 ? Math.min(100, ((currentIndex + 1) / totalCards) * 100) : 0;

  return (
    <div className="animate-fade-in mx-auto max-w-md space-y-5 lg:max-w-[520px] lg:pb-28">
      {/* Header: close · count · direction (design: 'cards') */}
      <div className="-mx-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={goBack}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          aria-label="Close practice"
        >
          <X className="h-6 w-6" />
        </button>
        <span className="truncate text-[13px] text-muted-foreground">
          {Math.min(currentIndex + 1, totalCards)} of {totalCards}
        </span>
        <button
          type="button"
          onClick={toggleDirection}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          aria-label="Switch card direction"
        >
          <ArrowLeftRight className="h-3.5 w-3.5 text-primary" />
          {direction === 'en-to-ru' ? 'EN → RU' : 'RU → EN'}
        </button>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-track">
        <div className="h-full rounded-full bg-highlight transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
      </div>

      <div
        className="relative pt-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Stacked cards behind */}
        <div className="pointer-events-none absolute inset-x-6 top-0 h-[22rem] lg:h-[24rem] rounded-xl border border-border bg-card opacity-50" />
        <div className="pointer-events-none absolute inset-x-3 top-2 h-[22rem] lg:h-[24rem] rounded-xl border border-border bg-card opacity-80" />

        <div className="relative">
          {/* Soft swipe cues — left = Again, right = Good */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-xl"
            style={{ background: 'linear-gradient(to right, hsl(var(--highlight) / 0.06) 0%, transparent 35%, transparent 65%, hsl(var(--primary) / 0.06) 100%)' }}
          />
          {/* Active swipe overlays */}
          {swipeDeltaX < -40 && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-start rounded-xl bg-highlight/15 pl-5">
              <span className="text-sm font-bold text-highlight-ink">← Again</span>
            </div>
          )}
          {swipeDeltaX > 40 && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end rounded-xl bg-primary/15 pr-5">
              <span className="text-sm font-bold text-primary">Got it →</span>
            </div>
          )}
          {/* Tag + listen sit above both faces so they never flip or duplicate */}
          <span className="pointer-events-none absolute left-[22px] top-[22px] z-30 rounded-full bg-highlight-soft px-2.5 py-0.5 text-xs font-semibold text-highlight-ink">
            {cardTag}
          </span>
          <button
            onClick={e => { e.stopPropagation(); handleListen(displayWord.dutch); }}
            className={`absolute right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full transition-all active:scale-90 ${
              isPlaying ? 'bg-accent text-primary' : 'text-primary hover:bg-accent'
            }`}
            aria-label="Listen"
          >
            <Volume2 className="h-[22px] w-[22px]" />
          </button>
          <div
            className="flashcard h-[22rem] lg:h-[24rem] cursor-pointer"
            style={{ transform: swipeDeltaX !== 0 ? `translateX(${swipeDeltaX * 0.2}px) rotate(${swipeDeltaX * 0.015}deg)` : undefined, transition: swipeDeltaX === 0 ? 'transform 0.2s ease' : 'none' }}
            onClick={() => { setFlipped(!flipped); }}
          >
            <div className={`flashcard-inner ${flipped ? 'flipped' : ''} ${noFlipAnim ? '!transition-none' : ''}`}>
              {/* Front and back each show one language only: English word + English example,
                  or Russian word + Russian example. */}
              {([false, true] as const).map(isBack => {
                const showEnglish = (direction === 'en-to-ru') !== isBack;
                const word = showEnglish ? displayWord.dutch : displayWord.english;
                const example = showEnglish ? exampleSentence : displayWord.exampleTranslation;
                return (
                  <Card
                    key={isBack ? 'back' : 'front'}
                    className={`flashcard-face ${isBack ? 'flashcard-back' : ''} flex-col rounded-xl border bg-card p-[22px] shadow-[0_12px_30px_-16px_hsl(var(--foreground)/0.3)]`}
                  >
                    <div className="flex flex-1 flex-col items-center justify-center gap-1.5 overflow-y-auto text-center">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        {showEnglish ? 'English' : 'Russian'}
                      </p>
                      <p className="font-heading text-[32px] font-semibold leading-tight tracking-[-0.015em] text-foreground">{word}</p>
                      {example && (
                        <p className="mt-3 text-[15px] leading-normal text-muted-foreground">
                          {showEnglish ? highlightWord(example, displayWord.dutch) : example}
                        </p>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {isBack ? `From ${sourceLabel}` : 'Tap to reveal'}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action row: ← Prev  ·  Shuffle  ·  → Next */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={goPrevCard}
          disabled={currentIndex === 0}
          className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-25"
          aria-label="Previous card"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        {mode === 'set-practice' && (
          <button
            onClick={toggleShuffle}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-all ${
              isShuffled ? 'border-primary/40 bg-accent text-primary' : 'border-border bg-card text-muted-foreground hover:text-primary'
            }`}
            aria-label="Shuffle"
            aria-pressed={isShuffled}
          >
            <Shuffle className="h-4 w-4" />
          </button>
        )}
        {mode === 'set-practice' && (
          <button
            onClick={() => advanceCard(currentIndex < totalCards - 1 ? currentIndex + 1 : totalCards)}
            disabled={currentIndex >= totalCards - 1}
            className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-25"
            aria-label="Next card"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {flipped && (displayWord.plural || displayWord.nounTip) && (
        <Card className="animate-fade-in space-y-1.5 rounded-xl p-4 text-sm">
          {displayWord.plural && (
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted-foreground w-14 shrink-0">plural</span>
              <span className="font-medium">{displayWord.plural}</span>
            </div>
          )}
          {displayWord.nounTip && (
            <p className="text-xs text-muted-foreground pt-1 border-t border-border">{displayWord.nounTip}</p>
          )}
        </Card>
      )}

      {/* Verb details: English verbs carry type, note and past forms (no conjugation table) */}
      {flipped && (displayWord.verbType || displayWord.pastTense || displayWord.verbNote) && (
        <Card className="animate-fade-in rounded-xl p-4">
          {displayWord.verbType && (
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                displayWord.verbType === 'irr' ? 'bg-highlight-soft text-highlight-ink' :
                displayWord.verbType === 'mod' ? 'bg-secondary text-secondary-foreground' :
                'bg-accent text-accent-foreground'
              }`}>
                {displayWord.verbType === 'reg' ? 'regular' : displayWord.verbType === 'irr' ? 'irregular' : displayWord.verbType === 'sep' ? 'phrasal' : 'modal'}
              </span>
              {displayWord.verbNote && (
                <span className="text-[11px] text-muted-foreground leading-tight">{displayWord.verbNote}</span>
              )}
            </div>
          )}
          {(displayWord.pastTense || displayWord.pastParticiple) && (
            <div className="pt-2 mt-1 border-t border-border/60 space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Past tense</p>
              {displayWord.pastTense && (
                <div className="flex gap-2 text-xs">
                  <span className="text-muted-foreground w-16 shrink-0">past simple</span>
                  <span className="font-medium text-foreground">{displayWord.pastTense}</span>
                </div>
              )}
              {displayWord.pastParticiple && (
                <div className="flex gap-2 text-xs">
                  <span className="text-muted-foreground w-16 shrink-0">past participle</span>
                  <span className="font-medium text-foreground">{displayWord.pastParticiple}</span>
                </div>
              )}
            </div>
          )}
        </Card>
      )}


      {flipped && (mode === 'my-words' || mode === 'set-practice') && (() => {
        const showIntervals = mode === 'my-words' && !!currentWord;
        const ratings: { key: SRSRating; label: string; fsrs: FSRSRating; className: string }[] = [
          { key: 'again', label: 'Again', fsrs: 1, className: 'bg-highlight text-highlight-foreground hover:bg-highlight/90' },
          { key: 'hard',  label: 'Hard',  fsrs: 2, className: 'border-[1.5px] border-highlight bg-card text-highlight-ink hover:bg-highlight-soft' },
          { key: 'good',  label: 'Good',  fsrs: 3, className: 'border-[1.5px] border-primary bg-card text-accent-foreground hover:bg-accent' },
          { key: 'easy',  label: 'Easy',  fsrs: 4, className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
        ];
        return (
          <div className="animate-fade-in space-y-2">
            {mode === 'set-practice' && (
              <p className="text-center text-xs text-muted-foreground">
                Rate a card to add it to your spaced repetition queue
              </p>
            )}
            <div className="grid grid-cols-4 gap-2">
              {ratings.map(r => (
                <div key={r.key} className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSRSRating(r.key)}
                    className={`flex h-[52px] w-full items-center justify-center rounded-xl text-[15px] font-semibold transition-all active:scale-95 ${r.className}`}
                  >
                    {r.label}
                  </button>
                  {showIntervals && (
                    <span className="text-xs text-muted-foreground">{formatDays(previewInterval(currentWord, r.fsrs))}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
