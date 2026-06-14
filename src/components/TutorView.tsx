import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, RefreshCw, TrendingUp, AlertCircle, BookOpen, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getRecentSessions, PracticeSessionRow } from '@/lib/practiceSession';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';
function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '';
}

interface TutorSuggestion {
  title: string;
  reason: string;
  task: 'translate' | 'dialogue';
  level: string;
  grammarFocus?: string;
}

interface TutorAnalysis {
  strengths: string[];
  weaknesses: string[];
  suggestions: TutorSuggestion[];
  encouragement: string;
}

async function getTutorAnalysis(sessions: PracticeSessionRow[]): Promise<TutorAnalysis> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const summary = sessions.map(s => ({
    date: s.created_at?.slice(0, 10),
    task: s.task_type,
    level: s.level,
    grammar_focus: s.grammar_focus || null,
    easy: s.easy_count,
    hard: s.hard_count,
    correct: s.correct_count,
    length: s.session_length,
    hard_targets: s.hard_grammar_targets,
  }));

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
      max_tokens: 800,
      system: `You are a Dutch language tutor reviewing a learner's recent practice history.
Analyze the data and return ONLY valid JSON — no markdown, no explanation:
{
  "strengths": ["one short sentence", "another"],
  "weaknesses": ["specific grammar/vocabulary issue", "another issue"],
  "suggestions": [
    {
      "title": "short action title (5 words max)",
      "reason": "one sentence explaining why based on the data",
      "task": "translate" or "dialogue",
      "level": "A1", "A2", or "B1",
      "grammarFocus": "exact grammar topic or omit if not applicable"
    }
  ],
  "encouragement": "one warm sentence"
}
Rules:
- strengths: 1-2 items, be specific about what they did well
- weaknesses: 2-3 items, name specific Dutch grammar patterns (e.g. "separable verbs", "de/het articles")
- suggestions: exactly 3 items, mix translate and dialogue tasks, pick levels that match recent sessions
- grammarFocus must match one of these if for translate task: "Word order (V2)", "Separable verbs", "de/het articles", "Adjective endings", "Past tense (perfectum)", "Modal verbs", "Plural forms", "Negation", "Pronouns"
- Keep all text short and encouraging`,
      messages: [{ role: 'user', content: `Practice history (most recent first):\n${JSON.stringify(summary, null, 2)}` }],
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as TutorAnalysis;
}

interface TutorViewProps {
  onLaunchTask: (task: 'translate' | 'dialogue', grammarFocus?: string, level?: string) => void;
}

export function TutorView({ onLaunchTask }: TutorViewProps) {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState<TutorAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noKey, setNoKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) load();
  }, [user]);

  async function load() {
    if (!user) return;
    setLoading(true);
    setError(null);
    setNoData(false);
    setNoKey(false);
    try {
      const sessions = await getRecentSessions(user.id, 20);
      if (sessions.length < 3) { setNoData(true); return; }
      const result = await getTutorAnalysis(sessions);
      setAnalysis(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      if (msg === 'NO_KEY') setNoKey(true);
      else setError('Could not load analysis. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleLaunch(suggestion: TutorSuggestion) {
    if (suggestion.grammarFocus) {
      localStorage.setItem('dutch-translate-last-hard-grammar', suggestion.grammarFocus);
    }
    onLaunchTask(suggestion.task, suggestion.grammarFocus, suggestion.level);
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

  if (noData) {
    return (
      <Card className="p-4 space-y-1.5 border-border bg-muted/30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Tutor</p>
        <p className="text-xs text-muted-foreground">Complete at least 3 practice sessions to unlock your personalised tutor analysis.</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-4 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 space-y-2 border-destructive/20 bg-destructive/5">
        <p className="text-xs text-destructive">{error}</p>
        <button onClick={load} className="flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-colors">
          <RefreshCw className="h-3 w-3" /> Try again
        </button>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground flex items-center gap-1.5">
          <span>Your Tutor</span>
        </h3>
        <button onClick={load} className="text-muted-foreground hover:text-foreground transition-colors" title="Refresh">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Encouragement */}
      <p className="text-sm text-muted-foreground leading-relaxed">{analysis.encouragement}</p>

      {/* Strengths */}
      {analysis.strengths.length > 0 && (
        <Card className="p-3 space-y-2 border-green-200 bg-green-50/60">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-green-600" />
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Strengths</p>
          </div>
          <ul className="space-y-0.5">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="text-xs text-green-800 leading-relaxed">• {s}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Weaknesses */}
      {analysis.weaknesses.length > 0 && (
        <Card className="p-3 space-y-2 border-orange-200 bg-orange-50/60">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-orange-600" />
            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Focus areas</p>
          </div>
          <ul className="space-y-0.5">
            {analysis.weaknesses.map((w, i) => (
              <li key={i} className="text-xs text-orange-800 leading-relaxed">• {w}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Suggestions */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Suggested practice</p>
        {analysis.suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleLaunch(s)}
            className="w-full text-left group rounded-2xl border border-border bg-card px-4 py-3.5 transition-all hover:border-primary/40 hover:shadow-sm active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {s.task === 'translate'
                    ? <BookOpen className="h-3.5 w-3.5 text-primary shrink-0" />
                    : <MessageCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                  }
                  <span className="text-sm font-semibold text-foreground leading-tight">{s.title}</span>
                  <span className="text-[10px] font-medium text-muted-foreground/60 uppercase">{s.level}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug pl-5">{s.reason}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
