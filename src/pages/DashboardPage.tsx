import { useState, useEffect, useMemo } from 'react';
import { BrandLogo } from '@/components/BrandLogo';
import { useLearning } from '@/context/LearningContext';
import { useAuth } from '@/context/AuthContext';
import { getTextReadHistory } from '@/lib/textReadHistory';
import { BookOpen, Layers, Target, House, Cloud, User, Flame, Check, ArrowRight, Snowflake } from 'lucide-react';
import { TextList } from '@/components/TextList';
import { ReadingView } from '@/components/ReadingView';
import { FlashcardView } from '@/components/FlashcardView';
import { ProgressView } from '@/components/ProgressView';
import { TasksView } from '@/components/TasksView';
import { MeView } from '@/components/MeView';
import { VoiceSettings } from '@/components/VoiceSettings';
import { ReadingText, Level, Module } from '@/types/dutch';
import { ReadingOnboarding, useReadingOnboarding } from '@/components/ReadingOnboarding';
import { TutorView } from '@/components/TutorView';

type Tab = 'home' | 'reading' | 'flashcards' | 'progress' | 'tasks';
type TutorLaunch = { task: 'translate' | 'dialogue'; grammarFocus?: string; level?: string } | null;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [tabResetKeys, setTabResetKeys] = useState<Record<Tab, number>>({ home: 0, reading: 0, flashcards: 0, tasks: 0, progress: 0 });
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  // A task open in the Tasks tab shows its own header (back arrow + task title)
  const [taskOpen, setTaskOpen] = useState(false);
  const [readingLevel, setReadingLevel] = useState<Level | null>(null);
  const [readingModule, setReadingModule] = useState<Module | null>(null);
  const [tutorLaunch, setTutorLaunch] = useState<TutorLaunch>(null);
  const { syncing, dueCount, vocabulary } = useLearning();
  const wordCount = Object.keys(vocabulary).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const tabs: { key: Tab; icon: typeof BookOpen; label: string }[] = [
    { key: 'home', icon: House, label: 'Home' },
    { key: 'reading', icon: BookOpen, label: 'Read' },
    { key: 'flashcards', icon: Layers, label: 'Cards' },
    { key: 'tasks', icon: Target, label: 'Tasks' },
    { key: 'progress', icon: User, label: 'Me' },
  ];

  const { texts } = useLearning();
  const { show: showReadingOnboarding, dismiss: dismissReadingOnboarding } = useReadingOnboarding();

  function handleTutorLaunch(task: 'translate' | 'dialogue', grammarFocus?: string, level?: string) {
    setTutorLaunch({ task, grammarFocus, level });
    setTabResetKeys(prev => ({ ...prev, tasks: prev.tasks + 1 }));
    setActiveTab('tasks');
  }

  function handleTutorOpenText(textId: string) {
    const text = texts.find(t => t.id === textId);
    if (text) { setSelectedText(text); setActiveTab('reading'); }
  }

  function handleGoToFlashcards() {
    setTabResetKeys(prev => ({ ...prev, flashcards: prev.flashcards + 1 }));
    setActiveTab('flashcards');
  }

  const handleSelectText = (text: ReadingText) => {
    setSelectedText(text);
    setActiveTab('reading');
  };

  const handleNextText = () => {
    if (!selectedText) return;
    const idx = texts.findIndex(t => t.id === selectedText.id);
    if (idx < texts.length - 1) setSelectedText(texts[idx + 1]);
  };

  const handlePrevText = () => {
    if (!selectedText) return;
    const idx = texts.findIndex(t => t.id === selectedText.id);
    if (idx > 0) setSelectedText(texts[idx - 1]);
  };

  const pageTitle =
    activeTab === 'reading' ? 'Reading Library' :
    activeTab === 'flashcards' ? 'Flashcards' :
    'Tasks';

  // No shell title on Home (own header), on Me (MeView has its own header) or
  // while a text is open (ReadingView shows its own title).
  const showPageTitle = activeTab !== 'home' && activeTab !== 'progress' && !(activeTab === 'reading' && selectedText) && !(activeTab === 'tasks' && taskOpen);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-5 pt-4">
        {showPageTitle && (
          <div className="flex items-center justify-between gap-2 pb-4">
            <h1 className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.015em] text-foreground">
              {pageTitle}
            </h1>
            {syncing && <Cloud className="h-4 w-4 shrink-0 text-primary animate-pulse" />}
          </div>
        )}

        {activeTab === 'home' && (
          <HomeScreen
            syncing={syncing}
            wordCount={wordCount}
            onSelectText={handleSelectText}
            onTutorLaunch={handleTutorLaunch}
            onTutorOpenText={handleTutorOpenText}
            onGoToFlashcards={handleGoToFlashcards}
          />
        )}

        {activeTab === 'reading' && selectedText && (
          <ReadingView
            text={selectedText}
            onBack={() => setSelectedText(null)}
            onNext={texts.findIndex(t => t.id === selectedText.id) < texts.length - 1 ? handleNextText : undefined}
            onPrev={texts.findIndex(t => t.id === selectedText.id) > 0 ? handlePrevText : undefined}
          />
        )}

        {activeTab === 'reading' && !selectedText && (
          <TextList
            onSelect={handleSelectText}
            openLevel={readingLevel}
            setOpenLevel={setReadingLevel}
            openModule={readingModule}
            setOpenModule={setReadingModule}
          />
        )}

        {activeTab === 'flashcards' && <FlashcardView key={tabResetKeys.flashcards} />}
        {activeTab === 'tasks' && (
          <TasksView
            key={tabResetKeys.tasks}
            initialTask={tutorLaunch?.task ?? null}
            onTaskLaunched={() => setTutorLaunch(null)}
            onActiveTaskChange={task => setTaskOpen(task !== null)}
          />
        )}
        {activeTab === 'progress' && <MeView key={tabResetKeys.progress} />}
      </div>

      {/* Reading onboarding — shown once on first visit to the Read tab */}
      {activeTab === 'reading' && showReadingOnboarding && (
        <ReadingOnboarding onDone={dismissReadingOnboarding} />
      )}

      {/* Voice settings — only visible while reading a text */}
      <VoiceSettings visible={(activeTab === 'reading' && !!selectedText) || activeTab === 'flashcards'} />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-2 pt-2.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {tabs.map(({ key, icon: Icon, label }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setTabResetKeys(prev => ({ ...prev, [key]: prev[key] + 1 }));
                  setActiveTab(key);
                  setSelectedText(null);
                  if (key === 'reading') { setReadingLevel(null); setReadingModule(null); }
                }}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-[3px] text-[11px] transition-colors ${
                  active ? 'font-semibold text-accent-foreground' : 'font-medium text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative">
                  <Icon className={`h-6 w-6 ${active ? 'text-primary' : ''}`} strokeWidth={1.75} />
                  {key === 'flashcards' && dueCount > 0 && (
                    <span className="absolute -top-1 left-[calc(50%+6px)] grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-card bg-highlight px-[5px] text-[10px] font-bold leading-none text-highlight-foreground">
                      {dueCount > 99 ? '99+' : dueCount}
                    </span>
                  )}
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

// ── Home screen ──────────────────────────────────────────────────────────────

interface HomeScreenProps {
  syncing: boolean;
  wordCount: number;
  onSelectText: (text: ReadingText) => void;
  onTutorLaunch: (task: 'translate' | 'dialogue', grammarFocus?: string, level?: string) => void;
  onTutorOpenText: (textId: string) => void;
  onGoToFlashcards: () => void;
}

const WEEKDAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function toLocalYMD(d: Date): string {
  return d.toLocaleDateString('en-CA');
}

function greetingFor(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function streakMessage(days: number): string {
  if (days === 0) return 'Practise today to start your streak';
  if (days < 3) return 'Great start — keep showing up!';
  if (days < 7) return 'Building momentum — nice!';
  return 'Consistent learner — impressive!';
}

// Cards on Home sit partly over the London backdrop: slightly translucent + blur
const cardSurface = 'rounded-xl border border-border bg-card/90 backdrop-blur-[4px]';

const eyebrow = 'text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground';

function HomeScreen({ syncing, wordCount, onSelectText, onTutorLaunch, onTutorOpenText, onGoToFlashcards }: HomeScreenProps) {
  const { user } = useAuth();
  const { texts, dailyGoal, streak } = useLearning();

  const now = new Date();
  const dateLabel = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const rawName = [meta.first_name, meta.name, meta.full_name].find(v => typeof v === 'string' && v.trim()) as string | undefined;
  const firstName = rawName?.trim().split(/\s+/)[0];
  const greeting = `${greetingFor(now.getHours())}${firstName ? `, ${firstName}` : ''}`;

  // Today's goal (texts), plus cards and words as secondary lines
  const textsPct = dailyGoal.textsGoal > 0 ? Math.min(100, (dailyGoal.textsRead / dailyGoal.textsGoal) * 100) : 0;
  const textsLeft = Math.max(0, dailyGoal.textsGoal - dailyGoal.textsRead);

  // This week, Monday first, from the streak's activity dates
  const todayYMD = toLocalYMD(now);
  const activeDays = new Set(streak.activityDates);
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const week = WEEKDAY_LETTERS.map((letter, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const ymd = toLocalYMD(d);
    return { letter, ymd, done: activeDays.has(ymd), today: ymd === todayYMD };
  });

  // Continue reading: the most recently opened text; if finished, the next unfinished one
  const reading = useMemo(() => {
    const history = getTextReadHistory();
    let lastIdx = -1;
    let lastAt = '';
    texts.forEach((t, i) => {
      const rec = history[t.id];
      if (rec && rec.lastReadAt > lastAt) { lastAt = rec.lastReadAt; lastIdx = i; }
    });
    if (lastIdx >= 0 && !texts[lastIdx].completed) {
      return { text: texts[lastIdx], label: 'Continue reading', cta: 'Continue' };
    }
    const next = texts.slice(lastIdx + 1).find(t => !t.completed) ?? texts.find(t => !t.completed);
    return next ? { text: next, label: lastIdx >= 0 ? 'Up next' : 'Start reading', cta: 'Start reading' } : null;
  }, [texts]);

  return (
    <div className="relative -mx-5 -mt-4 px-5 pt-4">
    <LondonBackdrop />
    <div className="animate-fade-in relative flex flex-col gap-4">
      {/* Wordmark + streak pill */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-heading text-xl font-semibold tracking-[-0.01em] text-foreground">
          <BrandLogo size={32} />
          English Flow
        </span>
        <div className="flex items-center gap-2">
          {syncing && <Cloud className="h-4 w-4 text-primary animate-pulse" />}
          <div
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold"
            aria-label={`${streak.currentStreak}-day streak`}
          >
            <Flame className="h-[18px] w-[18px] text-highlight" />
            {streak.currentStreak}
          </div>
        </div>
      </div>

      {/* Room for the London backdrop */}
      <div className="h-[150px] shrink-0" aria-hidden="true" />

      {/* Date + greeting */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] text-muted-foreground">{dateLabel}</span>
        <h1 className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.015em] text-foreground">{greeting}</h1>
      </div>

      {/* Today's goal */}
      <div className={`relative shrink-0 overflow-hidden ${cardSurface}`}>
        <div className="relative flex max-w-[190px] flex-col gap-1.5 px-[18px] py-4">
          <span className={eyebrow}>Today's goal</span>
          <span className="font-heading text-[22px] font-semibold leading-tight text-foreground">
            {dailyGoal.textsRead} of {dailyGoal.textsGoal} text{dailyGoal.textsGoal !== 1 ? 's' : ''}
          </span>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-track">
            <div className="h-full rounded-full bg-highlight transition-all duration-500" style={{ width: `${textsPct}%` }} />
          </div>
          <span className="text-[13px] leading-snug text-muted-foreground">
            {textsLeft === 0 ? 'Goal reached today' : `${textsLeft} more text${textsLeft !== 1 ? 's' : ''} today`}
            <br />
            {dailyGoal.flashcardsReviewed} card{dailyGoal.flashcardsReviewed !== 1 ? 's' : ''} · {wordCount} word{wordCount !== 1 ? 's' : ''} saved
          </span>
        </div>
      </div>

      {/* Streak week */}
      <div className={`flex flex-col gap-3 px-[18px] py-3.5 ${cardSurface}`}>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-heading text-[17px] font-semibold text-foreground">
            {streak.currentStreak}-day streak
          </span>
          <span className="text-[13px] text-muted-foreground">Best: {streak.longestStreak}</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-muted-foreground">
          {week.map(day => (
            <div key={day.ymd} className="flex flex-col items-center gap-1.5">
              {day.done ? (
                <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
              ) : day.today ? (
                <div className="grid h-[30px] w-[30px] place-items-center rounded-full border-2 border-highlight">
                  <Flame className="h-4 w-4 text-highlight" />
                </div>
              ) : (
                <div className="h-[30px] w-[30px] rounded-full bg-track" />
              )}
              <span className={day.today ? 'font-semibold text-foreground' : ''}>{day.letter}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
          <span>{streakMessage(streak.currentStreak)}</span>
          {streak.freezesAvailable > 0 && (
            <span className="flex items-center gap-1">
              <Snowflake className="h-3.5 w-3.5 text-primary" />
              {streak.freezesAvailable} freeze{streak.freezesAvailable !== 1 ? 's' : ''} available
            </span>
          )}
        </div>
      </div>

      {/* Continue reading */}
      {reading && (
        <div className={`flex flex-col gap-2.5 px-[18px] py-4 ${cardSurface}`}>
          <div className="flex items-center justify-between gap-2">
            <span className={eyebrow}>{reading.label}</span>
            <span className="rounded-full bg-highlight-soft px-[9px] py-[3px] text-xs font-semibold text-highlight-ink">
              {reading.text.level}
            </span>
          </div>
          <span className="font-heading text-[19px] font-semibold leading-tight text-foreground">{reading.text.title}</span>
          {reading.text.titleTranslation && (
            <span className="font-heading text-[15px] italic leading-normal text-muted-foreground">{reading.text.titleTranslation}</span>
          )}
          <button
            onClick={() => onSelectText(reading.text)}
            className="mt-1 flex h-[46px] items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.99]"
          >
            {reading.cta} <ArrowRight className="h-[18px] w-[18px]" />
          </button>
        </div>
      )}

      {/* AI tutor */}
      <TutorView
        onLaunchTask={onTutorLaunch}
        onOpenText={onTutorOpenText}
        onGoToFlashcards={onGoToFlashcards}
      />
    </div>
    </div>
  );
}

/**
 * London header backdrop (Flow series "Union, London header"): a large
 * skyline (London Eye, Westminster, Big Ben, a red bus) tinted from the
 * primary colour, behind the top of the home screen, fading into the page
 * background so the cards below float over it.
 */
function LondonBackdrop() {
  const tint = (pct: number) => `color-mix(in oklab, hsl(var(--primary)) ${pct}%, hsl(var(--background)))`;
  const fill = tint(26);
  const line = tint(45);
  const bg = 'hsl(var(--background))';
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[400px] overflow-hidden sm:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 390 300" width="100%" height="400" preserveAspectRatio="xMidYMax slice" className="block opacity-75">
        <rect width="390" height="300" fill={tint(16)} fillOpacity={0.5} />
        <g fill={fill} stroke={line} strokeWidth={1.2} strokeLinejoin="round">
          <path d="M300 270V96h-10V60h10V40l22-34 22 34v20h10v36h-10v174z" />
          <path d="M150 270v-70h12v-16h10v16h22v-16h10v16h22v-16h10v16h22v-16h10v16h30v70z" />
          <path d="M354 270v-62h18v-14h10v14h30v62z" />
          <path d="M-10 270v-50h20v-14h12v14h22v50z" />
        </g>
        <circle cx="322" cy="78" r="12" fill={bg} fillOpacity={0.8} stroke={line} strokeWidth={1.2} />
        <path d="M322 78v-7M322 78l5 3" stroke={line} strokeWidth={1.2} strokeLinecap="round" />
        <g fill={line} fillOpacity={0.55}>
          <rect x="172" y="212" width="7" height="14" rx="1" />
          <rect x="196" y="212" width="7" height="14" rx="1" />
          <rect x="220" y="212" width="7" height="14" rx="1" />
          <rect x="244" y="212" width="7" height="14" rx="1" />
          <rect x="268" y="212" width="7" height="14" rx="1" />
          <rect x="316" y="110" width="12" height="16" rx="1" />
          <rect x="316" y="140" width="12" height="16" rx="1" />
          <rect x="316" y="170" width="12" height="16" rx="1" />
        </g>
        <circle cx="92" cy="170" r="82" fill="none" stroke={line} strokeWidth={1.4} />
        <circle cx="92" cy="170" r="74" fill="none" stroke={line} strokeWidth={0.6} />
        <path
          d="M92 88v164M10 170h164M34 112l116 116M150 112L34 228M50 99l84 142M134 99L50 241M21 128l142 84M163 128L21 212"
          stroke={line}
          strokeWidth={0.6}
        />
        <circle cx="92" cy="170" r="6" fill={line} />
        <path d="M92 170l-28 100M92 170l28 100" stroke={line} strokeWidth={1.6} />
        <path d="M-10 270h410" stroke={line} strokeWidth={1.4} />
        <rect x="196" y="236" width="62" height="32" rx="4" fill="hsl(var(--highlight))" fillOpacity={0.45} />
        <path d="M196 250h62" stroke={bg} strokeOpacity={0.7} strokeWidth={1.4} />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, hsl(var(--background) / 0.55) 0%, transparent 22%, transparent 45%, hsl(var(--background) / 0.8) 72%, hsl(var(--background)) 96%)',
        }}
      />
    </div>
  );
}
