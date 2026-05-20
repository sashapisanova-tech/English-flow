import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, Sparkles, BookOpen, Languages } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { TappableDutchText } from '@/components/TappableDutchText';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';

type Mode = 'read' | 'translate';
type Theme = 'daily life' | 'adventure' | 'mystery' | 'any';
type Level = 'A1' | 'A2' | 'B1';

interface StoryResponse {
  title: string;
  dutch_sentences: string[];
  english_sentences?: string[];
  new_words: { dutch: string; english: string }[];
  words_used: string[];
}

const SYSTEM_PROMPT = `You are a Dutch language story generator for a beginner language learning app. Your job is to generate short, pedagogically sound Dutch stories based on a list of vocabulary words provided by the user.
You will always return a JSON object. Nothing else — no preamble, no explanation, no markdown fences.

Input you will receive:
words: an array of Dutch vocabulary words the learner has saved
level: the learner's CEFR level (A1, A2, or B1)
theme: optional story theme (e.g. "daily life", "adventure", "mystery", or "any")
mode: either "read" (Dutch story only) or "translate" (Dutch + aligned English sentences)

Story writing rules — follow these strictly:
- The story must be 120–180 words long in Dutch.
- Every word in the words array must appear in the story at least once.
- Introduce at most 2–3 words NOT in the words array. Mark them as new words.
- Sentence length: A1 = 4–7 words, A2 = 6–12 words, B1 = up to 16 words.
- Grammar: A1 = present tense only, simple SVO, basic conjunctions (en, maar, want). A2 = present + simple past (was, had, ging), basic subordinate clauses. B1 = present, past, future (gaan + infinitive), relative clauses allowed.
- Do NOT use subjunctive, passive voice, or complex modal constructions at A1/A2.
- Dutch word order must be correct: verb-second (V2) in main clauses, verb-final in subordinate clauses.
- The story must feel like a real short narrative with a beginning, middle, and small resolution.
- Give the story a short Dutch title (3–5 words).

Return this exact JSON shape:
{
  "title": "string (3–5 Dutch words)",
  "dutch_sentences": ["sentence 1", "sentence 2", ...],
  "english_sentences": ["translation 1", "translation 2", ...],
  "new_words": [{"dutch": "word", "english": "translation"}, ...],
  "words_used": ["word1", "word2", ...]
}

For mode "read", still include english_sentences as an empty array [].
words_used must list every word from the input words array that actually appears in the story.`;

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

async function generateStory(
  words: string[],
  level: Level,
  theme: Theme,
  mode: Mode,
): Promise<StoryResponse> {
  const apiKey = getSavedKey();
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('NO_KEY');
  }

  const userMessage = `words: ${JSON.stringify(words)}\nlevel: ${level}\ntheme: ${theme}\nmode: ${mode}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `API error ${res.status}`);
  }

  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as StoryResponse;
}

function normalize(s: string) {
  return s.replace(/[.,!?;:]/g, '').toLowerCase().trim();
}

export function StoryTask({ onBack }: { onBack: () => void }) {
  const { vocabulary } = useLearning();
  const [level, setLevel] = useState<Level>('A1');
  const [theme, setTheme] = useState<Theme>('any');
  const [mode, setMode] = useState<Mode>('read');
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const savedWords = useMemo(() => Object.keys(vocabulary), [vocabulary]);

  const knownSet = useMemo(() => {
    if (!story) return new Set<string>();
    return new Set(story.words_used.map(w => w.toLowerCase()));
  }, [story]);

  const newWordSet = useMemo(() => {
    if (!story) return new Set<string>();
    return new Set(story.new_words.map(w => w.dutch.toLowerCase()));
  }, [story]);

  async function handleGenerate() {
    if (savedWords.length === 0) return;
    setLoading(true);
    setError(null);
    setStory(null);
    try {
      const result = await generateStory(savedWords, level, theme, mode);
      setStory(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key not found.' : msg);
    } finally {
      setLoading(false);
    }
  }

  const themes: { value: Theme; label: string }[] = [
    { value: 'any', label: 'Any' },
    { value: 'daily life', label: 'Daily life' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'mystery', label: 'Mystery' },
  ];

  const levels: Level[] = ['A1', 'A2', 'B1'];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">{savedWords.length} words saved</Badge>
      </div>

      {/* Info card */}
      <Card className="bg-purple-50 border-purple-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">AI Story Generator</span>
        </div>
        <p className="text-xs text-purple-600">
          A story is written using your saved flashcard words.{' '}
          <span className="font-semibold text-orange-500">Orange</span> = your words.{' '}
          <span className="font-semibold text-purple-600">Purple</span> = new words.
        </p>
      </Card>


      {savedWords.length === 0 ? (
        <Card className="p-6 text-center space-y-2">
          <p className="font-medium text-foreground">No saved words yet</p>
          <p className="text-sm text-muted-foreground">Save words from reading texts first, then come back here.</p>
        </Card>
      ) : (
        <>
          {/* Controls */}
          <div className="space-y-3">
            {/* Level */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Level</p>
              <div className="flex gap-2">
                {levels.map(l => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`flex-1 rounded-lg border-2 py-2 text-sm font-semibold transition-all ${
                      level === l
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Theme</p>
              <div className="grid grid-cols-2 gap-2">
                {themes.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                      theme === t.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Mode</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('read')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                    mode === 'read'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" /> Dutch only
                </button>
                <button
                  onClick={() => setMode('translate')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                    mode === 'translate'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Languages className="h-3.5 w-3.5" /> + English
                </button>
              </div>
            </div>
          </div>

          <Button
            className="w-full gap-2"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                Writing your story…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {story ? 'Generate new story' : 'Generate story'}
              </>
            )}
          </Button>

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}
        </>
      )}

      {/* Story display */}
      {story && (
        <div className="space-y-3 animate-fade-in">
          <h2 className="font-heading text-xl font-bold text-foreground text-center">{story.title}</h2>

          <Card className="p-4 space-y-2">
            {story.dutch_sentences.map((sentence, i) => (
              <div key={i} className="space-y-0.5">
                <p className="text-sm leading-relaxed text-foreground relative">
                  <TappableDutchText text={sentence} highlightWords={knownSet} newWords={newWordSet} />
                </p>
                {mode === 'translate' && story.english_sentences?.[i] && (
                  <p className="text-xs text-muted-foreground italic">{story.english_sentences[i]}</p>
                )}
              </div>
            ))}
          </Card>

          {/* New words */}
          {story.new_words.length > 0 && (
            <Card className="p-4 space-y-2">
              <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wide">New words in this story</h3>
              <div className="space-y-1">
                {story.new_words.map((w, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="font-semibold text-purple-600">{w.dutch}</span>
                    <span className="text-muted-foreground">{w.english}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Words used chip list */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Your words used ({story.words_used.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {story.words_used.map((w, i) => (
                <span key={i} className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">{w}</span>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
            <RotateCcw className="h-3.5 w-3.5" /> Generate another story
          </Button>
        </div>
      )}
    </div>
  );
}
