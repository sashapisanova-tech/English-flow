import { useState, useEffect } from 'react';
import { Pip } from '@/components/Pip';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, RefreshCw, BookOpen, MessageCircleMore, Layers, Languages, AlertCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { getRecentSessions, PracticeSessionRow } from '@/lib/practiceSession';
import { getTextReadHistory, daysSince } from '@/lib/textReadHistory';
import { getGrammarTags } from '@/data/textGrammarTags';
import { claudeFetch } from '@/lib/ai';

const CACHE_KEY = 'english-tutor-daily-cache-v2';


interface TutorActivity {
  title: string;
  reason: string;
  type: 'translate' | 'dialogue' | 'flashcards' | 'text-review';
  textId?: string;
  textTitle?: string;
  grammarFocus?: string;
  level: string;
}

interface TutorAnalysis {
  dailyFocus: 'grammar' | 'vocabulary' | 'production' | 'review';
  focusReason: string;
  strength: string;
  encouragement: string;
  activities: TutorActivity[];
  skillBalance: { grammar: number; vocabulary: number; production: number };
}

interface TutorCache {
  date: string;
  analysis: TutorAnalysis;
}

function getCachedAnalysis(): TutorAnalysis | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache: TutorCache = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);
    return cache.date === today ? cache.analysis : null;
  } catch {
    return null;
  }
}

function setCachedAnalysis(analysis: TutorAnalysis): void {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(CACHE_KEY, JSON.stringify({ date: today, analysis }));
}

const FOCUS_LABELS: Record<string, string> = {
  grammar: 'Grammar day',
  vocabulary: 'Vocabulary day',
  production: 'Speaking day',
  review: 'Review day',
};

export interface TutorViewProps {
  onLaunchTask: (task: 'translate' | 'dialogue', grammarFocus?: string, level?: string) => void;
  onOpenText: (textId: string) => void;
  onGoToFlashcards: () => void;
}

