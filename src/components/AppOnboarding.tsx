// First-run tour: six steps, one idea each, ending in the first story.
// Design: design/APP_TOUR.md, design/flow-series-7/TourPhone.dc.html (phone) and
// TourLaptop.dc.html (laptop: centred card over the dimmed app). Steps 3 and 4 are
// demos and change no data; step 2 saves the start level, step 6 the daily goal.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight, ChevronDown, ChevronUp, CircleCheck, Languages, Lightbulb, MessageCircleMore,
  PanelRight, Plus, Pointer, RefreshCw, Volume2, Check,
} from 'lucide-react';
import { Pip } from '@/components/Pip';
import { BrandLogo } from '@/components/BrandLogo';
import { useLearning } from '@/context/LearningContext';
import { GOAL_OPTIONS } from '@/lib/activeTime';
import { playDutch } from '@/utils/playDutch';
import {
  STUDY_TIMES, TOUR_LEVELS, TOUR_WELCOME_POSE, getStartLevel, getStudyTime, markTourDone,
  setStartLevel, setStudyTime, type StudyTime, type TourLevel,
} from '@/lib/tour';
import { cn } from '@/lib/utils';

const STEP_COUNT = 6;

function useIsLaptop() {
  const query = '(min-width: 1024px)';
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return match;
}

// ─── Copy (design: English headline + body, Russian line) ─────────────────────

interface StepCopy {
  title: string;
  en: string;
  /** Laptop wording where it differs ("Click" instead of "Tap"). */
  enLaptop?: string;
  ru: string;
  why?: string;
}

const COPY: StepCopy[] = [
  {
    title: 'Learn English through short stories',
    en: 'Ten minutes a day. Funny stories, real British English, and everything translated when you need it.',
    ru: 'Десять минут в день. Смешные истории, настоящий британский английский и перевод — когда он нужен.',
  },
  {
    title: 'Where are you starting?',
    en: 'Pick a level. You can change it any time.',
    ru: 'Выберите уровень. Его можно поменять в любой момент.',
    why: 'Texts that are too hard kill motivation, and too easy feels pointless. Start where it feels comfortable: you can move up whenever you like.',
  },
  {
    title: "Tap a word you don't know",
    en: 'Red words are this story’s new words. Tap any word for its Russian translation.',
    enLaptop: 'Red words are this story’s new words. Click any word for its Russian translation.',
    ru: 'Красным выделены новые слова истории. Нажмите на любое слово — появится перевод.',
    why: 'Every story is written so that about 9 in 10 words are already familiar. The rest are one tap away, so you never get stuck.',
  },
  {
    title: 'Your words come back before you forget them',
    en: 'Add words to your cards. The app shows each one again just before you’d forget it. A few minutes a day is enough.',
    ru: 'Добавляйте слова в карточки. Приложение покажет каждое слово снова как раз перед тем, как вы бы его забыли. Хватит нескольких минут в день.',
    why: 'Spaced repetition is one of the best-proven ways to remember words. A word usually needs many meetings, so your words also return in later stories. Rate honestly: “Hard” brings a word back sooner.',
  },
  {
    title: 'Then use your English',
    en: 'Translate short texts and chat with Emma, your AI tutor. She corrects you kindly and explains in Russian.',
    ru: 'Переводите короткие тексты и общайтесь с Эммой — вашим ИИ-репетитором. Она мягко исправляет ошибки и объясняет по-русски.',
    why: 'Reading builds understanding; writing and speaking make it usable. Feedback in Russian takes the fear out of making mistakes.',
  },
  {
    title: 'How much time a day?',
    en: 'Choose a goal you can keep even on a busy day. Only active minutes count.',
    ru: 'Выберите цель, которую сможете выполнять даже в загруженный день. Считаются только активные минуты.',
  },
];

const PRIMARY_LABEL = ["Let's start", 'Continue', 'Next', 'Next', 'Next', 'Read my first story'];

const LEVEL_INFO: Record<TourLevel, { name: string; ru: string }> = {
  A1: { name: 'Beginner', ru: '«Я только начинаю»' },
  A2: { name: 'Elementary', ru: '«Знаю основы»' },
  B1: { name: 'Intermediate', ru: '«Могу читать простые тексты»' },
};

// ─── Small parts ──────────────────────────────────────────────────────────────

