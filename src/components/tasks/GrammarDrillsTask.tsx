import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

type Category = 'conjugation' | 'wordorder' | 'separable';

// ── CONJUGATION ──
interface ConjEx {
  template: string;   // "Ik ___ in Amsterdam."
  infinitive: string; // "wonen"
  answer: string;     // "woon"
  tip: string;
}

const conjugationExercises: ConjEx[] = [
  { template: 'Ik ___ in Amsterdam.', infinitive: 'wonen', answer: 'woon', tip: 'ik + wonen → drop -en → woon' },
  { template: 'Jij ___ thee elke ochtend.', infinitive: 'drinken', answer: 'drinkt', tip: 'jij/hij/zij + drinken → drink + t → drinkt' },
  { template: 'Hij ___ soep vanavond.', infinitive: 'maken', answer: 'maakt', tip: 'hij + maken → maak + t → maakt' },
  { template: 'Wij ___ naar de tram.', infinitive: 'lopen', answer: 'lopen', tip: 'wij/zij/jullie keep the full stem → lopen' },
  { template: 'Zij ___ brood en melk.', infinitive: 'kopen', answer: 'koopt', tip: 'zij (she) + kopen → koop + t → koopt' },
  { template: 'Tom ___ naar zijn werk.', infinitive: 'fietsen', answer: 'fietst', tip: 'hij + fietsen → fiets + t → fietst' },
  { template: 'Ik ___ een klein appartement.', infinitive: 'hebben', answer: 'heb', tip: 'hebben is irregular: ik heb, jij hebt, hij heeft' },
  { template: 'De tram ___ door de stad.', infinitive: 'rijden', answer: 'rijdt', tip: 'hij + rijden → rijdt (stem ends in d, add t)' },
  { template: 'Anna ___ blij en ontspannen.', infinitive: 'zijn', answer: 'is', tip: 'zijn is irregular: ik ben, jij/hij/zij is, wij zijn' },
  { template: 'Wij ___ samen in het café.', infinitive: 'zitten', answer: 'zitten', tip: 'wij keep the infinitive form → zitten' },
];

// ── WORD ORDER ──
interface WOEx {
  prompt: string;
  options: string[];
  correct: number;
  rule: string;
}

const wordOrderExercises: WOEx[] = [
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'Elke ochtend Anna drinkt thee.',
      'Elke ochtend drinkt Anna thee.',
      'Elke ochtend thee Anna drinkt.',
    ],
    correct: 1,
    rule: 'V2 rule: when a time phrase starts the sentence, the verb must come in position 2 — before the subject.',
  },
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'Na het werk Anna gaat naar de supermarkt.',
      'Na het werk naar de supermarkt Anna gaat.',
      'Na het werk gaat Anna naar de supermarkt.',
    ],
    correct: 2,
    rule: 'V2 rule: after a time/place phrase, the verb comes before the subject.',
  },
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'In de keuken maakt Tom koffie.',
      'In de keuken Tom maakt koffie.',
      'In de keuken koffie maakt Tom.',
    ],
    correct: 0,
    rule: 'V2 rule: location phrases at the start also push the verb to position 2.',
  },
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'Daarna Anna loopt naar de tram.',
      'Daarna loopt Anna naar de tram.',
      'Daarna naar de tram Anna loopt.',
    ],
    correct: 1,
    rule: '"Daarna" (after that), "dan" (then) and "ook" (also) trigger V2 just like time phrases.',
  },
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'Op zaterdag ik slaap lang.',
      'Op zaterdag lang ik slaap.',
      'Op zaterdag slaap ik lang.',
    ],
    correct: 2,
    rule: 'After "Op zaterdag", the verb "slaap" must come before "ik" — verb always in position 2.',
  },
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'Tom fietst elke dag naar zijn werk.',
      'Tom elke dag fietst naar zijn werk.',
      'Naar zijn werk Tom fietst elke dag.',
    ],
    correct: 0,
    rule: 'In a normal statement (subject first), the verb is already in position 2 — no inversion needed.',
  },
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'Om negen uur Anna wordt wakker.',
      'Om negen uur wordt Anna wakker.',
      'Anna om negen uur wakker wordt.',
    ],
    correct: 1,
    rule: 'After "Om negen uur", the verb "wordt" must come before "Anna" (V2 rule).',
  },
  {
    prompt: 'Which sentence has correct Dutch word order?',
    options: [
      'Morgen zij moet vroeg opstaan.',
      'Morgen vroeg zij moet opstaan.',
      'Morgen moet zij vroeg opstaan.',
    ],
    correct: 2,
    rule: 'Modal verbs (moet, wil, kan) also follow V2. The infinitive "opstaan" goes to the end.',
  },
];

// ── SEPARABLE VERBS ──
interface SepEx {
  template: string;   // "Ik sta om zeven uur ___."
  verb: string;       // "opstaan"
  answer: string;     // "op"
  full: string;       // "Ik sta om zeven uur op."
  tip: string;
}

