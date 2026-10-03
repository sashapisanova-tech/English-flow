// Coach mark for just-in-time tips (design/flow-series-7 TourPhone cText/cCard/cHome):
// a dark bubble with a small arrow pointing at what it explains, closed with "Got it".
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoachMarkProps {
  icon: LucideIcon;
  title: string;
  /** Russian line under the English one. */
  ru: string;
  onDismiss: () => void;
  /** Which side the arrow is on: 'top' points up at something above, 'bottom' down at something below. */
  arrow: 'top' | 'bottom';
  /** Where along that side the arrow sits. */
  align?: 'start' | 'center' | 'end';
  className?: string;
}

// The bubble is the inverse of the page (dark on cream, light on dark); the accent
// is the logo red on the dark bubble and the deep red on the light one.
const accent = 'text-[hsl(354_90%_72%)] dark:text-[hsl(354_72%_40%)]';

export function CoachMark({ icon: Icon, title, ru, onDismiss, arrow, align = 'start', className }: CoachMarkProps) {
  return (
    <div
      role="status"
      className={cn(
        'relative flex gap-3 rounded-xl bg-foreground px-4 py-3.5 text-background shadow-[0_14px_30px_-12px_hsl(20_30%_10%/0.5)] motion-safe:animate-fade-in',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute h-3.5 w-3.5 rotate-45 rounded-[2px] bg-foreground',
          arrow === 'top' ? '-top-[7px]' : '-bottom-[7px]',
          align === 'start' && 'left-7',
          align === 'center' && 'left-1/2 -ml-[7px]',
          align === 'end' && 'right-10',
        )}
      />
      <Icon className={cn('mt-px h-[22px] w-[22px] shrink-0', accent)} strokeWidth={1.75} aria-hidden="true" />
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="text-[15px] font-semibold leading-[1.35]">{title}</span>
        <span lang="ru" className="text-[13px] leading-[1.4] opacity-75">{ru}</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className={cn(
          '-m-2 self-end whitespace-nowrap rounded-lg p-2 text-[13px] font-semibold transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60',
          accent,
        )}
      >
        Got it
      </button>
    </div>
  );
}
