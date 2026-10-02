import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, RefreshCw, BookOpen, MessageCircle, Brain, FileText, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { getRecentSessions, PracticeSessionRow } from '@/lib/practiceSession';
import { getTextReadHistory, daysSince } from '@/lib/textReadHistory';
import { getGrammarTags } from '@/data/textGrammarTags';
import { claudeFetch } from '@/lib/ai';

const CACHE_KEY = 'english-tutor-daily-cache';


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

const FOCUS_COLORS: Record<string, string> = {
  grammar: 'bg-indigo-100 text-indigo-700',
  vocabulary: 'bg-amber-100 text-amber-700',
  production: 'bg-emerald-100 text-emerald-700',
  review: 'bg-blue-100 text-blue-700',
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
        localStorage.setItem('dutch-translate-last-hard-grammar', activity.grammarFocus);
      }
      onLaunchTask(activity.type as 'translate' | 'dialogue', activity.grammarFocus, activity.level);
    }
  }

  function ActivityIcon({ type }: { type: TutorActivity['type'] }) {
    if (type === 'translate')  return <BookOpen      className="h-3.5 w-3.5 text-indigo-500 shrink-0" />;
    if (type === 'dialogue')   return <MessageCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />;
    if (type === 'flashcards') return <Brain         className="h-3.5 w-3.5 text-amber-500 shrink-0" />;
    return                            <FileText      className="h-3.5 w-3.5 text-blue-500 shrink-0" />;
  }

  if (!user) return null;

  if (noKey) {
    return (
      <Card className="p-4 space-y-1.5 border-amber-200 bg-amber-50">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">AI Tutor</p>
        <p className="text-xs text-amber-700">Add your Anthropic API key in Me → Settings to unlock personalised tutor analysis.</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
        </div>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-4 space-y-2 border-destructive/20 bg-destructive/5">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 text-destructive" />
          <p className="text-xs text-destructive">{error}</p>
        </div>
        <button onClick={() => load(true)} className="flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-colors">
          <RefreshCw className="h-3 w-3" /> Try again
        </button>
      </Card>
    );
  }

  // No cached analysis yet — show the CTA button
  if (!analysis) {
    return (
      <Card className="p-6 space-y-4 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="font-heading font-semibold text-foreground">Get today's study plan</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI analyses your reading, vocabulary, and practice history to tell you exactly what to focus on today.
          </p>
        </div>
        <button
          onClick={() => load(false)}
          className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.99]"
        >
          Get today's suggestions
        </button>
        <p className="text-[10px] text-muted-foreground">Results are saved for the day — tap once, use all day</p>
      </Card>
    );
  }

  const focusBadge = FOCUS_COLORS[analysis.dailyFocus] ?? 'bg-muted text-muted-foreground';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">English Coach</p>
        <button onClick={() => load(true)} className="text-muted-foreground hover:text-foreground transition-colors" title="Refresh — generates a new analysis">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Encouragement */}
      <p className="text-sm italic text-muted-foreground leading-relaxed">{analysis.encouragement}</p>

      {/* Strength */}
      <Card className="p-3 space-y-1 border-emerald-200 bg-emerald-50/70">
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-emerald-600 fill-emerald-400" />
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Doing well</p>
        </div>
        <p className="text-xs text-emerald-900 leading-snug">{analysis.strength}</p>
      </Card>

      {/* Daily focus */}
      <div className="flex items-start gap-2.5">
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${focusBadge}`}>
          {FOCUS_LABELS[analysis.dailyFocus] ?? analysis.dailyFocus}
        </span>
        <p className="text-xs text-muted-foreground leading-snug pt-0.5">{analysis.focusReason}</p>
      </div>

      {/* Activities */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Today's practice</p>
        {analysis.activities.map((a, i) => (
          <button
            key={i}
            onClick={() => handleActivity(a)}
            className="w-full text-left group rounded-2xl border border-border bg-card px-4 py-3 transition-all hover:border-primary/40 hover:shadow-sm active:scale-[0.99]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <ActivityIcon type={a.type} />
                  <span className="text-sm font-semibold text-foreground leading-tight truncate">{a.title}</span>
                  <span className="text-[10px] font-medium text-muted-foreground/50 uppercase shrink-0">{a.level}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug pl-[22px]">{a.reason}</p>
              </div>
              <svg className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Skill balance */}
      <div className="space-y-2.5">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Skill snapshot</p>
        {([
          { label: 'Grammar',    value: analysis.skillBalance.grammar,    color: 'bg-indigo-400' },
          { label: 'Vocabulary', value: analysis.skillBalance.vocabulary, color: 'bg-amber-400'  },
          { label: 'Production', value: analysis.skillBalance.production, color: 'bg-emerald-400'},
        ] as const).map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-20 shrink-0">{label}</span>
            <div className="flex-1 rounded-full bg-muted h-2 overflow-hidden">
              <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-7 text-right">{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
