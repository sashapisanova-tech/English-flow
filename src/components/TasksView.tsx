import { useState } from 'react';
import { TranslateChallengeTask } from './tasks/TranslateChallengeTask';
import { MicroJournalTask } from './tasks/MicroJournalTask';
import { SentenceBuilderTask } from './tasks/SentenceBuilderTask';
import { ContinueDialogueTask } from './tasks/ContinueDialogueTask';
import { GuidedJournalTask } from './tasks/GuidedJournalTask';
import { GapFillTask } from './tasks/GapFillTask';
import { ArrowLeftRight, PenLine, Layers, MessageCircle, BookMarked, PuzzleIcon, ChevronRight } from 'lucide-react';

type ActiveTask = 'translate' | 'journal' | 'builder' | 'dialogue' | 'guided-journal' | 'gap-fill' | null;

const tasks = [
  {
    id: 'translate' as const,
    icon: ArrowLeftRight,
    title: 'Translate to Dutch',
    tag: 'Translation',
    description: 'Read an English text and write your Dutch translation. Get instant AI corrections.',
  },
  {
    id: 'journal' as const,
    icon: PenLine,
    title: 'Micro Journal',
    tag: 'Writing',
    description: 'Pick a prompt, write 2–4 Dutch sentences, get gentle feedback on your key mistakes.',
  },
  {
    id: 'builder' as const,
    icon: Layers,
    title: 'Sentence Builder',
    tag: 'Grammar',
    description: 'Tap word tiles to form the correct Dutch sentence. Five rounds, level-matched.',
  },
  {
    id: 'dialogue' as const,
    icon: MessageCircle,
    title: 'Chat with AI',
    tag: 'Conversation',
    description: 'Hold a short Dutch conversation with an AI partner. Grammar notes at the end.',
  },
  {
    id: 'guided-journal' as const,
    icon: BookMarked,
    title: 'Guided Journal',
    tag: 'Personal',
    description: 'A journaling prompt built from texts you have read — reuses your vocabulary, adapts to your level.',
  },
  {
    id: 'gap-fill' as const,
    icon: PuzzleIcon,
    title: 'Gap Fill',
    tag: 'Grammar',
    description: 'Fill in missing verbs, articles and prepositions from sentences you have already read. Grammar-targeted, level-aware.',
  },
];

export function TasksView() {
  const [activeTask, setActiveTask] = useState<ActiveTask>(null);

  if (activeTask === 'translate') return <TranslateChallengeTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'journal')   return <MicroJournalTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'builder')   return <SentenceBuilderTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'dialogue')       return <ContinueDialogueTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'guided-journal') return <GuidedJournalTask onBack={() => setActiveTask(null)} />;
  if (activeTask === 'gap-fill')       return <GapFillTask       onBack={() => setActiveTask(null)} />;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mt-0.5">Choose an exercise and practise your Dutch.</p>
      </div>

      <div className="space-y-2">
        {tasks.map((task, idx) => (
          <button
            key={task.id}
            onClick={() => setActiveTask(task.id)}
            className="w-full text-left group flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 transition-all hover:border-foreground/25 hover:shadow-sm active:scale-[0.99]"
          >
            {/* Number */}
            <span className="shrink-0 font-heading text-xs font-semibold text-muted-foreground/50 w-5 text-right tabular-nums">
              {String(idx + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
              <task.icon className="h-4 w-4 text-foreground/70" />
            </span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-heading font-semibold text-sm text-foreground">{task.title}</span>
                <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">{task.tag}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{task.description}</p>
            </div>

            {/* Arrow */}
            <ChevronRight className="shrink-0 h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
