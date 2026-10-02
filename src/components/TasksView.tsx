import { useState, useEffect } from 'react';
import { TranslateChallengeTask } from './tasks/TranslateChallengeTask';
import { ContinueDialogueTask } from './tasks/ContinueDialogueTask';
import { Languages, MessageCircleMore, ChevronRight } from 'lucide-react';

type ActiveTask = 'translate' | 'dialogue' | null;

interface TasksViewProps {
  initialTask?: ActiveTask;
  onTaskLaunched?: () => void;
  /** Called whenever a task opens or closes, so the shell can hide its "Tasks" title inside a task. */
  onActiveTaskChange?: (task: ActiveTask) => void;
}

const tasks = [
  {
    id: 'translate' as const,
    icon: Languages,
    title: 'Translate to English',
    meta: '10 min · written',
    description: 'The tutor writes a short Russian text for your level. You translate it and get feedback.',
  },
  {
    id: 'dialogue' as const,
    icon: MessageCircleMore,
    title: 'Chat with AI',
    meta: '5 min · conversation',
    description: 'A short conversation on a topic you pick. Grammar review at the end.',
  },
];

export function TasksView({ initialTask = null, onTaskLaunched, onActiveTaskChange }: TasksViewProps) {
  const [activeTask, setActiveTask] = useState<ActiveTask>(initialTask);

  useEffect(() => {
    if (initialTask) {
      setActiveTask(initialTask);
      onTaskLaunched?.();
    }
  }, [initialTask]);

  useEffect(() => {
    onActiveTaskChange?.(activeTask);
  }, [activeTask]);

  // Laptops: tasks and their setup screens sit in a centred, readable column.
  const column = 'lg:mx-auto lg:w-full lg:max-w-[720px]';

  if (activeTask === 'translate') return <div className={column}><TranslateChallengeTask onBack={() => setActiveTask(null)} /></div>;
  if (activeTask === 'dialogue')  return <div className={column}><ContinueDialogueTask   onBack={() => setActiveTask(null)} /></div>;

  return (
    <div className={`animate-fade-in flex flex-col gap-5 ${column}`}>
      {/* Subtitle sits under the shell's "Tasks" page title */}
      <p className="-mt-3 text-[15px] text-muted-foreground lg:-mt-4 lg:text-base">Practise with your AI tutor.</p>

      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => setActiveTask(task.id)}
            className="group flex w-full flex-col gap-3.5 rounded-xl border border-border bg-card p-[18px] text-left transition-colors hover:border-primary/40 active:scale-[0.99] lg:p-[22px]"
          >
            <div className="flex w-full items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent">
                <task.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="font-heading text-[19px] font-semibold leading-snug text-foreground">{task.title}</span>
                <span className="text-[13px] text-muted-foreground">{task.meta}</span>
              </div>
              <ChevronRight className="h-[18px] w-[18px] shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={2.5} />
            </div>
            <p className="text-sm leading-normal text-muted-foreground">{task.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
