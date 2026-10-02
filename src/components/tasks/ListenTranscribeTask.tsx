import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, RotateCcw, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { playDutch, stopDutch } from '@/utils/playDutch';
import { claudeFetch } from '@/lib/ai';

const SENTENCES = [
  { dutch: "I'm going to the supermarket.", english: 'Я иду в супермаркет.' },
  { dutch: 'The bus goes through the city.', english: 'Автобус едет через город.' },
  { dutch: 'Anna makes tea in the kitchen.', english: 'Анна готовит чай на кухне.' },
  { dutch: 'Tom cycles to work.', english: 'Том ездит на работу на велосипеде.' },
  { dutch: "It's warm and sunny today.", english: 'Сегодня тепло и солнечно.' },
  { dutch: 'She buys bread and milk.', english: 'Она покупает хлеб и молоко.' },
  { dutch: 'There are lots of people in the park.', english: 'В парке много людей.' },
  { dutch: 'The café is small but cosy.', english: 'Кафе маленькое, но уютное.' },
];

async function generateSentencesForLevel(level: string): Promise<{ dutch: string; english: string }[]> {
  const res = await claudeFetch({
    method: 'POST',
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: `Generate exactly 5 British English sentences (British spelling) for a ${level} level student whose native language is Russian. Return ONLY a JSON array: [{"dutch":"<English sentence>","english":"<natural Russian translation>"}]. A1: simple present, 4-8 words. A2: past tense allowed, 6-10 words. B1: complex grammar, 8-14 words.`,
      messages: [{ role: 'user', content: `Generate 5 varied English sentences for ${level} level.` }],
    }),
  });
  if (!res.ok) return [...SENTENCES].sort(() => Math.random() - 0.5).slice(0, 5);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as { dutch: string; english: string }[];
}

