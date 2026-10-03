import { useState, useEffect } from 'react';
import { TranslateChallengeTask } from './tasks/TranslateChallengeTask';
import { ContinueDialogueTask } from './tasks/ContinueDialogueTask';
import { LEVEL_TOPICS, TOPIC_ICONS } from './tasks/dialogueTopics';
import type { Level } from './tasks/TaskFilters';
import { Pip } from '@/components/Pip';
import { getStartLevel } from '@/lib/tour';
import { ArrowDown, ArrowRight, Languages, MessageCircleMore } from 'lucide-react';

type ActiveTask = 'translate' | 'dialogue' | null;

interface TasksViewProps {
  initialTask?: ActiveTask;
  onTaskLaunched?: () => void;
  /** Called whenever a task opens or closes, so the shell can hide its "Tasks" title inside a task. */
  onActiveTaskChange?: (task: ActiveTask) => void;
}

/** Topic chips: the learner's level first, then the rest, each starting at its own level. */
function topicChips(): { topic: string; level: Level }[] {
  const own = (getStartLevel() ?? 'A1') as Level;
  const order: Level[] = [own, ...(['A1', 'A2', 'B1'] as Level[]).filter(l => l !== own)];
  return order.flatMap(level => LEVEL_TOPICS[level].map(t => ({ topic: t.dutch, level })));
}

export function TasksView({ initialTask = null, onTaskLaunched, onActiveTaskChange }: TasksViewProps) {
  const [activeTask, setActiveTask] = useState<ActiveTask>(initialTask);
  const [dialogueStart, setDialogueStart] = useState<{ topic: string; level: Level } | undefined>();

  useEffect(() => {
    if (initialTask) {
      setActiveTask(initialTask);
      onTaskLaunched?.();
    }
  }, [initialTask]);

  useEffect(() => {
    onActiveTaskChange?.(activeTask);
  }, [activeTask]);

  const closeTask = () => { setActiveTask(null); setDialogueStart(undefined); };

  // Laptops: tasks and their setup screens sit in a centred, readable column.
  const column = 'lg:mx-auto lg:w-full lg:max-w-[720px]';

  if (activeTask === 'translate') return <div className={column}><TranslateChallengeTask onBack={closeTask} /></div>;
  if (activeTask === 'dialogue')  return <div className={column}><ContinueDialogueTask onBack={closeTask} start={dialogueStart} /></div>;

  const cardClass = 'group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-colors hover:border-primary/40 active:scale-[0.99]';

  return (
    <div className={`animate-fade-in flex flex-col gap-4 ${column}`}>
      {/* Pip's invitation (sits under the shell's "Tasks" title) */}
      <div className="-mb-2.5 -ml-2.5 -mt-4 flex items-end gap-1 lg:-mt-5">
        <Pip pose="think" size={112} decorative />
        <div className="mb-[46px] rounded-[14px] border border-border bg-card px-3.5 py-2.5 text-sm leading-snug">
          <span className="font-semibold text-foreground">Fancy some practice?</span>
          <br />
          <span className="text-[13px] text-muted-foreground">Pick one. Ten minutes is plenty.</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        {/* Translate to English */}
        <button onClick={() => setActiveTask('translate')} className={cardClass}>
          <div className="flex w-full flex-col gap-2 bg-accent/70 px-4 py-3.5" aria-hidden="true">
            <span className="font-heading text-[15px] leading-snug text-foreground">Я живу в Лондоне уже два года.</span>
            <span className="flex items-center gap-1.5 text-sm text-accent-foreground">
              <ArrowDown className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              <span className="font-heading italic">I have lived in London for…</span>
              <span className="h-4 w-[1.5px] animate-pulse bg-primary" />
            </span>
          </div>
          <div className="flex w-full items-center gap-3 px-4 py-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-accent">
              <Languages className="h-[21px] w-[21px] text-primary" strokeWidth={1.75} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="font-heading text-lg font-semibold text-foreground">Translate to English</span>
              <span className="text-[13px] text-muted-foreground">10 min · written</span>
            </span>
            <ArrowRight className="h-[18px] w-[18px] shrink-0 text-primary transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </div>
        </button>

        {/* Chat with Pip */}
        <button onClick={() => { setDialogueStart(undefined); setActiveTask('dialogue'); }} className={cardClass}>
          <div className="flex w-full flex-col gap-1.5 bg-highlight-soft/70 px-4 py-3.5" aria-hidden="true">
            <span className="max-w-[80%] self-start rounded-[12px_12px_12px_4px] bg-card px-[11px] py-[7px] text-[13px] text-foreground">
              What did you do at the weekend?
            </span>
            <span className="max-w-[80%] self-end rounded-[12px_12px_4px_12px] bg-highlight px-[11px] py-[7px] text-[13px] text-highlight-foreground">
              I went to Camden market!
            </span>
          </div>
          <div className="flex w-full items-center gap-3 px-4 py-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-highlight-soft">
              <MessageCircleMore className="h-[21px] w-[21px] text-highlight" strokeWidth={1.75} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="font-heading text-lg font-semibold text-foreground">Chat with Pip</span>
              <span className="text-[13px] text-muted-foreground">5 min · conversation</span>
            </span>
            <ArrowRight className="h-[18px] w-[18px] shrink-0 text-highlight transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </div>
        </button>
      </div>

      {/* Topic chips: start a chat straight away */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">Or chat about…</span>
        <div className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
          {topicChips().map(({ topic, level }) => {
            const Icon = TOPIC_ICONS[topic] ?? MessageCircleMore;
            return (
              <button
                key={topic}
                onClick={() => { setDialogueStart({ topic, level }); setActiveTask('dialogue'); }}
                className="flex h-[34px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card px-[13px] text-[13px] text-foreground transition-colors hover:border-primary/40 hover:bg-secondary/50"
              >
                <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
                {topic}
                <span className="text-[11px] font-semibold text-muted-foreground">{level}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