export function TutorView({ onLaunchTask, onOpenText, onGoToFlashcards }: TutorViewProps) {
  const { user } = useAuth();
  const { texts, vocabulary, dueCount } = useLearning();
  const [analysis, setAnalysis] = useState<TutorAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [noKey, setNoKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from daily cache on mount — never auto-call the API
  useEffect(() => {
    if (!user) return;
    const cached = getCachedAnalysis();
    if (cached) setAnalysis(cached);
  }, [user]);

  async function load(forceRefresh = false) {
    if (!user) return;
    if (!forceRefresh) {
      const cached = getCachedAnalysis();
      if (cached) { setAnalysis(cached); return; }
    }
    setLoading(true);
    setError(null);
    setNoKey(false);
    try {
      const sessions = await getRecentSessions(user.id, 20);
      const result = await fetchAnalysis(sessions);
      setCachedAnalysis(result);
      setAnalysis(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      if (msg === 'NO_KEY') setNoKey(true);
      else setError('Could not load analysis. Try again.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchAnalysis(sessions: PracticeSessionRow[]): Promise<TutorAnalysis> {

    const history = getTextReadHistory();
    const totalWords = Object.keys(vocabulary).length;
    const lastSession = sessions[0]?.created_at;
    const daysSinceSession = lastSession ? daysSince(lastSession) : 99;

    const textSummary = texts.slice(0, 30).map(t => {
      const record = history[t.id];
      const tags = getGrammarTags(t.id);
      const tagsStr = tags.length ? ` [grammar: ${tags.slice(0, 2).join(', ')}]` : '';
      if (!record) return `- UNREAD: "${t.title}" [${t.id}, ${t.level}]${tagsStr}`;
      const days = daysSince(record.lastReadAt);
      return `- "${t.title}" [${t.id}, ${t.level}]${tagsStr} — read ${record.readCount}×, last ${days}d ago`;
    }).join('\n');

    const sessionSummary = sessions.slice(0, 20).map(s => ({
      date: s.created_at?.slice(0, 10),
      task: s.task_type,
      level: s.level,
      grammar: s.grammar_focus ?? null,
      easy: s.easy_count,
      hard: s.hard_count,
      correct: s.correct_count,
      length: s.session_length,
      hard_grammar: s.hard_grammar_targets,
    }));

    const prompt = `You are a British English coach for a native Russian speaker. Analyze this learner's data and return ONLY valid JSON. Write all text values (focusReason, strength, encouragement, title, reason) in simple Russian; grammarFocus stays in English.

PRACTICE SESSIONS (newest first, may be empty if new learner):
${sessions.length > 0 ? JSON.stringify(sessionSummary, null, 2) : '(no practice sessions yet)'}

VOCABULARY: ${totalWords} words saved, ${dueCount} due for review. Days since last practice: ${daysSinceSession}.

TEXT READING HISTORY (first 30 texts):
${textSummary}

Return this exact JSON shape:
{
  "dailyFocus": "grammar" | "vocabulary" | "production" | "review",
  "focusReason": "one sentence why, max 12 words",
  "strength": "one specific positive thing they did well — be genuine, even 'showed up consistently' counts, max 15 words",
  "encouragement": "warm personal one-liner, max 10 words",
  "activities": [
    {
      "title": "action title, 4-5 words",
      "reason": "why this, max 10 words",
      "type": "translate" | "dialogue" | "flashcards" | "text-review",
      "textId": "exact ID from history (ONLY for text-review)",
      "textTitle": "exact title (ONLY for text-review)",
      "grammarFocus": "grammar pattern (ONLY for translate tasks)",
      "level": "A1" | "A2" | "B1"
    }
  ],
  "skillBalance": { "grammar": 0-100, "vocabulary": 0-100, "production": 0-100 }
}

Rules:
- activities: exactly 3, in priority order
- If learner is new (no sessions), suggest: read a text, do flashcards, then a simple translate task
- For text-review: pick a text read 7+ days ago covering weak grammar (use exact textId from history above)
- grammarFocus for translate must be one of: "Word order", "Articles (a/an/the)", "Present simple", "Present continuous", "Past simple", "Present perfect", "Modal verbs", "Plural forms", "Negation", "Prepositions", "Comparative adjectives", "Phrasal verbs"
- skillBalance reflects estimated current level (0=very weak, 100=strong)
- All text must be SHORT`;

    const res = await claudeFetch({
      method: 'POST',
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json() as { content: { text: string }[] };
    const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    return JSON.parse(raw) as TutorAnalysis;
  }

  function handleActivity(activity: TutorActivity) {
    if (activity.type === 'text-review' && activity.textId) {
      onOpenText(activity.textId);
    } else if (activity.type === 'flashcards') {
      onGoToFlashcards();
    } else {
      if (activity.grammarFocus) {
        localStorage.setItem('english-translate-last-hard-grammar', activity.grammarFocus);
      }
      onLaunchTask(activity.type as 'translate' | 'dialogue', activity.grammarFocus, activity.level);
    }
  }

  function ActivityIcon({ type, className }: { type: TutorActivity['type']; className?: string }) {
    const Icon = type === 'translate' ? Languages
      : type === 'dialogue' ? MessageCircleMore
      : type === 'flashcards' ? Layers
      : BookOpen;
    return <Icon className={className} strokeWidth={1.75} />;
  }

  const ACTIVITY_KIND: Record<TutorActivity['type'], string> = {
    translate: 'Translate',
    dialogue: 'Dialogue',
    flashcards: 'Flashcards',
    'text-review': 'Reading',
  };

  function activityMeta(a: TutorActivity): string {
    const parts = [a.textTitle && a.type === 'text-review' ? a.textTitle : ACTIVITY_KIND[a.type], a.level];
    return parts.filter(Boolean).join(' · ');
  }

  const eyebrow = 'text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground';

  const tutorAvatar = (size: 'sm' | 'lg') => (
    <div className={`grid shrink-0 place-items-center rounded-full bg-highlight-soft ${size === 'lg' ? 'h-14 w-14' : 'h-10 w-10'}`}>
      <GraduationCap className={`text-highlight ${size === 'lg' ? 'h-7 w-7' : 'h-[22px] w-[22px]'}`} strokeWidth={1.75} />
    </div>
  );

  if (!user) return null;

  if (noKey) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
        {tutorAvatar('sm')}
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-muted-foreground">AI tutor</span>
          <p className="text-sm leading-normal text-foreground">
            Add your Anthropic API key in Me → Settings to unlock your personal study plan.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2 pt-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-[136px] w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
        <button onClick={() => load(true)} className="flex items-center gap-1 self-start text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
          <RefreshCw className="h-3.5 w-3.5" /> Try again
        </button>
      </div>
    );
  }

  // No cached analysis yet — show the CTA
  if (!analysis) {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-xl border border-border bg-card px-5 py-[22px] text-center lg:px-8 lg:py-7">
        <Pip pose="think" size={88} decorative />
        <p className="mt-1 font-heading text-xl font-semibold text-foreground">Get today's study plan</p>
        <p className="max-w-[440px] text-sm leading-normal text-muted-foreground text-pretty">
          Your AI tutor looks at your reading, words and practice, then tells you what to focus on today.
        </p>
        <button
          onClick={() => load(false)}
          className="mt-1.5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.99] lg:w-auto lg:px-8"
        >
          Get today's plan <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <p className="text-xs text-muted-foreground">Saved for the rest of the day</p>
      </div>
    );
  }

  const [first, ...rest] = analysis.activities;

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Tutor message */}
      <div className="flex items-start gap-3">
        {tutorAvatar('sm')}
        <div className="flex min-w-0 flex-1 flex-col gap-[3px] pt-px">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-semibold text-muted-foreground">Your tutor</span>
            <button
              onClick={() => load(true)}
              className="-m-2 p-2 text-muted-foreground transition-colors hover:text-foreground"
              title="Refresh — generates a new plan"
              aria-label="Refresh plan"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-[15px] leading-normal text-foreground text-pretty">{analysis.encouragement}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-full bg-highlight-soft px-[9px] py-[3px] text-xs font-semibold text-highlight-ink">
              {FOCUS_LABELS[analysis.dailyFocus] ?? analysis.dailyFocus}
            </span>
            <span className="text-[13px] leading-snug text-muted-foreground">{analysis.focusReason}</span>
          </div>
        </div>
      </div>

      {/* Doing well */}
      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3">
        <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
        <div className="flex flex-col gap-0.5">
          <span className={eyebrow}>Doing well</span>
          <p className="text-sm leading-snug text-foreground">{analysis.strength}</p>
        </div>
      </div>

      {/* Today's plan */}
      {first && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-[19px] font-semibold text-foreground">Today's plan</span>
            <span className="text-[13px] text-muted-foreground">
              {analysis.activities.length} step{analysis.activities.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Step 1: highlighted card */}
          <div className="flex flex-col gap-3.5 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3.5">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-highlight text-[13px] font-bold text-highlight-foreground">1</div>
              <div className="flex min-w-0 flex-1 flex-col gap-px">
                <span className="font-heading text-lg font-semibold leading-snug text-foreground">{first.title}</span>
                <span className="text-[13px] text-muted-foreground">{activityMeta(first)}</span>
                {first.reason && <span className="text-[13px] leading-snug text-muted-foreground">{first.reason}</span>}
              </div>
            </div>
            <button
              onClick={() => handleActivity(first)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.99] lg:self-start lg:px-8"
            >
              Start <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* Later steps */}
          {rest.length > 0 && (
            <div className="flex flex-col px-3">
              {rest.map((a, i) => (
                <button
                  key={i}
                  onClick={() => handleActivity(a)}
                  className="group flex items-center gap-3.5 rounded-lg px-1 py-3 text-left transition-colors hover:bg-accent/50"
                >
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-[1.5px] border-border text-[13px] font-semibold text-muted-foreground">
                    {i + 2}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-px">
                    <span className="text-[15px] font-semibold leading-snug text-foreground">{a.title}</span>
                    <span className="text-[13px] leading-snug text-muted-foreground">
                      {activityMeta(a)}{a.reason ? ` · ${a.reason}` : ''}
                    </span>
                  </div>
                  <ActivityIcon type={a.type} className="h-[22px] w-[22px] shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skill snapshot */}
      <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card px-4 py-3.5">
        <span className={eyebrow}>Skill snapshot</span>
        {([
          { label: 'Grammar',    value: analysis.skillBalance.grammar },
          { label: 'Vocabulary', value: analysis.skillBalance.vocabulary },
          { label: 'Production', value: analysis.skillBalance.production },
        ] as const).map(({ label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-[13px] text-muted-foreground">{label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-track">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${value}%` }} />
            </div>
            <span className="w-9 text-right text-[13px] tabular-nums text-muted-foreground">{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
