import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, RotateCcw, ArrowLeft, ChevronRight, ArrowLeftRight, GraduationCap, Plus, ChevronDown, Shuffle, BookmarkPlus, RefreshCw, Volume2, Trash2 } from 'lucide-react';
import { playDutch, stopDutch } from '@/utils/playDutch';
import { useLearning } from '@/context/LearningContext';
import { flashcardSets } from '@/data/flashcardSets';
import { FlashcardSet, FlashcardSetCategory, FlashcardSetWord, DutchWord } from '@/types/dutch';
import { useCustomSets } from '@/hooks/useCustomSets';
import type { CustomSet } from '@/hooks/useCustomSets';
import { CustomSetEditor, CreateSetModal } from '@/components/CustomSetEditor';
import { fsrsPreviewInterval, FSRSCard } from '@/utils/fsrs';

type SRSRating = 'again' | 'good' | 'easy';

type FlashcardMode = 'browse' | 'my-words' | 'set-practice' | 'learned' | 'custom-editor' | 'create-set';
type Direction = 'dutch-to-english' | 'english-to-dutch';

const categoryLabels: Record<FlashcardSetCategory, { label: string; emoji: string }> = {
  verbs:      { label: 'Verbs',      emoji: '🏃' },
  adjectives: { label: 'Adjectives', emoji: '🎨' },
  nouns:      { label: 'Nouns',      emoji: '📦' },
  numbers:    { label: 'Numbers',    emoji: '🔢' },
  location:   { label: 'Location',   emoji: '📍' },
};

