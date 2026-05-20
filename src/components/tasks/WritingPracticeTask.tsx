import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, PenLine, Headphones, RotateCcw } from 'lucide-react';
import { playDutch, stopDutch } from '@/utils/playDutch';

type Mode = 'journal' | 'dictation';

const DICTATION_SENTENCES = [
  'Ik ga naar de supermarkt.',
  'De tram rijdt door de stad.',
  'Anna maakt koffie in de keuken.',
  'Tom fietst naar zijn werk.',
  'Het is warm en zonnig.',
  'Zij koopt brood en melk.',
  'In het park zijn veel mensen.',
  'Elke ochtend poetst hij zijn tanden.',
  'Na het werk is zij moe.',
  'Het café is klein maar gezellig.',
];

function getJournalSystem(level: string) {
  return `You are a friendly Dutch language tutor helping with daily journal practice. The student's CEFR level is ${level}.

The student writes 3–5 Dutch sentences. Your job:
1. Identify up to 4 errors (grammar, spelling, word order, verb conjugation) appropriate to ${level} level
2. For each error show the wrong phrase and the correct version with a brief English explanation
3. Rewrite their full text correctly while keeping their meaning
4. Give one short encouraging comment

Return ONLY this JSON, nothing else:
{
  "score": "one encouraging sentence about their effort",
  "corrections": [
    {
      "original": "wrong phrase from student",
      "corrected": "correct version",
      "explanation": "why, in simple English (max 15 words)"
    }
  ],
  "rewritten": "the complete corrected text"
}
If there are no errors, return corrections as [] and say so in score.`;
}

interface JournalFeedback {
  score: string;
  corrections: { original: string; corrected: string; explanation: string }[];
  rewritten: string;
}

