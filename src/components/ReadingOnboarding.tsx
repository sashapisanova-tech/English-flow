import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'dutch-reading-onboarded';

const STEPS = [
  {
    title: 'Reading Library',
    body: 'Choose your level — A1 (Beginner) or A2 (Elementary) — then pick a module and open any text. Texts are ordered from easiest to hardest within each module.',
    visual: (
      <div className="space-y-2 w-full">
        {['A1 — Beginner', 'A2 — Elementary'].map(l => (
          <div key={l} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <div className="h-4 w-4 rounded-sm bg-primary/40" />
            </div>
            <span className="text-sm font-medium text-foreground">{l}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Tap any word',
    body: 'Tap a single word to see its Dutch translation, article, and an example sentence. Tap the bookmark icon to save it to your vocabulary for flashcard review.',
    visual: (
      <div className="w-full rounded-xl border border-border bg-card p-4 space-y-3">
        <p className="text-sm leading-relaxed text-foreground">
          Hij gaat elke ochtend{' '}
          <span className="rounded bg-primary/15 px-1 py-0.5 font-semibold text-primary underline decoration-dotted">
            fietsen
          </span>{' '}
          naar zijn werk.
        </p>
        <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2.5 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-foreground text-sm">fietsen</span>
            <span className="text-xs text-muted-foreground">to cycle</span>
          </div>
          <p className="text-xs text-muted-foreground italic">to cycle / to bike</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Highlighted vocabulary',
    body: 'Words are automatically highlighted so you always know what you\'re looking at while reading.',
    visual: (
      <div className="w-full rounded-xl border border-border bg-card p-4 space-y-3">
        <p className="text-sm leading-relaxed">
          <span className="text-foreground">De </span>
          <span className="rounded bg-orange-100 px-1 py-0.5 text-orange-700 font-medium">winkel</span>
          <span className="text-foreground"> is </span>
          <span className="rounded bg-blue-100 px-1 py-0.5 text-blue-700 font-medium">dicht</span>
          <span className="text-foreground"> op </span>
          <span className="rounded bg-green-100 px-1 py-0.5 text-green-700 font-medium">zondag</span>
          <span className="text-foreground">.</span>
        </p>
        <div className="space-y-1.5">
          {[
            { color: 'bg-orange-100 text-orange-700', label: 'Vocabulary word from your list' },
            { color: 'bg-blue-100 text-blue-700', label: 'Separable verb' },
            { color: 'bg-green-100 text-green-700', label: 'Fixed expression' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-xs font-medium ${color}`}>A</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Listen & speak',
    body: 'Tap the speaker icon at the top of any text to hear it read aloud in Dutch. Use the voice settings button (bottom-right) to change speed or voice.',
    visual: (
      <div className="w-full rounded-xl border border-border bg-card p-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground">Read aloud</p>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-2/5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Practice exercises',
    body: 'After reading, scroll down to find five exercises: Comprehension Quiz, Word Recall, Fill the Gap, Sentence Builder, and AI Retell. Each one reinforces the text differently.',
    visual: (
      <div className="w-full grid grid-cols-3 gap-2">
        {['Quiz', 'Words', 'Fill Gap', 'Builder', 'Retell'].map(name => (
          <div
            key={name}
            className="flex flex-col items-center gap-1 rounded-xl border-2 border-border py-3 px-2 text-center"
          >
            <div className="h-5 w-5 rounded bg-secondary" />
            <span className="text-[11px] font-medium text-foreground leading-tight">{name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Generate your own text',
    body: 'Inside any level, scroll past the modules to find "Generate your own text". Pick a theme, word count, and grammar focus — AI writes a custom reading text just for you.',
    visual: (
      <div className="w-full rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <div className="h-5 w-5 rounded-sm bg-primary/50" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Generate your own text</p>
            <p className="text-xs text-muted-foreground">AI writes a custom A1 text for you</p>
          </div>
          <ChevronRight className="h-4 w-4 text-primary/60 ml-auto" />
        </div>
      </div>
    ),
  },
];

interface ReadingOnboardingProps {
  onDone: () => void;
}

export function ReadingOnboarding({ onDone }: ReadingOnboardingProps) {
  const [step, setStep] = useState(0);

  function finish() {
    localStorage.setItem(STORAGE_KEY, 'true');
    onDone();
  }

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm px-4 pb-6">
      <div className="w-full max-w-sm rounded-3xl bg-card shadow-2xl overflow-hidden animate-fade-in">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-primary' : i < step ? 'w-1.5 bg-primary/30' : 'w-1.5 bg-border'
                }`}
              />
            ))}
          </div>
          <button
            onClick={finish}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-2 space-y-4">
          {/* Visual */}
          <div className="flex justify-center">
            {current.visual}
          </div>

          {/* Text */}
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-foreground">{current.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{current.body}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4">
          {step > 0 && (
            <Button variant="outline" className="flex-1" onClick={() => setStep(s => s - 1)}>
              Back
            </Button>
          )}
          <Button
            className="flex-1"
            onClick={() => isLast ? finish() : setStep(s => s + 1)}
          >
            {isLast ? 'Start reading' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useReadingOnboarding() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so the reading library renders first
      const t = setTimeout(() => setShow(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  return { show, dismiss: () => setShow(false) };
}
