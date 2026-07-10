import { useState, useMemo, useRef, type ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, RotateCcw, ArrowLeft, ArrowRight, ChevronRight, ArrowLeftRight, GraduationCap, Plus, ChevronDown, Shuffle, BookmarkPlus, RefreshCw, Volume2, Trash2, Pencil, Search } from 'lucide-react';
import { playDutch, stopDutch } from '@/utils/playDutch';
import { useLearning } from '@/context/LearningContext';
import { flashcardSets } from '@/data/flashcardSets';
import { FlashcardSet, FlashcardSetCategory, FlashcardSetWord, DutchWord } from '@/types/dutch';
import { useCustomSets } from '@/hooks/useCustomSets';
import type { CustomSet } from '@/hooks/useCustomSets';
import { CustomSetEditor, CreateSetModal } from '@/components/CustomSetEditor';
import { fsrsPreviewInterval, FSRSCard, FSRSRating } from '@/utils/fsrs';
import { NEW_CARDS_DAILY_LIMIT } from '@/context/LearningContext';

type SRSRating = 'again' | 'hard' | 'good' | 'easy';

type FlashcardMode = 'browse' | 'my-words' | 'set-practice' | 'learned' | 'word-list' | 'archive' | 'custom-editor' | 'create-set';
type Direction = 'dutch-to-english' | 'english-to-dutch';

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

const categoryLabels: Record<FlashcardSetCategory, { label: string; emoji: string }> = {
  verbs:      { label: 'Verbs',      emoji: '' },
  adjectives: { label: 'Adjectives', emoji: '' },
  nouns:      { label: 'Nouns',      emoji: '' },
  numbers:    { label: 'Numbers',    emoji: '' },
  location:   { label: 'Location',   emoji: '' },
};

