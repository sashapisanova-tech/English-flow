import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useCustomSets } from '@/hooks/useCustomSets';
import { Level } from '@/components/tasks/TaskFilters';

// ─── API key ──────────────────────────────────────────────────────────────────

function getSavedKey(): string {
  return localStorage.getItem('dutch-app-anthropic-key') || (import.meta as Record<string, unknown> & { env?: Record<string, string> }).env?.VITE_ANTHROPIC_API_KEY || '';
}

// ─── Types ────────────────────────────────────────────────────────────────────

type SourceType = 'texts' | 'flashcard_set' | 'theme';
type SessionLength = 5 | 10 | 15;
type Rating = 'easy' | 'hard';

interface GeneratedSentence {
  english: string;
  dutch_answer: string;
  word_bank: string[];          // A1 only
  partial_word_bank: string[];  // A2 only
  model_sentence?: { english: string; dutch: string };  // A2 only
  focus_note?: string;          // B1 only
  grammar_target: string;
  feedback_hint: string;
}

interface SessionItem {
  sentence: GeneratedSentence;
  userAnswer: string;
  rating: Rating | null;
  annotation?: string;  // B1 post-submission feedback
}

// ─── Grammar config per level ─────────────────────────────────────────────────

const GRAMMAR_FOCUSES: Record<Level, string[]> = {
  A1: ['Word order', 'de/het', 'Present tense'],
  A2: ['Inversion', 'Separable verbs', 'Simple past'],
  B1: ['Subordinate clauses', 'Relative clauses', 'Perfect tense'],
};

const THEMES = [
  'Daily life',
  'Food & eating',
  'Work & study',
  'Travel',
  'Amsterdam',
  'Health',
  'Relationships',
  'Shopping',
];

// ─── Validation ───────────────────────────────────────────────────────────────

const FORBIDDEN: Record<string, { maxWords: number; forbiddenWords: string[] }> = {
  A1: { maxWords: 6, forbiddenWords: ['zich','zou','zouden','worden','wordt','werd','kunnen','moeten','willen','mogen'] },
  A2: { maxWords: 12, forbiddenWords: ['zich','hoewel','terwijl','zodat'] },
  B1: { maxWords: 45, forbiddenWords: [] },
};

function validateSentence(dutch: string, level: string): boolean {
  const rules = FORBIDDEN[level];
  if (!rules) return true;
  const words = dutch.trim().split(/\s+/);
  if (words.length > rules.maxWords) return false;
  const lower = dutch.toLowerCase();
  return !rules.forbiddenWords.some(w => lower.includes(w));
}

function validateA1WordBank(dutch: string, bank: string[]): boolean {
  const answerWords = dutch.trim().split(/\s+/).map(w => w.replace(/[.,!?]/g, '').toLowerCase());
  const bankWords = bank.map(w => w.toLowerCase());
  if (answerWords.length !== bankWords.length) return false;
  return [...answerWords].sort().every((w, i) => w === [...bankWords].sort()[i]);
}

// ─── System prompts ───────────────────────────────────────────────────────────

