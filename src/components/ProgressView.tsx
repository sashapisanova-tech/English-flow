import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLearning } from '@/context/LearningContext';
import { Check, Lock, Trophy, Zap } from 'lucide-react';
import { getLevelInfo, getXPProgress, LEVELS, XP } from '@/utils/levels';

const ACHIEVEMENTS = [
  { id: 'first_word',   emoji: '', label: 'First Word',       desc: 'Save your first word',          check: (v: number, t: number) => v >= 1   },
  { id: 'words_10',     emoji: '', label: 'Word Collector',   desc: '10 words saved',                check: (v: number)             => v >= 10  },
  { id: 'words_25',     emoji: '', label: 'Bookworm',         desc: '25 words saved',                check: (v: number)             => v >= 25  },
  { id: 'words_50',     emoji: '', label: 'Vocabulary Nerd',  desc: '50 words saved',                check: (v: number)             => v >= 50  },
  { id: 'text_1',       emoji: '', label: 'First Read',       desc: 'Complete your first text',      check: (_v: number, t: number) => t >= 1   },
  { id: 'text_5',       emoji: '', label: 'Avid Reader',      desc: '5 texts completed',             check: (_v: number, t: number) => t >= 5   },
  { id: 'text_10',      emoji: '', label: 'Scholar',          desc: '10 texts completed',            check: (_v: number, t: number) => t >= 10  },
  { id: 'level_2',      emoji: '', label: 'Level Up!',        desc: 'Reach Level 2',                 check: (_v: number, _t: number, xp: number) => xp >= 100  },
  { id: 'level_3',      emoji: '', label: 'Rising Star',      desc: 'Reach Level 3',                 check: (_v: number, _t: number, xp: number) => xp >= 250  },
  { id: 'level_5',      emoji: '', label: 'Language Rocket',  desc: 'Reach Level 5',                 check: (_v: number, _t: number, xp: number) => xp >= 900  },
];

// Circular XP progress ring (SVG)
function XPRing({ pct, level }: { pct: number; level: number }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative flex shrink-0 items-center justify-center" style={{ width: 88, height: 88 }}>
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" strokeWidth="7" className="stroke-track" />
        <circle
          cx="44" cy="44" r={r} fill="none"
          strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="stroke-highlight transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-[11px] text-muted-foreground">Level</span>
        <span className="font-heading text-xl font-semibold text-foreground">{level}</span>
      </div>
    </div>
  );
}

export function ProgressView() {
  const { vocabulary, texts, xp } = useLearning();

  const allWords      = Object.values(vocabulary);
  const knownWords    = allWords.filter(w => w.status === 'known').length;
  const learningWords = allWords.filter(w => w.status === 'learning').length;
  const newWords      = allWords.filter(w => w.status === 'new').length;
  const completedTexts = texts.filter(t => t.completed).length;

  const levelInfo  = getLevelInfo(xp);
  const xpProgress = getXPProgress(xp);

  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.check(allWords.length, completedTexts, xp));
  const lockedAchievements   = ACHIEVEMENTS.filter(a => !a.check(allWords.length, completedTexts, xp));

  return (
    <div className="animate-fade-in flex flex-col gap-4">

      {/* Level card with ring */}
      <Card className="rounded-xl px-4 py-4 lg:px-5 lg:py-5">
        <div className="flex items-center gap-4">
          <XPRing pct={xpProgress.pct} level={levelInfo.level} />
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[19px] font-semibold text-foreground">{levelInfo.title}</p>
            <p className="mb-2 text-[13px] text-muted-foreground">{xp} XP total</p>
            {levelInfo.maxXP !== Infinity ? (
              <>
                <Progress value={xpProgress.pct} className="mb-1.5 h-2 bg-track" />
                <p className="text-xs text-muted-foreground">
                  {xpProgress.current} / {xpProgress.needed} XP → Level {levelInfo.level + 1}
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-highlight-ink">Max level!</p>
            )}
          </div>
        </div>

        {/* Level path */}
        <div className="mt-4 flex items-center gap-1">
          {LEVELS.map((l, i) => (
            <div key={l.level} className="flex flex-1 items-center gap-1 last:flex-none">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                l.level < levelInfo.level   ? 'bg-primary text-primary-foreground' :
                l.level === levelInfo.level ? 'border-2 border-highlight text-highlight-ink font-bold' :
                'border border-dashed border-border text-muted-foreground'
              }`}>
                {l.level < levelInfo.level ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : l.level}
              </div>
              {i < LEVELS.length - 1 && (
                <div className={`h-0.5 flex-1 rounded-full ${l.level < levelInfo.level ? 'bg-primary' : 'bg-track'}`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* XP how-to */}
      <Card className="flex flex-col gap-2.5 rounded-xl px-4 py-3.5 lg:px-5 lg:py-4">
        <h3 className="flex items-center gap-1.5 font-heading text-[17px] font-semibold text-foreground">
          <Zap className="h-4 w-4 text-highlight" /> How to earn XP
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { action: 'Finish a text and its questions', xp: XP.READ_TEXT       },
            { action: 'Review a card (Hard / Good)',     xp: XP.FLASHCARD_RIGHT },
            { action: 'Review a card (Easy)',            xp: XP.FLASHCARD_EASY  },
            { action: 'Complete a task',                 xp: XP.TASK_COMPLETE   },
          ].map(({ action, xp: pts }) => (
            <div key={action} className="flex flex-col gap-0.5 rounded-lg bg-track px-3 py-2.5">
              <span className="text-[13px] font-semibold text-foreground">+{pts} XP</span>
              <span className="text-xs text-muted-foreground">{action}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Vocabulary breakdown */}
      <Card className="flex flex-col gap-3 rounded-xl px-4 py-3.5 lg:px-5 lg:py-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-heading text-[17px] font-semibold text-foreground">Your words</h3>
          <span className="text-[13px] text-muted-foreground">{allWords.length} saved</span>
        </div>
        {[
          { label: 'New',      count: newWords,      color: 'bg-muted-foreground/50' },
          { label: 'Learning', count: learningWords, color: 'bg-highlight'           },
          { label: 'Mastered', count: knownWords,    color: 'bg-primary'             },
        ].map(({ label, count, color }) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-semibold">{count}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-track">
              <div
                className={`h-full rounded-full transition-all duration-700 ${color}`}
                style={{ width: allWords.length ? `${(count / allWords.length) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </Card>

      {/* Achievements */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between px-1">
          <h3 className="font-heading text-[17px] font-semibold text-foreground">Achievements</h3>
          <span className="text-[13px] text-muted-foreground">{unlockedAchievements.length} of {ACHIEVEMENTS.length}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {unlockedAchievements.map(a => (
            <div key={a.id} className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-highlight-soft">
                <Trophy className="h-4 w-4 text-highlight-ink" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-tight text-foreground">{a.label}</p>
                <p className="truncate text-xs leading-tight text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
          {lockedAchievements.map(a => (
            <div key={a.id} className="flex items-center gap-2.5 rounded-xl border border-dashed border-border p-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-track">
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-tight text-muted-foreground">{a.label}</p>
                <p className="truncate text-xs leading-tight text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