function normalize(s: string) {
  return s.toLowerCase().replace(/ё/g, 'е').replace(/[.,!?;:'"’]/g, '').trim();
}

type RoundPhase = 'listen' | 'transcribe' | 'translate' | 'result';

interface RoundResult {
  transcribeCorrect: boolean;
  translateCorrect: boolean;
}

export function ListenTranscribeTask({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1'>('A1');
  const [started, setStarted] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sentences, setSentences] = useState<{ dutch: string; english: string }[]>([]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [roundPhase, setRoundPhase] = useState<RoundPhase>('listen');
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcribeInput, setTranscribeInput] = useState('');
  const [translateInput, setTranslateInput] = useState('');
  const [results, setResults] = useState<RoundResult[]>([]);
  const [done, setDone] = useState(false);

  const current = sentences[roundIdx];

  async function handleStart() {
    setGenerating(true);
    try {
      const generated = await generateSentencesForLevel(level);
      setSentences(generated);
      setStarted(true);
    } catch {
      // fallback to static
      setSentences([...SENTENCES].sort(() => Math.random() - 0.5).slice(0, 5));
      setStarted(true);
    } finally {
      setGenerating(false);
    }
  }

  function play() {
    if (!current) return;
    if (isPlaying) { stopDutch(); setIsPlaying(false); return; }
    playDutch(current.dutch, {
      rate: 0.82,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  }

  function checkTranscribe() {
    setRoundPhase('translate');
  }

  function checkTranslate() {
    if (!current) return;
    const tCorrect = normalize(transcribeInput) === normalize(current.dutch);
    const enWords = normalize(current.english).split(/\s+/);
    const userWords = normalize(translateInput).split(/\s+/);
    const overlap = userWords.filter(w => enWords.includes(w)).length;
    const trCorrect = overlap >= Math.floor(enWords.length * 0.6);
    const newResults = [...results, { transcribeCorrect: tCorrect, translateCorrect: trCorrect }];
    setResults(newResults);
    setRoundPhase('result');
  }

  function nextRound() {
    stopDutch();
    if (roundIdx + 1 >= sentences.length) { setDone(true); return; }
    setRoundIdx(i => i + 1);
    setRoundPhase('listen');
    setTranscribeInput(''); setTranslateInput('');
    setIsPlaying(false);
  }

  function reset() {
    setRoundIdx(0); setRoundPhase('listen'); setTranscribeInput('');
    setTranslateInput(''); setResults([]); setDone(false); setIsPlaying(false);
    setStarted(false); setSentences([]);
  }

  const totalScore = results.reduce((acc, r) => acc + (r.transcribeCorrect ? 1 : 0) + (r.translateCorrect ? 1 : 0), 0);
  const maxScore = sentences.length * 2;

  if (!started) return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">Listen & Transcribe</Badge>
      </div>
      <Card className="bg-sky-50 border-sky-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wide">Listen & Transcribe</span>
        </div>
        <p className="text-xs text-sky-700 leading-relaxed">
          Listen to an English sentence · type what you hear · then translate it into Russian.
          5 rounds, 2 points each.
        </p>
      </Card>

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

      <Button className="w-full gap-2" onClick={handleStart} disabled={generating}>
        {generating
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating sentences…</>
          : <><Volume2 className="h-4 w-4" /> Start listening</>
        }
      </Button>
    </div>
  );

  if (done) {
    const pct = totalScore / maxScore;
    return (
      <div className="animate-fade-in space-y-5">
        <div className="text-center py-4 space-y-2">
          <h2 className="font-heading text-2xl font-bold">{pct === 1 ? 'Perfect hearing!' : pct >= 0.7 ? 'Great listening!' : 'Keep practising!'}</h2>
          <p className="text-muted-foreground"><span className="text-3xl font-bold text-primary">{totalScore}</span> / {maxScore} points</p>
        </div>
        <Card className="p-4 space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground truncate max-w-[200px]">{sentences[i].dutch}</span>
              <div className="flex gap-1">
                {r.transcribeCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-400" />}
                {r.translateCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-400" />}
              </div>
            </div>
          ))}
        </Card>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Tasks</Button>
          <Button className="flex-1 gap-2" onClick={reset}><RotateCcw className="h-4 w-4" /> Try again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <span className="text-sm text-muted-foreground">{roundIdx + 1} / {sentences.length}</span>
        <Badge variant="secondary">{totalScore} pts</Badge>
      </div>

      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-sky-500 transition-all" style={{ width: `${(roundIdx / sentences.length) * 100}%` }} />
      </div>

      {/* Step 1: Listen */}
      <Card className="bg-sky-50 border-sky-200 p-4 space-y-3">
        <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide">Step 1 — Listen</p>
        <Button
          variant="outline"
          className={`w-full gap-2 border-sky-300 text-sky-700 hover:bg-sky-100 ${isPlaying ? 'opacity-70' : ''}`}
          onClick={play}
        >
          <Volume2 className="h-4 w-4" />
          {isPlaying ? 'Playing… (tap to stop)' : roundPhase === 'listen' ? 'Play sentence' : 'Play again'}
        </Button>
      </Card>

      {/* Step 2: Transcribe */}
      {(roundPhase === 'transcribe' || roundPhase === 'translate' || roundPhase === 'result') && (
        <div className="space-y-2 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Step 2 — Type what you heard (English)</p>
          <input
            value={transcribeInput}
            onChange={e => roundPhase === 'transcribe' && setTranscribeInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && roundPhase === 'transcribe' && checkTranscribe()}
            placeholder="Type the English sentence…"
            autoComplete="off" autoCorrect="off" spellCheck={false}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${
              roundPhase === 'result'
                ? normalize(transcribeInput) === normalize(current.dutch)
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-red-400 bg-red-50'
                : 'border-border focus:border-primary'
            }`}
            disabled={roundPhase !== 'transcribe'}
          />
          {roundPhase === 'transcribe' && (
            <Button className="w-full" onClick={checkTranscribe} disabled={!transcribeInput.trim()}>Next step →</Button>
          )}
          {roundPhase === 'result' && normalize(transcribeInput) !== normalize(current.dutch) && (
            <p className="text-xs text-emerald-700 font-medium">Correct: {current.dutch}</p>
          )}
        </div>
      )}

      {/* Step 3: Translate */}
      {(roundPhase === 'translate' || roundPhase === 'result') && (
        <div className="space-y-2 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Step 3 — Translate into Russian</p>
          <input
            value={translateInput}
            onChange={e => roundPhase === 'translate' && setTranslateInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && roundPhase === 'translate' && checkTranslate()}
            placeholder="Russian translation…"
            autoComplete="off" spellCheck={false}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${
              roundPhase === 'result'
                ? results[roundIdx]?.translateCorrect ? 'border-emerald-400 bg-emerald-50' : 'border-red-400 bg-red-50'
                : 'border-border focus:border-primary'
            }`}
            disabled={roundPhase !== 'translate'}
          />
          {roundPhase === 'translate' && (
            <Button className="w-full" onClick={checkTranslate} disabled={!translateInput.trim()}>Check</Button>
          )}
          {roundPhase === 'result' && !results[roundIdx]?.translateCorrect && (
            <p className="text-xs text-emerald-700 font-medium">Correct: {current.english}</p>
          )}
        </div>
      )}

      {roundPhase === 'listen' && (
        <Button className="w-full" onClick={() => setRoundPhase('transcribe')} disabled={isPlaying}>
          I've listened →
        </Button>
      )}

      {roundPhase === 'result' && (
        <Button className="w-full" onClick={nextRound}>
          {roundIdx + 1 >= sentences.length ? 'See results' : 'Next sentence →'}
        </Button>
      )}
    </div>
  );
}
