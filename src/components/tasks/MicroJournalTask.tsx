import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { TaskFilters, Level, Theme } from './TaskFilters';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

const SUGGESTED_PROMPTS = [
  { dutch: 'Wat heb je vandaag gedaan?', english: 'What did you do today?' },
  { dutch: 'Wat zijn je plannen voor morgen?', english: 'What are your plans for tomorrow?' },
  { dutch: 'Beschrijf je stemming vandaag.', english: 'Describe your mood today.' },
  { dutch: 'Wat zie je om je heen?', english: 'What do you see around you?' },
  { dutch: 'Schrijf over iets leuks deze week.', english: 'Write about something nice this week.' },
  { dutch: 'Beschrijf een persoon die je kent.', english: 'Describe a person you know.' },
];

const FEEDBACK_SYSTEM = `You are a warm Dutch language tutor. The student wrote a short Dutch journal entry.
Correct it gently. Focus on the 1-2 most important grammar errors only (not every tiny thing).
Return ONLY this JSON:
{
  "corrected_text": "their full text rewritten correctly",
  "corrections": [{"original": "...", "corrected": "...", "explanation": "short English explanation max 12 words"}],
  "encouragement": "one warm encouraging sentence in English"
}`;

interface FeedbackResponse {
  corrected_text: string;
  corrections: { original: string; corrected: string; explanation: string }[];
  encouragement: string;
}

async function getFeedback(level: Level, prompt: string, studentText: string): Promise<FeedbackResponse> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');
  const userMsg = `Level: ${level}\nPrompt: ${prompt}\nStudent's Dutch text:\n${studentText}`;
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
      max_tokens: 1024,
      system: FEEDBACK_SYSTEM,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as FeedbackResponse;
}

type Screen = 'filter' | 'write' | 'feedback';

export function MicroJournalTask({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>('filter');
  const [level, setLevel] = useState<Level>('A2');
  const [theme, setTheme] = useState<Theme>('Dagelijks leven');
  const [selectedPrompt, setSelectedPrompt] = useState<{ dutch: string; english: string } | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [studentText, setStudentText] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activePromptDutch = selectedPrompt?.dutch ?? customPrompt;
  const activePromptEnglish = selectedPrompt?.english ?? '';

  function handleStartWriting() {
    if (!activePromptDutch.trim()) return;
    setScreen('write');
    setStudentText('');
    setFeedback(null);
    setError(null);
  }

  async function handleSubmit() {
    if (!studentText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getFeedback(level, activePromptDutch, studentText);
      setFeedback(result);
      setScreen('feedback');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in settings first.' : msg);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setScreen('filter');
    setSelectedPrompt(null);
    setCustomPrompt('');
    setStudentText('');
    setFeedback(null);
    setError(null);
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={screen === 'filter' ? onBack : handleReset}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {screen === 'filter' ? 'Tasks' : 'Back'}
        </button>
      </div>

      {/* Info card */}
      <Card className="bg-green-50 border-green-200 p-4">
        <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Micro Journal</p>
        <p className="text-xs text-green-700">
          Choose a writing prompt, write 2–4 sentences in Dutch, and get gentle AI feedback.
        </p>
      </Card>

      {/* Filter screen */}
      {screen === 'filter' && (
        <div className="space-y-4">
          <TaskFilters level={level} theme={theme} onLevelChange={setLevel} onThemeChange={setTheme} />

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Writing prompt</p>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTED_PROMPTS.map(p => (
                <button
                  key={p.dutch}
                  onClick={() => { setSelectedPrompt(p); setCustomPrompt(''); }}
                  className={`rounded-xl border p-3 text-left text-sm transition-colors ${
                    selectedPrompt?.dutch === p.dutch
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <span className="font-medium">{p.dutch}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{p.english}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground pt-1">Or write your own prompt:</p>
            <textarea
              value={customPrompt}
              onChange={e => { setCustomPrompt(e.target.value); setSelectedPrompt(null); }}
              placeholder="Type a custom Dutch writing prompt…"
              className="w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={2}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleStartWriting}
            disabled={!activePromptDutch.trim()}
          >
            Start writing
          </Button>
        </div>
      )}

      {/* Write screen */}
      {screen === 'write' && (
        <div className="space-y-4 animate-fade-in">
          <Card className="p-4 bg-blue-50 border-blue-200 space-y-1">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Your prompt</p>
            <p className="text-sm font-medium text-foreground">{activePromptDutch}</p>
            {activePromptEnglish && (
              <p className="text-xs text-blue-600 italic">{activePromptEnglish}</p>
            )}
          </Card>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Write 2–4 sentences in Dutch:</p>
            <textarea
              value={studentText}
              onChange={e => setStudentText(e.target.value)}
              placeholder="Schrijf hier je antwoord in het Nederlands…"
              className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={6}
              autoFocus
            />
          </div>

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading || !studentText.trim()}
          >
            {loading ? 'Checking...' : 'Submit & get feedback'}
          </Button>
        </div>
      )}

      {/* Feedback screen */}
      {screen === 'feedback' && feedback && (
        <div className="space-y-4 animate-fade-in">
          <Card className="bg-green-50 border-green-200 p-4">
            <p className="text-sm text-green-800 font-medium">{feedback.encouragement}</p>
          </Card>

          <Card className="p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your text, corrected</p>
            <p className="text-sm leading-relaxed text-foreground">{feedback.corrected_text}</p>
          </Card>

          {feedback.corrections.length > 0 ? (
            <Card className="p-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Corrections</p>
              {feedback.corrections.map((c, i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-red-700 line-through">{c.original}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-green-700">{c.corrected}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">{c.explanation}</p>
                </div>
              ))}
            </Card>
          ) : (
            <Card className="p-4">
              <p className="text-sm text-green-700 font-medium">No errors found — excellent Dutch!</p>
            </Card>
          )}

          <Button className="w-full" onClick={handleReset}>
            Write another entry
          </Button>
        </div>
      )}
    </div>
  );
}
