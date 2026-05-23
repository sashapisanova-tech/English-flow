import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';
function getSavedKey() {
  return localStorage.getItem(API_KEY_STORAGE) || (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '';
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface GeneratedPrompt {
  prompt_dutch: string;
  prompt_english: string;
  suggested_words: { dutch: string; english: string }[];
  source_text: string;
  detected_level: string;
}

interface Feedback {
  corrected_text: string;
  corrections: { original: string; corrected: string; explanation: string }[];
  level_observation: string;
  encouragement: string;
}

// ─── API calls ────────────────────────────────────────────────────────────────

async function generatePrompt(
  completedTexts: { title: string; excerpt: string }[],
  weakWords: { dutch: string; english: string }[],
  vocabSize: number,
): Promise<GeneratedPrompt> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const estimatedLevel =
    vocabSize < 30 ? 'A1 (beginner)' :
    vocabSize < 120 ? 'A1–A2 (elementary)' : 'A2 (elementary)';

  const system = `You are a warm Dutch language teacher creating a personalised guided journaling prompt.

The student has completed these reading texts recently:
${completedTexts.map(t => `- "${t.title}": ${t.excerpt}`).join('\n')}

Their saved vocabulary includes these words they find challenging:
${weakWords.slice(0, 12).map(w => `${w.dutch} (${w.english})`).join(', ')}

Estimated level: ${estimatedLevel}

Create a journaling prompt that:
1. References a specific situation, character, or event from ONE of their completed texts
2. Asks a personal, low-pressure question ("What would you do?", "Have you ever felt this way?", "Describe a similar moment in your life")
3. Naturally encourages using 3–4 of their vocabulary words
4. Matches their level — short sentences for A1, slightly more complex for A2

Return ONLY this JSON:
{
  "prompt_dutch": "The full prompt in Dutch (2–3 sentences)",
  "prompt_english": "English translation of the prompt",
  "suggested_words": [
    { "dutch": "word", "english": "meaning" }
  ],
  "source_text": "Title of the text you referenced",
  "detected_level": "A1 or A2 based on their vocabulary size"
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
      max_tokens: 600,
      system,
      messages: [{ role: 'user', content: 'Generate my journaling prompt.' }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as GeneratedPrompt;
}

async function evaluateJournal(
  prompt: string,
  studentText: string,
  level: string,
  suggestedWords: string[],
): Promise<Feedback> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const system = `You are a warm, encouraging Dutch language tutor reviewing a student's journal entry.
Level: ${level}

Rules:
- Focus only on the 1–2 most important grammar errors. Ignore minor ones.
- For A1: only flag word order and verb conjugation. Forgive article errors.
- For A2: flag word order, verb conjugation, tense consistency, and de/het.
- Always rewrite their full text correctly.
- Give one short observation about their overall level (what they're doing well, what to focus on next).
- Be warm and specific in your encouragement.

Return ONLY this JSON:
{
  "corrected_text": "their full response rewritten correctly in Dutch",
  "corrections": [
    { "original": "exact phrase from student", "corrected": "correct version", "explanation": "why, max 12 words" }
  ],
  "level_observation": "one sentence about their current level and what to work on next",
  "encouragement": "one warm, specific sentence"
}
corrections can be [] if there are no significant errors.`;

  const userMsg = `Prompt given to student: ${prompt}

Student's Dutch response:
${studentText}

Words they were encouraged to use: ${suggestedWords.join(', ')}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as Feedback;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GuidedJournalTask({ onBack }: { onBack: () => void }) {
  const { texts, vocabulary } = useLearning();

  // Derive completed texts with excerpts
  const completedTexts = useMemo(() =>
    texts
      .filter(t => t.completed)
      .slice(-6) // last 6 completed
      .map(t => ({
        title: t.title,
        excerpt: t.content.split(' ').slice(0, 25).join(' ') + '…',
      })),
    [texts]
  );

  // Derive weak vocabulary (low stability or still learning)
  const weakWords = useMemo(() => {
    return Object.values(vocabulary)
      .filter(w => w.stability !== undefined ? w.stability < 5 : w.status === 'learning')
      .sort((a, b) => (a.stability ?? 0) - (b.stability ?? 0))
      .slice(0, 15)
      .map(w => ({ dutch: w.dutch, english: w.english }));
  }, [vocabulary]);

  const vocabSize = Object.keys(vocabulary).length;

  const [generated, setGenerated] = useState<GeneratedPrompt | null>(null);
  const [studentText, setStudentText] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setGenerated(null);
    setFeedback(null);
    setStudentText('');
    try {
      const result = await generatePrompt(completedTexts, weakWords, vocabSize);
      setGenerated(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!generated || !studentText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await evaluateJournal(
        generated.prompt_dutch,
        studentText,
        generated.detected_level,
        generated.suggested_words.map(w => w.dutch),
      );
      setFeedback(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setGenerated(null);
    setStudentText('');
    setFeedback(null);
    setError(null);
  }

  const hasEnoughData = completedTexts.length > 0;

  return (
    <div className="animate-fade-in space-y-4 pb-6">
      {/* Header */}
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Tasks
      </button>

      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">Guided Journal</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          A personal prompt based on texts you've read — write freely, get gentle feedback.
        </p>
      </div>

      {/* No completed texts yet */}
      {!hasEnoughData && !generated && (
        <Card className="p-6 text-center space-y-2">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="font-medium text-foreground">Read some texts first</p>
          <p className="text-sm text-muted-foreground">
            Complete at least one reading text and come back — your journal prompt will be based on what you've read.
          </p>
        </Card>
      )}

      {/* Generate button */}
      {hasEnoughData && !generated && (
        <div className="space-y-3">
          {/* Context preview */}
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

          <Button className="w-full gap-2 py-5 text-base font-semibold" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Creating your prompt…' : <><Sparkles className="h-5 w-5" /> Generate my prompt</>}
          </Button>
        </div>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      )}

      {/* Writing screen */}
      {generated && !feedback && (
        <div className="space-y-4 animate-fade-in">
          {/* The prompt */}
          <Card className="p-4 space-y-2 border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Your prompt</p>
              <span className="text-xs text-muted-foreground bg-background border border-border rounded-full px-2 py-0.5">
                {generated.detected_level} · from "{generated.source_text}"
              </span>
            </div>
            <p className="text-sm font-medium text-foreground leading-relaxed">{generated.prompt_dutch}</p>
            <p className="text-xs text-muted-foreground italic">{generated.prompt_english}</p>
          </Card>

          {/* Suggested words */}
          {generated.suggested_words.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Try to use these words</p>
              <div className="flex flex-wrap gap-2">
                {generated.suggested_words.map(w => (
                  <div key={w.dutch} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs">
                    <span className="font-semibold text-foreground">{w.dutch}</span>
                    <span className="text-muted-foreground"> · {w.english}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={studentText}
            onChange={e => setStudentText(e.target.value)}
            placeholder="Schrijf hier in het Nederlands…"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            rows={6}
            className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="h-4 w-4" /> New prompt
            </Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={loading || !studentText.trim()}>
              {loading ? 'Reading your Dutch…' : 'Submit'}
            </Button>
          </div>
        </div>
      )}

      {/* Feedback screen */}
      {feedback && generated && (
        <div className="space-y-4 animate-fade-in">
          {/* Level observation */}
          <Card className="p-4 border-primary/20 bg-primary/5">
            <p className="text-sm text-foreground leading-relaxed">{feedback.level_observation}</p>
          </Card>

          {/* Corrections */}
          {feedback.corrections.length > 0 ? (
            <Card className="p-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Grammar notes</p>
              {feedback.corrections.map((c, i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-red-700 line-through">{c.original}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-emerald-700">{c.corrected}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">{c.explanation}</p>
                </div>
              ))}
            </Card>
          ) : (
            <Card className="p-4">
              <p className="text-sm font-medium text-emerald-700">No significant errors — well written!</p>
            </Card>
          )}

          {/* Corrected version */}
          <Card className="p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Corrected version</p>
            <p className="text-sm leading-relaxed text-foreground">{feedback.corrected_text}</p>
          </Card>

          {/* Encouragement */}
          <p className="text-sm text-muted-foreground text-center italic px-2">{feedback.encouragement}</p>

          <Button className="w-full gap-2" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" /> Write another entry
          </Button>
        </div>
      )}
    </div>
  );
}