function buildSystemPrompt(level: Level): string {
  if (level === 'A1') {
    return `You are a Dutch language teacher creating beginner (A1) translation exercises.

Rules for A1:
- 3–6 words maximum, single clause only
- Present tense only, regular verbs only, one verb per sentence
- Forbidden: separable verbs, reflexive (zich), relative clauses, modal verbs
- Use ONLY words from vocabulary_pool (already read by user)
- word_bank must contain EVERY word needed (punctuation stripped), nothing extra, all words shuffled
- Good examples: "Sara drinkt koffie." / "Hij woont in Amsterdam." / "De tafel is groot."
- Bad: "Sara doet de deur open." (separable) / "Zij voelt zich blij." (reflexive)

Return ONLY valid JSON, no markdown:
{
  "english": "the English sentence to translate",
  "dutch_answer": "the correct Dutch translation",
  "word_bank": ["shuffled", "words", "no", "punctuation"],
  "partial_word_bank": [],
  "grammar_target": "one grammar point being practiced",
  "feedback_hint": "one sentence tip for this specific grammar point"
}`;
  }
  if (level === 'A2') {
    return `You are a Dutch language teacher creating intermediate (A2) translation exercises.

Rules for A2:
- 8–12 words, one main clause + optional coordinating clause (en, maar, want, dus, of)
- Present tense and simple past (imperfectum) allowed, separable verbs allowed
- Forbidden: relative clauses, reflexive verbs (zich), perfect tense (hebben/zijn + past participle)
- partial_word_bank = 2–3 new or harder words only (not every word)
- model_sentence = one example sentence using the same grammar pattern (different topic)

Return ONLY valid JSON, no markdown:
{
  "english": "the English sentence to translate",
  "dutch_answer": "the correct Dutch translation",
  "word_bank": [],
  "partial_word_bank": ["key", "word1", "word2"],
  "model_sentence": { "english": "example English", "dutch": "example Dutch" },
  "grammar_target": "one grammar point being practiced",
  "feedback_hint": "one sentence tip for this specific grammar point"
}`;
  }
  // B1
  return `You are a Dutch language teacher creating upper-intermediate (B1) translation exercises.

Rules for B1:
- 2–3 connected sentences, 20–45 words total
- Subordinating conjunctions allowed (omdat, als, toen, terwijl, hoewel, zodat)
- Relative clauses allowed (die, dat, waar)
- Modal verbs allowed (kunnen, moeten, willen, mogen, zullen)
- Perfect tense allowed (hebben/zijn + past participle)
- focus_note = one line naming the grammar structure to watch (e.g. "verb-final in omdat-clause")
- No word bank needed

Return ONLY valid JSON, no markdown:
{
  "english": "2–3 connected English sentences to translate",
  "dutch_answer": "the correct Dutch translation",
  "word_bank": [],
  "partial_word_bank": [],
  "focus_note": "grammar note for the learner",
  "grammar_target": "one grammar point being practiced",
  "feedback_hint": "one sentence tip for this specific grammar point"
}`;
}

// ─── API calls ────────────────────────────────────────────────────────────────

interface GenerationPayload {
  level: Level;
  source_type: SourceType;
  vocabulary_pool: string[];
  flashcard_words: string[];
  theme: string;
  grammar_focus: string;
  sentence_index: number;
  session_length: number;
}

async function callClaude(system: string, user: string): Promise<string> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 512,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  return data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
}

async function generateSentence(
  level: Level,
  payload: GenerationPayload,
): Promise<GeneratedSentence> {
  const system = buildSystemPrompt(level);
  const user = `Generate a Dutch translation exercise with this configuration:
${JSON.stringify(payload, null, 2)}

This is sentence ${payload.sentence_index} of ${payload.session_length} in the session.
Vary the vocabulary and grammar patterns — don't repeat the same structure.`;

  for (let attempt = 0; attempt < 3; attempt++) {
    const raw = await callClaude(system, user);
    const parsed = JSON.parse(raw) as GeneratedSentence;

    if (!validateSentence(parsed.dutch_answer, level)) continue;
    if (level === 'A1' && parsed.word_bank.length > 0) {
      if (!validateA1WordBank(parsed.dutch_answer, parsed.word_bank)) continue;
    }
    return parsed;
  }
  // last attempt without strict validation
  const raw = await callClaude(system, user);
  return JSON.parse(raw) as GeneratedSentence;
}

async function getB1Annotation(
  userAnswer: string,
  correctAnswer: string,
  feedbackHint: string,
): Promise<string> {
  const system = `You are a Dutch language tutor giving brief, encouraging feedback.
Given a learner's Dutch translation and the model answer, write 1–2 sentences focusing on the MOST important correction only.
Be specific and concise. Do not list every error. Do not use bullet points.`;
  const user = `Learner's answer: ${userAnswer}
Model answer: ${correctAnswer}
Grammar focus: ${feedbackHint}

Write 1–2 sentences of feedback on the most important point to correct.`;
  return callClaude(system, user);
}

