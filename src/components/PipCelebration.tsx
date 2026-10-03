import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pip } from '@/components/Pip';
import { celebrationContent, onCelebrate, type Celebration } from '@/lib/pip';

/** Shows Pip's celebration sheet when a celebration event fires. Mounted once in the app. */
export function PipCelebration() {
  const [queue, setQueue] = useState<Celebration[]>([]);
  useEffect(() => onCelebrate(c => setQueue(q => [...q, c])), []);

  const current = queue[0];
  const close = () => setQueue(q => q.slice(1));
  if (!current) return null;

  const { pose, title, line } = celebrationContent(current);
  const onNext = current.kind === 'story' ? current.onNext : undefined;

  return (
    <Dialog open onOpenChange={open => { if (!open) close(); }}>
      <DialogContent className="max-w-[min(92vw,380px)] rounded-2xl border bg-card p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <Pip pose={pose} size={160} className="motion-safe:animate-scale-in" decorative />
          <DialogTitle className="font-heading text-2xl font-semibold leading-tight tracking-[-0.015em] text-foreground">
            {title.en}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-1">
              <p className="text-[15px] leading-normal text-foreground">{line.en}</p>
              <p className="text-sm leading-normal text-muted-foreground">{line.ru}</p>
            </div>
          </DialogDescription>
          <div className="mt-2 flex w-full flex-col gap-2">
            {onNext && (
              <Button className="h-11 w-full rounded-xl" onClick={() => { close(); onNext(); }}>Next episode →</Button>
            )}
            <Button variant={onNext ? 'outline' : 'default'} className="h-11 w-full rounded-xl" onClick={close}>
              {onNext ? 'Later' : 'Thanks, Pip!'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