function ProgressBar({ step, className }: { step: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3.5', className)}>
      <div
        className="grid flex-1 grid-cols-6 gap-[5px]"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEP_COUNT}
        aria-valuenow={step + 1}
        aria-label="Tour progress"
      >
        {Array.from({ length: STEP_COUNT }, (_, i) => (
          <div
            key={i}
            className={cn('h-1 rounded-full transition-colors duration-300 motion-reduce:transition-none', i <= step ? 'bg-highlight' : 'bg-track')}
          />
        ))}
      </div>
      <span className="whitespace-nowrap text-[13px] text-muted-foreground">{step + 1} of {STEP_COUNT}</span>
    </div>
  );
}

function StepText({ copy, laptop, compact = false }: { copy: StepCopy; laptop: boolean; compact?: boolean }) {
  return (
    <div className={cn('flex flex-col', compact ? 'gap-2' : 'gap-2.5')}>
      <h2 className="font-heading text-[27px] font-semibold leading-[1.2] tracking-[-0.015em] text-foreground [text-wrap:pretty] lg:text-[30px]">
        {copy.title}
      </h2>
      <p className={cn('leading-normal text-foreground [text-wrap:pretty]', compact ? 'text-[15px]' : 'text-base')}>{laptop && copy.enLaptop ? copy.enLaptop : copy.en}</p>
      <p lang="ru" className={cn('leading-normal text-muted-foreground [text-wrap:pretty]', compact ? 'text-[13px]' : 'text-sm')}>{copy.ru}</p>
      {copy.why && <WhyThisWorks text={copy.why} />}
    </div>
  );
}

function WhyThisWorks({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const label = (
    <>
      <Lightbulb className="h-4 w-4" strokeWidth={1.75} />
      Why this works
    </>
  );
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="flex items-center gap-1.5 self-start rounded-md text-[13px] font-semibold text-accent-foreground hover:opacity-80"
      >
        {label}
        <ChevronDown className="h-3 w-3" strokeWidth={3} />
      </button>
    );
  }
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-accent px-3.5 py-3 motion-safe:animate-fade-in">
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-expanded
        className="flex items-center gap-1.5 text-[13px] font-semibold text-accent-foreground"
      >
        {label}
        <ChevronUp className="ml-auto h-3 w-3" strokeWidth={3} />
      </button>
      <p className="text-[13px] leading-normal text-accent-foreground">{text}</p>
    </div>
  );
}

const panel = 'rounded-xl border border-border bg-card';

/** London skyline (Flow series "London header"), tinted from the primary colour. */
function Skyline() {
  const tint = (pct: number) => `color-mix(in oklab, hsl(var(--primary)) ${pct}%, hsl(var(--background)))`;
  const line = tint(45);
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg viewBox="0 0 390 300" width="100%" height="300" preserveAspectRatio="xMidYMax slice" className="block opacity-80">
        <rect width="390" height="300" fill={tint(16)} fillOpacity={0.5} />
        <g fill={tint(26)} stroke={line} strokeWidth={1.2} strokeLinejoin="round">
          <path d="M300 270V96h-10V60h10V40l22-34 22 34v20h10v36h-10v174z" />
          <path d="M150 270v-70h12v-16h10v16h22v-16h10v16h22v-16h10v16h22v-16h10v16h30v70z" />
          <path d="M354 270v-62h18v-14h10v14h30v62z" />
          <path d="M-10 270v-50h20v-14h12v14h22v50z" />
        </g>
        <circle cx="322" cy="78" r="12" fill="hsl(var(--background))" fillOpacity={0.8} stroke={line} strokeWidth={1.2} />
        <path d="M322 78v-7M322 78l5 3" stroke={line} strokeWidth={1.2} strokeLinecap="round" />
        <circle cx="92" cy="170" r="82" fill="none" stroke={line} strokeWidth={1.4} />
        <circle cx="92" cy="170" r="74" fill="none" stroke={line} strokeWidth={0.6} />
        <path d="M92 88v164M10 170h164M34 112l116 116M150 112L34 228M50 99l84 142M134 99L50 241M21 128l142 84M163 128L21 212" stroke={line} strokeWidth={0.6} />
        <circle cx="92" cy="170" r="6" fill={line} />
        <path d="M92 170l-28 100M92 170l28 100" stroke={line} strokeWidth={1.6} />
        <path d="M-10 270h410" stroke={line} strokeWidth={1.4} />
        <rect x="196" y="236" width="62" height="32" rx="4" fill="hsl(var(--highlight))" fillOpacity={0.45} />
        <path d="M196 250h62" stroke="hsl(var(--background))" strokeOpacity={0.7} strokeWidth={1.4} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-card" />
    </div>
  );
}

