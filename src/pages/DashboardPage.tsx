import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLearning } from '@/context/LearningContext';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, Brain, Target, Zap, Cloud, User, Pencil, Check } from 'lucide-react';
import { TextList } from '@/components/TextList';
import { ReadingView } from '@/components/ReadingView';
import { FlashcardView } from '@/components/FlashcardView';
import { ProgressView } from '@/components/ProgressView';
import { TasksView } from '@/components/TasksView';
import { MeView } from '@/components/MeView';
import { VoiceSettings } from '@/components/VoiceSettings';
import { ReadingText, Level, Module } from '@/types/dutch';
import heroImage from '@/assets/hero-dutch.jpg';
import { getLevelInfo, getXPProgress } from '@/utils/levels';
import { ReadingOnboarding, useReadingOnboarding } from '@/components/ReadingOnboarding';
import { TutorView } from '@/components/TutorView';

type Tab = 'home' | 'reading' | 'flashcards' | 'progress' | 'tasks';
type TutorLaunch = { task: 'translate' | 'dialogue'; grammarFocus?: string; level?: string } | null;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [tabResetKeys, setTabResetKeys] = useState<Record<Tab, number>>({ home: 0, reading: 0, flashcards: 0, tasks: 0, progress: 0 });
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  // Separate navigation state for Home "Continue Reading" vs Reading tab
  const [openLevel, setOpenLevel] = useState<Level | null>('A1');
  const [openModule, setOpenModule] = useState<Module | null>(null);
  const [readingLevel, setReadingLevel] = useState<Level | null>(null);
  const [readingModule, setReadingModule] = useState<Module | null>(null);
  const [tutorLaunch, setTutorLaunch] = useState<TutorLaunch>(null);
  const [editingGoals, setEditingGoals] = useState(false);
  const [goalTexts, setGoalTexts] = useState<string>('');
  const [goalCards, setGoalCards] = useState<string>('');
  const { dailyGoal, vocabulary, xp, level, syncing, dueCount, setGoals } = useLearning();
  const { user } = useAuth();

  const wordCount = Object.keys(vocabulary).length;
  const readingProgress   = dailyGoal.textsGoal > 0         ? (dailyGoal.textsRead         / dailyGoal.textsGoal)         * 100 : 0;
  const flashcardProgress = dailyGoal.flashcardsGoal > 0    ? (dailyGoal.flashcardsReviewed / dailyGoal.flashcardsGoal)    * 100 : 0;

  const levelInfo = getLevelInfo(xp);
  const xpProgress = getXPProgress(xp);

  // Level-up celebration
  const prevLevelRef = useRef(level);
  const [showLevelUp, setShowLevelUp] = useState(false);
  useEffect(() => {
    if (level > prevLevelRef.current) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    prevLevelRef.current = level;
  }, [level]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const tabs: { key: Tab; icon: typeof BookOpen; label: string }[] = [
    { key: 'home', icon: Zap, label: 'Home' },
    { key: 'reading', icon: BookOpen, label: 'Read' },
    { key: 'flashcards', icon: Brain, label: 'Cards' },
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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative w-full overflow-hidden min-h-[220px] flex flex-col justify-end">
        <img src={heroImage} alt="Dutch landscape" className="absolute inset-0 w-full h-full object-cover object-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        <div className="relative mx-auto w-full max-w-lg px-5 pt-10 pb-6">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">
                {activeTab === 'home' ? 'Goedendag!' :
                 activeTab === 'reading' && selectedText ? selectedText.title :
                 activeTab === 'reading' ? 'Reading Library' :
                 activeTab === 'flashcards' ? 'Flashcards' :
                 activeTab === 'tasks' ? 'Tasks' : 'Me'}
              </h1>
              {activeTab === 'home' && (
                <p className="mt-1 text-sm text-muted-foreground">Ready for your daily Dutch practice?</p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 shrink-0">
              {syncing && <Cloud className="h-4 w-4 text-primary animate-pulse" />}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-lg px-5">
        {activeTab === 'home' && (
          <div className="animate-fade-in space-y-5">
            {/* Level-up toast */}
            {showLevelUp && (
              <div className="animate-fade-in fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-primary px-6 py-3 shadow-xl text-primary-foreground text-center">
                <p className="text-lg font-bold">Level Up!</p>
                <p className="text-sm opacity-90">You reached {levelInfo.title}</p>
              </div>
            )}

            {/* Level card */}
            <Card className={`border-2 p-5 ${levelInfo.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div>
                    <p className={`font-heading text-lg font-bold leading-tight ${levelInfo.textColor}`}>
                      Level {levelInfo.level} — {levelInfo.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{xp} XP total</p>
                  </div>
                </div>
                <div className={`rounded-full px-2.5 py-1 text-xs font-bold ${levelInfo.textColor} bg-white/60`}>
                  {levelInfo.maxXP === Infinity ? 'MAX' : `${xpProgress.current}/${xpProgress.needed} XP`}
                </div>
              </div>
              {levelInfo.maxXP !== Infinity && (
                <div className="space-y-1">
                  <Progress value={xpProgress.pct} className="h-3 rounded-full" />
                  <p className="text-xs text-muted-foreground text-right">
                    {xpProgress.needed - xpProgress.current} XP to Level {levelInfo.level + 1}
                  </p>
                </div>
              )}
              {levelInfo.maxXP === Infinity && (
                <p className={`text-xs font-semibold ${levelInfo.textColor}`}>Maximum level reached!</p>
              )}
            </Card>

            {/* Today's Goals */}
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">Today's Goals</h3>
                {!editingGoals ? (
                  <button
                    onClick={() => { setGoalTexts(String(dailyGoal.textsGoal)); setGoalCards(String(dailyGoal.flashcardsGoal)); setEditingGoals(true); }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const t = Math.max(1, parseInt(goalTexts) || dailyGoal.textsGoal);
                      const c = Math.max(1, parseInt(goalCards) || dailyGoal.flashcardsGoal);
                      setGoals(t, c);
                      setEditingGoals(false);
                    }}
                    className="flex items-center gap-1 text-xs text-primary font-semibold hover:opacity-80 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" /> Save
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" /> Read texts
                    </span>
                    {editingGoals ? (
                      <input
                        type="number" min={1} max={99}
                        value={goalTexts}
                        onChange={e => setGoalTexts(e.target.value)}
                        className="w-14 rounded-md border border-border bg-background px-2 py-0.5 text-right text-sm font-medium focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <span className="font-medium">{dailyGoal.textsRead}/{dailyGoal.textsGoal}</span>
                    )}
                  </div>
                  {!editingGoals && <Progress value={readingProgress} className="h-2.5" />}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Brain className="h-3.5 w-3.5" /> Review flashcards
                    </span>
                    {editingGoals ? (
                      <input
                        type="number" min={1} max={999}
                        value={goalCards}
                        onChange={e => setGoalCards(e.target.value)}
                        className="w-14 rounded-md border border-border bg-background px-2 py-0.5 text-right text-sm font-medium focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <span className="font-medium">{dailyGoal.flashcardsReviewed}/{dailyGoal.flashcardsGoal}</span>
                    )}
                  </div>
                  {!editingGoals && <Progress value={flashcardProgress} className="h-2.5" />}
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="card-hover cursor-pointer p-4 text-center" onClick={() => setActiveTab('reading')}>
                <BookOpen className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1.5 font-heading text-lg font-bold">{dailyGoal.textsRead}</p>
                <p className="text-xs text-muted-foreground">Texts today</p>
              </Card>
              <Card className="card-hover cursor-pointer p-4 text-center" onClick={() => setActiveTab('flashcards')}>
                <Brain className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1.5 font-heading text-lg font-bold">{wordCount}</p>
                <p className="text-xs text-muted-foreground">Words saved</p>
              </Card>
            </div>

            {/* AI Tutor */}
            <TutorView onLaunchTask={handleTutorLaunch} />

            {/* Continue Reading */}
            <div>
              <h3 className="mb-3 font-heading font-semibold text-foreground">Continue Reading</h3>
              <TextList
                onSelect={handleSelectText}
                openLevel={openLevel}
                setOpenLevel={setOpenLevel}
                openModule={openModule}
                setOpenModule={setOpenModule}
              />
            </div>
          </div>
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg">
          {tabs.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => {
                setTabResetKeys(prev => ({ ...prev, [key]: prev[key] + 1 }));
                setActiveTab(key);
                setSelectedText(null);
                if (key === 'reading') { setReadingLevel(null); setReadingModule(null); }
              }}
              className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-xs transition-colors ${
                activeTab === key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {key === 'flashcards' && dueCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-0.5 text-[10px] font-bold leading-none text-white">
                    {dueCount > 99 ? '99+' : dueCount}
                  </span>
                )}
              </span>
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