const separableExercises: SepEx[] = [
  {
    template: 'Ik sta om zeven uur ___.',
    verb: 'opstaan',
    answer: 'op',
    full: 'Ik sta om zeven uur op.',
    tip: 'opstaan = op + staan. The prefix "op" splits off and moves to the end.',
  },
  {
    template: 'De tram komt ___.',
    verb: 'aankomen',
    answer: 'aan',
    full: 'De tram komt aan.',
    tip: 'aankomen = aan + komen. Prefix "aan" goes to the end of the sentence.',
  },
  {
    template: 'Anna stapt ___.',
    verb: 'instappen',
    answer: 'in',
    full: 'Anna stapt in.',
    tip: 'instappen = in + stappen. Prefix "in" goes to the end.',
  },
  {
    template: 'Tom stapt bij de halte ___.',
    verb: 'uitstappen',
    answer: 'uit',
    full: 'Tom stapt bij de halte uit.',
    tip: 'uitstappen = uit + stappen. Prefix "uit" goes to the end.',
  },
  {
    template: 'Ik doe mijn jas ___.',
    verb: 'aandoen',
    answer: 'aan',
    full: 'Ik doe mijn jas aan.',
    tip: 'aandoen = aan + doen. Prefix "aan" goes to the end.',
  },
  {
    template: 'Zij trekt haar jas ___.',
    verb: 'uittrekken',
    answer: 'uit',
    full: 'Zij trekt haar jas uit.',
    tip: 'uittrekken = uit + trekken. Prefix "uit" goes to the end.',
  },
  {
    template: 'Lisa brengt bloemen ___.',
    verb: 'meebrengen',
    answer: 'mee',
    full: 'Lisa brengt bloemen mee.',
    tip: 'meebrengen = mee + brengen. Prefix "mee" goes to the end.',
  },
  {
    template: 'Tom nodigt Anna ___.',
    verb: 'uitnodigen',
    answer: 'uit',
    full: 'Tom nodigt Anna uit.',
    tip: 'uitnodigen = uit + nodigen. Prefix "uit" goes to the end.',
  },
];

function normalize(s: string) {
  return s.trim().toLowerCase();
}