// ─── Step visuals ─────────────────────────────────────────────────────────────

function WelcomeVisual() {
  return (
    <div className={cn(panel, 'relative h-[300px] shrink-0 overflow-hidden')}>
      <Skyline />
      <div className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-1.5">
        <Pip pose={TOUR_WELCOME_POSE} size={132} className="motion-safe:animate-scale-in" />
        <span className="flex items-center gap-2 font-heading text-[22px] font-semibold text-foreground">
          <BrandLogo variant="icon" size={28} />
          English Flow
        </span>
      </div>
    </div>
  );
}

function LevelCards({ level, onChange }: { level: TourLevel; onChange: (l: TourLevel) => void }) {
  return (
    <div className="flex w-full flex-col gap-2.5" role="radiogroup" aria-label="Your level">
      {TOUR_LEVELS.map(l => {
        const on = l === level;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(l)}
            className={cn(
              'flex items-center gap-3.5 rounded-xl px-[18px] py-4 text-left transition-colors motion-reduce:transition-none',
              on ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:border-primary/40',
            )}
          >
            <span className={cn('w-10 font-heading text-2xl font-semibold', !on && 'text-primary')}>{l}</span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-base font-semibold">{LEVEL_INFO[l].name}</span>
              <span lang="ru" className={cn('text-[13px]', on ? 'opacity-85' : 'text-muted-foreground')}>{LEVEL_INFO[l].ru}</span>
            </span>
            {on
              ? <CircleCheck className="h-[22px] w-[22px] fill-primary-foreground text-primary" strokeWidth={2} />
              : <span className="h-[22px] w-[22px] rounded-full border-[1.5px] border-border" />}
          </button>
        );
      })}
    </div>
  );
}

/** The sample sentence from A1 episode 1, with the tappable new word. */
function SampleSentence({ tapped, onTap, className }: { tapped: boolean; onTap: () => void; className?: string }) {
  return (
    <div className={cn('font-heading text-foreground', className)}>
      Tom and Priya are my{' '}
      <span className="relative inline-block">
        <button
          type="button"
          onClick={onTap}
          className={cn(
            'rounded px-[3px] text-highlight-ink transition-shadow motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'bg-highlight-soft',
            tapped && 'shadow-[inset_0_-2px_0_hsl(var(--highlight))]',
          )}
          aria-label="flatmates: show translation"
        >
          flatmates
        </button>
        {!tapped && (
          // Where the finger lands: a pulsing navy ring over the word
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -ml-[22px] -mt-[22px] grid h-11 w-11 place-items-center rounded-full border-2 border-primary/50 bg-primary/[0.18] motion-safe:animate-pulse"
          >
            <span className="h-3.5 w-3.5 rounded-full bg-primary" />
          </span>
        )}
      </span>
      .{' '}
      <span className="border-b-2 border-success">By the way</span>, our kitchen is tiny.
    </div>
  );
}

function PhraseLegend() {
  return (
    <div className="mt-2 flex items-center gap-1.5 text-xs text-success">
      <span className="h-0.5 w-3.5 rounded-sm bg-success" />
      phrase
    </div>
  );
}

function AddToCardsButton({ small = false }: { small?: boolean }) {
  // Demo only: nothing is saved
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setAdded(a => !a)}
      className={cn(
        'flex items-center justify-center gap-1.5 font-semibold transition-colors motion-reduce:transition-none',
        small ? 'mt-1.5 h-[30px] rounded-lg text-[11px]' : 'h-[42px] rounded-[10px] text-sm',
        added ? 'border border-primary bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground',
      )}
    >
      {added ? <Check className={small ? 'h-3 w-3' : 'h-3.5 w-3.5'} strokeWidth={3} /> : <Plus className={small ? 'h-3 w-3' : 'h-3.5 w-3.5'} strokeWidth={3} />}
      {added ? 'Added' : 'Add to cards'}
    </button>
  );
}

