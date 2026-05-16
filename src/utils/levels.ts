export interface LevelInfo {
  level: number;
  title: string;
  emoji: string;
  color: string;        // Tailwind bg class for card
  textColor: string;    // Tailwind text class
  minXP: number;
  maxXP: number;        // XP needed to reach NEXT level (Infinity for last)
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Sprout',           emoji: '🌱', color: 'bg-emerald-50  border-emerald-200', textColor: 'text-emerald-700', minXP: 0,    maxXP: 100  },
  { level: 2, title: 'Explorer',         emoji: '🗺️', color: 'bg-sky-50      border-sky-200',     textColor: 'text-sky-700',     minXP: 100,  maxXP: 250  },
  { level: 3, title: 'Learner',          emoji: '📚', color: 'bg-violet-50   border-violet-200',  textColor: 'text-violet-700',  minXP: 250,  maxXP: 500  },
  { level: 4, title: 'Conversationalist',emoji: '💬', color: 'bg-orange-50   border-orange-200',  textColor: 'text-orange-700',  minXP: 500,  maxXP: 900  },
  { level: 5, title: 'Fluent',           emoji: '🌊', color: 'bg-blue-50     border-blue-200',    textColor: 'text-blue-700',    minXP: 900,  maxXP: 1400 },
  { level: 6, title: 'Dutch Pro',        emoji: '🏆', color: 'bg-amber-50    border-amber-200',   textColor: 'text-amber-700',   minXP: 1400, maxXP: Infinity },
];

export function getLevelInfo(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getXPProgress(xp: number): { current: number; needed: number; pct: number } {
  const info = getLevelInfo(xp);
  if (info.maxXP === Infinity) return { current: xp - info.minXP, needed: 0, pct: 100 };
  const current = xp - info.minXP;
  const needed  = info.maxXP - info.minXP;
  return { current, needed, pct: Math.min(100, Math.round((current / needed) * 100)) };
}

// XP rewards
export const XP = {
  READ_TEXT:       20,
  FLASHCARD_RIGHT:  5,
  WORD_SAVED:       2,
  WORD_MASTERED:   10,
  TASK_COMPLETE:   15,
} as const;