// ── COMPONENT ──
export function GrammarDrillsTask({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState<Category>('conjugation');
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const exercises = category === 'conjugation' ? conjugationExercises
    : category === 'wordorder' ? wordOrderExercises
    : separableExercises;

  const progress = (idx / exercises.length) * 100;
  const isTextDrill = category === 'conjugation' || category === 'separable';

  function selectCategory(c: Category) {
    setCategory(c);
    setIdx(0);
    setInput('');
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  function handleCheck() {
    if (isTextDrill && !input.trim()) return;
    if (!isTextDrill && selected === null) return;

    let correct = false;
    if (category === 'conjugation') {
      correct = normalize(input) === normalize((exercises[idx] as ConjEx).answer);
    } else if (category === 'separable') {
      correct = normalize(input) === normalize((exercises[idx] as SepEx).answer);
    } else {
      correct = selected === (exercises[idx] as WOEx).correct;
    }

    if (correct) setScore(s => s + 1);
    setChecked(true);
  }

  function handleNext() {
    if (idx + 1 >= exercises.length) {
      setFinished(true);
    } else {
      setIdx(i => i + 1);
      setInput('');
      setSelected(null);
      setChecked(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!checked) handleCheck();
      else handleNext();
    }
  }

  // Results screen
  if (finished) {
    const perfect = score === exercises.length;
    return (
      <div className="animate-fade-in space-y-5">
        <div className="text-center py-4">
          <h2 className="font-heading text-2xl font-bold mb-1">
            {perfect ? 'Perfect score!' : score >= exercises.length * 0.7 ? 'Well done!' : 'Keep drilling!'}
          </h2>
          <p className="text-muted-foreground">
            <span className="font-bold text-primary">{score}</span> / {exercises.length} correct
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2" onClick={() => selectCategory(category)}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
          <Button className="flex-1" onClick={onBack}>Done</Button>
        </div>
      </div>
    );
  }

  const ex = exercises[idx];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">{idx + 1} / {exercises.length}</Badge>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Category selector */}
      <div className="grid grid-cols-3 gap-1.5">
        {([
          { value: 'conjugation' as Category, label: 'Conjugation' },
          { value: 'wordorder' as Category, label: 'Word Order' },
          { value: 'separable' as Category, label: 'Separable' },
        ] as const).map(({ value, label }) => (
          <button
            key={value}
            onClick={() => selectCategory(value)}
            className={`rounded-lg border-2 py-2 text-xs font-semibold transition-all ${
              category === value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── CONJUGATION / SEPARABLE DRILL ── */}
      {isTextDrill && (
        <div className="space-y-4">
          <Card className="p-4 text-center space-y-2">
            {category === 'conjugation' ? (
              <>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Fill in the correct verb form</p>
                <p className="text-lg font-semibold text-foreground">
                  {(ex as ConjEx).template.replace('___', '______')}
                </p>
                <p className="text-sm text-muted-foreground italic">({(ex as ConjEx).infinitive})</p>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Fill in the missing prefix</p>
                <p className="text-lg font-semibold text-foreground">{(ex as SepEx).template}</p>
                <p className="text-sm text-muted-foreground italic">verb: <span className="font-bold text-foreground">{(ex as SepEx).verb}</span></p>
              </>
            )}
          </Card>

          <div className="space-y-3">
            <div className="relative">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer…"
                disabled={checked}
                className={`text-center text-lg font-medium pr-10 ${
                  checked
                    ? (category === 'conjugation'
                        ? normalize(input) === normalize((ex as ConjEx).answer)
                        : normalize(input) === normalize((ex as SepEx).answer))
                      ? 'border-green-400 bg-green-50 text-green-800'
                      : 'border-red-400 bg-red-50 text-red-800'
                    : ''
                }`}
                autoFocus
              />
              {checked && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {(category === 'conjugation'
                    ? normalize(input) === normalize((ex as ConjEx).answer)
                    : normalize(input) === normalize((ex as SepEx).answer))
                    ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                    : <XCircle className="h-5 w-5 text-red-500" />
                  }
                </div>
              )}
            </div>

            {checked && (
              <div className="animate-fade-in space-y-3">
                {(category === 'conjugation'
                  ? normalize(input) === normalize((ex as ConjEx).answer)
                  : normalize(input) === normalize((ex as SepEx).answer))
                  ? (
                    <p className="text-sm text-green-700 text-center font-medium">
                      Correct!
                    </p>
                  ) : (
                    <Card className="bg-red-50 border-red-200 p-3 space-y-1">
                      <p className="text-sm text-red-700 text-center">
                        The answer is <span className="font-bold">
                          {category === 'conjugation' ? (ex as ConjEx).answer : (ex as SepEx).answer}
                        </span>
                      </p>
                      {category === 'separable' && (
                        <p className="text-xs text-center text-muted-foreground">Full: <span className="font-semibold text-foreground">{(ex as SepEx).full}</span></p>
                      )}
                    </Card>
                  )
                }
                <Card className="bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground text-center">
                    {category === 'conjugation' ? (ex as ConjEx).tip : (ex as SepEx).tip}
                  </p>
                </Card>
                <Button className="w-full" onClick={handleNext}>
                  {idx + 1 >= exercises.length ? 'See results' : 'Next →'}
                </Button>
              </div>
            )}

            {!checked && (
              <Button className="w-full" onClick={handleCheck} disabled={!input.trim()}>
                Check
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ── WORD ORDER DRILL ── */}
      {category === 'wordorder' && (
        <div className="space-y-4">
          <Card className="bg-amber-50 border-amber-200 p-4">
            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-1">V2 Rule</p>
            <p className="text-xs text-amber-700">In Dutch, the finite verb is always in the <strong>second position</strong> of a main clause.</p>
          </Card>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{(ex as WOEx).prompt}</p>
          </div>

          <div className="space-y-2">
            {(ex as WOEx).options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === (ex as WOEx).correct;
              let style = 'border-border bg-card hover:bg-muted/50 cursor-pointer text-foreground';
              if (checked) {
                if (isCorrect) style = 'border-green-400 bg-green-50 cursor-default text-green-800';
                else if (isSelected) style = 'border-red-400 bg-red-50 cursor-default text-red-800 line-through opacity-70';
                else style = 'border-border bg-card opacity-40 cursor-default text-muted-foreground';
              }
              return (
                <div
                  key={i}
                  onClick={() => { if (!checked) setSelected(i); }}
                  className={`rounded-xl border-2 px-4 py-3 transition-all text-sm font-medium ${style} ${isSelected && !checked ? 'border-primary bg-primary/5' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{opt}</span>
                    {checked && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />}
                    {checked && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                  </div>
                </div>
              );
            })}
          </div>

          {checked && (
            <div className="animate-fade-in space-y-3">
              <Card className="bg-blue-50 border-blue-200 p-3">
                <p className="text-xs text-blue-700">{(ex as WOEx).rule}</p>
              </Card>
              <Button className="w-full" onClick={handleNext}>
                {idx + 1 >= exercises.length ? 'See results' : 'Next →'}
              </Button>
            </div>
          )}

          {!checked && (
            <Button className="w-full" onClick={handleCheck} disabled={selected === null}>
              Check
            </Button>
          )}
        </div>
      )}

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 pt-1">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === idx ? 'w-4 bg-primary' :
              i < idx ? 'w-2 bg-green-400' :
              'w-2 bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