export function FlashcardView() {
  const { getWordsForReview, getWordsDueForReview, reviewWord, reviewWordSRS, enrollWord, vocabulary, dailyGoal, addWord, updateWordStatus, dueCount } = useLearning();
  const { sets: customSets, createSet, deleteSet, addWordToSet, removeWordFromSet } = useCustomSets();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [flipped, setFlipped]           = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [direction, setDirection]       = useState<Direction>('dutch-to-english');
  const [mode, setMode]                 = useState<FlashcardMode>('browse');
  const [activeSet, setActiveSet]       = useState<FlashcardSet | null>(null);
  const [activeCustomSet, setActiveCustomSet] = useState<CustomSet | null>(null);
  const [a1Open, setA1Open]             = useState(false);
  const [a1VerbsOpen, setA1VerbsOpen]   = useState(false);
  const [a1NounsOpen, setA1NounsOpen]   = useState(false);
  const [a1AdjOpen, setA1AdjOpen]       = useState(false);
  const [practiceQueue, setPracticeQueue] = useState<FlashcardSetWord[]>([]);
  const [isShuffled, setIsShuffled]     = useState(false);
  const [savedWords, setSavedWords]     = useState<Set<string>>(new Set());
  // My-Words session state
  const [sessionQueue,    setSessionQueue]    = useState<DutchWord[]>([]);
  const [originalSession, setOriginalSession] = useState<DutchWord[]>([]);
  const [againKeys,       setAgainKeys]       = useState<Set<string>>(new Set());

  const allWords       = useMemo(() => Object.values(vocabulary), [vocabulary]);
  const learnedWords   = useMemo(() => allWords.filter(w => w.status === 'known'), [allWords]);
  const scheduledWords = useMemo(() => {
    const now = new Date();
    return allWords.filter(w => w.status !== 'known' && w.nextReview && new Date(w.nextReview) > now);
  }, [allWords]);

  const currentWord    = mode === 'my-words' ? sessionQueue[currentIndex] ?? null : null;
  const currentSetWord = mode === 'set-practice' && practiceQueue.length > 0 ? practiceQueue[currentIndex] : null;
  const totalCards     = mode === 'my-words' ? sessionQueue.length : practiceQueue.length;

  const handleAnswer = (correct: boolean) => {
    if (mode === 'my-words' && currentWord) {
      reviewWord(currentWord.dutch, correct);
      if (!correct) setAgainKeys(prev => new Set(prev).add(currentWord.dutch.toLowerCase()));
    }
    if (mode === 'set-practice' && currentSetWord) {
      // Auto-enroll set words into the SRS queue and record a legacy review
      enrollWord(currentSetWord.dutch, currentSetWord.english);
      reviewWord(currentSetWord.dutch, correct);
    }
    setFlipped(false);
    stopDutch(); setIsPlaying(false);
    if (currentIndex < totalCards - 1) setCurrentIndex(prev => prev + 1);
    else setCurrentIndex(totalCards);
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
    setFlipped(false);
    stopDutch(); setIsPlaying(false);
    if (currentIndex < totalCards - 1) setCurrentIndex(prev => prev + 1);
    else setCurrentIndex(totalCards);
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

  const openCustomEditor = (cs: CustomSet) => { setActiveCustomSet(cs); setMode('custom-editor'); };
  const openCreateSet    = () => setMode('create-set');

  function toggleDirection() {
    setDirection(d => d === 'dutch-to-english' ? 'english-to-dutch' : 'dutch-to-english');
  }

  // Preview next interval using FSRS (mirrors reviewWord in LearningContext)
  function previewInterval(word: DutchWord | null, correct: boolean): number {
    if (!word) return 1;
    const card: FSRSCard | null = word.stability != null ? {
      stability:  word.stability,
      difficulty: word.difficulty ?? 5,
      state:      word.fsrsState  ?? 'learning',
      lastReview: word.lastReview ? new Date(word.lastReview) : new Date(),
    } : null;
    return fsrsPreviewInterval(card, correct ? 3 : 1);
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
    const groupedSets = Object.entries(categoryLabels).map(([cat, info]) => ({
      category: cat as FlashcardSetCategory,
      ...info,
      sets: flashcardSets.filter(s => s.category === cat && !s.level),
    }));

    return (
      <div className="animate-fade-in space-y-5">

        {/* My Saved Words */}
        {allWords.length > 0 && (
          <Card
            className={`card-hover cursor-pointer p-4 flex items-center justify-between ${dueCount > 0 ? 'border-primary/30 bg-primary/5' : ''}`}
            onClick={startMyWords}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <p className="font-heading font-semibold text-foreground">Spaced Repetition Review</p>
                <p className="text-xs text-muted-foreground">
                  {dueCount > 0
                    ? <><span className="text-primary font-semibold">{dueCount} due today</span></>
                    : `All caught up! ${allWords.length} word${allWords.length !== 1 ? 's' : ''} in queue`
                  }
                </p>
              </div>
            </div>
            {dueCount > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                {dueCount}
              </span>
            )}
            {dueCount === 0 && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
          </Card>
        )}

        {/* Learned Words */}
        {learnedWords.length > 0 && (
          <Card
            className="card-hover cursor-pointer p-4 flex items-center justify-between border-green-200 bg-green-50"
            onClick={startLearned}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <p className="font-heading font-semibold text-foreground">Learned Words</p>
                <p className="text-xs text-muted-foreground">
                  {learnedWords.length} word{learnedWords.length !== 1 ? 's' : ''} mastered
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
              ✨ My Sets
            </h3>
            <button
              onClick={openCreateSet}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Plus className="h-3.5 w-3.5" /> New set
            </button>
          </div>

          {customSets.length === 0 ? (
            <Card
              className="card-hover cursor-pointer border-dashed p-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={openCreateSet}
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">Create your first custom set</span>
            </Card>
          ) : (
            <div className="space-y-2">
              {customSets.map(cs => (
                <Card key={cs.id} className="p-3.5">
                  {confirmDeleteId === cs.id ? (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-destructive font-medium">Delete "{cs.title}"?</p>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => { deleteSet(cs.id); setConfirmDeleteId(null); }}
                          className="text-xs font-semibold text-white bg-destructive hover:bg-destructive/90 transition-colors px-3 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                        onClick={() => openCustomEditor(cs)}
                      >
                        <span className="text-lg">{cs.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{cs.title}</p>
                          <p className="text-xs text-muted-foreground">{cs.words.length} word{cs.words.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(cs.id); }}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <ChevronRight
                          className="h-4 w-4 text-muted-foreground cursor-pointer"
                          onClick={() => openCustomEditor(cs)}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* A1 Level folder */}
        {a1Sets.length > 0 && (
          <div>
            <button
              onClick={() => setA1Open(v => !v)}
              className="w-full flex items-center justify-between mb-2"
            >
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <span>📁</span> A1 Level
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
                        ⚡ Verbs <span className="font-normal normal-case">({a1VerbSets.length} sets)</span>
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
                        📦 Nouns <span className="font-normal normal-case">({a1NounSets.length} sets)</span>
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
                        🎨 Adjectives <span className="font-normal normal-case">({a1AdjSets.length} sets)</span>
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

        {/* Built-in category sections */}
        {groupedSets.map(({ category, label, emoji, sets }) => sets.length === 0 ? null : (
          <div key={category}>
            <h3 className="mb-2 font-heading font-semibold text-foreground flex items-center gap-2">
              <span>{emoji}</span> {label}
            </h3>
            <div className="space-y-2">
              {sets.map(set => (
                <Card
                  key={set.id}
                  className="card-hover cursor-pointer p-3.5 flex items-center justify-between"
                  onClick={() => startSet(set)}
                >
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
    if (allWords.filter(w => w.status !== 'known').length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <Button variant="ghost" className="self-start mb-4" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="rounded-2xl bg-accent p-6 mb-4"><span className="text-4xl">📚</span></div>
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
            <span className="text-4xl">{nothingWasDue ? '📅' : '🎉'}</span>
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
        <div className="rounded-2xl bg-success/10 p-6 mb-4"><span className="text-4xl">🎉</span></div>
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
          {mode === 'set-practice' && (
            <button
              onClick={toggleShuffle}
              className={`flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                isShuffled
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
              }`}
            >
              <Shuffle className="h-3 w-3" />
              {isShuffled ? 'On' : 'Shuffle'}
            </button>
          )}
          <button
            onClick={toggleDirection}
            className="flex items-center gap-1.5 rounded-full border-2 border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/10"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            {direction === 'dutch-to-english' ? 'NL → EN' : 'EN → NL'}
          </button>
        </div>
      </div>

      <div className="flashcard mx-auto h-64 max-w-md cursor-pointer" onClick={() => { setFlipped(!flipped); }}>
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
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
              {direction === 'dutch-to-english' && exampleSentence && !displayWord.article && (
                <p className="mt-3 text-sm italic text-muted-foreground">"{exampleSentence}"</p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">Tap to reveal</p>
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
            </div>
          </Card>
        </div>
      </div>

      {/* Listen button — always visible during card practice */}
      <div className="flex justify-center -mt-2">
        <button
          onClick={e => { e.stopPropagation(); handleListen(displayWord.dutch); }}
          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
            isPlaying
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary shadow-sm'
          }`}
        >
          <Volume2 className="h-3.5 w-3.5" />
          {isPlaying ? 'Stop' : 'Listen'}
        </button>
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
            <p className="text-xs text-muted-foreground pt-1 border-t border-border">💡 {displayWord.nounTip}</p>
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
        </Card>
      )}

      {mode === 'set-practice' && displayWord && (
        <div className="flex justify-center">
          <button
            onClick={saveCurrentWord}
            disabled={savedWords.has(displayWord.dutch)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
              savedWords.has(displayWord.dutch)
                ? 'border-green-300 bg-green-50 text-green-600 cursor-default'
                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {savedWords.has(displayWord.dutch)
              ? <><Check className="h-3.5 w-3.5" /> Saved to My Words</>
              : <><BookmarkPlus className="h-3.5 w-3.5" /> Save to My Words</>
            }
          </button>
        </div>
      )}

      {flipped && (
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          {mode === 'my-words' && currentWord && (
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>Again → tomorrow</span>
              <span className="text-muted-foreground/40">·</span>
              <span>Good → {formatDays(Math.max(3, (currentWord.interval ?? 1) * 2))}</span>
              <span className="text-muted-foreground/40">·</span>
              <span>Easy → {formatDays(Math.max(7, (currentWord.interval ?? 1) * 3))}</span>
            </div>
          )}
          {mode === 'my-words' ? (
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleSRSRating('again')}
                className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 text-sm px-4"
              >
                <X className="h-4 w-4" /> Again
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleSRSRating('good')}
                className="gap-1.5 border-primary/30 text-primary hover:bg-primary/10 text-sm px-4"
              >
                <Check className="h-4 w-4" /> Good
              </Button>
              <Button
                size="lg"
                onClick={() => handleSRSRating('easy')}
                className="gap-1.5 bg-success text-success-foreground hover:bg-success/90 text-sm px-4"
              >
                <Check className="h-4 w-4" /> Easy
              </Button>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(false)}
                className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <X className="h-5 w-5" /> Again
              </Button>
              <Button
                size="lg"
                onClick={() => handleAnswer(true)}
                className="gap-2 bg-success text-success-foreground hover:bg-success/90"
              >
                <Check className="h-5 w-5" /> Got it
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