export function FlashcardView() {
  const { getWordsForReview, getWordsDueForReview, reviewWordSRS, enrollWord, vocabulary, dailyGoal, addWord, removeWord, updateWord, updateWordStatus, dueCount, newCardsToday } = useLearning();
  const { sets: customSets, createSet, deleteSet, addWordToSet, removeWordFromSet, updateWordInSet } = useCustomSets();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [flipped, setFlipped]           = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [direction, setDirection]       = useState<Direction>('english-to-dutch');
  const [mode, setMode]                 = useState<FlashcardMode>('browse');
  const [activeSet, setActiveSet]       = useState<FlashcardSet | null>(null);
  const [activeCustomSet, setActiveCustomSet] = useState<CustomSet | null>(null);
  const [a1Open, setA1Open]             = useState(false);
  const [a1VerbsOpen, setA1VerbsOpen]   = useState(false);
  const [a1NounsOpen, setA1NounsOpen]   = useState(false);
  const [a1AdjOpen, setA1AdjOpen]       = useState(false);
  const [a2Open, setA2Open]             = useState(false);
  const [a2VerbsOpen, setA2VerbsOpen]   = useState(false);
  const [a2NounsOpen, setA2NounsOpen]   = useState(false);
  const [a2AdjsOpen, setA2AdjsOpen]     = useState(false);
  const [b1Open, setB1Open]             = useState(false);
  const [b1VerbsOpen, setB1VerbsOpen]   = useState(false);
  const [b1NounsOpen, setB1NounsOpen]   = useState(false);
  const [b1AdjsOpen, setB1AdjsOpen]     = useState(false);
  const [practiceQueue, setPracticeQueue] = useState<FlashcardSetWord[]>([]);
  const [isShuffled, setIsShuffled]     = useState(false);
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
      enrollWord(currentSetWord.dutch, currentSetWord.english);
      reviewWordSRS(currentSetWord.dutch, rating);
    }
    advanceCard(currentIndex < totalCards - 1 ? currentIndex + 1 : totalCards);
  };

  const handleSRSRating = (rating: SRSRating) => {
    if (mode === 'my-words' && currentWord) {
      reviewWordSRS(currentWord.dutch, rating);
      if (rating === 'again') setAgainKeys(prev => new Set(prev).add(currentWord.dutch.toLowerCase()));
    }
    if (mode === 'set-practice' && currentSetWord) {
      enrollWord(currentSetWord.dutch, currentSetWord.english);
      reviewWordSRS(currentSetWord.dutch, rating);
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
    setPracticeQueue([...set.words]);
    setIsShuffled(false);
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
    if (dx < 0) {
      mode === 'my-words' ? handleSRSRating('again') : handleAnswer(false);
    } else {
      mode === 'my-words' ? handleSRSRating('good') : handleAnswer(true);
    }
  };

  const openCustomEditor = (cs: CustomSet) => { setActiveCustomSet(cs); setMode('custom-editor'); };
  const openCreateSet    = () => setMode('create-set');

  function toggleDirection() {
    setDirection(d => d === 'dutch-to-english' ? 'english-to-dutch' : 'dutch-to-english');
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

  // ===== BROWSE MODE =====
  if (mode === 'browse') {
    const a1Sets = flashcardSets.filter(s => s.level === 'A1');
    const a1CoreSets = a1Sets.filter(s => s.folder === 'Core');
    const a1VerbSets = a1Sets.filter(s => s.folder === 'Verbs');
    const a1NounSets = a1Sets.filter(s => s.folder === 'Nouns');
    const a1AdjSets  = a1Sets.filter(s => s.folder === 'Adjectives');
    const a2Sets = flashcardSets.filter(s => s.level === 'A2');
    const a2VerbSets  = a2Sets.filter(s => s.folder === 'Verbs');
    const a2NounSets  = a2Sets.filter(s => s.folder === 'Nouns');
    const a2AdjSets   = a2Sets.filter(s => s.folder === 'Adjectives');
    const b1Sets = flashcardSets.filter(s => s.level === 'B1');
    const b1VerbSets  = b1Sets.filter(s => s.folder === 'Verbs');
    const b1NounSets  = b1Sets.filter(s => s.folder === 'Nouns');
    const b1AdjSets   = b1Sets.filter(s => s.folder === 'Adjectives');
    const groupedSets = Object.entries(categoryLabels).map(([cat, info]) => ({
      category: cat as FlashcardSetCategory,
      ...info,
      sets: flashcardSets.filter(s => s.category === cat && !s.level),
    }));

    return (
      <div className="animate-fade-in space-y-5">

        {/* Spaced Repetition Review */}
        {allWords.length > 0 && (() => {
          const today = new Date().toISOString().slice(0, 10);
          const newWords   = allWords.filter(w => !w.stability && w.status !== 'known' && w.status !== 'ignored');
          const newAllowed = Math.max(0, NEW_CARDS_DAILY_LIMIT - newCardsToday);
          const reviewDue  = allWords.filter(w => w.stability && w.dueDate && w.dueDate <= today && w.status !== 'known' && w.status !== 'ignored');
          return (
            <Card
              className={`card-hover cursor-pointer p-4 ${dueCount > 0 ? 'border-primary/30 bg-primary/5' : ''}`}
              onClick={startMyWords}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-heading font-semibold text-foreground">Daily Review</p>
                {dueCount > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                    {dueCount}
                  </span>
                )}
                {dueCount === 0 && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
              </div>
              <div className="flex gap-4 text-xs">
                <div className="text-center">
                  <p className="font-bold text-base text-foreground">{reviewDue.length}</p>
                  <p className="text-muted-foreground">due</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="font-bold text-base text-foreground">{Math.min(newWords.length, newAllowed)}</p>
                  <p className="text-muted-foreground">new</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="font-bold text-base text-foreground">{allWords.length}</p>
                  <p className="text-muted-foreground">total</p>
                </div>
              </div>
              {dueCount === 0 && (
                <p className="mt-2 text-xs text-muted-foreground">All caught up — come back tomorrow.</p>
              )}
            </Card>
          );
        })()}

        {/* Learning card */}
        {allWords.filter(w => w.status !== 'known' && w.status !== 'ignored').length > 0 && (
          <Card
            className="card-hover cursor-pointer p-4 flex items-center justify-between border-amber-200/60 bg-amber-50/40"
            onClick={() => { setWordListSearch(''); setEditingWord(null); setConfirmDeleteWord(null); setMode('word-list'); }}
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-heading font-semibold text-foreground">My Words</p>
                <p className="text-xs text-muted-foreground">
                  {allWords.filter(w => w.status !== 'known' && w.status !== 'ignored').length} saved word{allWords.filter(w => w.status !== 'known' && w.status !== 'ignored').length !== 1 ? 's' : ''} — tap to view &amp; edit
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Card>
        )}

        {/* My Custom Sets */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              My Sets
            </h3>
            <button
              onClick={openCreateSet}
              className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Plus className="h-3 w-3" /> New set
            </button>
          </div>
          {customSets.length === 0 ? (
            <p className="text-xs text-muted-foreground px-1 leading-relaxed">
              Group words your own way — save tricky vocab, themed lists, or lesson notes into a custom set.
            </p>
          ) : (
            <div className="space-y-2">
              {customSets.map(cs => (
                <Card key={cs.id} className="p-3.5">
                  {confirmDeleteId === cs.id ? (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-destructive font-medium">Delete "{cs.title}"?</p>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => setConfirmDeleteId(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1">Cancel</button>
                        <button onClick={() => { deleteSet(cs.id); setConfirmDeleteId(null); }} className="text-xs font-semibold text-white bg-destructive hover:bg-destructive/90 transition-colors px-3 py-1 rounded-md">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => openCustomEditor(cs)}>
                        <span className="text-lg">{cs.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{cs.title}</p>
                          <p className="text-xs text-muted-foreground">{cs.words.length} word{cs.words.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(cs.id); }} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <ChevronRight className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => openCustomEditor(cs)} />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Learned Words */}
        {learnedWords.length > 0 && (
          <Card
            className="card-hover cursor-pointer p-4 flex items-center justify-between border-green-200 bg-green-50"
            onClick={startLearned}
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-heading font-semibold text-foreground">Learned Words</p>
                <p className="text-xs text-muted-foreground">{learnedWords.length} word{learnedWords.length !== 1 ? 's' : ''} mastered</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Card>
        )}

        {/* Archive */}
        {ignoredWords.length > 0 && (
          <Card
            className="card-hover cursor-pointer p-4 flex items-center justify-between border-border bg-muted/30"
            onClick={() => setMode('archive')}
          >
            <div>
              <p className="font-heading font-semibold text-foreground">Archive</p>
              <p className="text-xs text-muted-foreground">{ignoredWords.length} removed word{ignoredWords.length !== 1 ? 's' : ''} — tap to restore</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Card>
        )}

        {/* ── Prepared Sets ── */}
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium pt-1">Prepared sets</p>

        {/* A1 Level folder */}
        {a1Sets.length > 0 && (
          <div>
            <button
              onClick={() => setA1Open(v => !v)}
              className="w-full flex items-center justify-between mb-2"
            >
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                A1 Level
                <span className="text-xs font-normal text-muted-foreground">
                  {a1VerbSets.reduce((t, s) => t + s.words.length, 0)} verbs · {a1NounSets.reduce((t, s) => t + s.words.length, 0)} nouns · {a1AdjSets.reduce((t, s) => t + s.words.length, 0)} adjectives
                </span>
              </h3>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${a1Open ? 'rotate-180' : ''}`} />
            </button>
            {a1Open && (
              <div className="ml-3 border-l-2 border-border pl-3 space-y-3">
                {/* Core sets — shown individually, no subfolder */}
                {a1CoreSets.map(set => (
                  <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between border-primary/20 bg-primary/5" onClick={() => startSet(set)}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{set.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{set.title}</p>
                        <p className="text-xs text-muted-foreground">{set.words.length} words · Start here</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Card>
                ))}
                {/* Verbs subfolder */}
                {a1VerbSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setA1VerbsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Verbs <span className="font-normal normal-case">({a1VerbSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${a1VerbsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {a1VerbsOpen && (
                      <div className="space-y-2 mt-2">
                        {a1VerbSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} verbs</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Nouns subfolder */}
                {a1NounSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setA1NounsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Nouns <span className="font-normal normal-case">({a1NounSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${a1NounsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {a1NounsOpen && (
                      <div className="space-y-2 mt-2">
                        {a1NounSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} nouns</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Adjectives subfolder */}
                {a1AdjSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setA1AdjOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Adjectives <span className="font-normal normal-case">({a1AdjSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${a1AdjOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {a1AdjOpen && (
                      <div className="space-y-2 mt-2">
                        {a1AdjSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} adjectives</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* A2 Level folder */}
        {a2Sets.length > 0 && (
          <div>
            <button
              onClick={() => setA2Open(v => !v)}
              className="w-full flex items-center justify-between mb-2"
            >
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                A2 Level
                <span className="text-xs font-normal text-muted-foreground">
                  {a2VerbSets.reduce((t, s) => t + s.words.length, 0)} verbs · {a2NounSets.reduce((t, s) => t + s.words.length, 0)} nouns · {a2AdjSets.reduce((t, s) => t + s.words.length, 0)} adjectives
                </span>
              </h3>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${a2Open ? 'rotate-180' : ''}`} />
            </button>
            {a2Open && (
              <div className="ml-3 border-l-2 border-border pl-3 space-y-3">
                {/* Verbs subfolder */}
                {a2VerbSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setA2VerbsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Verbs <span className="font-normal normal-case">({a2VerbSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${a2VerbsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {a2VerbsOpen && (
                      <div className="space-y-2 mt-2">
                        {a2VerbSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} verbs</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Nouns subfolder */}
                {a2NounSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setA2NounsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Nouns <span className="font-normal normal-case">({a2NounSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${a2NounsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {a2NounsOpen && (
                      <div className="space-y-2 mt-2">
                        {a2NounSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} nouns</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Adjectives subfolder */}
                {a2AdjSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setA2AdjsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Adjectives <span className="font-normal normal-case">({a2AdjSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${a2AdjsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {a2AdjsOpen && (
                      <div className="space-y-2 mt-2">
                        {a2AdjSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} adjectives</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* B1 Level folder */}
        {b1Sets.length > 0 && (
          <div>
            <button
              onClick={() => setB1Open(v => !v)}
              className="w-full flex items-center justify-between mb-2"
            >
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                B1 Level
                <span className="text-xs font-normal text-muted-foreground">
                  {b1VerbSets.reduce((t, s) => t + s.words.length, 0)} verbs · {b1NounSets.reduce((t, s) => t + s.words.length, 0)} nouns · {b1AdjSets.reduce((t, s) => t + s.words.length, 0)} adjectives
                </span>
              </h3>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${b1Open ? 'rotate-180' : ''}`} />
            </button>
            {b1Open && (
              <div className="ml-3 border-l-2 border-border pl-3 space-y-3">
                {/* Verbs subfolder */}
                {b1VerbSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setB1VerbsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Verbs <span className="font-normal normal-case">({b1VerbSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${b1VerbsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {b1VerbsOpen && (
                      <div className="space-y-2 mt-2">
                        {b1VerbSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} verbs</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Nouns subfolder */}
                {b1NounSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setB1NounsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Nouns <span className="font-normal normal-case">({b1NounSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${b1NounsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {b1NounsOpen && (
                      <div className="space-y-2 mt-2">
                        {b1NounSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} nouns</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Adjectives subfolder */}
                {b1AdjSets.length > 0 && (
                  <div>
                    <button
                      onClick={() => setB1AdjsOpen(v => !v)}
                      className="w-full flex items-center justify-between py-1"
                    >
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        Adjectives <span className="font-normal normal-case">({b1AdjSets.length} sets)</span>
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${b1AdjsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {b1AdjsOpen && (
                      <div className="space-y-2 mt-2">
                        {b1AdjSets.map(set => (
                          <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{set.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{set.title}</p>
                                <p className="text-xs text-muted-foreground">{set.words.length} adjectives</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Built-in category sections */}
        {groupedSets.map(({ category, label, emoji, sets }) => sets.length === 0 ? null : (
          <div key={category}>
            <h3 className="mb-2 font-heading font-semibold text-foreground flex items-center gap-2">
              {label}
            </h3>
            <div className="space-y-2">
              {sets.map(set => (
                <Card key={set.id} className="card-hover cursor-pointer p-3.5 flex items-center justify-between" onClick={() => startSet(set)}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{set.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{set.title}</p>
                      <p className="text-xs text-muted-foreground">{set.words.length} words</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Card>
              ))}
            </div>
          </div>
        ))}
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
      <div className="animate-fade-in space-y-4 pb-6">
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
          <Button className="w-full gap-2" onClick={startLearningAll}>
            Practice all ({learningWords.length})
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
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">English</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Dutch</span>
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
                        placeholder="English"
                        autoComplete="off"
                        className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <input
                        value={editDutch}
                        onChange={e => setEditDutch(e.target.value)}
                        placeholder="Dutch"
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
      <div className="animate-fade-in space-y-4 pb-6">
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
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">English</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Dutch</span>
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
      <div className="animate-fade-in space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Learned Words</span>
          </div>
        </div>

        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-sm text-green-700">
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
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <Button variant="ghost" className="self-start mb-4" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="rounded-2xl bg-accent p-6 mb-4"></div>
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
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <Button variant="ghost" className="self-start mb-4" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="rounded-2xl bg-success/10 p-6 mb-4">
          </div>
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
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <Button variant="ghost" className="self-start mb-4" onClick={goBack}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div className="rounded-2xl bg-success/10 p-6 mb-4"></div>
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
  const displayWord = mode === 'my-words' ? currentWord : currentSetWord;
  if (!displayWord) return null;

  const front = direction === 'dutch-to-english' ? displayWord.dutch : displayWord.english;
  const back  = direction === 'dutch-to-english' ? displayWord.english : displayWord.dutch;
  const exampleSentence = displayWord.example;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Button variant="ghost" size="sm" onClick={goBack} className="p-1 shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground truncate">
            {currentIndex + 1} / {totalCards}
            {mode === 'set-practice' && activeSet && ` · ${activeSet.title}`}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={toggleDirection}
            className="flex items-center gap-1.5 rounded-full border-2 border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/10"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            {direction === 'dutch-to-english' ? 'NL → EN' : 'EN → NL'}
          </button>
        </div>
      </div>

      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Permanent soft color cues — left = red (Again), right = green (Got it) */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
          style={{ background: 'linear-gradient(to right, rgba(239,68,68,0.08) 0%, transparent 35%, transparent 65%, rgba(34,197,94,0.08) 100%)' }}
        />
        {/* Active swipe overlays */}
        {swipeDeltaX < -40 && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-start pl-5 rounded-2xl bg-destructive/15">
            <span className="text-sm font-bold text-destructive">← Again</span>
          </div>
        )}
        {swipeDeltaX > 40 && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end pr-5 rounded-2xl bg-success/15">
            <span className="text-sm font-bold text-success">Got it →</span>
          </div>
        )}
        {/* Single listen button — always top-right, never duplicated */}
        <button
          onClick={e => { e.stopPropagation(); handleListen(displayWord.dutch); }}
          className={`absolute top-3 right-3 z-30 p-2 rounded-full transition-all active:scale-90 ${
            isPlaying ? 'text-primary bg-primary/15' : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/10'
          }`}
          aria-label="Listen"
        >
          <Volume2 className="h-5 w-5" />
        </button>
        <div
          className="flashcard mx-auto h-64 max-w-md cursor-pointer"
          style={{ transform: swipeDeltaX !== 0 ? `translateX(${swipeDeltaX * 0.2}px) rotate(${swipeDeltaX * 0.015}deg)` : undefined, transition: swipeDeltaX === 0 ? 'transform 0.2s ease' : 'none' }}
          onClick={() => { setFlipped(!flipped); }}
        >
          <div className={`flashcard-inner ${flipped ? 'flipped' : ''} ${noFlipAnim ? '!transition-none' : ''}`}>
            <Card className="flashcard-face bg-card border-2">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  {direction === 'dutch-to-english' ? 'Nederlands' : 'English'}
                </p>
                {direction === 'dutch-to-english' && displayWord.article && (
                  <span className={`inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    displayWord.article === 'de' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                  }`}>{displayWord.article}</span>
                )}
                <p className="font-heading text-3xl font-bold text-foreground">{front}</p>
                {direction === 'dutch-to-english' && exampleSentence && (
                  <p className="mt-2 text-sm italic text-muted-foreground leading-snug">
                    {highlightWord(exampleSentence, displayWord.dutch)}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">Tap to reveal</p>
              </div>
            </Card>
            <Card className="flashcard-face flashcard-back bg-accent border-2 border-primary/20">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  {direction === 'dutch-to-english' ? 'English' : 'Nederlands'}
                </p>
                {direction === 'english-to-dutch' && displayWord.article && (
                  <span className={`inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    displayWord.article === 'de' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                  }`}>{displayWord.article}</span>
                )}
                <p className="font-heading text-3xl font-bold text-accent-foreground">{back}</p>
                {direction === 'english-to-dutch' && exampleSentence && (
                  <p className="mt-2 text-sm italic text-muted-foreground leading-snug">
                    {highlightWord(exampleSentence, displayWord.dutch)}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Action row: ← Prev  ·  Shuffle  ·  → Next */}
      <div className="flex items-center justify-center gap-8 -mt-2">
        <button
          onClick={goPrevCard}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-25"
          aria-label="Previous card"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        {mode === 'set-practice' && (
          <button
            onClick={toggleShuffle}
            className={`flex items-center gap-1 rounded-full border p-1.5 transition-all ${
              isShuffled ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
            }`}
            aria-label="Shuffle"
          >
            <Shuffle className="h-4 w-4" />
          </button>
        )}
        {mode === 'set-practice' && (
          <button
            onClick={() => advanceCard(currentIndex < totalCards - 1 ? currentIndex + 1 : totalCards)}
            disabled={currentIndex >= totalCards - 1}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-25"
            aria-label="Next card"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {flipped && displayWord.article && (displayWord.plural || displayWord.exampleTranslation || displayWord.nounTip) && (
        <Card className="animate-fade-in p-3 bg-muted/40 border-border space-y-1.5 text-sm">
          {displayWord.plural && (
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted-foreground w-14 shrink-0">plural</span>
              <span className="font-medium">{displayWord.plural}</span>
            </div>
          )}
          {displayWord.exampleTranslation && (
            <div className="flex gap-2 items-start pt-1 border-t border-border">
              <span className="text-xs text-muted-foreground w-14 shrink-0 mt-0.5">example</span>
              <div>
                <p className="text-xs font-medium leading-snug">{displayWord.example}</p>
                <p className="text-xs text-muted-foreground italic leading-snug">{displayWord.exampleTranslation}</p>
              </div>
            </div>
          )}
          {displayWord.nounTip && (
            <p className="text-xs text-muted-foreground pt-1 border-t border-border">{displayWord.nounTip}</p>
          )}
        </Card>
      )}

      {flipped && displayWord.conjugation && (
        <Card className="animate-fade-in p-3 bg-muted/40 border-border">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs mb-2">
            {(['ik', 'jij', 'hij', 'wij', 'jullie', 'zij'] as const).map(pronoun => (
              <div key={pronoun} className="flex gap-1.5">
                <span className="text-muted-foreground w-10 shrink-0">{pronoun}</span>
                <span className="font-medium text-foreground">{displayWord.conjugation![pronoun]}</span>
              </div>
            ))}
          </div>
          {displayWord.verbType && (
            <div className="flex items-center gap-2 pt-1 border-t border-border">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                displayWord.verbType === 'reg' ? 'bg-green-100 text-green-700' :
                displayWord.verbType === 'irr' ? 'bg-red-100 text-red-700' :
                displayWord.verbType === 'sep' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {displayWord.verbType === 'reg' ? 'regular' : displayWord.verbType === 'irr' ? 'irregular' : displayWord.verbType === 'sep' ? 'separable' : 'modal'}
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
                  <span className="text-muted-foreground w-16 shrink-0">imperfect</span>
                  <span className="font-medium text-foreground">{displayWord.pastTense}</span>
                </div>
              )}
              {displayWord.pastParticiple && (
                <div className="flex gap-2 text-xs">
                  <span className="text-muted-foreground w-16 shrink-0">participle</span>
                  <span className="font-medium text-foreground">{displayWord.pastParticiple}</span>
                </div>
              )}
            </div>
          )}
        </Card>
      )}


      {flipped && (
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          {mode === 'my-words' && currentWord && (() => {
            const againDays = previewInterval(currentWord, 1);
            const hardDays  = previewInterval(currentWord, 2);
            const goodDays  = previewInterval(currentWord, 3);
            const easyDays  = previewInterval(currentWord, 4);
            return (
              <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                <span>Again → {formatDays(againDays)}</span>
                <span className="text-muted-foreground/30">·</span>
                <span>Hard → {formatDays(hardDays)}</span>
                <span className="text-muted-foreground/30">·</span>
                <span>Good → {formatDays(goodDays)}</span>
                <span className="text-muted-foreground/30">·</span>
                <span>Easy → {formatDays(easyDays)}</span>
              </div>
            );
          })()}
          {(mode === 'my-words' || mode === 'set-practice') && (
            <div className="flex flex-col items-center gap-2 w-full">
              {mode === 'set-practice' && (
                <p className="text-xs text-muted-foreground text-center">
                  Rate a card to add it to your spaced repetition queue
                </p>
              )}
              <div className="flex justify-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSRSRating('again')}
                  className="gap-1 border-destructive/30 text-destructive hover:bg-destructive/10 text-xs px-3 flex-1"
                >
                  Again
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSRSRating('hard')}
                  className="gap-1 border-orange-300 text-orange-600 hover:bg-orange-50 text-xs px-3 flex-1"
                >
                  Hard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSRSRating('good')}
                  className="gap-1 border-primary/30 text-primary hover:bg-primary/10 text-xs px-3 flex-1"
                >
                  Good
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSRSRating('easy')}
                  className="gap-1 bg-success text-success-foreground hover:bg-success/90 text-xs px-3 flex-1"
                >
                  Easy
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