function TapWordPhone({ tapped, onTap }: { tapped: boolean; onTap: () => void }) {
  return (
    <div
      className={cn(
        panel,
        'relative shrink-0 overflow-hidden px-[18px] pb-5 pt-[18px] transition-[height] duration-300 motion-reduce:transition-none',
        tapped ? 'h-[300px]' : 'h-[220px]',
      )}
    >
      <div className="mb-2.5 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-highlight-soft px-2 py-0.5 text-[11px] font-semibold text-highlight-ink">A1</span>
        Episode 1 · Hello, Manchester!
      </div>
      <SampleSentence tapped={tapped} onTap={onTap} className="text-[19px] leading-[1.75]" />
      <PhraseLegend />
      {tapped && (
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 rounded-t-2xl border-t border-border bg-background px-[18px] pb-4 pt-2.5 shadow-[0_-8px_20px_-10px_hsl(20_30%_20%/0.25)] motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-300">
          <div className="h-1 w-[34px] self-center rounded-full bg-border" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-heading text-[21px] font-semibold text-foreground">flatmate</span>
              <span className="text-xs text-muted-foreground">/ˈflæt.meɪt/ · noun</span>
            </div>
            <button
              type="button"
              onClick={() => playDutch('flatmate')}
              aria-label="Listen to flatmate"
              className="grid h-10 w-10 place-items-center rounded-full text-primary hover:bg-secondary"
            >
              <Volume2 className="h-[22px] w-[22px]" strokeWidth={1.75} />
            </button>
          </div>
          <span lang="ru" className="font-heading text-[17px] italic text-foreground">сосед по квартире</span>
          <AddToCardsButton />
        </div>
      )}
    </div>
  );
}

function TapWordLaptop({ tapped, onTap }: { tapped: boolean; onTap: () => void }) {
  return (
    <div className={cn(panel, 'grid w-full grid-cols-[1fr_130px] overflow-hidden')}>
      <div className="p-4">
        <SampleSentence tapped={tapped} onTap={onTap} className="text-base leading-[1.7]" />
        <PhraseLegend />
      </div>
      <div className="flex flex-col gap-1.5 border-l border-border bg-background px-3 py-3.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Selected</span>
        {tapped ? (
          <div className="flex flex-col gap-1.5 motion-safe:animate-fade-in">
            <span className="font-heading text-[17px] font-semibold text-foreground">flatmate</span>
            <span lang="ru" className="font-heading text-[13px] italic leading-[1.35] text-foreground">сосед по квартире</span>
            <AddToCardsButton small />
          </div>
        ) : (
          <span className="text-xs leading-snug text-muted-foreground">Click a red word</span>
        )}
      </div>
    </div>
  );
}

const RATINGS = [
  { label: 'Again', when: '1 min', className: 'bg-highlight text-highlight-foreground' },
  { label: 'Hard', when: '2 days', className: 'border-[1.5px] border-highlight bg-card text-highlight-ink' },
  { label: 'Good', when: 'in 10 days', className: 'border-2 border-primary bg-accent text-accent-foreground', strong: true },
  { label: 'Easy', when: '3 weeks', className: 'bg-primary text-primary-foreground' },
];

