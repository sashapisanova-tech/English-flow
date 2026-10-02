import { useState, useEffect } from 'react';
import { X, BookOpen, Brain, Target, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/BrandLogo';

export const APP_ONBOARDING_KEY = 'english-app-onboarded-v1';

// ─── Step visuals ──────────────────────────────────────────────────────────────

function StepWelcome() {
  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <BrandLogo variant="icon" size={96} />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
          <BookOpen className="h-3 w-3 text-primary" />
          <span className="text-xs font-semibold text-foreground">Read</span>
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
          <Brain className="h-3 w-3 text-primary" />
          <span className="text-xs font-semibold text-foreground">Remember</span>
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
          <Target className="h-3 w-3 text-primary" />
          <span className="text-xs font-semibold text-foreground">Practise</span>
        </div>
      </div>
    </div>
  );
}

function StepLevels() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 500);
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
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500 ${
            highlight && active ? 'border-primary bg-primary/8' : 'border-border bg-card'
          }`}
        >
          <div
            className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500 ${
              highlight && active ? 'bg-primary/15' : 'bg-secondary'
            }`}
          >
            <BookOpen
              className={`h-4 w-4 transition-colors duration-500 ${
                highlight && active ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepSaveWords() {
  const [tapped, setTapped] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setTapped(true), 600);
    const t2 = setTimeout(() => setSaved(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full space-y-3">
      <div className="rounded-xl border border-border bg-card p-4 text-sm leading-[2.2]">
        <span>She goes to work by </span>
        <span
          className={`rounded px-1 py-0.5 font-semibold transition-all duration-300 cursor-pointer ${
            tapped ? 'bg-highlight-soft text-highlight-ink border border-highlight/40' : 'text-foreground'
          }`}
        >
          bike
        </span>
        <span> every day.</span>
      </div>
      <div
        className={`rounded-xl border border-border bg-secondary/40 px-4 py-3 transition-all duration-500 ${
          tapped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">bike</p>
            <p className="text-sm text-muted-foreground">велосипед</p>
          </div>
          <button
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-500 ${
              saved
                ? 'bg-secondary text-foreground'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepFlashcards() {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFlipped(true), 700);
    const t2 = setTimeout(() => setAnswered(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full space-y-3">
      <div className="relative h-24 rounded-2xl border border-border bg-card flex items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            flipped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <p className="text-2xl font-bold text-foreground">bike</p>
        </div>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-1 transition-all duration-500 ${
            flipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <p className="text-xl font-bold text-foreground">велосипед</p>
          <p className="text-xs text-muted-foreground italic">"I go to work by bike."</p>
        </div>
      </div>

      {/* Interval preview row — mirrors the real flashcard view */}
      <div className={`flex items-center justify-center gap-2 text-[11px] text-muted-foreground flex-wrap transition-all duration-500 ${answered ? 'opacity-100' : 'opacity-0'}`}>
        <span>Again → tomorrow</span>
        <span className="opacity-30">·</span>
        <span>Hard → in 4 days</span>
        <span className="opacity-30">·</span>
        <span>Good → in 10 days</span>
        <span className="opacity-30">·</span>
        <span>Easy → in 1 month</span>
      </div>

      {/* 4 rating buttons */}
      <div className={`flex gap-1.5 transition-all duration-500 ${answered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="flex-1 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-semibold text-red-600">
          Again
        </button>
        <button className="flex-1 rounded-xl border border-highlight/40 bg-amber-50 py-2.5 text-xs font-semibold text-highlight-ink">
          Hard
        </button>
        <button className="flex-1 rounded-xl border border-primary/30 bg-primary/5 py-2.5 text-xs font-semibold text-primary">
          Good
        </button>
        <button className="flex-1 rounded-xl bg-green-500 py-2.5 text-xs font-semibold text-white">
          Easy
        </button>
      </div>
    </div>
  );
}

function StepTasks() {
  return (
    <div className="w-full space-y-2.5">
      {[
        {
          emoji: '✏️',
          title: 'Translate to English',
          desc: 'See a sentence in your language → write it in English → AI gives warm feedback',
          bg: 'bg-blue-50 border-blue-100',
        },
        {
          emoji: '💬',
          title: 'Chat with AI',
          desc: 'Hold a real English conversation with an AI partner and save new words mid-chat',
          bg: 'bg-green-50 border-green-100',
        },
      ].map(({ emoji, title, desc, bg }) => (
        <div key={title} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${bg}`}>
          <span className="text-xl shrink-0 mt-0.5">{emoji}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground leading-snug mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepCoach() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full space-y-2">
      <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-semibold text-foreground">Get today's suggestions</p>
          <p className="text-[10px] text-muted-foreground">Tap once, results saved for the day</p>
        </div>
      </div>
      <div
        className={`space-y-1.5 transition-all duration-500 ${
          shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {[
          { emoji: '📚', text: 'Review your flashcards — 12 cards due' },
          { emoji: '📖', text: 'Read the next A1 text in Module 1' },
          { emoji: '✏️', text: 'Practise present tense with a translation task' },
        ].map(({ emoji, text }) => (
          <div key={text} className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5">
            <span className="text-base shrink-0">{emoji}</span>
            <p className="text-xs text-foreground font-medium">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Steps definition ──────────────────────────────────────────────────────────

const STEPS = [
  {
    title: 'Welcome to English Flow',
    body: "You're about to learn English the way linguists recommend — lots of reading first, vocabulary second, and real practice third.",
    Visual: StepWelcome,
  },
  {
    title: 'Read English texts at your level',
    body: 'Pick A1 for complete beginners, A2 if you already know some basics. Each level has short stories in modules of 8 episodes, ordered easiest to hardest.',
    Visual: StepLevels,
  },
  {
    title: 'Tap any word to save it',
    body: "Red words are the story's new words. Tap one to see its translation, then press Save. It joins your personal flashcard deck instantly.",
    Visual: StepSaveWords,
  },
  {
    title: 'Review words every day',
    body: "Saved words appear in your daily flashcard review. The app shows each word right before you'd forget it — that's spaced repetition.",
    Visual: StepFlashcards,
  },
  {
    title: 'Practice with real tasks',
    body: "The Tasks tab makes you produce English, not just recognise it. Translate texts and hold English conversations with an AI partner.",
    Visual: StepTasks,
  },
  {
    title: 'Your daily AI Coach',
    body: "On the Home tab, tap 'Get today's suggestions'. It reads your history and tells you exactly what to focus on — vocab, grammar, or conversation.",
    Visual: StepCoach,
  },
];

// ─── Main component ────────────────────────────────────────────────────────────

interface AppOnboardingProps {
  onDone: () => void;
}

export function AppOnboarding({ onDone }: AppOnboardingProps) {
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0);

  function goTo(next: number) {
    setStep(next);
    setKey(k => k + 1);
  }

  function finish() {
    localStorage.setItem(APP_ONBOARDING_KEY, 'true');
    onDone();
  }

  const isLast = step === STEPS.length - 1;
  const { title, body, Visual } = STEPS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
      <div className="w-full max-w-sm rounded-3xl bg-card shadow-2xl overflow-hidden animate-fade-in">

        {/* Progress bar + close */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <div className="flex flex-1 gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <button
            onClick={finish}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary transition-colors shrink-0"
            aria-label="Skip tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Visual — key prop remounts on step change to restart animations */}
        <div className="px-5 pb-4">
          <div key={key} className="animate-fade-in">
            <Visual />
          </div>
        </div>

        {/* Text */}
        <div className="px-5 pb-2 space-y-1">
          <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 px-5 py-4">
          {step > 0 && (
            <Button variant="outline" className="flex-1" onClick={() => goTo(step - 1)}>
              Back
            </Button>
          )}
          <Button className="flex-1" onClick={() => (isLast ? finish() : goTo(step + 1))}>
            {isLast ? "Let's go!" : 'Next'}
          </Button>
        </div>

      </div>
    </div>
  );
}
