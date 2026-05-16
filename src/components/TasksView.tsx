import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StoryTask } from './tasks/StoryTask';
import { WritingPracticeTask } from './tasks/WritingPracticeTask';
import { TranslateChallengeTask } from './tasks/TranslateChallengeTask';
import { WordSprintTask } from './tasks/WordSprintTask';
import { SpotTheMistakeTask } from './tasks/SpotTheMistakeTask';
import { ListenTranscribeTask } from './tasks/ListenTranscribeTask';
import { DailyChallengeTask } from './tasks/DailyChallengeTask';
import { ChevronRight, Sparkles, PenLine, ArrowLeftRight, Zap, Search, Headphones, Trophy } from 'lucide-react';

type ActiveTask = 'story' | 'writing' | 'translate-challenge' | 'word-sprint' | 'spot-mistake' | 'listen-transcribe' | 'daily-challenge' | null;

const tasks = [
  {
    id: 'daily-challenge' as const,
    emoji: '🏆',
    icon: Trophy,
    title: 'Daily Challenge',
    subtitle: 'One challenge per day · build your streak',
    description: 'A short timed word sprint every day. Complete it to build your streak — miss a day and you start over.',
    tag: 'Streak',
    color: 'bg-orange-50 border-orange-200',
    tagColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'word-sprint' as const,
    emoji: '⚡',
    icon: Zap,
    title: 'Word Sprint',
    subtitle: '60 seconds · English → Dutch',
    description: 'Pick any flashcard set and type as many Dutch words as you can in 60 seconds. Score-based and addictive.',
    tag: 'Vocabulary',
    color: 'bg-yellow-50 border-yellow-200',
    tagColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 'spot-mistake' as const,
    emoji: '🕵️',
    icon: Search,
    title: 'Spot the Mistake',
    subtitle: 'Find the grammar error',
    description: 'Claude generates 5 Dutch sentences — some correct, some with a deliberate error. Spot which are wrong, then write the correction yourself before seeing the answer.',
    tag: 'Grammar',
    color: 'bg-indigo-50 border-indigo-200',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'listen-transcribe' as const,
    emoji: '🎧',
    icon: Headphones,
    title: 'Listen & Transcribe',
    subtitle: 'Hear · write · translate',
    description: 'A Dutch sentence plays — type what you hear, then translate it to English. Trains both listening and comprehension.',
    tag: 'Listening',
    color: 'bg-sky-50 border-sky-200',
    tagColor: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'writing' as const,
    emoji: '✍️',
    icon: PenLine,
    title: 'Daily Journal',
    subtitle: 'Free writing · AI corrections',
    description: 'Write 3–5 Dutch sentences about anything. Claude corrects your grammar and spelling and rewrites your text correctly.',
    tag: 'Writing',
    color: 'bg-green-50 border-green-200',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'story' as const,
    emoji: '✨',
    icon: Sparkles,
    title: 'AI Story Generator',
    subtitle: 'A story built from your words',
    description: 'Claude writes a short Dutch story using the words you saved to flashcards. Your words appear in orange, new ones in purple.',
    tag: 'AI',
    color: 'bg-purple-50 border-purple-200',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'translate-challenge' as const,
    emoji: '🔄',
    icon: ArrowLeftRight,
    title: 'Translate to Dutch',
    subtitle: 'English → Dutch challenge',
    description: 'Claude writes a short English text using your saved words. Read it and write your Dutch translation — then get instant AI corrections.',
    tag: 'AI',
    color: 'bg-teal-50 border-teal-200',
    tagColor: 'bg-teal-100 text-teal-700',
  },
];

export function TasksView() {
  const [activeTask, setActiveTask] = useState<ActiveTask>(null);

  if (activeTask === 'story') return <StoryTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'writing') return <WritingPracticeTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'translate-challenge') return <TranslateChallengeTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'word-sprint') return <WordSprintTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'spot-mistake') return <SpotTheMistakeTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'listen-transcribe') return <ListenTranscribeTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'daily-challenge') return <DailyChallengeTask onBack={() => setActiveTask(null)} />;

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h2 className="font-heading text-lg font-bold text-foreground">Tasks</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Practice exercises to put your Dutch to the test.</p>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <Card
            key={task.id}
            onClick={() => setActiveTask(task.id)}
            className={`card-hover cursor-pointer border-2 p-4 ${task.color} transition-all active:scale-[0.98]`}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{task.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-heading font-bold text-foreground">{task.title}</span>
                  <Badge className={`text-xs px-2 py-0 ${task.tagColor} border-0`}>{task.tag}</Badge>
                </div>
                <p className="text-xs text-muted-foreground italic mb-2">{task.subtitle}</p>
                <p className="text-sm text-foreground/80 leading-snug">{task.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
