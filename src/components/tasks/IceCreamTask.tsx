import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';

interface Step {
  shopkeeper: { dutch: string; english: string };
  options: { dutch: string; english: string; correct: boolean }[];
  hint: string;
}

const steps: Step[] = [
  {
    shopkeeper: {
      dutch: 'Goedemiddag! Wat mag het zijn?',
      english: 'Good afternoon! What can I get you?',
    },
    options: [
      { dutch: 'Ik wil graag een ijsje, alstublieft.', english: 'I would like an ice cream, please.', correct: true },
      { dutch: 'Goedemorgen! Hoe gaat het?', english: 'Good morning! How are you?', correct: false },
      { dutch: 'Ik zoek de supermarkt.', english: 'I am looking for the supermarket.', correct: false },
    ],
    hint: 'You just walked into an ice cream shop — tell them what you want!',
  },
  {
    shopkeeper: {
      dutch: 'Welk smaakje wilt u?',
      english: 'Which flavour would you like?',
    },
    options: [
      { dutch: 'Aardbei en chocolade, alstublieft.', english: 'Strawberry and chocolate, please.', correct: true },
      { dutch: 'Twee koppen koffie, graag.', english: 'Two cups of coffee, please.', correct: false },
      { dutch: 'Een broodje kaas.', english: 'A cheese sandwich.', correct: false },
    ],
    hint: 'They are asking about flavour — pick something delicious!',
  },
  {
    shopkeeper: {
      dutch: 'In een hoorntje of een bakje?',
      english: 'In a cone or a cup?',
    },
    options: [
      { dutch: 'In een hoorntje, graag.', english: 'In a cone, please.', correct: true },
      { dutch: 'Met melk en suiker.', english: 'With milk and sugar.', correct: false },
      { dutch: 'Nee, dank u.', english: 'No, thank you.', correct: false },
    ],
    hint: 'Cone (hoorntje) or cup (bakje)? Classic ice cream decision!',
  },
  {
    shopkeeper: {
      dutch: 'Dat is dan twee euro vijftig.',
      english: 'That will be two euros fifty.',
    },
    options: [
      { dutch: 'Hier is mijn pinpas.', english: 'Here is my debit card.', correct: true },
      { dutch: 'Ik heb geen geld.', english: 'I have no money.', correct: false },
      { dutch: 'Dat is te duur!', english: 'That is too expensive!', correct: false },
    ],
    hint: 'They told you the price — time to pay!',
  },
  {
    shopkeeper: {
      dutch: 'Alsjeblieft! Eet smakelijk!',
      english: 'Here you go! Enjoy your meal!',
    },
    options: [
      { dutch: 'Dank u wel! Tot ziens!', english: 'Thank you! Goodbye!', correct: true },
      { dutch: 'Goedenacht!', english: 'Good night!', correct: false },
      { dutch: 'Ik wil nog een ijsje.', english: 'I want another ice cream.', correct: false },
    ],
    hint: 'They handed you the ice cream — what do you say to wrap up nicely?',
  },
];

export function IceCreamTask({ onBack }: { onBack: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const step = steps[stepIndex];
  const isAnswered = selected !== null;
  const progress = (stepIndex / steps.length) * 100;

  function handleSelect(idx: number) {
    if (isAnswered) return;
    setSelected(idx);
    if (step.options[idx].correct) {
      setScore(s => s + 1);
    } else {
      setMistakes(m => [...m, stepIndex]);
    }
  }

  function handleNext() {
    if (stepIndex + 1 >= steps.length) {
      setFinished(true);
    } else {
      setStepIndex(s => s + 1);
      setSelected(null);
      setShowHint(false);
    }
  }

  function handleRestart() {
    setStepIndex(0);
    setSelected(null);
    setScore(0);
    setMistakes([]);
    setShowHint(false);
    setFinished(false);
  }

  if (finished) {
    const perfect = score === steps.length;
    return (
      <div className="animate-fade-in space-y-5">
        <div className="text-center py-6">
          <h2 className="font-heading text-2xl font-bold mb-1">
            {perfect ? 'Perfect order!' : score >= 3 ? 'Well done!' : 'Keep practising!'}
          </h2>
          <p className="text-muted-foreground">
            You got <span className="font-bold text-primary">{score}</span> out of{' '}
            <span className="font-bold">{steps.length}</span> correct
          </p>
        </div>

        <Card className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">What you learned</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-foreground">ijsje</span> — ice cream</p>
            <p><span className="font-medium text-foreground">hoorntje</span> — cone</p>
            <p><span className="font-medium text-foreground">bakje</span> — cup</p>
            <p><span className="font-medium text-foreground">pinpas</span> — debit card</p>
            <p><span className="font-medium text-foreground">eet smakelijk</span> — enjoy your meal</p>
          </div>
        </Card>

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
        <Badge variant="secondary">Step {stepIndex + 1} / {steps.length}</Badge>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Scene card */}
      <Card className="bg-amber-50 border-amber-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">IJssalon De Zonnebloem</span>
        </div>
        <p className="text-xs text-amber-600 italic">You're at a Dutch ice cream shop in Amsterdam.</p>
      </Card>

      {/* Shopkeeper bubble */}
      <div className="flex gap-3">
        <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 flex-1">
          <p className="font-medium text-foreground">{step.shopkeeper.dutch}</p>
          <p className="text-xs text-muted-foreground mt-0.5 italic">{step.shopkeeper.english}</p>
        </div>
      </div>

      {/* Hint */}
      {!isAnswered && (
        <button
          onClick={() => setShowHint(h => !h)}
          className="text-xs text-primary underline underline-offset-2"
        >
          {showHint ? 'Hide hint' : 'Need a hint?'}
        </button>
      )}
      {showHint && !isAnswered && (
        <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 italic">
          {step.hint}
        </p>
      )}

      {/* Options */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your reply:</p>
        {step.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = opt.correct;
          let style = 'border-border bg-card hover:bg-muted/50 cursor-pointer';
          if (isAnswered) {
            if (isCorrect) style = 'border-green-400 bg-green-50 cursor-default';
            else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 cursor-default';
            else style = 'border-border bg-card opacity-50 cursor-default';
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`rounded-xl border-2 px-4 py-3 transition-all ${style}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm text-foreground">{opt.dutch}</p>
                  <p className="text-xs text-muted-foreground italic mt-0.5">{opt.english}</p>
                </div>
                {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {isAnswered && (
        <div className="animate-fade-in space-y-3">
          {step.options[selected!].correct ? (
            <p className="text-sm text-green-700 font-medium">Goed zo! That's the right thing to say.</p>
          ) : (
            <p className="text-sm text-red-700 font-medium">
              Not quite — the correct answer is highlighted above.
            </p>
          )}
          <Button className="w-full" onClick={handleNext}>
            {stepIndex + 1 >= steps.length ? 'See results' : 'Next →'}
          </Button>
        </div>
      )}
    </div>
  );
}
