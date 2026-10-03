import { useState, useEffect, useMemo } from 'react';
import { DailyExpressionCard } from '@/components/DailyExpressionCard';
import { Pip } from '@/components/Pip';
import { PipCelebration } from '@/components/PipCelebration';
import { homeGreeting } from '@/lib/pip';
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
import { DailyGoalPicker } from '@/components/DailyGoalPicker';

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
  const { syncing, dueCount, vocabulary, streak } = useLearning();
  const { user } = useAuth();
  const wordCount = Object.keys(vocabulary).length;
  const userInitial = (firstNameOf(user?.user_metadata) ?? user?.email ?? '?').charAt(0).toUpperCase();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Laptop: while a text is open, ReadingView shows a side panel on the right.
  // The floating AI / voice buttons (rendered outside this page) read this flag
  // to sit to the left of that panel instead of covering it.
  const readingPanelOpen = activeTab === 'reading' && !!selectedText;
  useEffect(() => {
    const root = document.documentElement;
    if (readingPanelOpen) root.dataset.readingPanel = '';
    else delete root.dataset.readingPanel;
    return () => { delete root.dataset.readingPanel; };
  }, [readingPanelOpen]);

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
  // Cards has its own heading on the overview and none during practice
  const showPageTitle = activeTab !== 'home' && activeTab !== 'progress' && activeTab !== 'flashcards' && !(activeTab === 'reading' && selectedText) && !(activeTab === 'tasks' && taskOpen);

  function goTab(key: Tab) {
    setTabResetKeys(prev => ({ ...prev, [key]: prev[key] + 1 }));
    setActiveTab(key);
    setSelectedText(null);
    if (key === 'reading') { setReadingLevel(null); setReadingModule(null); }
  }

  const dueBadge = dueCount > 99 ? '99+' : String(dueCount);
  const isHome = activeTab === 'home';

  return (
    <div className="relative min-h-screen bg-background pb-24 lg:pb-16">
      {/* Laptop: London band behind the top bar and greeting (Home only) */}
      {isHome && <DesktopLondonBackdrop />}

      {/* Laptop top navigation (replaces the bottom tab bar from lg) */}
      <header
        className={`z-40 hidden lg:block ${
          isHome ? 'relative' : 'sticky top-0 border-b border-border bg-card'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-10 px-10">
          <button
            onClick={() => goTab('home')}
            className="flex shrink-0 items-center gap-2.5 font-heading text-xl font-semibold tracking-[-0.01em] text-foreground"
            aria-label="English Flow — Home"
          >
            <BrandLogo variant="icon" size={32} />
            English Flow
          </button>
          <nav className="flex flex-1 items-center gap-1.5" aria-label="Main">
            {tabs.map(({ key, icon: Icon, label }) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => goTab(key)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex h-10 items-center gap-2 rounded-[10px] px-3.5 text-[15px] transition-colors ${
                    active
                      ? 'bg-accent font-semibold text-accent-foreground'
                      : 'font-medium text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary' : ''}`} strokeWidth={1.75} />
                  {label}
                  {key === 'flashcards' && dueCount > 0 && (
                    <span className="grid h-[18px] min-w-[20px] place-items-center rounded-full bg-highlight px-1.5 text-[10px] font-bold leading-none text-highlight-foreground">
                      {dueBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          {syncing && <Cloud className="h-4 w-4 shrink-0 text-primary animate-pulse" aria-label="Syncing" />}
          <div
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold"
            aria-label={`${streak.currentStreak}-day streak`}
          >
            <Flame className="h-[18px] w-[18px] text-highlight" />
            {streak.currentStreak}
          </div>
          <button
            onClick={() => goTab('progress')}
            aria-label="Me — profile and settings"
            title="Me"
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-heading font-semibold text-accent-foreground transition-shadow hover:ring-2 hover:ring-primary/30 ${
              activeTab === 'progress' ? 'ring-2 ring-primary' : ''
            }`}
          >
            {userInitial}
          </button>
        </div>
      </header>

      <div
        className={`relative mx-auto max-w-lg px-5 pt-4 lg:max-w-[1160px] lg:px-10 ${
          isHome ? 'lg:pt-[110px]' : 'lg:pt-9'
        }`}
      >
        {showPageTitle && (
          <div className={`flex items-center justify-between gap-2 pb-4 lg:pb-6 ${activeTab === 'tasks' ? 'lg:mx-auto lg:max-w-[720px]' : ''}`}>
            <h1 className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.015em] text-foreground lg:text-[36px] lg:tracking-[-0.02em]">
              {pageTitle}
            </h1>
            {syncing && <Cloud className="h-4 w-4 shrink-0 text-primary animate-pulse lg:hidden" />}
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
        <PipCelebration />
      </div>

      {/* Reading onboarding — shown once on first visit to the Read tab */}
      {activeTab === 'reading' && showReadingOnboarding && (
        <ReadingOnboarding onDone={dismissReadingOnboarding} />
      )}

      {/* Voice settings — only visible while reading a text */}
      <VoiceSettings visible={(activeTab === 'reading' && !!selectedText) || activeTab === 'flashcards'} />

      {/* Bottom Navigation (phones and tablets; laptops use the top bar) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-2 pt-2.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {tabs.map(({ key, icon: Icon, label }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => goTab(key)}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-[3px] text-[11px] transition-colors ${
                  active ? 'font-semibold text-accent-foreground' : 'font-medium text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative">
                  <Icon className={`h-6 w-6 ${active ? 'text-primary' : ''}`} strokeWidth={1.75} />
                  {key === 'flashcards' && dueCount > 0 && (
                    <span className="absolute -top-1 left-[calc(50%+6px)] grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-card bg-highlight px-[5px] text-[10px] font-bold leading-none text-highlight-foreground">
                      {dueBadge}
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

/** Whole days between a YYYY-MM-DD date and today (local), or null when there is none. */
function daysSince(date: string | null, now: Date): number | null {
  if (!date) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [y, m, d] = date.split('-').map(Number);
  return Math.round((today.getTime() - new Date(y, m - 1, d).getTime()) / 86_400_000);
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

/** First name from the auth profile (Google sign-in sets name/full_name). */
function firstNameOf(metadata: unknown): string | undefined {
  const meta = (metadata ?? {}) as Record<string, unknown>;
  const rawName = [meta.first_name, meta.name, meta.full_name].find(v => typeof v === 'string' && v.trim()) as string | undefined;
  return rawName?.trim().split(/\s+/)[0];
}

function HomeScreen({ syncing, wordCount, onSelectText, onTutorLaunch, onTutorOpenText, onGoToFlashcards }: HomeScreenProps) {
  const { user } = useAuth();
  const { texts, dailyGoal, streak, activeSecondsToday, dailyGoalMinutes, setDailyGoalMinutes } = useLearning();
  const [goalPickerOpen, setGoalPickerOpen] = useState(false);

  const now = new Date();
  const dateLabel = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const firstName = firstNameOf(user?.user_metadata);
  const greeting = `${greetingFor(now.getHours())}${firstName ? `, ${firstName}` : ''}`;
  const pip = homeGreeting({
    hour: now.getHours(),
    minutesToday: activeSecondsToday / 60,
    goalMinutes: dailyGoalMinutes,
    streak: streak.currentStreak,
    daysSinceGoal: daysSince(streak.lastActivityDate, now),
  });

  // Today's goal: active minutes vs the daily time goal; cards and words as a secondary line
  const activeMinutes = Math.floor(activeSecondsToday / 60);
  const goalMet = activeSecondsToday >= dailyGoalMinutes * 60;
  const goalPct = Math.min(100, (activeSecondsToday / (dailyGoalMinutes * 60)) * 100);
  const minutesLeft = Math.max(1, Math.ceil((dailyGoalMinutes * 60 - activeSecondsToday) / 60));

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
    <div className="relative -mx-5 -mt-4 px-5 pt-4 lg:mx-auto lg:mt-0 lg:max-w-[1000px] lg:px-0 lg:pt-0">
    <div className="lg:hidden"><LondonBackdrop /></div>
    <div className="animate-fade-in relative flex flex-col gap-4 lg:gap-7">
      {/* Wordmark + streak pill (phones; laptops show these in the top bar) */}
      <div className="flex items-center justify-between lg:hidden">
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
      <div className="h-[150px] shrink-0 lg:hidden" aria-hidden="true" />

      {/* Date + greeting */}
      <div className="flex flex-col gap-0.5 lg:gap-1">
        <span className="text-[13px] text-muted-foreground lg:text-sm">{dateLabel}</span>
        <h1 className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.015em] text-foreground lg:text-[40px] lg:tracking-[-0.02em]">{greeting}</h1>
      </div>

      {/* Pip's line for today */}
      <div className="flex items-center gap-3">
        <Pip pose={pip.pose} size={64} decorative />
        <div className="relative rounded-xl border bg-card/90 px-3.5 py-2.5 backdrop-blur-[4px]">
          <p className="text-sm font-medium leading-snug text-foreground">{pip.line.en}</p>
          <p className="text-xs leading-snug text-muted-foreground">{pip.line.ru}</p>
        </div>
      </div>

      {/* Phones: one column (goal, streak, reading, tutor).
          Laptops: reading + tutor on the left (1.5fr), goal + streak on the right (1fr). */}
      <div className="contents lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-5">
      <div className="contents lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col lg:gap-5">
      {/* Today's goal — tap to change the daily goal */}
      <div className={`relative shrink-0 overflow-hidden ${cardSurface}`}>
        <button
          onClick={() => setGoalPickerOpen(o => !o)}
          aria-expanded={goalPickerOpen}
          aria-label={`Today's goal: ${activeMinutes} of ${dailyGoalMinutes} minutes. Change daily goal`}
          className="flex w-full items-center justify-between gap-4 px-[18px] py-4 text-left transition-colors lg:px-[22px] lg:py-5 lg:hover:bg-secondary/40"
        >
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className={eyebrow}>Today's goal</span>
            <span className="font-heading text-[22px] font-semibold leading-tight text-foreground lg:text-2xl">
              {Math.min(activeMinutes, 999)} of {dailyGoalMinutes} min
            </span>
            <span className="text-[13px] leading-snug text-muted-foreground">
              {goalMet
                ? <span className="font-semibold text-highlight-ink">Goal reached — streak +1</span>
                : `${minutesLeft} more min of practice today`}
              <br />
              {dailyGoal.flashcardsReviewed} card{dailyGoal.flashcardsReviewed !== 1 ? 's' : ''} · {wordCount} word{wordCount !== 1 ? 's' : ''} saved
            </span>
          </div>
          <GoalRing pct={goalPct} done={goalMet} />
        </button>
        {goalPickerOpen && (
          <div className="flex flex-col gap-2 border-t border-border px-[18px] pb-4 pt-3 lg:px-[22px]">
            <span className="text-[13px] text-muted-foreground">Daily goal · active practice time</span>
            <DailyGoalPicker
              value={dailyGoalMinutes}
              onChange={m => { setDailyGoalMinutes(m); setGoalPickerOpen(false); }}
            />
          </div>
        )}
      </div>

      {/* Streak week */}
      <div className={`flex flex-col gap-3 px-[18px] py-3.5 lg:gap-3.5 lg:px-[22px] lg:py-5 ${cardSurface}`}>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-heading text-[17px] font-semibold text-foreground lg:text-[19px]">
            {streak.currentStreak}-day streak
          </span>
          <span className="text-[13px] text-muted-foreground">Best: {streak.longestStreak}</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-muted-foreground">
          {week.map(day => (
            <div key={day.ymd} className="flex flex-col items-center gap-1.5">
              {day.done ? (
                <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-primary text-primary-foreground lg:h-[34px] lg:w-[34px]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
              ) : day.today ? (
                <div className="grid h-[30px] w-[30px] place-items-center rounded-full border-2 border-highlight lg:h-[34px] lg:w-[34px]">
                  <Flame className="h-4 w-4 text-highlight" />
                </div>
              ) : (
                <div className="h-[30px] w-[30px] rounded-full bg-track lg:h-[34px] lg:w-[34px]" />
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
      </div>

      <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:gap-7">
      {/* Continue reading */}
      {reading && (
        <div className={`flex flex-col gap-2.5 px-[18px] py-4 lg:gap-3 lg:px-[26px] lg:py-6 ${cardSurface}`}>
          <div className="flex items-center justify-between gap-2">
            <span className={eyebrow}>{reading.label}</span>
            <span className="rounded-full bg-highlight-soft px-[9px] py-[3px] text-xs font-semibold text-highlight-ink">
              {reading.text.level}
            </span>
          </div>
          <span className="font-heading text-[19px] font-semibold leading-tight text-foreground lg:text-[28px] lg:tracking-[-0.01em]">{reading.text.title}</span>
          {reading.text.titleTranslation && (
            <span className="font-heading text-[15px] italic leading-normal text-muted-foreground lg:text-[17px]">{reading.text.titleTranslation}</span>
          )}
          <button
            onClick={() => onSelectText(reading.text)}
            className="mt-1 flex h-[46px] items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.99] lg:mt-2 lg:h-12 lg:self-start lg:px-6"
          >
            {reading.cta} <ArrowRight className="h-[18px] w-[18px]" />
          </button>
        </div>
      )}

      {/* Expression of the day */}
      <DailyExpressionCard />

      {/* AI tutor */}
      <TutorView
        onLaunchTask={onTutorLaunch}
        onOpenText={onTutorOpenText}
        onGoToFlashcards={onGoToFlashcards}
      />
      </div>
      </div>
    </div>
    </div>
  );
}

/** Progress ring for the daily goal: track circle + highlight arc. */
function GoalRing({ pct, done }: { pct: number; done: boolean }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-16 w-16 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="hsl(var(--track))" strokeWidth={6} />
        <circle
          cx="32" cy="32" r={r} fill="none"
          stroke="hsl(var(--highlight))" strokeWidth={6} strokeLinecap={pct > 0 ? "round" : "butt"}
          strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[13px] font-semibold text-foreground">
        {done ? <Check className="h-5 w-5 text-highlight" strokeWidth={3} /> : `${Math.round(pct)}%`}
      </span>
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

/**
 * Laptop version of the London header (FlowDesktop 'home'): a 340px band
 * tinted from the primary colour across the full width, the skyline anchored
 * on the right, fading into the page background. Sits behind the top bar.
 */
function DesktopLondonBackdrop() {
  const tint = (pct: number) => `color-mix(in oklab, hsl(var(--primary)) ${pct}%, hsl(var(--background)))`;
  const fill = tint(26);
  const line = tint(45);
  const bg = 'hsl(var(--background))';
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-[340px] overflow-hidden lg:block"
      style={{ background: tint(7) }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 390 300" width="560" height="340" preserveAspectRatio="xMaxYMax meet"
        className="absolute bottom-0 right-10 block opacity-75 xl:right-[max(2.5rem,calc((100vw-1160px)/2))]"
      >
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
            'linear-gradient(to bottom, transparent 0%, transparent 45%, hsl(var(--background) / 0.85) 78%, hsl(var(--background)) 100%)',
        }}
      />
    </div>
  );
}
