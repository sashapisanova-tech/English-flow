import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TranslateChallengeTask } from './tasks/TranslateChallengeTask';
import { MicroJournalTask } from './tasks/MicroJournalTask';
import { SentenceBuilderTask } from './tasks/SentenceBuilderTask';
import { ContinueDialogueTask } from './tasks/ContinueDialogueTask';
import { ChevronRight, ArrowLeftRight, PenLine, Layers, MessageCircle } from 'lucide-react';

type ActiveTask = 'translate' | 'journal' | 'builder' | 'dialogue' | null;

const tasks = [
  {
    id: 'translate' as const,
    icon: ArrowLeftRight,
    title: 'Translate to Dutch',
    subtitle: 'English → Dutch challenge',
    description: 'Claude writes a short English text using your saved words. Read it and write your Dutch translation — then get instant AI corrections.',
    tag: 'Translation',
    color: 'bg-teal-50 border-teal-200',
    tagColor: 'bg-teal-100 text-teal-700',
  },
  {
    id: 'journal' as const,
    icon: PenLine,
    title: 'Micro Journal',
    subtitle: 'Daily writing · AI corrections',
    description: 'Choose a writing prompt, write 2–4 Dutch sentences, and get gentle feedback from an AI tutor focused on your most important errors.',
    tag: 'Writing',
    color: 'bg-green-50 border-green-200',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'builder' as const,
    icon: Layers,
    title: 'Sentence Builder',
    subtitle: 'Arrange word tiles',
    description: 'Tap word tiles to arrange them into the correct Dutch sentence. 5 rounds per session, scored and level-appropriate.',
    tag: 'Grammar',
    color: 'bg-blue-50 border-blue-200',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'dialogue' as const,
    icon: MessageCircle,
    title: 'Chat with AI',
    subtitle: 'Back-and-forth conversation',
    description: 'Have a short Dutch conversation with an AI partner tailored to your level and chosen theme. Receive grammar feedback at the end.',
    tag: 'Speaking',
    color: 'bg-purple-50 border-purple-200',
    tagColor: 'bg-purple-100 text-purple-700',
  },
];

export function TasksView() {
  const [activeTask, setActiveTask] = useState<ActiveTask>(null);

  if (activeTask === 'translate') return <TranslateChallengeTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'journal') return <MicroJournalTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'builder') return <SentenceBuilderTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'dialogue') return <ContinueDialogueTask onBack={() => setActiveTask(null)} />;

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
              <task.icon className="h-7 w-7 shrink-0 mt-0.5 text-foreground/70" />
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
