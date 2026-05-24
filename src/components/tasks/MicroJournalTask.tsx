import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { TaskFilters, Level } from './TaskFilters';
import { generateJournalPrompt, evaluateJournalResponse, JournalPrompt, JournalFeedback } from './journalApi';

type Screen = 'config' | 'write' | 'feedback';

export function MicroJournalTask({ onBack }: { onBack: () => void }) {
  const { texts, vocabulary, pastErrors, addPastError } = useLearning();

  const completedTexts = useMemo(() =>
    texts
      .filter(t => t.completed)
      .slice(-6)
      .map(t => ({
        title: t.title,
        excerpt: t.content.split(' ').slice(0, 25).join(' ') + '…',
      })),
    [texts]
  );

  const weakWords = useMemo(() =>
    Object.values(vocabulary)
      .filter(w => w.stability !== undefined ? w.stability < 5 : w.status === 'learning')
      .sort((a, b) => (a.stability ?? 0) - (b.stability ?? 0))
      .slice(0, 10)
      .map(w => ({ dutch: w.dutch, english: w.english })),
    [vocabulary]
  );

  const [screen, setScreen] = useState<Screen>('config');
  const [level, setLevel] = useState<Level>('A1');
  const [prompt, setPrompt] = useState<JournalPrompt | null>(null);
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<JournalFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const result = await generateJournalPrompt(level, completedTexts, weakWords, false);
      setPrompt(result);
      setUserText('');
      setFeedback(null);
      setScreen('write');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!prompt || !userText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await evaluateJournalResponse(level, prompt, userText.trim(), pastErrors);
      setFeedback(result);
      // Save corrections to past errors
      for (const c of result.corrections) {
        addPastError({ type: c.reason, example: c.original, date: new Date().toISOString() });
      }
      setScreen('feedback');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleWriteAnother() {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setUserText('');
    try {
      const result = await generateJournalPrompt(level, completedTexts, weakWords, false);
      setPrompt(result);
      setScreen('write');
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
          <h2 className="font-heading text-xl font-bold text-foreground">Micro Journal</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            An AI-generated Dutch writing prompt. Write 2–4 sentences and get gentle feedback.
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

        {completedTexts.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {completedTexts.length} completed text{completedTexts.length !== 1 ? 's' : ''} — prompt will draw from your reading.
          </p>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <Button
          className="w-full gap-2 py-5 text-base font-semibold"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? <span className="animate-pulse">Generating prompt…</span> : 'Generate prompt'}
        </Button>
      </div>
    );
  }

  // ── Write screen ─────────────────────────────────────────────────────────────

  if (screen === 'write' && prompt) {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={() => setScreen('config')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <h2 className="font-heading text-xl font-bold text-foreground">Micro Journal</h2>

        {/* Prompt card */}
        <Card className="p-4 space-y-2 border-primary/20 bg-primary/5">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">Your prompt</p>
          <p className="text-sm font-medium text-foreground leading-relaxed">{prompt.prompt_nl}</p>
          <p className="text-xs text-muted-foreground italic">{prompt.prompt_en}</p>
        </Card>

        <textarea
          value={userText}
          onChange={e => setUserText(e.target.value)}
          placeholder="Schrijf hier je antwoord in het Nederlands…"
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          rows={6}
          className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />

        <p className="text-xs text-muted-foreground">Spell check is off — focus on producing the Dutch yourself.</p>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={loading || !userText.trim()}
        >
          {loading ? <span className="animate-pulse">Reading your Dutch…</span> : 'Submit'}
        </Button>
      </div>
    );
  }

  // ── Feedback screen ──────────────────────────────────────────────────────────

  if (screen === 'feedback' && feedback) {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={() => setScreen('config')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <h2 className="font-heading text-xl font-bold text-foreground">Micro Journal</h2>

        {/* What you did well */}
        <Card className="p-4 border-emerald-200 bg-emerald-50 space-y-1">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">What you did well</p>
          <p className="text-sm text-emerald-800 leading-relaxed">{feedback.wellDone}</p>
        </Card>

        {/* Corrections (up to 2) */}
        {feedback.corrections.length > 0 && (
          <Card className="p-4 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Corrections</p>
            {feedback.corrections.slice(0, 2).map((c, i) => (
              <div key={i} className="space-y-1 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-700 line-through">{c.original}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-emerald-700">{c.corrected}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-6">{c.reason}</p>
              </div>
            ))}
          </Card>
        )}

        {/* Rewritten version */}
        <Card className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rewritten version</p>
          <p className="text-sm leading-relaxed text-foreground">{feedback.rewrittenVersion}</p>
        </Card>

        {/* Level + suggestion */}
        <p className="text-xs text-muted-foreground px-1">
          <span className="font-medium text-foreground">{feedback.detectedLevel}</span>
          {feedback.suggestion ? ` · ${feedback.suggestion}` : ''}
        </p>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5" onClick={() => setScreen('config')}>
            <RotateCcw className="h-4 w-4" /> Settings
          </Button>
          <Button className="flex-1" onClick={handleWriteAnother} disabled={loading}>
            {loading ? <span className="animate-pulse">Generating…</span> : 'Write another'}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
