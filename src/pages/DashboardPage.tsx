import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLearning } from '@/context/LearningContext';
import { BookOpen, Brain, Target, Zap, Cloud, User, Library, Flame } from 'lucide-react';
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
  const [readingLevel, setReadingLevel] = useState<Level | null>(null);
  const [readingModule, setReadingModule] = useState<Module | null>(null);
  const [tutorLaunch, setTutorLaunch] = useState<TutorLaunch>(null);
  const { syncing, dueCount, dailyGoal, vocabulary, streak } = useLearning();
  const wordCount = Object.keys(vocabulary).length;

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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative w-full overflow-hidden min-h-[220px] flex flex-col justify-end">
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
                <p className="mt-1 text-sm text-muted-foreground">Ready for your daily English practice?</p>
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
            {/* Streak card */}
            <Card className="p-4 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
                <Flame className="h-7 w-7 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-2xl font-bold text-foreground leading-none">
                  {streak.currentStreak} day{streak.currentStreak !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {streak.currentStreak === 0
                    ? 'Practice today to start your streak'
                    : streak.currentStreak < 3
                    ? 'Great start — keep showing up!'
                    : streak.currentStreak < 7
                    ? 'Building momentum — nice!'
                    : 'Consistent learner — impressive!'}
                </p>
                {streak.freezesAvailable > 0 && (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    🧊 {streak.freezesAvailable} freeze{streak.freezesAvailable !== 1 ? 's' : ''} available
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-foreground">{wordCount}</p>
                <p className="text-[10px] text-muted-foreground">words saved</p>
              </div>
            </Card>

            {/* Progress overview */}
            <div className="grid grid-cols-3 gap-2">
              <Card className="p-3 text-center cursor-pointer card-hover" onClick={() => setActiveTab('reading')}>
                <BookOpen className="mx-auto h-4 w-4 text-primary mb-1" />
                <p className="font-heading text-lg font-bold leading-none">{dailyGoal.textsRead}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">texts today</p>
              </Card>
              <Card className="p-3 text-center cursor-pointer card-hover" onClick={() => setActiveTab('flashcards')}>
                <Brain className="mx-auto h-4 w-4 text-primary mb-1" />
                <p className="font-heading text-lg font-bold leading-none">{dailyGoal.flashcardsReviewed}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">cards done</p>
              </Card>
              <Card className="p-3 text-center cursor-pointer card-hover" onClick={() => setActiveTab('flashcards')}>
                <Library className="mx-auto h-4 w-4 text-primary mb-1" />
                <p className="font-heading text-lg font-bold leading-none">{wordCount}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">words saved</p>
              </Card>
            </div>

            {/* AI Tutor — fills the home page */}
            <TutorView
              onLaunchTask={handleTutorLaunch}
              onOpenText={handleTutorOpenText}
              onGoToFlashcards={handleGoToFlashcards}
            />
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
