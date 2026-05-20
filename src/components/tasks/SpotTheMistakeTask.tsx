import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Loader2, CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp, PenLine } from 'lucide-react';
import { useCustomSets } from '@/hooks/useCustomSets';
import { flashcardSets } from '@/data/flashcardSets';
import { TappableDutchText } from '@/components/TappableDutchText';

interface Sentence {
  dutch: string;
  has_error: boolean;
  error?: string;
  correction?: string;
  explanation: string;
}

type Phase = 'setup' | 'loading' | 'playing' | 'self-correct' | 'done';

function getSavedKey() {
  return localStorage.getItem('dutch-app-anthropic-key') || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

async function generateSentences(words: string[], level: string): Promise<Sentence[]> {
  const key = getSavedKey();
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
      system: `You are a Dutch language teacher creating a "spot the mistake" exercise.
The student's level is ${level}. Adjust difficulty accordingly: A1 = simple present, basic vocab; A2 = some past tense, common phrases; B1 = more complex grammar, subordinate clauses.
Generate exactly 5 Dutch sentences using the provided vocabulary words.
3 sentences must be grammatically correct. 2 must contain ONE deliberate error (wrong verb conjugation, wrong word order, or wrong article).
Return ONLY valid JSON array, no markdown:
[
  {"dutch":"correct sentence","has_error":false,"explanation":"why this is correct Dutch"},
  {"dutch":"sentence with error","has_error":true,"error":"the wrong part","correction":"correct version","explanation":"what is wrong and the correct form"}
]
Keep sentences short (5–9 words).`,
      messages: [{ role: 'user', content: `Words to use: ${words.slice(0, 15).join(', ')}` }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as Sentence[];
}

export function SpotTheMistakeTask({ onBack }: { onBack: () => void }) {
  const { sets: customSets } = useCustomSets();
  const [phase, setPhase] = useState<Phase>('setup');
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1'>('A1');
  const [source, setSource] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [selfCorrection, setSelfCorrection] = useState('');
  const [selfCorrectionSubmitted, setSelfCorrectionSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selfCorrectionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === 'self-correct') selfCorrectionRef.current?.focus();
  }, [phase]);

  const allSets = useMemo(() => {
    const builtIn = flashcardSets.map(s => ({ id: s.id, title: s.title, emoji: s.emoji, words: s.words.map(w => w.dutch) }));
    const custom = customSets.map(s => ({ id: s.id, title: s.title, emoji: s.emoji, words: s.words.map(w => w.dutch) }));
    return [...custom, ...builtIn];
  }, [customSets]);

  const selectedSet = allSets.find(s => s.id === source);

  async function handleGenerate() {
    if (!selectedSet) return;
    setPhase('loading'); setError(null);
    try {
      const result = await generateSentences(selectedSet.words, level);
      setSentences(result);
      setSentenceIdx(0); setUserAnswers([]); setRevealed(false);
      setPhase('playing');
    } catch {
      setError('Could not generate sentences. Try again.');
      setPhase('setup');
    }
  }

  function handleAnswer(hasError: boolean) {
    setUserAnswers(prev => [...prev, hasError]);
    if (hasError) {
      // User thinks there's a mistake → ask them to try to write the correction first
      const current = sentences[sentenceIdx];
      if (current?.has_error) {
        // They're right — show self-correction input
        setSelfCorrection('');
        setSelfCorrectionSubmitted(false);
        setPhase('self-correct');
      } else {
        // They're wrong (sentence was actually correct) — just reveal
        setRevealed(true);
        setPhase('playing');
      }
    } else {
      setRevealed(true);
    }
  }

  function handleSelfCorrectionSubmit() {
    setSelfCorrectionSubmitted(true);
  }

  function handleNext() {
    setRevealed(false);
    setSelfCorrection('');
    setSelfCorrectionSubmitted(false);
    if (sentenceIdx + 1 >= sentences.length) setPhase('done');
    else setSentenceIdx(i => i + 1);
  }

  const score = userAnswers.filter((ans, i) => ans === sentences[i]?.has_error).length;

  if (phase === 'setup') return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">Spot the Mistake</Badge>
      </div>

      <Card className="bg-indigo-50 border-indigo-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">Spot the Mistake</span>
        </div>
        <p className="text-xs text-indigo-700">Claude generates 5 Dutch sentences — some are correct, some have a grammar error. Can you tell the difference?</p>
      </Card>

      {error && <Card className="border-red-200 bg-red-50 p-3"><p className="text-sm text-red-700">{error}</p></Card>}

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

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Choose a flashcard set</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <button className="w-full flex items-center justify-between p-3 bg-secondary/30 text-sm" onClick={() => setShowPicker(v => !v)}>
            <span className="font-medium">{selectedSet ? `${selectedSet.emoji} ${selectedSet.title}` : 'Choose a set…'}</span>
            {showPicker ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showPicker && (
            <div className="max-h-48 overflow-y-auto divide-y divide-border">
              {allSets.map(s => (
                <button key={s.id} onClick={() => { setSource(s.id); setShowPicker(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left ${source === s.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-secondary'}`}>
                  <span>{s.emoji}</span><span>{s.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{s.words.length}w</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button className="w-full gap-2" onClick={handleGenerate} disabled={!selectedSet}>
        Generate sentences
      </Button>
    </div>
  );

  if (phase === 'loading') return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Generating sentences…</p>
    </div>
  );

  // ── Self-correction phase ───────────────────────────────────────────────────
  if (phase === 'self-correct' && sentences[sentenceIdx]) {
    const current = sentences[sentenceIdx];
    const normAnswer = (s: string) => s.trim().toLowerCase().replace(/[.,!?;:'"]/g, '');
    const isCorrectFix = selfCorrectionSubmitted
      ? normAnswer(selfCorrection) === normAnswer(current.correction ?? '')
      : null;

    return (
      <div className="animate-fade-in space-y-5">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Tasks
          </button>
          <span className="text-sm text-muted-foreground">{sentenceIdx + 1} / {sentences.length}</span>
          <Badge variant="secondary">{score} ✓</Badge>
        </div>

        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all" style={{ width: `${(sentenceIdx / sentences.length) * 100}%` }} />
        </div>

        <Card className="p-5 space-y-3">
          <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide flex items-center gap-1.5">
            <PenLine className="h-3.5 w-3.5" /> Good catch! Now fix it yourself
          </p>
          <p className="font-heading text-lg font-semibold text-foreground leading-snug line-through text-muted-foreground">
            {current.dutch}
          </p>
          <p className="text-xs text-muted-foreground">Type the corrected sentence below, then see the answer.</p>

          {!selfCorrectionSubmitted ? (
            <div className="space-y-2">
              <input
                ref={selfCorrectionRef}
                value={selfCorrection}
                onChange={e => setSelfCorrection(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && selfCorrection.trim() && handleSelfCorrectionSubmit()}
                placeholder="Write the corrected sentence…"
                autoComplete="off" autoCorrect="off" spellCheck={false}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
              />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleSelfCorrectionSubmit}>
                  Skip — show answer
                </Button>
                <Button className="flex-1" onClick={handleSelfCorrectionSubmit} disabled={!selfCorrection.trim()}>
                  Check my fix
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              {selfCorrection.trim() && (
                <Card className={`p-3 ${isCorrectFix ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                  <p className={`text-xs font-bold mb-1 ${isCorrectFix ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isCorrectFix ? 'Perfect correction!' : 'Good try — here\'s the answer:'}
                  </p>
                  <p className="text-sm"><span className="font-semibold text-emerald-700">Your fix: </span>{selfCorrection}</p>
                  {!isCorrectFix && <p className="text-sm mt-1"><span className="font-semibold text-foreground">Answer: </span>{current.correction}</p>}
                </Card>
              )}
              {!selfCorrection.trim() && current.correction && (
                <p className="text-sm"><span className="font-semibold text-emerald-700">Correct: </span>{current.correction}</p>
              )}
              <p className="text-xs text-muted-foreground">{current.explanation}</p>
              <Button className="w-full" onClick={handleNext}>
                {sentenceIdx + 1 >= sentences.length ? 'See results' : 'Next →'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  if (phase === 'playing' && sentences[sentenceIdx]) {
    const current = sentences[sentenceIdx];
    const userGuess = userAnswers[sentenceIdx];
    const isCorrectGuess = revealed ? userGuess === current.has_error : null;

    return (
      <div className="animate-fade-in space-y-5">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Tasks
          </button>
          <span className="text-sm text-muted-foreground">{sentenceIdx + 1} / {sentences.length}</span>
          <Badge variant="secondary">{score} ✓</Badge>
        </div>

        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all" style={{ width: `${(sentenceIdx / sentences.length) * 100}%` }} />
        </div>

        <Card className="p-6 text-center space-y-3 relative overflow-visible">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Is this sentence correct or does it have a mistake?</p>
          <p className="font-heading text-xl font-semibold text-foreground leading-snug">
            <TappableDutchText text={current.dutch} />
          </p>
          <p className="text-[10px] text-muted-foreground">Tap any word to translate it</p>
        </Card>

        {!revealed ? (
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 py-6 text-base" onClick={() => handleAnswer(false)}>
              <CheckCircle2 className="h-5 w-5" /> Correct
            </Button>
            <Button variant="outline" className="gap-2 border-red-300 text-red-600 hover:bg-red-50 py-6 text-base" onClick={() => handleAnswer(true)}>
              <XCircle className="h-5 w-5" /> Mistake
            </Button>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            <Card className={`p-4 ${isCorrectGuess ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <p className={`text-sm font-bold mb-1 ${isCorrectGuess ? 'text-emerald-700' : 'text-red-700'}`}>
                {isCorrectGuess ? 'Correct!' : 'Not quite'}
              </p>
              {current.has_error && (
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold text-red-700">Error: </span><span className="line-through">{current.error}</span></p>
                  <p><span className="font-semibold text-emerald-700">Correct: </span>{current.correction}</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">{current.explanation}</p>
            </Card>
            <Button className="w-full" onClick={handleNext}>
              {sentenceIdx + 1 >= sentences.length ? 'See results' : 'Next →'}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div className="text-center py-4 space-y-2">
        <h2 className="font-heading text-2xl font-bold">{score === sentences.length ? 'Sharp eye!' : score >= 4 ? 'Good detective!' : 'Keep practising!'}</h2>
        <p className="text-muted-foreground"><span className="text-3xl font-bold text-primary">{score}</span> / {sentences.length} correct</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={() => setPhase('setup')}><RotateCcw className="h-4 w-4" /> New set</Button>
        <Button className="flex-1" onClick={handleGenerate}>Try again</Button>
      </div>
    </div>
  );
}
