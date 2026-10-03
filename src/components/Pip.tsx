// Pip, the English Flow fox (design/flow-series-7, "Cute flat"). Each pose has a cream
// and a dark version; the right one shows for the current theme.
import waveCream from '@/assets/mascot/pip-wave-cream.svg';
import waveDark from '@/assets/mascot/pip-wave-dark.svg';
import happyCream from '@/assets/mascot/pip-happy-cream.svg';
import happyDark from '@/assets/mascot/pip-happy-dark.svg';
import celebrateCream from '@/assets/mascot/pip-celebrate-cream.svg';
import celebrateDark from '@/assets/mascot/pip-celebrate-dark.svg';
import thinkCream from '@/assets/mascot/pip-think-cream.svg';
import thinkDark from '@/assets/mascot/pip-think-dark.svg';
import sleepyCream from '@/assets/mascot/pip-sleepy-cream.svg';
import sleepyDark from '@/assets/mascot/pip-sleepy-dark.svg';
import snowCream from '@/assets/mascot/pip-snow-cream.svg';
import snowDark from '@/assets/mascot/pip-snow-dark.svg';
import { cn } from '@/lib/utils';

export type PipPose = 'wave' | 'happy' | 'celebrate' | 'think' | 'sleepy' | 'snow';

const POSES: Record<PipPose, { cream: string; dark: string; alt: string }> = {
  wave:      { cream: waveCream,      dark: waveDark,      alt: 'Pip the fox waving' },
  happy:     { cream: happyCream,     dark: happyDark,     alt: 'Pip the fox smiling' },
  celebrate: { cream: celebrateCream, dark: celebrateDark, alt: 'Pip the fox celebrating' },
  think:     { cream: thinkCream,     dark: thinkDark,     alt: 'Pip the fox thinking' },
  sleepy:    { cream: sleepyCream,    dark: sleepyDark,    alt: 'Pip the fox resting' },
  snow:      { cream: snowCream,      dark: snowDark,      alt: 'Pip the fox holding a snowflake' },
};

interface PipProps {
  pose: PipPose;
  size?: number;
  className?: string;
  /** Pass false when the surrounding text already says what Pip shows. */
  decorative?: boolean;
}

export function Pip({ pose, size = 96, className, decorative = false }: PipProps) {
  const p = POSES[pose];
  const common = { width: size, height: size, draggable: false, alt: decorative ? '' : p.alt };
  return (
    <span className={cn('inline-block shrink-0', className)} style={{ width: size, height: size }}>
      <img src={p.cream} {...common} className="block dark:hidden" />
      <img src={p.dark} {...common} className="hidden dark:block" aria-hidden="true" alt="" />
    </span>
  );
}
