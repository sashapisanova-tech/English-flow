import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Volume2, BookmarkPlus, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pip } from '@/components/Pip';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { getTextReadHistory } from '@/lib/textReadHistory';
import { playDutch } from '@/utils/playDutch';
import {
  canGenerate, generateExpression, loadLocal, loadRemote, newerState, saveLocal, saveRemote,
  withNewExpression, type DailyExpressionState,
} from '@/lib/dailyExpression';

const eyebrow = 'text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground';

/** "Expression of the day": one AI-picked word or phrase per day, at the learner's level. */
export function DailyExpressionCard() {
  const { user } = useAuth();
  const { texts, vocabulary, addWord } = useLearning();
  const [state, setState] = useState<DailyExpressionState>(loadLocal);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The learner's level = level of the text they read most recently (A1 to start)
  const level = useMemo(() => {
    const history = Object.values(getTextReadHistory()).sort((a, b) => b.lastReadAt.localeCompare(a.lastReadAt));
    const last = history.map(h => texts.find(t => t.id === h.textId)).find(Boolean);
    return last?.level ?? 'A1';
  }, [texts]);

  // The account's copy wins if it's newer (same expression on every device)
  useEffect(() => {
    if (!user) return;
    loadRemote(user.id).then(remote => {
      if (!remote) return;
      setState(local => {
        const next = newerState(local, remote);
        saveLocal(next);
        return next;
      });
    });
  }, [user]);

  const available = canGenerate(state);
  const item = available ? null : state.today;

  async function handleGenerate() {
    if (!user || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const expression = await generateExpression(level, state.history);
      const next = withNewExpression(state, expression);
      setState(next);
      saveLocal(next);
      saveRemote(user.id, next);
    } catch {
      // Today's chance is only used up by a successful result
      setError("Couldn't get today's expression. Please try again in a moment.");
    } finally {
      setGenerating(false);
    }
  }

  const savedKey = item?.expression.toLowerCase();
  const isSaved = !!savedKey && !!vocabulary[savedKey] && vocabulary[savedKey].status !== 'ignored';

  if (!item) {
    return (
      <div className="flex items-center gap-4 rounded-xl border bg-card/90 p-4 backdrop-blur-[4px] lg:p-5">
        <Pip pose="happy" size={64} decorative />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div>
            <p className={eyebrow}>Expression of the day</p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              One useful English phrase for today, with translation and an example.
              <span className="block text-xs">Одно полезное выражение на сегодня — с переводом и примером.</span>
            </p>
          </div>
          <Button onClick={handleGenerate} disabled={generating} className="h-10 w-fit gap-2 rounded-xl px-4">
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generating ? 'Picking a phrase…' : "Get today's expression"}
          </Button>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card/90 p-4 backdrop-blur-[4px] lg:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className={eyebrow}>Expression of the day</span>
        <span className="rounded-full bg-highlight-soft px-2 py-0.5 text-[11px] font-semibold text-highlight-ink">{item.level}</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-heading text-2xl font-semibold leading-tight tracking-[-0.015em] text-foreground">{item.expression}</p>
          <p className="mt-0.5 text-[15px] text-foreground">{item.translation}</p>
        </div>
        <button
          onClick={() => { try { playDutch(item.expression); } catch { /* audio unavailable */ } }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-accent/80"
          aria-label={`Listen to "${item.expression}"`}
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
      {item.note && <p className="text-sm leading-normal text-muted-foreground">{item.note}</p>}
      <div className="rounded-lg bg-secondary/60 px-3.5 py-2.5">
        <p className="text-[15px] leading-normal text-foreground">“{item.example}”</p>
        <p className="mt-0.5 text-sm leading-normal text-muted-foreground">{item.exampleTranslation}</p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Button
          variant={isSaved ? 'outline' : 'default'}
          className="h-10 gap-2 rounded-xl px-4"
          disabled={isSaved}
          onClick={() => addWord(item.expression, item.translation, { example: item.example, exampleTranslation: item.exampleTranslation })}
        >
          {isSaved ? <Bookmark className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
          {isSaved ? 'In your cards' : 'Add to cards'}
        </Button>
        <span className="text-xs text-muted-foreground">New one tomorrow</span>
      </div>
    </div>
  );
}
