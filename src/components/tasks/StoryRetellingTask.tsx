import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft, Volume2, Mic, ChevronRight,
  Sparkles, RotateCcw, Loader2, BookOpen, Star,
  CheckCircle2, XCircle, ChevronDown, ChevronUp,
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useCustomSets } from '@/hooks/useCustomSets';
import { flashcardSets } from '@/data/flashcardSets';
import { playDutch, stopDutch } from '@/utils/playDutch';

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = 'setup' | 'generating' | 'reading' | 'retelling' | 'evaluating' | 'feedback';
type WordSource = 'my-words' | 'set' | 'custom';
type Level = 'A1' | 'A2' | 'B1';
type Theme = 'any' | 'daily life' | 'adventure' | 'mystery';

interface GeneratedStory {
  title: string;
  dutch_sentences: string[];
  outline: string[];
  key_words: { dutch: string; english: string }[];
  new_words: { dutch: string; english: string }[];
  words_used: string[];
}

interface RetellingFeedback {
  score: number;
  covered_points: string[];
  missing_points: string[];
  vocabulary_feedback: string;
  grammar_feedback: string;
  encouragement: string;
}

// ─── API helpers ─────────────────────────────────────────────────────────────

const API_KEY_STORAGE = 'dutch-app-anthropic-key';
function getSavedKey() {
  return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

const STORY_PROMPT = `You are a Dutch language story generator for a beginner language learning app.
Generate a short Dutch story optimised for retelling practice.
Return ONLY a valid JSON object — no markdown fences, no extra text.

JSON shape:
{
  "title": "Short Dutch title (3–5 words)",
  "dutch_sentences": ["sentence 1", "sentence 2", ...],
  "outline": ["Stage 1 in English", "Stage 2 in English", "Stage 3 in English"],
  "key_words": [{"dutch": "...", "english": "..."}, ...],
  "new_words": [{"dutch": "...", "english": "..."}, ...],
  "words_used": ["word1", ...]
}

Rules:
- Story: 90–130 words total, exactly 3 narrative stages matching outline[0–2].
- Use every word from the input list at least once. Introduce at most 3 new words.
- key_words: 6–8 words most needed to retell the story (critical nouns, verbs, adjectives).
- A1: present tense, SVO, 4–8 words/sentence. A2: +simple past, up to 12 words. B1: +future, relative clauses.
- Correct Dutch V2 word order in main clauses. No passive/subjunctive at A1/A2.`;

const EVAL_PROMPT = `You are a Dutch language teacher evaluating a beginner's story retelling.
Return ONLY a valid JSON object — no markdown fences, no extra text.

{
  "score": <1–5>,
  "covered_points": ["what the student included correctly"],
  "missing_points": ["main things that were missed or unclear"],
  "vocabulary_feedback": "One sentence on their word choices (specific + encouraging).",
  "grammar_feedback": "One gentle grammar observation appropriate for A1 level.",
  "encouragement": "One motivating closing sentence."
}

Scoring: 1=very little, 2=some gaps, 3=most points, 4=all main points, 5=complete+fluent. Be encouraging.`;

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
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `API error ${res.status}`);
  }
  const data = await res.json() as { content: { text: string }[] };
  return data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`h-5 w-5 ${n <= score ? 'fill-amber-400 text-amber-400' : 'text-border'}`}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function StoryRetellingTask({ onBack }: { onBack: () => void }) {
  const { vocabulary } = useLearning();
  const { sets: customSets } = useCustomSets();

  // Setup state
  const [wordSource, setWordSource] = useState<WordSource>('my-words');
  const [selectedSetId, setSelectedSetId] = useState<string>('');
  const [customWords, setCustomWords] = useState('');
  const [level, setLevel] = useState<Level>('A1');
  const [theme, setTheme] = useState<Theme>('any');
  const [showSetPicker, setShowSetPicker] = useState(false);

  // Story state
  const [phase, setPhase] = useState<Phase>('setup');
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Retelling state
  const [transcript, setTranscript] = useState('');

  // Feedback state
  const [feedback, setFeedback] = useState<RetellingFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Derived word lists
  const myWordsList = useMemo(() => Object.keys(vocabulary), [vocabulary]);

  const allSets = useMemo(() => {
    const builtIn = flashcardSets.map(s => ({
      id: s.id, title: s.title, emoji: s.emoji,
      words: s.words.map(w => w.dutch),
      source: 'built-in' as const,
    }));
    const custom = customSets.map(s => ({
      id: s.id, title: s.title, emoji: s.emoji,
      words: s.words.map(w => w.dutch),
      source: 'custom' as const,
    }));
    return [...custom, ...builtIn];
  }, [customSets]);

  const selectedSet = allSets.find(s => s.id === selectedSetId);

  function getWordsForGeneration(): string[] {
    if (wordSource === 'my-words') return myWordsList.slice(0, 25);
    if (wordSource === 'set' && selectedSet) return selectedSet.words;
    if (wordSource === 'custom') {
      return customWords.split(/[\n,]+/).map(w => w.trim()).filter(Boolean);
    }
    return [];
  }

  // ── Generate story ──
  async function handleGenerate() {
    const words = getWordsForGeneration();
    if (words.length === 0) return;
    setPhase('generating');
    setError(null);
    setStory(null);
    setTranscript('');
    setFeedback(null);
    try {
      const userMsg = `words: ${JSON.stringify(words)}\nlevel: ${level}\ntheme: ${theme}`;
      const raw = await callClaude(STORY_PROMPT, userMsg);
      const parsed = JSON.parse(raw) as GeneratedStory;
      setStory(parsed);
      setPhase('reading');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'No Anthropic API key found. Add it in the My Story task.' : msg);
      setPhase('setup');
    }
  }

  // ── TTS ──
  function handlePlay() {
    if (!story) return;
    if (isPlaying) { stopDutch(); setIsPlaying(false); return; }
    playDutch(story.dutch_sentences.join(' '), {
      rate: 0.82,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  }

  // ── Evaluate ──
  async function handleEvaluate() {
    if (!story || !transcript.trim()) return;
    setPhase('evaluating');
    try {
      const userMsg =
        `ORIGINAL STORY:\n${story.dutch_sentences.join(' ')}\n\n` +
        `STORY OUTLINE:\n${story.outline.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n` +
        `STUDENT'S RETELLING:\n${transcript.trim()}`;
      const raw = await callClaude(EVAL_PROMPT, userMsg);
      const parsed = JSON.parse(raw) as RetellingFeedback;
      setFeedback(parsed);
      setPhase('feedback');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Evaluation failed');
      setPhase('retelling');
    }
  }

  function tryAgain() {
    setTranscript('');
    setFeedback(null);
    setPhase('retelling');
  }

  function newStory() {
    setPhase('setup');
    setStory(null);
    setTranscript('');
    setFeedback(null);
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  // Header (shared)
  const header = (
    <div className="flex items-center gap-2">
      <button
        onClick={phase === 'retelling' ? () => setPhase('reading') : phase === 'reading' ? newStory : onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {phase === 'retelling' ? 'Back to story' : phase === 'reading' ? 'Change story' : 'Tasks'}
      </button>
    </div>
  );

  // ── SETUP ──
  if (phase === 'setup' || phase === 'generating') {
    const words = getWordsForGeneration();
    const levels: Level[] = ['A1', 'A2', 'B1'];
    const themes: { value: Theme; label: string }[] = [
      { value: 'any', label: 'Any' },
      { value: 'daily life', label: 'Daily life' },
      { value: 'adventure', label: 'Adventure' },
      { value: 'mystery', label: 'Mystery' },
    ];
    const sourceTabs: { id: WordSource; label: string }[] = [
      { id: 'my-words', label: 'My vocabulary' },
      { id: 'set', label: 'Flashcard set' },
      { id: 'custom', label: 'Enter words' },
    ];

    return (
      <div className="animate-fade-in space-y-5">
        {header}

        <Card className="bg-rose-50 border-rose-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-rose-700 uppercase tracking-wide">Story Retelling</span>
          </div>
          <p className="text-xs text-rose-600 leading-relaxed">
            Read a short Dutch story, then hide it and retell it aloud using the outline and key words as support.
          </p>
        </Card>

        {error && (
          <Card className="border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        {/* Word source */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Word source</p>
          <div className="flex flex-col gap-2">
            {sourceTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setWordSource(tab.id)}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                  wordSource === tab.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <span className="text-sm font-medium text-foreground">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Set picker */}
          {wordSource === 'set' && (
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-3 bg-secondary/30 text-sm"
                onClick={() => setShowSetPicker(v => !v)}
              >
                <span className="font-medium">
                  {selectedSet ? `${selectedSet.emoji} ${selectedSet.title}` : 'Choose a set…'}
                </span>
                {showSetPicker ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {showSetPicker && (
                <div className="max-h-48 overflow-y-auto divide-y divide-border">
                  {allSets.map(s => (
                    <button
                      key={s.id}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                        selectedSetId === s.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-secondary'
                      }`}
                      onClick={() => { setSelectedSetId(s.id); setShowSetPicker(false); }}
                    >
                      <span>{s.emoji}</span>
                      <span>{s.title}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{s.words.length}w</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom words */}
          {wordSource === 'custom' && (
            <div>
              <Textarea
                value={customWords}
                onChange={e => setCustomWords(e.target.value)}
                placeholder="Enter Dutch words, one per line or separated by commas&#10;e.g. fiets, huis, eten, werken, mooi"
                className="text-sm min-h-[100px] font-mono"
              />
              {customWords.trim() && (
                <p className="text-xs text-muted-foreground mt-1">
                  {customWords.split(/[\n,]+/).map(w => w.trim()).filter(Boolean).length} words
                </p>
              )}
            </div>
          )}
        </div>

        {/* Level */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Level</p>
          <div className="flex gap-2">
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`flex-1 rounded-lg border-2 py-2 text-sm font-semibold transition-all ${
                  level === l ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Theme</p>
          <div className="grid grid-cols-2 gap-2">
            {themes.map(t => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                  theme === t.value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <Button
          className="w-full gap-2"
          onClick={handleGenerate}
          disabled={
            phase === 'generating' ||
            words.length === 0 ||
            (wordSource === 'set' && !selectedSetId)
          }
        >
          {phase === 'generating' ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Generating story…</>
          ) : (
            <><Sparkles className="h-4 w-4" /> Generate story</>
          )}
        </Button>

        {wordSource === 'my-words' && myWordsList.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Save some words from reading texts first.
          </p>
        )}
      </div>
    );
  }

  // ── READING ──
  if (phase === 'reading' && story) {
    return (
      <div className="animate-fade-in space-y-5">
        {header}

        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">{story.title}</h2>
          <Button variant="outline" size="sm" onClick={handlePlay} className={`gap-1.5 shrink-0 ${isPlaying ? 'border-primary text-primary' : ''}`}>
            <Volume2 className="h-4 w-4" /> {isPlaying ? 'Stop' : 'Listen'}
          </Button>
        </div>

        <Card className="p-5 space-y-2 leading-relaxed">
          {story.dutch_sentences.map((s, i) => (
            <p key={i} className="text-sm text-foreground">{s}</p>
          ))}
        </Card>

        {story.new_words.length > 0 && (
          <Card className="p-4 space-y-2">
            <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">New words in this story</p>
            <div className="flex flex-wrap gap-2">
              {story.new_words.map((w, i) => (
                <span key={i} className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                  {w.dutch} · {w.english}
                </span>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-4 bg-amber-50 border-amber-200">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Read the story carefully</p>
          <p className="text-xs text-amber-600">
            Listen and read a few times. When ready, you'll retell it from memory using an outline and key words.
          </p>
        </Card>

        <Button className="w-full gap-2" onClick={() => { stopDutch(); setIsPlaying(false); setPhase('retelling'); }}>
          <Mic className="h-4 w-4" /> I'm ready to retell <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // ── RETELLING ──
  if (phase === 'retelling' && story) {
    return (
      <div className="animate-fade-in space-y-5">
        {header}

        {/* Outline */}
        <Card className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Story outline
          </p>
          <ol className="space-y-1.5">
            {story.outline.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                {point}
              </li>
            ))}
          </ol>
        </Card>

        {/* Key words */}
        <Card className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key words</p>
          <div className="flex flex-wrap gap-2">
            {story.key_words.map((kw, i) => (
              <div key={i} className="rounded-lg border border-border bg-secondary/40 px-2.5 py-1">
                <span className="text-sm font-semibold text-foreground">{kw.dutch}</span>
                <span className="text-xs text-muted-foreground ml-1.5">{kw.english}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recording */}
        <Card className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Mic className="h-3.5 w-3.5" /> Retell the story in Dutch
          </p>

          <Textarea
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            placeholder="Type the story in your own Dutch words…"
            className="text-sm min-h-[120px]"
          />
        </Card>

        <Button
          className="w-full gap-2"
          onClick={handleEvaluate}
          disabled={!transcript.trim()}
        >
          <Sparkles className="h-4 w-4" /> Get feedback
        </Button>
      </div>
    );
  }

  // ── EVALUATING ──
  if (phase === 'evaluating') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Evaluating your retelling…</p>
      </div>
    );
  }

  // ── FEEDBACK ──
  if (phase === 'feedback' && feedback && story) {
    return (
      <div className="animate-fade-in space-y-4">
        {header}

        {/* Score */}
        <Card className="p-5 space-y-2 text-center">
          <div className="flex justify-center"><StarRating score={feedback.score} /></div>
          <p className="text-sm text-muted-foreground">{feedback.score}/5</p>
        </Card>

        {/* Covered / missing */}
        {feedback.covered_points.length > 0 && (
          <Card className="p-4 space-y-2">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> What you covered
            </p>
            <ul className="space-y-1">
              {feedback.covered_points.map((p, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0">✓</span> {p}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {feedback.missing_points.length > 0 && (
          <Card className="p-4 space-y-2">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
              <XCircle className="h-3.5 w-3.5" /> To work on
            </p>
            <ul className="space-y-1">
              {feedback.missing_points.map((p, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-amber-500 shrink-0">→</span> {p}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Feedback notes */}
        <Card className="p-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Vocabulary</p>
            <p className="text-sm text-foreground">{feedback.vocabulary_feedback}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Grammar</p>
            <p className="text-sm text-foreground">{feedback.grammar_feedback}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Keep going</p>
            <p className="text-sm text-foreground font-medium">{feedback.encouragement}</p>
          </div>
        </Card>

        {/* Your retelling */}
        <details className="rounded-xl border border-border overflow-hidden">
          <summary className="cursor-pointer px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-secondary/30 hover:bg-secondary/50 transition-colors">
            Your retelling (tap to review)
          </summary>
          <div className="p-4">
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{transcript}</p>
          </div>
        </details>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2" onClick={tryAgain}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
          <Button className="flex-1 gap-2" onClick={newStory}>
            <Sparkles className="h-4 w-4" /> New story
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