function FlipCard({ flipped, onFlip }: { flipped: boolean; onFlip: () => void }) {
  const face = 'absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-card p-[18px] text-center shadow-[0_12px_30px_-16px_hsl(20_30%_20%/0.3)] [backface-visibility:hidden]';
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="relative h-[250px] shrink-0 [perspective:1200px]">
        <div className="absolute inset-x-4 -top-2.5 h-full rounded-xl border border-border bg-card opacity-60" aria-hidden="true" />
        <button
          type="button"
          onClick={onFlip}
          aria-label={flipped ? 'Card back: flatmate, сосед по квартире. Tap to flip back' : 'Card front: flatmate. Tap to flip'}
          className="relative h-full w-full rounded-xl transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ transform: flipped ? 'rotateY(180deg)' : undefined }}
        >
          <span className={face}>
            <span className="font-heading text-[30px] font-semibold text-foreground">flatmate</span>
            <span className="text-[13px] text-muted-foreground">/ˈflæt.meɪt/</span>
            <span className="mt-[22px] flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
              Tap to flip
            </span>
          </span>
          <span className={face} style={{ transform: 'rotateY(180deg)' }}>
            <span className="font-heading text-[30px] font-semibold text-foreground">flatmate</span>
            <span className="my-2.5 h-0.5 w-[30px] rounded-full bg-highlight" />
            <span lang="ru" className="font-heading text-[21px] italic text-foreground">сосед по квартире</span>
            <span className="mt-2 text-[13px] text-muted-foreground">“Tom and Priya are my flatmates.”</span>
          </span>
        </button>
      </div>
      {flipped && (
        <div className="grid grid-cols-4 gap-1.5 motion-safe:animate-fade-in" aria-label="Rating buttons">
          {RATINGS.map(r => (
            <div key={r.label} className="flex flex-col items-center gap-1">
              <div className={cn('grid h-[42px] w-full place-items-center rounded-[10px] text-[13px] font-semibold', r.className)}>{r.label}</div>
              <span className={cn('text-[11px]', r.strong ? 'font-bold text-accent-foreground' : 'text-muted-foreground')}>{r.when}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TasksVisual() {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Languages, label: 'Translate to English' },
          { icon: MessageCircleMore, label: 'Chat with Emma' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className={cn(panel, 'flex flex-col gap-2 p-3')}>
            <div className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-accent">
              <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.75} />
            </div>
            <span className="text-sm font-semibold leading-tight text-foreground">{label}</span>
          </div>
        ))}
      </div>
      <div className={cn(panel, 'flex flex-col gap-2.5 p-3.5')}>
        <div className="max-w-[75%] self-end rounded-[14px_14px_4px_14px] bg-primary px-3 py-[9px] text-sm text-primary-foreground">
          Yesterday I have went to the shop.
        </div>
        <div className="flex items-end gap-2">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-highlight-soft font-heading text-[13px] font-semibold text-highlight-ink">E</div>
          <div className="max-w-[82%] rounded-[14px_14px_14px_4px] border border-border bg-background px-3 py-[9px] text-sm leading-[1.45] text-foreground">
            Nearly! <b>Yesterday I went</b> to the shop.
            <br />
            <span lang="ru" className="text-[13px] text-muted-foreground">С «yesterday» используем Past Simple.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalChoices({ value, onChange }: { value: number; onChange: (m: number) => void }) {
  return (
    <div className="flex gap-2 pt-1" role="radiogroup" aria-label="Daily goal">
      {GOAL_OPTIONS.map(m => {
        const on = m === value;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(m)}
            className={cn(
              'relative flex h-[58px] flex-1 flex-col items-center justify-center gap-px rounded-xl transition-colors motion-reduce:transition-none',
              on ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-foreground hover:border-primary/40',
            )}
          >
            <span className="font-heading text-xl font-semibold leading-none">{m}</span>
            <span className={cn('text-[11px]', on ? 'opacity-85' : 'text-muted-foreground')}>min</span>
            {m === 10 && (
              <span className="absolute -top-[9px] rounded-full bg-highlight px-[7px] py-px text-[10px] font-bold tracking-[0.03em] text-highlight-foreground">
                Recommended
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function StudyTimeChips({ value, onChange }: { value: StudyTime | null; onChange: (t: StudyTime | null) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <span id="tour-study-time" className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">When will you study?</span>
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-labelledby="tour-study-time">
        {STUDY_TIMES.map(t => {
          const on = t === value;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(on ? null : t)}
              className={cn(
                'flex h-[34px] items-center rounded-full px-3 text-[13px] transition-colors motion-reduce:transition-none',
                on
                  ? 'border-[1.5px] border-highlight bg-highlight-soft font-semibold text-highlight-ink'
                  : 'border border-border bg-card text-foreground hover:border-primary/40',
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Ring({ size, stroke, minutes, goal, large = false }: { size: number; stroke: number; minutes: number; goal: number; large?: boolean }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, minutes / goal);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--track))" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--highlight))" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`}
          className="transition-[stroke-dasharray] duration-500 motion-reduce:transition-none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={cn('font-heading font-semibold leading-none text-foreground', large ? 'text-[40px]' : 'text-lg')}>{minutes}</span>
        <span className={cn('text-muted-foreground', large ? 'text-[13px]' : 'text-[10px]')}>of {goal} min</span>
      </div>
    </div>
  );
}

const STARTED_LINE = 'Reach your goal to grow your streak. Miss a day? A streak freeze has your back.';

// ─── Tour ─────────────────────────────────────────────────────────────────────

interface AppOnboardingProps {
  /** `story` = the learner pressed "Read my first story": open episode 1 of this level. */
  onDone: (result: { story: TourLevel | null }) => void;
}

export function AppOnboarding({ onDone }: AppOnboardingProps) {
  const { dailyGoalMinutes, setDailyGoalMinutes, activeSecondsToday } = useLearning();
  const laptop = useIsLaptop();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<TourLevel>(() => getStartLevel() ?? 'A1');
  const [tapped, setTapped] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [studyTime, setStudyTimeState] = useState<StudyTime | null>(() => getStudyTime());
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // The tour itself counts: the ring starts at 1 minute at least
  const startedMinutes = Math.max(1, Math.floor(activeSecondsToday / 60));
  const canContinue = step !== 2 || tapped;
  const isLast = step === STEP_COUNT - 1;

  function finish(openStory: boolean) {
    markTourDone();
    onDone({ story: openStory ? level : null });
  }

  function next() {
    if (!canContinue) return;
    if (step === 1) setStartLevel(level);
    if (isLast) { finish(true); return; }
    setStep(s => s + 1);
  }

  // Keep the latest handlers for the key listener
  const keys = useRef({ next, skip: () => finish(false) });
  keys.current = { next, skip: () => finish(false) };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); keys.current.skip(); return; }
      if (e.key !== 'Enter' || e.repeat) return;
      // A focused button handles Enter itself (no double step)
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select')) return;
      e.preventDefault();
      keys.current.next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // New step: back to the top, focus the dialog so Enter/Esc and screen readers start there
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    dialogRef.current?.focus({ preventScroll: true });
  }, [step, laptop]);

  // No page scrolling behind the tour
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const copy = COPY[step];

  const chooseLevel = (l: TourLevel) => { setLevel(l); setStartLevel(l); };
  const chooseGoal = (m: number) => setDailyGoalMinutes(m);
  const chooseStudyTime = (t: StudyTime | null) => { setStudyTimeState(t); setStudyTime(t); };

  const primaryButton = (cls: string) => (
    <button
      type="button"
      onClick={next}
      className={cn(
        'flex items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        cls,
      )}
    >
      {PRIMARY_LABEL[step]}
      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );

  const tapHint = (cls: string) => (
    <div className={cn('flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-border text-[15px] text-muted-foreground', cls)}>
      <Pointer className="h-5 w-5" strokeWidth={1.75} />
      Tap “flatmates” to continue
    </div>
  );

  const skipButton = (cls: string, children: ReactNode = 'Skip tour') => (
    <button
      type="button"
      onClick={() => finish(false)}
      className={cn('font-semibold text-muted-foreground transition-colors hover:text-foreground', cls)}
    >
      {children}
    </button>
  );

  const goalRingCard = (
    <div className={cn(panel, 'flex items-center gap-3.5 px-4 py-3.5')}>
      <Ring size={76} stroke={8} minutes={startedMinutes} goal={dailyGoalMinutes} />
      <div className="flex flex-col gap-[3px]">
        <span className="font-heading text-[17px] font-semibold text-foreground">You’ve started!</span>
        <span className="text-[13px] leading-[1.4] text-muted-foreground">{STARTED_LINE}</span>
      </div>
    </div>
  );

  // ── Laptop: centred card, live mini-screen left, text right ──
  if (laptop) {
    const visual: ReactNode = [
      <div key="v1" className="w-full"><WelcomeVisual /></div>,
      <LevelCards key="v2" level={level} onChange={chooseLevel} />,
      <TapWordLaptop key="v3" tapped={tapped} onTap={() => setTapped(true)} />,
      <FlipCard key="v4" flipped={flipped} onFlip={() => setFlipped(f => !f)} />,
      <TasksVisual key="v5" />,
      <div key="v6" className="flex flex-col items-center gap-3.5">
        <Ring size={180} stroke={14} minutes={startedMinutes} goal={dailyGoalMinutes} large />
        <span className="font-heading text-[19px] font-semibold text-foreground">You’ve started!</span>
        <span className="max-w-[260px] text-center text-[13px] leading-[1.45] text-muted-foreground">{STARTED_LINE}</span>
      </div>,
    ][step];

    return (
      <div className="fixed inset-0 z-[80] grid place-items-center bg-[hsl(20_20%_10%/0.45)] p-6 backdrop-blur-[3px] motion-safe:animate-in motion-safe:fade-in-0">
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`App tour, step ${step + 1} of ${STEP_COUNT}: ${copy.title}`}
          className="grid max-h-[calc(100vh-48px)] w-[880px] max-w-full grid-cols-[380px_minmax(0,1fr)] overflow-hidden rounded-2xl bg-background shadow-[0_30px_70px_-20px_hsl(20_30%_10%/0.55)] outline-none motion-safe:animate-scale-in"
        >
          <div className="flex items-center justify-center overflow-y-auto border-r border-border bg-[color-mix(in_oklab,hsl(var(--primary))_6%,hsl(var(--background)))] p-7">
            <div key={step} className="flex w-full justify-center motion-safe:animate-fade-in">{visual}</div>
          </div>
          <div ref={scrollRef} className="flex min-h-[520px] flex-col gap-[18px] overflow-y-auto px-8 pb-[26px] pt-[30px]">
            <ProgressBar step={step} />
            <div key={step} className="flex flex-col gap-[18px] motion-safe:animate-fade-in">
              <StepText copy={copy} laptop />
              {step === 2 && (
                <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <PanelRight className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  On a laptop, translations open in the side panel.
                </span>
              )}
              {isLast && (
                <>
                  <GoalChoices value={dailyGoalMinutes} onChange={chooseGoal} />
                  <StudyTimeChips value={studyTime} onChange={chooseStudyTime} />
                </>
              )}
            </div>
            <div className="flex-1" />
            <div className="flex items-center justify-between gap-4">
              {skipButton('flex items-center gap-2 text-[13px] font-normal', (
                <>
                  <kbd className="rounded-md border border-border bg-background px-[7px] py-0.5 font-body text-[11px] font-semibold">Esc</kbd>
                  Skip tour
                </>
              ))}
              {canContinue ? (
                <div className="flex items-center gap-2.5">
                  <kbd className="rounded-md border border-border bg-background px-[7px] py-0.5 font-body text-[11px] font-semibold text-muted-foreground">Enter</kbd>
                  {primaryButton('h-[46px] px-5 text-[15px]')}
                </div>
              ) : (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Pointer className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  Click “flatmates” to continue
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Phone: full screen ──
  const text = <StepText copy={copy} laptop={false} compact={isLast} />;
  const body: ReactNode = [
    <><WelcomeVisual />{text}</>,
    <>{text}<LevelCards level={level} onChange={chooseLevel} /></>,
    <><TapWordPhone tapped={tapped} onTap={() => setTapped(true)} />{text}</>,
    <><div className="pt-1.5"><FlipCard flipped={flipped} onFlip={() => setFlipped(f => !f)} /></div>{text}</>,
    <><TasksVisual />{text}</>,
    <>{text}<GoalChoices value={dailyGoalMinutes} onChange={chooseGoal} /><StudyTimeChips value={studyTime} onChange={chooseStudyTime} />{goalRingCard}</>,
  ][step];

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`App tour, step ${step + 1} of ${STEP_COUNT}: ${copy.title}`}
      className="fixed inset-0 z-[80] flex h-[100dvh] flex-col bg-background outline-none motion-safe:animate-in motion-safe:fade-in-0"
    >
      <div className="mx-auto flex w-full max-w-[480px] items-center gap-3.5 px-6 pt-[max(14px,env(safe-area-inset-top))]">
        <ProgressBar step={step} className="flex-1" />
        {step > 0 && skipButton('whitespace-nowrap text-[13px]')}
      </div>
      <div ref={scrollRef} className="mx-auto flex w-full max-w-[480px] flex-1 flex-col overflow-y-auto px-6 pb-[max(30px,env(safe-area-inset-bottom))] pt-5">
        <div key={step} className={cn('flex flex-col motion-safe:animate-fade-in', isLast ? 'gap-[18px]' : 'gap-[22px]')}>
          {body}
        </div>
        <div className="min-h-[22px] flex-1" />
        {canContinue ? primaryButton('h-[52px] w-full shrink-0 text-base') : tapHint('h-[52px] shrink-0')}
        {step === 0 && skipButton('mt-3.5 self-center text-sm')}
      </div>
    </div>
  );
}
