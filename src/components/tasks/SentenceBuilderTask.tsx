import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { TaskFilters, Level, Theme } from './TaskFilters';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

interface Sentence {
  dutch: string;
  english: string;
}

interface GenerateResponse {
  sentences: Sentence[];
}

async function generateSentences(level: Level, theme: Theme): Promise<GenerateResponse> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');
  const system = `You are a Dutch language teacher creating sentence-building exercises.
Generate 5 Dutch sentences for level ${level} about the theme "${theme}".
Each sentence should be 4-7 words. Return ONLY this JSON:
{
  "sentences": [
    {"dutch": "Ik ga morgen naar de winkel.", "english": "I am going to the store tomorrow."},
    ...
  ]
}`;
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
      max_tokens: 512,
      system,
      messages: [{ role: 'user', content: `Generate sentences for level ${level}, theme: ${theme}` }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as GenerateResponse;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Screen = 'filter' | 'practice' | 'done';

interface WordTile {
  word: string;
  id: number; // unique key even if word repeats
}

export function SentenceBuilderTask({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>('filter');
  const [level, setLevel] = useState<Level>('A2');
  const [theme, setTheme] = useState<Theme>('Dagelijks leven');
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Practice state
  const [roundIndex, setRoundIndex] = useState(0);
  const [pool, setPool] = useState<WordTile[]>([]);
  const [placed, setPlaced] = useState<WordTile[]>([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const result = await generateSentences(level, theme);
      setSentences(result.sentences);
      startRound(result.sentences, 0);
      setScore(0);
      setScreen('practice');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in settings first.' : msg);
    } finally {
      setLoading(false);
    }
  }

  function startRound(sentenceList: Sentence[], idx: number) {
    const s = sentenceList[idx];
    const words = s.dutch.replace(/[.,!?]/g, '').split(' ');
    const tiles: WordTile[] = shuffle(words).map((w, i) => ({ word: w, id: i }));
    setPool(tiles);
    setPlaced([]);
    setChecked(false);
    setCorrect(false);
    setRoundIndex(idx);
  }

  function handleTileFromPool(tile: WordTile) {
    setPool(prev => prev.filter(t => t.id !== tile.id));
    setPlaced(prev => [...prev, tile]);
  }

  function handleTileFromPlaced(tile: WordTile) {
    setPlaced(prev => prev.filter(t => t.id !== tile.id));
    setPool(prev => [...prev, tile]);
  }

  function handleCheck() {
    const current = sentences[roundIndex];
    const answer = placed.map(t => t.word).join(' ');
    const target = current.dutch.replace(/[.,!?]/g, '');
    const isCorrect = answer.toLowerCase() === target.toLowerCase();
    setChecked(true);
    setCorrect(isCorrect);
    if (isCorrect) setScore(s => s + 1);
  }

  function handleNext() {
    const nextIdx = roundIndex + 1;
    if (nextIdx >= sentences.length) {
      setScreen('done');
    } else {
      startRound(sentences, nextIdx);
    }
  }

  function handleReset() {
    setScreen('filter');
    setSentences([]);
    setScore(0);
    setError(null);
  }

  const currentSentence = sentences[roundIndex];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={screen === 'filter' ? onBack : handleReset}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {screen === 'filter' ? 'Tasks' : 'Tasks'}
        </button>
        {screen === 'practice' && (
          <span className="text-sm text-muted-foreground">{roundIndex + 1} / {sentences.length}</span>
        )}
      </div>

      {/* Info card */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Sentence Builder</p>
        <p className="text-xs text-blue-700">
          Tap word tiles to arrange them into the correct Dutch sentence.
        </p>
      </Card>

      {/* Filter screen */}
      {screen === 'filter' && (
        <div className="space-y-4">
          <TaskFilters level={level} theme={theme} onLevelChange={setLevel} onThemeChange={setTheme} />

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}

          <Button className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : <><Sparkles className="h-4 w-4" /> Generate sentences</>}
          </Button>
        </div>
      )}

      {/* Practice screen */}
      {screen === 'practice' && currentSentence && (
        <div className="space-y-4 animate-fade-in">
          {/* English hint */}
          <Card className="p-4 bg-amber-50 border-amber-200">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Translate to Dutch</p>
            <p className="text-sm font-medium text-foreground">{currentSentence.english}</p>
          </Card>

          {/* Placed words area */}
          <div className="min-h-[56px] rounded-xl border-2 border-dashed border-border bg-card p-3 flex flex-wrap gap-2 items-center">
            {placed.length === 0 && (
              <span className="text-xs text-muted-foreground">Tap words below to place them here…</span>
            )}
            {placed.map(tile => (
              <button
                key={tile.id}
                onClick={() => !checked && handleTileFromPlaced(tile)}
                disabled={checked}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  checked
                    ? correct
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {tile.word}
              </button>
            ))}
          </div>

          {/* Word pool */}
          <div className="flex flex-wrap gap-2">
            {pool.map(tile => (
              <button
                key={tile.id}
                onClick={() => !checked && handleTileFromPool(tile)}
                disabled={checked}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:border-primary/40 transition-colors disabled:opacity-50"
              >
                {tile.word}
              </button>
            ))}
          </div>

          {/* Result message */}
          {checked && (
            <Card className={`p-3 ${correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              {correct ? (
                <p className="text-sm font-medium text-green-700">Correct!</p>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-700">Not quite. The correct sentence:</p>
                  <p className="text-sm text-foreground font-semibold">{currentSentence.dutch}</p>
                </div>
              )}
            </Card>
          )}

          {/* Action buttons */}
          {!checked ? (
            <Button
              className="w-full"
              onClick={handleCheck}
              disabled={placed.length === 0}
            >
              Check
            </Button>
          ) : (
            <Button className="w-full" onClick={handleNext}>
              {roundIndex + 1 >= sentences.length ? 'See results' : 'Next'}
            </Button>
          )}
        </div>
      )}

      {/* Done screen */}
      {screen === 'done' && (
        <div className="space-y-4 animate-fade-in">
          <Card className="p-6 text-center space-y-2">
            <p className="text-3xl font-bold text-foreground">{score} / {sentences.length}</p>
            <p className="text-sm text-muted-foreground">
              {score === sentences.length
                ? 'Perfect score!'
                : score >= Math.ceil(sentences.length / 2)
                ? 'Good work!'
                : 'Keep practising!'}
            </p>
          </Card>

          <Button className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : <><RotateCcw className="h-4 w-4" /> Try again</>}
          </Button>

          <Button variant="outline" className="w-full" onClick={handleReset}>
            Change filters
          </Button>
        </div>
      )}
    </div>
  );
}