function getSavedKey(): string {
  return localStorage.getItem('dutch-app-anthropic-key') || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

async function getJournalFeedback(text: string, level: string): Promise<JournalFeedback> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');
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
      system: getJournalSystem(level),
      messages: [{ role: 'user', content: text }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as JournalFeedback;
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
}

function tokenize(s: string) {
  return normalize(s).split(/\s+/);
}

export function WritingPracticeTask({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('journal');
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1'>('A1');

  // Journal state
  const [journalText, setJournalText] = useState('');
  const [feedback, setFeedback] = useState<JournalFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dictation state
  const [dictIdx, setDictIdx] = useState(0);
  const [dictInput, setDictInput] = useState('');
  const [dictChecked, setDictChecked] = useState(false);
  const [dictScore, setDictScore] = useState(0);
  const [dictFinished, setDictFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const dictProgress = (dictIdx / DICTATION_SENTENCES.length) * 100;
  const currentSentence = DICTATION_SENTENCES[dictIdx];
  const dictCorrect = tokenize(dictInput).join(' ') === tokenize(currentSentence).join(' ');

  function playAudio(sentence = currentSentence) {
    playDutch(sentence, {
      rate: 0.82,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  }

  function handleDictCheck() {
    if (!dictInput.trim()) return;
    if (dictCorrect) setDictScore(s => s + 1);
    setDictChecked(true);
  }

  function handleDictNext() {
    stopDutch();
    if (dictIdx + 1 >= DICTATION_SENTENCES.length) {
      setDictFinished(true);
    } else {
      setDictIdx(i => i + 1);
      setDictInput('');
      setDictChecked(false);
    }
  }

  function resetDictation() {
    setDictIdx(0);
    setDictInput('');
    setDictChecked(false);
    setDictScore(0);
    setDictFinished(false);
  }

  async function handleJournalSubmit() {
    if (!journalText.trim()) return;
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const result = await getJournalFeedback(journalText, level);
      setFeedback(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Tasks → My Story first.' : msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">Writing Practice</Badge>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2">
        {([
          { value: 'journal' as Mode, label: 'Daily Journal', icon: PenLine },
          { value: 'dictation' as Mode, label: 'Dictation', icon: Headphones },
        ] as const).map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 text-sm font-medium transition-all ${
              mode === value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {/* ── JOURNAL MODE ── */}
      {mode === 'journal' && (
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">CEFR Level</p>
            <div className="flex gap-2">
              {(['A1', 'A2', 'B1'] as const).map(l => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`flex-1 py-2 rounded-lg border-2 text-sm font-bold transition-all ${level === l ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <Card className="bg-green-50 border-green-200 p-4">
            <p className="text-xs text-green-700 leading-relaxed">
              Write <span className="font-bold">3–5 Dutch sentences</span> about your day or anything you like.
              Claude will correct your Dutch and explain each mistake.
            </p>
          </Card>

          <textarea
            value={journalText}
            onChange={e => setJournalText(e.target.value)}
            placeholder="Vandaag ga ik naar de supermarkt. Ik koop brood en melk..."
            className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            rows={6}
          />

          <Button className="w-full" onClick={handleJournalSubmit} disabled={loading || !journalText.trim()}>
            {loading ? 'Checking your Dutch…' : 'Get feedback'}
          </Button>

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}

          {feedback && (
            <div className="space-y-3 animate-fade-in">
              <Card className="bg-blue-50 border-blue-200 p-4">
                <p className="text-sm text-blue-800 font-medium">{feedback.score}</p>
              </Card>

              {feedback.corrections.length > 0 ? (
                <Card className="p-4 space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Corrections</h3>
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
                  <p className="text-sm text-green-700 font-medium">No errors — great writing!</p>
                </Card>
              )}

              <Card className="p-4 space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Corrected version</h3>
                <p className="text-sm leading-relaxed text-foreground">{feedback.rewritten}</p>
              </Card>

              <Button variant="outline" className="w-full" onClick={() => { setFeedback(null); setJournalText(''); }}>
                Write another entry
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── DICTATION MODE ── */}
      {mode === 'dictation' && !dictFinished && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{dictIdx + 1} / {DICTATION_SENTENCES.length}</span>
            <Badge variant="secondary">{dictScore} correct</Badge>
          </div>
          <Progress value={dictProgress} className="h-2" />

          <Card className="bg-indigo-50 border-indigo-200 p-4 space-y-3">
            <p className="text-xs text-indigo-700">Listen carefully and type exactly what you hear.</p>
            <Button
              variant="outline"
              className={`w-full gap-2 border-indigo-300 text-indigo-700 hover:bg-indigo-100 ${isPlaying ? 'opacity-70' : ''}`}
              onClick={() => playAudio()}
              disabled={isPlaying}
            >
              <Volume2 className="h-4 w-4" />
              {isPlaying ? 'Playing…' : dictChecked ? 'Play again' : 'Play sentence'}
            </Button>
          </Card>

          {!dictChecked ? (
            <div className="space-y-3">
              <Input
                value={dictInput}
                onChange={e => setDictInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleDictCheck()}
                placeholder="Type what you hear…"
                className="text-center text-base"
                autoFocus
              />
              <Button className="w-full" onClick={handleDictCheck} disabled={!dictInput.trim()}>
                Check
              </Button>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <Card className={`p-4 space-y-2 ${dictCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                {dictCorrect ? (
                  <p className="text-sm font-semibold text-green-700">Perfect!</p>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">You wrote:</p>
                    <p className="text-sm text-red-700">{dictInput}</p>
                  </>
                )}
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-2">Correct sentence:</p>
                <p className="text-sm font-semibold text-foreground">{currentSentence}</p>
              </Card>
              <Button className="w-full" onClick={handleDictNext}>
                {dictIdx + 1 >= DICTATION_SENTENCES.length ? 'See results' : 'Next →'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── DICTATION RESULTS ── */}
      {mode === 'dictation' && dictFinished && (
        <div className="animate-fade-in space-y-5">
          <div className="text-center py-4">
            <h2 className="font-heading text-2xl font-bold mb-1">
              {dictScore === DICTATION_SENTENCES.length ? 'Perfect listening!' : dictScore >= 7 ? 'Great ears!' : 'Keep practising!'}
            </h2>
            <p className="text-muted-foreground">
              <span className="font-bold text-primary">{dictScore}</span> / {DICTATION_SENTENCES.length} correct
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={resetDictation}>
              <RotateCcw className="h-4 w-4" /> Try again
            </Button>
            <Button className="flex-1" onClick={onBack}>Done</Button>
          </div>
        </div>
      )}
    </div>
  );
}
