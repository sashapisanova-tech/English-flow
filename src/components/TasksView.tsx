import { useState, useEffect } from 'react';
import { TranslateChallengeTask } from './tasks/TranslateChallengeTask';
import { ContinueDialogueTask } from './tasks/ContinueDialogueTask';
import { ArrowLeftRight, MessageCircle, ChevronRight } from 'lucide-react';

type ActiveTask = 'translate' | 'dialogue' | null;

interface TasksViewProps {
  initialTask?: ActiveTask;
  onTaskLaunched?: () => void;
}

const tasks = [
  {
    id: 'translate' as const,
    icon: ArrowLeftRight,
    title: 'Translate to English',
    tag: 'Translation',
    description: 'Translate a short Russian text into English at your level — type your answer and get warm, level-aware AI feedback.',
  },
  {
    id: 'dialogue' as const,
    icon: MessageCircle,
    title: 'Chat with AI',
    tag: 'Conversation',
    description: 'Hold a short English conversation with an AI partner. Save words to flashcards. Grammar review at the end.',
  },
];

export function TasksView({ initialTask = null, onTaskLaunched }: TasksViewProps) {
  const [activeTask, setActiveTask] = useState<ActiveTask>(initialTask);

  useEffect(() => {
    if (initialTask) {
      setActiveTask(initialTask);
      onTaskLaunched?.();
    }
  }, [initialTask]);

  if (activeTask === 'translate') return <TranslateChallengeTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'dialogue')  return <ContinueDialogueTask   onBack={() => setActiveTask(null)} />;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mt-0.5">Choose an exercise and practise your English.</p>
      </div>

      <div className="space-y-2">
        {tasks.map((task, idx) => (
          <button
            key={task.id}
            onClick={() => setActiveTask(task.id)}
            className="w-full text-left group flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 transition-all hover:border-foreground/25 hover:shadow-sm active:scale-[0.99]"
          >
            <span className="shrink-0 font-heading text-xs font-semibold text-muted-foreground/50 w-5 text-right tabular-nums">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
              <task.icon className="h-4 w-4 text-foreground/70" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-heading font-semibold text-sm text-foreground">{task.title}</span>
                <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">{task.tag}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{task.description}</p>
            </div>
            <ChevronRight className="shrink-0 h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
