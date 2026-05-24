import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { TaskFilters, Level } from './TaskFilters';
import { generateJournalPrompt, evaluateJournalResponse, JournalPrompt, JournalFeedback } from './journalApi';

type Screen = 'config' | 'write' | 'feedback';

const LEVEL_HISTORY_KEY = 'dutch-detected-level-history';

function saveLevelHistory(detectedLevel: string) {
  try {
    const existing = JSON.parse(localStorage.getItem(LEVEL_HISTORY_KEY) || '[]') as { level: string; date: string }[];
    existing.push({ level: detectedLevel, date: new Date().toISOString() });
    localStorage.setItem(LEVEL_HISTORY_KEY, JSON.stringify(existing.slice(-50)));
  } catch {}
}

export function GuidedJournalTask({ onBack }: { onBack: () => void }) {
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
      .slice(0, 12)
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

  const hasEnoughData = completedTexts.length > 0;

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setPrompt(null);
    setFeedback(null);
    setUserText('');
    try {
      const result = await generateJournalPrompt(level, completedTexts, weakWords, true);
      setPrompt(result);
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
      // Save detected level history
      saveLevelHistory(result.detectedLevel);
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

  function handleReset() {
    setPrompt(null);
    setUserText('');
    setFeedback(null);
    setError(null);
    setScreen('config');
  }

  // ── Config screen ────────────────────────────────────────────────────────────

  if (screen === 'config') {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Guided Journal</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            A personal prompt anchored to texts you've read — write freely, get gentle feedback.
          </p>
        </div>

        {!hasEnoughData ? (
          <Card className="p-6 text-center space-y-2">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="font-medium text-foreground">Read some texts first</p>
            <p className="text-sm text-muted-foreground">
              Complete at least one reading text — your journal prompt will be anchored to what you've read.
            </p>
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

            <Card className="p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Based on your reading</p>
              <div className="flex flex-wrap gap-1.5">
                {completedTexts.map(t => (
                  <span key={t.title} className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-xs text-foreground">
                    {t.title}
                  </span>
                ))}
              </div>
              {weakWords.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  + {weakWords.length} vocabulary words you're still learning
                </p>
              )}
            </Card>
          </>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        {hasEnoughData && (
          <Button
            className="w-full gap-2 py-5 text-base font-semibold"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading
              ? <span className="animate-pulse">Creating your prompt…</span>
              : <><Sparkles className="h-5 w-5" /> Generate my prompt</>
            }
          </Button>
        )}
      </div>
    );
  }

  // ── Write screen ─────────────────────────────────────────────────────────────

  if (screen === 'write' && prompt) {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={handleReset} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <h2 className="font-heading text-xl font-bold text-foreground">Guided Journal</h2>

        {/* Prompt card */}
        <Card className="p-4 space-y-2 border-primary/20 bg-primary/5">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">Your prompt</p>
          <p className="text-sm font-medium text-foreground leading-relaxed">{prompt.prompt_nl}</p>
          <p className="text-xs text-muted-foreground italic">{prompt.prompt_en}</p>
        </Card>

        {/* Target words */}
        {prompt.targetWords.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Try to use these words</p>
            <div className="flex flex-wrap gap-2">
              {prompt.targetWords.map(w => (
                <span key={w} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}

        <textarea
          value={userText}
          onChange={e => setUserText(e.target.value)}
          placeholder="Schrijf hier in het Nederlands…"
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

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerate} className="gap-1.5" disabled={loading}>
            <RotateCcw className="h-4 w-4" /> New prompt
          </Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading || !userText.trim()}>
            {loading ? <span className="animate-pulse">Reading your Dutch…</span> : 'Submit'}
          </Button>
        </div>
      </div>
    );
  }

  // ── Feedback screen ──────────────────────────────────────────────────────────

  if (screen === 'feedback' && feedback) {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={handleReset} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <h2 className="font-heading text-xl font-bold text-foreground">Guided Journal</h2>

        {/* Detected level badge */}
        <div>
          <span className="inline-block rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground">
            Your writing level: {feedback.detectedLevel}
          </span>
        </div>

        {/* What you did well */}
        <Card className="p-4 border-emerald-200 bg-emerald-50 space-y-1">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">What you did well</p>
          <p className="text-sm text-emerald-800 leading-relaxed">{feedback.wellDone}</p>
        </Card>

        {/* Corrections (up to 2) */}
        {feedback.corrections.length > 0 ? (
          <Card className="p-4 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Grammar notes</p>
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
        ) : (
          <Card className="p-4">
            <p className="text-sm font-medium text-emerald-700">No significant errors — well written!</p>
          </Card>
        )}

        {/* Rewritten version */}
        <Card className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rewritten version</p>
          <p className="text-sm leading-relaxed text-foreground">{feedback.rewrittenVersion}</p>
        </Card>

        {/* Suggestion */}
        {feedback.suggestion && (
          <p className="text-xs text-muted-foreground px-1">{feedback.suggestion}</p>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <Button className="w-full gap-2" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" /> Write another entry
        </Button>
      </div>
    );
  }

  return null;
}