// ─── Word-by-word diff for A2 ─────────────────────────────────────────────────

type WordStatus = 'correct' | 'wrong-position' | 'wrong';

function diffWords(userAnswer: string, dutchAnswer: string): { word: string; status: WordStatus }[] {
  const normalize = (s: string) => s.toLowerCase().replace(/[.,!?]/g, '').trim();
  const userWords = userAnswer.trim().split(/\s+/);
  const answerWords = dutchAnswer.trim().split(/\s+/);

  const answerNorm = answerWords.map(normalize);
  const userNorm = userWords.map(normalize);

  return userWords.map((word, i) => {
    const n = normalize(word);
    if (answerNorm[i] === n) return { word, status: 'correct' as WordStatus };
    if (answerNorm.includes(n)) return { word, status: 'wrong-position' as WordStatus };
    return { word, status: 'wrong' as WordStatus };
  });
}

// ─── A1 correctness check ─────────────────────────────────────────────────────

function checkA1Answer(placed: string[], dutchAnswer: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[.,!?]/g, '').trim();
  const placedNorm = placed.map(normalize).join(' ');
  const answerNorm = dutchAnswer.trim().split(/\s+/).map(normalize).join(' ');
  return placedNorm === answerNorm;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TranslateChallengeTask({ onBack }: { onBack: () => void }) {
  const { vocabulary, texts } = useLearning();
  const { sets } = useCustomSets();

  // ── Config state ──────────────────────────────────────────────────────────
  const [screen, setScreen] = useState<'config' | 'sentence' | 'feedback' | 'end'>('config');
  const [level, setLevel] = useState<Level>('A2');
  const [sourceType, setSourceType] = useState<SourceType>('texts');
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('Daily life');
  const [grammarFocus, setGrammarFocus] = useState<string>('');
  const [sessionLength, setSessionLength] = useState<SessionLength>(5);

  // ── Session state ─────────────────────────────────────────────────────────
  const [sessionItems, setSessionItems] = useState<SessionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSentence, setCurrentSentence] = useState<GeneratedSentence | null>(null);

  // ── A1 tile state ─────────────────────────────────────────────────────────
  const [placedTiles, setPlacedTiles] = useState<string[]>([]);        // placed words in order
  const [bankTiles, setBankTiles] = useState<string[]>([]);             // remaining words in bank

  // ── A2/B1 textarea state ──────────────────────────────────────────────────
  const [userInput, setUserInput] = useState('');

  // ── Feedback state ────────────────────────────────────────────────────────
  const [currentRating, setCurrentRating] = useState<Rating | null>(null);
  const [b1Annotation, setB1Annotation] = useState<string | null>(null);
  const [b1Loading, setB1Loading] = useState(false);

  // ── Pre-generation ref ────────────────────────────────────────────────────
  const pregenRef = useRef<Promise<GeneratedSentence> | null>(null);
  const pregenResultRef = useRef<GeneratedSentence | null>(null);

  // ── Vocabulary pool ───────────────────────────────────────────────────────
  const vocabPool = useMemo(() => {
    const fromTexts = texts
      .filter(t => t.completed)
      .flatMap(t => Object.keys(t.words || {}));
    const savedWords = Object.values(vocabulary).map(w => w.dutch);
    return [...new Set([...fromTexts, ...savedWords])];
  }, [texts, vocabulary]);

  // ── Build generation payload ──────────────────────────────────────────────
  const buildPayload = useCallback((index: number): GenerationPayload => {
    let flashcardWords: string[] = [];
    if (sourceType === 'flashcard_set' && selectedSetId) {
      const set = sets.find(s => s.id === selectedSetId);
      flashcardWords = set ? set.words.map(w => w.dutch) : [];
    }
    return {
      level,
      source_type: sourceType,
      vocabulary_pool: sourceType === 'texts' ? vocabPool.slice(0, 80) : [],
      flashcard_words: flashcardWords,
      theme: sourceType === 'theme' ? selectedTheme : '',
      grammar_focus: grammarFocus,
      sentence_index: index + 1,
      session_length: sessionLength,
    };
  }, [level, sourceType, selectedSetId, selectedTheme, grammarFocus, sessionLength, vocabPool, sets]);

  // ── Start session ─────────────────────────────────────────────────────────
  async function handleStart() {
    setError(null);
    setLoading(true);
    setScreen('sentence');
    setCurrentIndex(0);
    setSessionItems([]);
    pregenRef.current = null;
    pregenResultRef.current = null;
    try {
      const sentence = await generateSentence(level, buildPayload(0));
      setCurrentSentence(sentence);
      initSentenceUI(sentence);
      // Pre-generate sentence 1
      if (sessionLength > 1) {
        kickoffPregen(1);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Settings.' : 'Something went wrong. Retry?');
      setScreen('config');
    } finally {
      setLoading(false);
    }
  }

  function initSentenceUI(sentence: GeneratedSentence) {
    setPlacedTiles([]);
    setUserInput('');
    setCurrentRating(null);
    setB1Annotation(null);
    if (level === 'A1') {
      // Shuffle the word bank
      setBankTiles([...sentence.word_bank].sort(() => Math.random() - 0.5));
    }
  }

  function kickoffPregen(index: number) {
    if (index >= sessionLength) return;
    pregenResultRef.current = null;
    const p = generateSentence(level, buildPayload(index)).then(s => {
      pregenResultRef.current = s;
      return s;
    }).catch(() => {
      pregenResultRef.current = null;
      return null as unknown as GeneratedSentence;
    });
    pregenRef.current = p;
  }

  // ── Submit answer ─────────────────────────────────────────────────────────
  async function handleCheck() {
    if (!currentSentence) return;

    const answer = level === 'A1' ? placedTiles.join(' ') : userInput.trim();
    const item: SessionItem = {
      sentence: currentSentence,
      userAnswer: answer,
      rating: null,
    };

    setSessionItems(prev => [...prev, item]);
    setScreen('feedback');

    // B1 annotation
    if (level === 'B1') {
      setB1Loading(true);
      try {
        const ann = await getB1Annotation(answer, currentSentence.dutch_answer, currentSentence.feedback_hint);
        setB1Annotation(ann);
        setSessionItems(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], annotation: ann };
          return updated;
        });
      } catch {
        setB1Annotation(null);
      } finally {
        setB1Loading(false);
      }
    }
  }

  // ── Rating ────────────────────────────────────────────────────────────────
  function handleRate(rating: Rating) {
    setCurrentRating(rating);
    setSessionItems(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], rating };
      return updated;
    });
  }

  // ── Next sentence ─────────────────────────────────────────────────────────
  async function handleNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= sessionLength) {
      setScreen('end');
      return;
    }
    setCurrentIndex(nextIndex);
    setError(null);

    // Try to use pre-generated sentence
    if (pregenResultRef.current) {
      const sentence = pregenResultRef.current;
      pregenResultRef.current = null;
      setCurrentSentence(sentence);
      initSentenceUI(sentence);
      setScreen('sentence');
      kickoffPregen(nextIndex + 1);
      return;
    }

    // Wait for in-flight pre-gen or generate fresh
    setLoading(true);
    setScreen('sentence');
    try {
      let sentence: GeneratedSentence;
      if (pregenRef.current) {
        sentence = await pregenRef.current;
        pregenRef.current = null;
        pregenResultRef.current = null;
      } else {
        sentence = await generateSentence(level, buildPayload(nextIndex));
      }
      setCurrentSentence(sentence);
      initSentenceUI(sentence);
      kickoffPregen(nextIndex + 1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Settings.' : 'Something went wrong. Retry?');
    } finally {
      setLoading(false);
    }
  }

  // ── A1 tile interactions ──────────────────────────────────────────────────
  function placeTile(word: string, bankIndex: number) {
    setPlacedTiles(prev => [...prev, word]);
    setBankTiles(prev => prev.filter((_, i) => i !== bankIndex));
  }

  function removeTile(word: string, placedIndex: number) {
    setPlacedTiles(prev => prev.filter((_, i) => i !== placedIndex));
    setBankTiles(prev => [...prev, word]);
  }

  // ── A1 check disabled ─────────────────────────────────────────────────────
  const a1CheckDisabled = placedTiles.length === 0 || bankTiles.length > 0;

  // ── A1 correctness ────────────────────────────────────────────────────────
  const a1Correct = useMemo(() => {
    if (!currentSentence || level !== 'A1') return false;
    const lastItem = sessionItems[sessionItems.length - 1];
    if (!lastItem) return false;
    return checkA1Answer(lastItem.userAnswer.split(' '), currentSentence.dutch_answer);
  }, [sessionItems, currentSentence, level]);

  // ── Session summary stats ─────────────────────────────────────────────────
  const endStats = useMemo(() => {
    if (level === 'A1') {
      let correct = 0;
      let review = 0;
      sessionItems.forEach(item => {
        if (checkA1Answer(item.userAnswer.split(' '), item.sentence.dutch_answer)) correct++;
        else review++;
      });
      return { correct, review, easy: 0, hard: 0 };
    }
    const easy = sessionItems.filter(i => i.rating === 'easy').length;
    const hard = sessionItems.filter(i => i.rating === 'hard').length;
    return { correct: 0, review: 0, easy, hard };
  }, [sessionItems, level]);

  const hardGrammarTarget = useMemo(() => {
    const hardItems = sessionItems.filter(i => i.rating === 'hard');
    if (hardItems.length === 0) return null;
    const freq: Record<string, number> = {};
    hardItems.forEach(i => {
      const t = i.sentence.grammar_target;
      freq[t] = (freq[t] || 0) + 1;
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  }, [sessionItems]);

  // ─────────────────────────────────────────────────────────────────────────
  // ── Config screen ─────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────

  if (screen === 'config') {
    return (
      <div className="animate-fade-in space-y-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Tasks
          </button>
        </div>

        <div>
          <h1 className="text-xl font-semibold text-foreground">Translate to Dutch</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Configure a practice session and translate sentences sentence by sentence.</p>
        </div>

        {error && (
          <Card className="border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}

        {/* Level */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Level</p>
          <div className="flex gap-2 flex-wrap">
            {(['A1', 'A2', 'B1'] as Level[]).map(l => (
              <button
                key={l}
                onClick={() => { setLevel(l); setGrammarFocus(''); }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  level === l
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Source */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Source</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'texts' as SourceType, label: 'My reading' },
              { id: 'flashcard_set' as SourceType, label: 'Flashcard set' },
              { id: 'theme' as SourceType, label: 'Theme' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSourceType(s.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  sourceType === s.id
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Flashcard set picker */}
          {sourceType === 'flashcard_set' && (
            <div className="mt-2 space-y-1">
              {sets.length === 0 ? (
                <p className="text-xs text-muted-foreground">No custom sets yet. Create one in the Flashcards tab.</p>
              ) : (
                sets.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSetId(s.id)}
                    className={`w-full text-left rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      selectedSetId === s.id
                        ? 'border-primary/50 bg-primary/5 text-foreground'
                        : 'border-border text-muted-foreground hover:border-primary/30'
                    }`}
                  >
                    <span className="font-medium">{s.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">{s.words.length} words</span>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Theme picker */}
          {sourceType === 'theme' && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {THEMES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTheme(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTheme === t
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grammar focus */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Grammar focus <span className="font-normal normal-case">(optional)</span></p>
          <div className="flex gap-2 flex-wrap">
            {GRAMMAR_FOCUSES[level].map(g => (
              <button
                key={g}
                onClick={() => setGrammarFocus(grammarFocus === g ? '' : g)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  grammarFocus === g
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Session length */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Session length</p>
          <div className="flex gap-2">
            {([5, 10, 15] as SessionLength[]).map(n => (
              <button
                key={n}
                onClick={() => setSessionLength(n)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  sessionLength === n
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleStart}
          disabled={sourceType === 'flashcard_set' && !selectedSetId}
        >
          Start session
        </Button>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── Sentence screen ───────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────

  if (screen === 'sentence') {
    return (
      <div className="animate-fade-in space-y-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setScreen('config')}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span className="text-sm text-muted-foreground tabular-nums">{currentIndex + 1} / {sessionLength}</span>
        </div>

        {error && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" size="sm" onClick={() => handleNext()}>Retry</Button>
          </div>
        )}

        {loading && !error && (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full" />
            {level === 'A1' && <Skeleton className="h-12 w-full" />}
            {level === 'A2' && <Skeleton className="h-16 w-full" />}
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {!loading && !error && currentSentence && (
          <>
            {/* A2 model sentence */}
            {level === 'A2' && currentSentence.model_sentence && (
              <Card className="bg-muted/50 border-border p-3 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Example pattern</p>
                <p className="text-xs text-muted-foreground">{currentSentence.model_sentence.english}</p>
                <p className="text-xs text-foreground font-medium">{currentSentence.model_sentence.dutch}</p>
              </Card>
            )}

            {/* B1 focus note */}
            {level === 'B1' && currentSentence.focus_note && (
              <div className="rounded-lg bg-muted/50 border-l-2 border-primary/40 px-3 py-2">
                <p className="text-xs text-muted-foreground">{currentSentence.focus_note}</p>
              </div>
            )}

            {/* English sentence */}
            <Card className="p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Translate to Dutch</p>
              <p className="text-base leading-relaxed text-foreground">{currentSentence.english}</p>
            </Card>

            {/* A1 tile interface */}
            {level === 'A1' && (
              <div className="space-y-3">
                {/* Placed tiles row */}
                <div className="min-h-12 rounded-xl border-2 border-dashed border-border bg-card p-3 flex flex-wrap gap-2">
                  {placedTiles.length === 0 && (
                    <span className="text-sm text-muted-foreground/50">Tap words below to build your sentence</span>
                  )}
                  {placedTiles.map((word, i) => (
                    <button
                      key={`placed-${i}-${word}`}
                      onClick={() => removeTile(word, i)}
                      className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/20"
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {/* Word bank */}
                <div className="flex flex-wrap gap-2">
                  {bankTiles.map((word, i) => (
                    <button
                      key={`bank-${i}-${word}`}
                      onClick={() => placeTile(word, i)}
                      className="rounded-full border border-primary/40 bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/5"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* A2 / B1 textarea */}
            {(level === 'A2' || level === 'B1') && (
              <div className="space-y-2">
                <textarea
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  placeholder="Write your Dutch translation here..."
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  rows={level === 'B1' ? 5 : 3}
                  className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />

                {/* A2 partial word bank (reference only) */}
                {level === 'A2' && currentSentence.partial_word_bank.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">Key words:</span>
                    {currentSentence.partial_word_bank.map((word, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleCheck}
              disabled={level === 'A1' ? a1CheckDisabled : !userInput.trim()}
            >
              Check
            </Button>
          </>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── Feedback screen ───────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────

  if (screen === 'feedback') {
    const lastItem = sessionItems[sessionItems.length - 1];
    const sentence = lastItem?.sentence ?? currentSentence;

    return (
      <div className="animate-fade-in space-y-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Feedback</span>
          <span className="text-sm text-muted-foreground tabular-nums">{currentIndex + 1} / {sessionLength}</span>
        </div>

        {sentence && (
          <>
            {/* Correct answer */}
            <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 space-y-1">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">Correct Dutch</p>
              <p className="text-base font-medium text-green-900 dark:text-green-100">{sentence.dutch_answer}</p>
            </Card>

            {/* A1: correct / review */}
            {level === 'A1' && lastItem && (
              <Card className="p-4">
                {checkA1Answer(lastItem.userAnswer.split(' ').filter(Boolean), sentence.dutch_answer) ? (
                  <p className="text-sm font-medium text-green-700">Correct</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-orange-600 mb-2">Review needed</p>
                    <p className="text-xs text-muted-foreground">Your answer: <span className="text-foreground">{lastItem.userAnswer}</span></p>
                  </>
                )}
              </Card>
            )}

            {/* A2: word-by-word diff */}
            {level === 'A2' && lastItem && (
              <Card className="p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your answer</p>
                <div className="flex flex-wrap gap-1.5">
                  {diffWords(lastItem.userAnswer, sentence.dutch_answer).map((item, i) => (
                    <span
                      key={i}
                      className={`rounded px-1.5 py-0.5 text-sm font-medium ${
                        item.status === 'correct'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                          : item.status === 'wrong-position'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                      }`}
                    >
                      {item.word}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                  <span><span className="inline-block w-2 h-2 rounded-sm bg-green-400 mr-1" />correct</span>
                  <span><span className="inline-block w-2 h-2 rounded-sm bg-orange-400 mr-1" />wrong position</span>
                  <span><span className="inline-block w-2 h-2 rounded-sm bg-red-400 mr-1" />wrong word</span>
                </div>
              </Card>
            )}

            {/* B1 annotation */}
            {level === 'B1' && (
              <Card className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Feedback</p>
                {b1Loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : b1Annotation ? (
                  <p className="text-sm text-foreground leading-relaxed">{b1Annotation}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Your answer: {lastItem?.userAnswer}</p>
                )}
              </Card>
            )}

            {/* Grammar hint */}
            <Card className="bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">{sentence.feedback_hint}</p>
            </Card>

            {/* Easy / Hard (A2 + B1) */}
            {level !== 'A1' && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">How did it go?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRate('easy')}
                    className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-colors ${
                      currentRating === 'easy'
                        ? 'border-green-400 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'border-border text-muted-foreground hover:border-green-300'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => handleRate('hard')}
                    className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-colors ${
                      currentRating === 'hard'
                        ? 'border-orange-400 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                        : 'border-border text-muted-foreground hover:border-orange-300'
                    }`}
                  >
                    Hard
                  </button>
                </div>
              </div>
            )}

            <Button className="w-full" onClick={handleNext}>
              {currentIndex + 1 >= sessionLength ? 'See results' : 'Next'}
            </Button>
          </>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── End screen ────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────

  if (screen === 'end') {
    return (
      <div className="animate-fade-in space-y-5 pb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Session complete</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{sessionLength} sentences completed</p>
        </div>

        <Card className="p-5 space-y-3">
          {level === 'A1' ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Correct</span>
                <span className="font-semibold text-green-600">{endStats.correct}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">To review</span>
                <span className="font-semibold text-orange-600">{endStats.review}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Easy</span>
                <span className="font-semibold text-green-600">{endStats.easy}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hard</span>
                <span className="font-semibold text-orange-600">{endStats.hard}</span>
              </div>
            </>
          )}
        </Card>

        {level !== 'A1' && hardGrammarTarget && (
          <Card className="bg-muted/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Next time focus on</p>
            <p className="text-sm text-foreground">{hardGrammarTarget}</p>
          </Card>
        )}

        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={() => {
              setScreen('config');
              setSessionItems([]);
              setCurrentIndex(0);
              setCurrentSentence(null);
              setError(null);
            }}
          >
            Practice again
          </Button>
          <Button variant="outline" className="w-full" onClick={onBack}>
            Back to Tasks
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
