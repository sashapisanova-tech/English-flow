import { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { TaskFilters, Level } from './TaskFilters';

const API_KEY_STORAGE = 'english-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '';
}

interface CompatibilityResult {
  approved: boolean;
  words: string[];
  hint: string;
}

interface FeedbackResult {
  allWordsUsed: boolean;
  grammaticallyValid: boolean;
  feedback: string;
  correctedVersion: string;
}

async function checkCompatibility(
  level: Level,
  candidateWords: string[],
  allWords: string[],
): Promise<CompatibilityResult> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const system = `You are an English vocabulary exercise assistant. Given 3 English words, confirm they can plausibly appear together in one natural English sentence. If not, suggest replacing the least compatible word with a semantically compatible alternative from the given vocabulary list. Return JSON only: { "approved": true/false, "words": ["word1","word2","word3"], "hint": "" }`;

  const userMsg = `Level: ${level}\nCandidate words: ${candidateWords.join(', ')}\nFull vocabulary list (for replacement if needed): ${allWords.slice(0, 30).join(', ')}`;

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
      max_tokens: 300,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const result = JSON.parse(raw) as CompatibilityResult;
  // A1: hint is populated by API; A2: clear hint
  if (level !== 'A1') result.hint = '';
  return result;
}

async function evaluateSentence(
  level: Level,
  words: string[],
  userSentence: string,
): Promise<FeedbackResult> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const system = `Evaluate whether the learner used all 3 target words correctly in a grammatically valid English sentence. Do not penalize creativity. Return JSON only: { "allWordsUsed": true/false, "grammaticallyValid": true/false, "feedback": "...", "correctedVersion": "" }`;

  const userMsg = `Level: ${level}\nTarget words: ${words.join(', ')}\nLearner's sentence: ${userSentence}`;

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
      max_tokens: 400,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as FeedbackResult;
}

type Screen = 'config' | 'loading' | 'exercise' | 'feedback';

export function SentenceBuilderTask({ onBack }: { onBack: () => void }) {
  const { vocabulary, addPastError } = useLearning();

  const allVocabWords = useMemo(() =>
    Object.values(vocabulary).sort((a, b) => (a.stability ?? 0) - (b.stability ?? 0)),
    [vocabulary]
  );

  const [level, setLevel] = useState<Level>('A1');
  const [screen, setScreen] = useState<Screen>('config');
  const [words, setWords] = useState<string[]>([]);
  const [hint, setHint] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [feedbackResult, setFeedbackResult] = useState<FeedbackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasFewWords = allVocabWords.length < 3;

  function pickCandidateWords() {
    const len = allVocabWords.length;
    const weak   = allVocabWords[0];
    const medium = allVocabWords[Math.floor(len / 3)];
    const strong = allVocabWords[Math.floor(len * 2 / 3)];
    return [weak.dutch, medium.dutch, strong.dutch];
  }

  async function startExercise() {
    if (hasFewWords) return;
    setLoading(true);
    setError(null);
    setScreen('loading');
    setFeedbackResult(null);
    setUserSentence('');

    try {
      const candidates = pickCandidateWords();
      const allWordsList = allVocabWords.map(w => w.dutch);
      const result = await checkCompatibility(level, candidates, allWordsList);
      setWords(result.words);
      setHint(result.hint);
      setScreen('exercise');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
      setScreen('config');
    } finally {
      setLoading(false);
    }
  }

  async function handleCheck() {
    if (!userSentence.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await evaluateSentence(level, words, userSentence.trim());
      setFeedbackResult(result);
      if (!result.allWordsUsed || !result.grammaticallyValid) {
        addPastError({
          type: 'sentence construction',
          example: userSentence.trim(),
          date: new Date().toISOString(),
        });
      }
      setScreen('feedback');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  // ── Config screen ────────────────────────────────────────────────────────────

  if (screen === 'config') {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Sentence Builder</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Write one natural English sentence using three words from your vocabulary.
          </p>
        </div>

        {hasFewWords ? (
          <Card className="p-6 text-center space-y-2">
            <p className="font-medium text-foreground">Not enough vocabulary</p>
            <p className="text-sm text-muted-foreground">Save at least 3 vocabulary words first.</p>
          </Card>
        ) : (
          <>
            <Card className="p-4">
              <TaskFilters
                level={level}
                theme="Dagelijks leven"
                onLevelChange={setLevel}
                onThemeChange={() => {}}
                hideTheme
              />
            </Card>

            {error && (
              <Card className="border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </Card>
            )}

            <Button
              className="w-full gap-2 py-5 text-base font-semibold"
              onClick={startExercise}
              disabled={loading}
            >
              Start
            </Button>
          </>
        )}
      </div>
    );
  }

  // ── Loading screen ───────────────────────────────────────────────────────────

  if (screen === 'loading') {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground animate-pulse">Picking your words…</p>
        </Card>
      </div>
    );
  }

  // ── Exercise screen ──────────────────────────────────────────────────────────

  if (screen === 'exercise') {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={() => setScreen('config')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <h2 className="font-heading text-xl font-bold text-foreground">Sentence Builder</h2>

        {/* Word chips */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Use all three words in one sentence</p>
          <div className="flex flex-wrap gap-2">
            {words.map(w => (
              <span
                key={w}
                className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary"
              >
                {w}
              </span>
            ))}
          </div>
          {hint && (
            <p className="text-xs text-muted-foreground">{hint}</p>
          )}
        </div>

        <textarea
          value={userSentence}
          onChange={e => setUserSentence(e.target.value)}
          placeholder="Schrijf je zin hier…"
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          rows={3}
          className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <Button
          className="w-full"
          onClick={handleCheck}
          disabled={loading || !userSentence.trim()}
        >
          {loading ? <span className="animate-pulse">Checking…</span> : 'Check'}
        </Button>
      </div>
    );
  }

  // ── Feedback screen ──────────────────────────────────────────────────────────

  if (screen === 'feedback' && feedbackResult) {
    const success = feedbackResult.allWordsUsed && feedbackResult.grammaticallyValid;
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={() => setScreen('config')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <h2 className="font-heading text-xl font-bold text-foreground">Sentence Builder</h2>

        {success ? (
          <Card className="p-4 border-emerald-200 bg-emerald-50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              <p className="text-sm font-semibold text-emerald-800">Well done!</p>
            </div>
            <p className="text-sm text-emerald-800 leading-relaxed">{feedbackResult.feedback}</p>
          </Card>
        ) : (
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400 shrink-0" />
              <p className="text-sm font-semibold text-foreground">Not quite</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{feedbackResult.feedback}</p>
            {feedbackResult.correctedVersion && (
              <div className="space-y-1 border-t border-border pt-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Suggested version</p>
                <p className="text-sm font-medium text-foreground">{feedbackResult.correctedVersion}</p>
              </div>
            )}
          </Card>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5" onClick={() => setScreen('config')}>
            <RotateCcw className="h-4 w-4" /> Settings
          </Button>
          <Button className="flex-1" onClick={startExercise} disabled={loading}>
            {loading ? <span className="animate-pulse">Loading…</span> : 'New words'}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
