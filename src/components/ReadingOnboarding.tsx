import { useState, useEffect } from 'react';
import { X, ChevronRight, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'english-reading-onboarded-v2';

// ─── Reusable animated finger ────────────────────────────────────────────────
function Finger({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute z-10 ${className}`}>
      {/* ripple */}
      <div className="absolute -inset-2 rounded-full bg-primary/20 animate-ping" />
      {/* touch dot */}
      <div className="relative h-5 w-5 rounded-full bg-primary shadow-lg border-2 border-white" />
    </div>
  );
}

// ─── Step visuals ─────────────────────────────────────────────────────────────

function StepLevelPick() {
  const [tapped, setTapped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTapped(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full space-y-2">
      {[
        { label: 'A1 — Beginner', sub: '40 texts · 5 modules', highlight: true },
        { label: 'A2 — Elementary', sub: '48 texts · 6 modules', highlight: false },
      ].map(({ label, sub, highlight }) => (
        <div
          key={label}
          className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500 ${
            highlight && tapped
              ? 'border-primary bg-primary/8 shadow-sm'
              : 'border-border bg-card'
          }`}
        >
          <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500 ${highlight && tapped ? 'bg-primary/15' : 'bg-secondary'}`}>
            <BookOpen className={`h-4 w-4 transition-colors duration-500 ${highlight && tapped ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {highlight && (
            <Finger
              className={`transition-all duration-300 ${tapped ? '-bottom-2 -right-2 opacity-100' : 'bottom-2 right-4 opacity-0'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StepModulePick() {
  const [tapped, setTapped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTapped(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full space-y-2">
      {['Module 1 — New Flatmates', 'Module 2 — The Café Shift'].map((label, i) => (
        <div
          key={label}
          className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500 ${
            i === 0 && tapped ? 'border-primary bg-primary/8' : 'border-border bg-card'
          }`}
        >
          <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <div className="h-4 w-5 rounded-sm border-2 border-muted-foreground/40" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <div className="mt-1 h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-primary/50" style={{ width: i === 0 ? '30%' : '0%' }} />
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {i === 0 && (
            <Finger className={`transition-all duration-300 ${tapped ? '-bottom-2 -right-2 opacity-100' : 'bottom-2 right-4 opacity-0'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function StepTapWord() {
  const [tapped, setTapped] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setTapped(true), 700);
    const t2 = setTimeout(() => setShowPopup(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full space-y-3">
      <div className="relative rounded-xl border border-border bg-card p-4 text-sm leading-[2.2]">
        <span>Every morning, he </span>
        <span className={`relative inline-block rounded px-1 py-0.5 font-semibold transition-all duration-300 cursor-pointer ${tapped ? 'bg-primary/15 text-primary' : 'text-foreground'}`}>
          cycles
          {tapped && (
            <Finger className="-bottom-3 left-1/2 -translate-x-1/2" />
          )}
        </span>
        <span> to work.</span>
      </div>
      <div className={`rounded-xl border border-border bg-secondary/40 px-4 py-3 space-y-1 transition-all duration-500 ${showPopup ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-sm text-foreground">cycle</span>
          <span className="text-xs text-muted-foreground">verb</span>
        </div>
        <p className="text-sm text-foreground">ездить на велосипеде</p>
        <p className="text-xs text-muted-foreground italic">He cycles every day.</p>
      </div>
    </div>
  );
}

function StepHighlight() {
  const [phase, setPhase] = useState<'idle' | 'dragging' | 'selected' | 'popup'>('idle');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('dragging'), 600);
    const t2 = setTimeout(() => setPhase('selected'), 1200);
    const t3 = setTimeout(() => setPhase('popup'), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="w-full space-y-3">
      <div className="relative rounded-xl border border-border bg-card p-4 text-sm leading-[2.2]">
        <span>Anna en Tom </span>
        <span className="relative inline">
          {/* Animated highlight sweep */}
          <span className={`absolute inset-0 rounded bg-amber-300/50 transition-all duration-500 ease-out origin-left ${phase === 'idle' ? 'scale-x-0' : 'scale-x-100'}`} />
          <span className="relative">gaan samen naar de markt</span>
        </span>
        <span> op zaterdag.</span>

        {/* Finger starts left, moves right */}
        {(phase === 'dragging' || phase === 'selected') && (
          <Finger className={`bottom-3 transition-all duration-500 ${phase === 'dragging' ? 'left-[30%]' : 'left-[78%]'}`} />
        )}
      </div>

      {/* Save popup */}
      <div className={`rounded-xl border border-border bg-card px-4 py-3 transition-all duration-400 ${phase === 'popup' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <p className="text-xs text-muted-foreground mb-2">Selected phrase</p>
        <p className="text-sm font-semibold text-foreground mb-3">"gaan samen naar de markt"</p>
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            Save to flashcards
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground">
            <MessageSquare className="h-3.5 w-3.5" /> Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}

function StepChat() {
  const [tapped, setTapped] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setTapped(true), 700);
    const t2 = setTimeout(() => setShowMsg(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full space-y-3">
      {/* Chat button mock */}
      <div className="relative flex justify-end">
        <div className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 transition-all duration-300 ${tapped ? 'border-primary bg-primary/8 text-primary' : 'border-border bg-card text-muted-foreground'}`}>
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">Ask about this text</span>
        </div>
        {tapped && <Finger className="-bottom-2 right-4" />}
      </div>

      {/* Chat messages */}
      <div className={`space-y-2 transition-all duration-500 ${showMsg ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-primary">AI</span>
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 max-w-[80%]">
            <p className="text-xs text-foreground">What would you like to know about this text?</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-tr-sm bg-primary px-3 py-2 max-w-[75%]">
            <p className="text-xs text-primary-foreground">Wat betekent "markt" in dit verhaal?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-primary">AI</span>
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 max-w-[80%]">
            <p className="text-xs text-foreground">"Markt" means market — an outdoor place to buy food and goods.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepColors() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(t);
  }, []);

  const items = [
    {
      color: 'bg-highlight-soft text-highlight-ink border-highlight/40',
      dot: 'bg-highlight',
      label: 'Vocabulary word',
      desc: 'A word from your saved flashcard list — already familiar territory.',
      word: 'kitchen',
    },
    {
      color: 'bg-green-100 text-green-700 border-green-200',
      dot: 'bg-green-400',
      label: 'Fixed expression',
      desc: 'A set phrase — the meaning can\'t be guessed word by word.',
      word: 'by the way',
    },
  ];

  return (
    <div className="w-full space-y-2">
      {/* Example sentence */}
      <div className="rounded-xl border border-border bg-card p-3 text-sm leading-[2.2]">
        <span className={`rounded border px-1 py-0.5 font-medium transition-all duration-1000 ${revealed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-transparent text-foreground border-transparent'}`}>By the way</span>
        <span>, the </span>
        <span className={`rounded border px-1 py-0.5 font-medium transition-all duration-500 ${revealed ? 'bg-highlight-soft text-highlight-ink border-highlight/40' : 'bg-transparent text-foreground border-transparent'}`}>kitchen</span>
        <span> is very small.</span>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {items.map(({ color, dot, label, desc, word }, i) => (
          <div
            key={label}
            className={`flex items-start gap-3 rounded-xl border border-border bg-card px-3 py-2.5 transition-all duration-500 ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
            style={{ transitionDelay: `${i * 150 + 400}ms` }}
          >
            <span className={`rounded border px-2 py-0.5 text-xs font-semibold shrink-0 mt-0.5 ${color}`}>{word}</span>
            <div>
              <p className="text-xs font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepExercises() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 5), 1000);
    return () => clearInterval(t);
  }, []);

  const tabs = ['Quiz', 'Words', 'Fill Gap', 'Builder', 'Retell'];

  return (
    <div className="w-full space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab, i) => (
          <div
            key={tab}
            className={`flex shrink-0 flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center min-w-[64px] transition-all duration-300 ${
              i === active ? 'border-primary bg-primary/8' : 'border-border'
            }`}
          >
            <div className={`h-5 w-5 rounded transition-colors duration-300 ${i === active ? 'bg-primary/40' : 'bg-secondary'}`} />
            <span className={`text-[11px] font-semibold leading-tight transition-colors duration-300 ${i === active ? 'text-primary' : 'text-muted-foreground'}`}>{tab}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground">
        {active === 0 && <p>Multiple-choice comprehension questions about the text.</p>}
        {active === 1 && <p>Choose the correct English word for each meaning.</p>}
        {active === 2 && <p>Key vocabulary is hidden — type the English word from memory.</p>}
        {active === 3 && <p>Tap word tiles to build the correct English sentence.</p>}
        {active === 4 && <p>Retell the story in English — AI reads and gives you feedback.</p>}
      </div>
    </div>
  );
}

// ─── Steps definition ─────────────────────────────────────────────────────────
const STEPS = [
  {
    title: 'Choose your level',
    body: 'Start by picking A1 (beginner) or A2 (elementary). Each module is a short story in 8 episodes, ordered easiest to hardest.',
    Visual: StepLevelPick,
  },
  {
    title: 'Open a module',
    body: 'Each module is a story in 8 episodes. A progress bar shows how many you have completed. Tap one to browse its texts.',
    Visual: StepModulePick,
  },
  {
    title: 'Tap any word',
    body: 'Tap a single English word to instantly see its meaning, grammar info, and an example sentence. Save it to your flashcards with one tap.',
    Visual: StepTapWord,
  },
  {
    title: 'Select a phrase',
    body: 'Press and drag to highlight multiple words. A popup lets you save the whole phrase to your flashcards with one tap.',
    Visual: StepHighlight,
  },
  {
    title: 'Colour coding',
    body: 'Words are highlighted automatically as you read. Watch the colours appear — they tell you what kind of word you\'re looking at before you even tap.',
    Visual: StepColors,
  },
  {
    title: 'Practice exercises',
    body: 'Scroll below any text to find five exercises that reinforce what you read. They cycle automatically so each visit feels different.',
    Visual: StepExercises,
  },
];

// ─── Main onboarding modal ────────────────────────────────────────────────────
interface ReadingOnboardingProps {
  onDone: () => void;
}

export function ReadingOnboarding({ onDone }: ReadingOnboardingProps) {
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0); // remount visual on step change to restart animations

  function goTo(next: number) {
    setStep(next);
    setKey(k => k + 1);
  }

  function finish() {
    localStorage.setItem(STORAGE_KEY, 'true');
    onDone();
  }

  const isLast = step === STEPS.length - 1;
  const { title, body, Visual } = STEPS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm px-4 pb-6">
      <div className="w-full max-w-sm rounded-3xl bg-card shadow-2xl overflow-hidden animate-fade-in">

        {/* Progress bar + close */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-3">
          <div className="flex flex-1 gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 flex-1 rounded-full cursor-pointer transition-all duration-300 ${
                  i <= step ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <button
            onClick={finish}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Visual */}
        <div className="px-5 pb-3">
          <div key={key} className="animate-fade-in">
            <Visual />
          </div>
        </div>

        {/* Text */}
        <div className="px-5 pb-2 space-y-1">
          <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 px-5 py-4">
          {step > 0 && (
            <Button variant="outline" className="flex-1" onClick={() => goTo(step - 1)}>
              Back
            </Button>
          )}
          <Button className="flex-1" onClick={() => isLast ? finish() : goTo(step + 1)}>
            {isLast ? 'Start reading' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useReadingOnboarding() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setShow(true);
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);

  return { show, dismiss: () => setShow(false) };
}
