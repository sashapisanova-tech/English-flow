import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw, Lightbulb } from 'lucide-react';

interface WordChallenge {
  english: string;
  dutch: string;
  alternates?: string[]; // accepted spelling variants
}

// Sentence parts with embedded word challenges
// The sentence reads naturally in English; highlighted words are the challenge targets
const sentence = [
  { text: 'Every morning I ' },
  { challenge: { english: 'wake up', dutch: 'opstaan', alternates: ['wakker worden'] } },
  { text: ' at seven o’clock. I walk to the ' },
  { challenge: { english: 'kitchen', dutch: 'keuken' } },
  { text: ' to make ' },
  { challenge: { english: 'coffee', dutch: 'koffie' } },
  { text: '. Then I eat ' },
  { challenge: { english: 'bread', dutch: 'brood' } },
  { text: ' with ' },
  { challenge: { english: 'cheese', dutch: 'kaas' } },
  { text: ' for ' },
  { challenge: { english: 'breakfast', dutch: 'ontbijt' } },
  { text: '. I grab my ' },
  { challenge: { english: 'bicycle', dutch: 'fiets' } },
  { text: ' and ride to the supermarket. At the ' },
  { challenge: { english: 'checkout', dutch: 'kassa' } },
  { text: ' I ' },
  { challenge: { english: 'pay', dutch: 'betalen' } },
  { text: ' with my ' },
  { challenge: { english: 'debit card', dutch: 'pinpas' } },
  { text: '.' },
];

const challenges: WordChallenge[] = sentence
  .filter((s): s is { challenge: WordChallenge } => 'challenge' in s)
  .map(s => s.challenge);

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function isCorrect(answer: string, challenge: WordChallenge) {
  const n = normalize(answer);
  if (n === normalize(challenge.dutch)) return true;
  if (challenge.alternates?.some(a => n === normalize(a))) return true;
  return false;
}

export function TranslationTask({ onBack }: { onBack: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState<(boolean | null)[]>(Array(challenges.length).fill(null));
  const [showHint, setShowHint] = useState(false);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIdx]);

  const current = challenges[currentIdx];
  const progress = (currentIdx / challenges.length) * 100;
  const score = results.filter(Boolean).length;

  function handleCheck() {
    if (!input.trim()) return;
    const correct = isCorrect(input, current);
    const newResults = [...results];
    newResults[currentIdx] = correct;
    setResults(newResults);
    setChecked(true);
  }

  function handleNext() {
    if (currentIdx + 1 >= challenges.length) {
      setFinished(true);
    } else {
      setCurrentIdx(i => i + 1);
      setInput('');
      setChecked(false);
      setShowHint(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!checked) handleCheck();
      else handleNext();
    }
  }

  function handleRestart() {
    setCurrentIdx(0);
    setInput('');
    setResults(Array(challenges.length).fill(null));
    setShowHint(false);
    setChecked(false);
    setFinished(false);
  }

  if (finished) {
    const perfect = score === challenges.length;
    const wrong = challenges.filter((_, i) => results[i] === false);

    return (
      <div className="animate-fade-in space-y-5">
        <div className="text-center py-4">
          <h2 className="font-heading text-2xl font-bold mb-1">
            {perfect ? 'Perfect recall!' : score >= 7 ? 'Great memory!' : 'Keep at it!'}
          </h2>
          <p className="text-muted-foreground">
            <span className="font-bold text-primary">{score}</span> / {challenges.length} words correct
          </p>
        </div>

        {wrong.length > 0 && (
          <Card className="p-4 space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Review these words</h3>
            <div className="space-y-1.5">
              {wrong.map((w, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{w.english}</span>
                  <span className="font-medium text-foreground">{w.dutch}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4 mr-2" /> Try again
          </Button>
          <Button className="flex-1" onClick={onBack}>Done</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">{currentIdx + 1} / {challenges.length}</Badge>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Word Retrieval</span>
        </div>
        <p className="text-xs text-blue-600">
          Read the English text. Translate the <span className="font-bold bg-primary/20 px-1 rounded">highlighted word</span> into Dutch.
        </p>
      </Card>

      {/* Sentence display */}
      <Card className="p-4">
        <p className="text-sm leading-relaxed text-foreground">
          {sentence.map((part, i) => {
            if ('text' in part) {
              return <span key={i}>{part.text}</span>;
            }
            const cIdx = challenges.indexOf(part.challenge);
            const isCurrent = cIdx === currentIdx;
            const result = results[cIdx];

            if (result === true) {
              return (
                <span key={i} className="inline-flex items-center gap-0.5">
                  <span className="font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded text-xs">
                    {part.challenge.dutch}
                  </span>
                </span>
              );
            }
            if (result === false) {
              return (
                <span key={i} className="font-semibold text-red-700 bg-red-100 px-1.5 py-0.5 rounded text-xs line-through">
                  {part.challenge.english}
                </span>
              );
            }
            if (isCurrent) {
              return (
                <span key={i} className="font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded animate-pulse text-xs">
                  {part.challenge.english}
                </span>
              );
            }
            return (
              <span key={i} className="font-medium text-muted-foreground underline decoration-dotted text-xs">
                {part.challenge.english}
              </span>
            );
          })}
        </p>
      </Card>

      {/* Challenge */}
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Translate to Dutch</p>
          <p className="text-2xl font-bold text-foreground">{current.english}</p>
        </div>

        {/* Hint */}
        {!checked && (
          <button
            onClick={() => setShowHint(h => !h)}
            className="flex items-center gap-1 text-xs text-primary underline underline-offset-2"
          >
            <Lightbulb className="h-3 w-3" />
            {showHint ? 'Hide hint' : 'Show first letter'}
          </button>
        )}
        {showHint && !checked && (
          <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
            Starts with: <span className="font-bold text-foreground">{current.dutch[0].toUpperCase()}...</span>
            {current.dutch.length > 4 && ` (${current.dutch.length} letters)`}
          </p>
        )}

        {/* Input */}
        <div className="relative">
          <Input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type in English..."
            disabled={checked}
            className={`text-center text-lg font-medium pr-10 ${
              checked && results[currentIdx] === true
                ? 'border-green-400 bg-green-50 text-green-800'
                : checked && results[currentIdx] === false
                ? 'border-red-400 bg-red-50 text-red-800'
                : ''
            }`}
          />
          {checked && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {results[currentIdx] ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>

        {/* Feedback */}
        {checked && (
          <div className="animate-fade-in space-y-3">
            {results[currentIdx] ? (
              <p className="text-sm text-green-700 text-center font-medium">
                Correct! <span className="font-bold">{current.dutch}</span>
              </p>
            ) : (
              <p className="text-sm text-red-700 text-center">
                The answer is <span className="font-bold">{current.dutch}</span>
                {current.alternates && (
                  <span className="text-xs text-muted-foreground block">
                    Also accepted: {current.alternates.join(', ')}
                  </span>
                )}
              </p>
            )}
            <Button className="w-full" onClick={handleNext}>
              {currentIdx + 1 >= challenges.length ? 'See results' : 'Next word →'}
            </Button>
          </div>
        )}

        {!checked && (
          <Button className="w-full" onClick={handleCheck} disabled={!input.trim()}>
            Check
          </Button>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 pt-2">
        {challenges.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === currentIdx ? 'w-4 bg-primary' :
              results[i] === true ? 'w-2 bg-green-400' :
              results[i] === false ? 'w-2 bg-red-400' :
              'w-2 bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
