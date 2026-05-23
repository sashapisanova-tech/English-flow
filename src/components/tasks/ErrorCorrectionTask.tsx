import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { TaskFilters, Level } from './TaskFilters';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';
function getSavedKey() {
  return localStorage.getItem(API_KEY_STORAGE) || (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '';
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ErrorSentence {
  sentence: string;
  errorType: string;
  correction: string;
  explanation: string;
}

interface EvaluationResult {
  correct: boolean;
  feedback: string;
}

// ─── API calls ────────────────────────────────────────────────────────────────

async function generateErrorSentence(
  level: Level,
  pastErrorTypes: string[],
  textTitles: string[],
): Promise<ErrorSentence> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const system = `You are a Dutch language exercise generator. Generate a Dutch sentence with exactly one grammatical error that a real learner at the given level would plausibly make. Never invent typos or nonsense — only real grammar mistakes.

Return JSON only, no markdown:
{
  "sentence": "...",
  "errorType": "...",
  "correction": "...",
  "explanation": "..."
}

explanation must be one sentence: what was wrong and why. Example: "'ben gegaan' is correct — Dutch uses 'zijn' not 'hebben' for movement verbs like 'gaan'."`;

  const userMsg = `Level: ${level}
Past error types this user has made: ${pastErrorTypes.length > 0 ? pastErrorTypes.slice(-8).join(', ') : 'none yet'}
Completed text themes for context: ${textTitles.length > 0 ? textTitles.slice(0, 5).join(', ') : 'general daily life'}

Prioritize the user's past error types. If none, use the most common errors for this level.

A1 error types: wrong verb conjugation (present tense), missing verb, wrong main clause word order (V2 rule)
A2 error types: wrong auxiliary (ben vs heb), separable verb not split, verb not at end of subordinate clause, wrong past participle form

One error per sentence only.`;

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
  return JSON.parse(raw) as ErrorSentence;
}

async function evaluateCorrection(
  sentence: string,
  correctSentence: string,
  errorType: string,
  explanation: string,
  userAnswer: string,
): Promise<EvaluationResult> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const system = `You are a warm, encouraging Dutch language tutor. Evaluate whether the learner's correction is right, then explain what was wrong in the original sentence. Always show the correct sentence. Keep tone supportive, never clinical. One short paragraph max.

Return JSON only, no markdown:
{
  "correct": true or false,
  "feedback": "..."
}`;

  const userMsg = `Original erroneous sentence: ${sentence}
Correct version: ${correctSentence}
Error type: ${errorType}
Explanation of the error: ${explanation}
Learner's answer: ${userAnswer}

If correct: confirm + explain what was wrong in the original and why, so they understand even if they guessed.
If wrong: show the correct version, explain what was wrong in the original, and briefly note what their version did differently.`;

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
  return JSON.parse(raw) as EvaluationResult;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ErrorCorrectionTask({ onBack }: { onBack: () => void }) {
  const { texts, pastErrors, addPastError } = useLearning();

  const completedTexts = texts.filter(t => t.completed).map(t => ({ title: t.title }));
  const pastErrorTypes = pastErrors.map(e => e.type);

  const [level, setLevel] = useState<Level>('A1');
  const [started, setStarted] = useState(false);

  const [current, setCurrent]       = useState<ErrorSentence | null>(null);
  const [userAnswer, setUserAnswer]  = useState('');
  const [evaluation, setEvaluation]  = useState<EvaluationResult | null>(null);
  const [loading, setLoading]        = useState(false);
  const [error, setError]            = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function loadSentence() {
    setLoading(true);
    setError(null);
    setCurrent(null);
    setUserAnswer('');
    setEvaluation(null);
    try {
      const result = await generateErrorSentence(
        level,
        pastErrorTypes,
        completedTexts.map(t => t.title),
      );
      setCurrent(result);
      // focus input after sentence loads
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheck() {
    if (!current || !userAnswer.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await evaluateCorrection(
        current.sentence,
        current.correction,
        current.errorType,
        current.explanation,
        userAnswer.trim(),
      );
      setEvaluation(result);
      // Record error type for future personalisation
      addPastError({
        type: current.errorType,
        example: current.sentence,
        date: new Date().toISOString(),
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  // ── Config screen ──────────────────────────────────────────────────────────

  if (!started) {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Error Correction</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            A Dutch sentence with one grammar mistake. Find it, fix it, understand why.
          </p>
        </div>

        <Card className="p-4">
          <TaskFilters
            level={level}
            theme="Dagelijks leven"
            onLevelChange={setLevel}
            onThemeChange={() => {}}
            hideTheme
          />
        </Card>

        {pastErrors.length > 0 && (
          <Card className="p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your common mistakes</p>
            <div className="flex flex-wrap gap-1.5">
              {[...new Set(pastErrors.map(e => e.type))].slice(0, 6).map(type => (
                <span key={type} className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-xs text-foreground">
                  {type}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Sentences will target these patterns.</p>
          </Card>
        )}

        <Button
          className="w-full gap-2 py-5 text-base font-semibold"
          onClick={() => { setStarted(true); loadSentence(); }}
        >
          Start
        </Button>
      </div>
    );
  }

  // ── Exercise screen ────────────────────────────────────────────────────────

  return (
    <div className="animate-fade-in space-y-4 pb-6">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Tasks
      </button>

      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Error Correction</h2>
        {pastErrors.length > 0 && (
          <span className="text-xs text-muted-foreground">{pastErrors.length} corrected</span>
        )}
      </div>

      {/* Loading */}
      {loading && !current && (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground animate-pulse">Generating sentence…</p>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      )}

      {current && (
        <div className="space-y-4 animate-fade-in">
          {/* The erroneous sentence */}
          <Card className="p-4 space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">One error in this sentence</p>
            </div>
            <p className="text-base font-medium text-foreground leading-relaxed">{current.sentence}</p>
            <span className="inline-block rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground">
              {current.errorType}
            </span>
          </Card>

          {/* Answer input */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Write the corrected sentence</p>
            <textarea
              ref={inputRef}
              value={userAnswer}
              onChange={e => !evaluation && setUserAnswer(e.target.value)}
              disabled={!!evaluation || loading}
              placeholder="Type the corrected sentence…"
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              rows={3}
              className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none disabled:opacity-60"
            />
          </div>

          {/* Check button */}
          {!evaluation && (
            <Button
              className="w-full"
              onClick={handleCheck}
              disabled={loading || !userAnswer.trim()}
            >
              {loading ? 'Checking…' : 'Check'}
            </Button>
          )}

          {/* Feedback */}
          {evaluation && (
            <div className="space-y-3 animate-fade-in">
              <Card className={`p-4 space-y-2 ${evaluation.correct ? 'border-emerald-200 bg-emerald-50' : 'border-red-100 bg-red-50'}`}>
                <div className="flex items-center gap-2">
                  {evaluation.correct
                    ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    : <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                  }
                  <p className="text-sm font-semibold text-foreground">
                    {evaluation.correct ? 'Correct' : 'Not quite'}
                  </p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{evaluation.feedback}</p>
              </Card>

              {/* Always show the correct sentence */}
              {!evaluation.correct && (
                <Card className="p-4 space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Correct sentence</p>
                  <p className="text-sm font-medium text-foreground">{current.correction}</p>
                </Card>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="gap-1.5" onClick={() => { setStarted(false); setCurrent(null); setUserAnswer(''); setEvaluation(null); }}>
                  <RotateCcw className="h-4 w-4" /> Settings
                </Button>
                <Button className="flex-1" onClick={loadSentence} disabled={loading}>
                  {loading ? 'Loading…' : 'Next sentence →'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
