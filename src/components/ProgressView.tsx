import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLearning } from '@/context/LearningContext';
import { BookOpen, Brain, Trophy, Zap } from 'lucide-react';
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
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: 108, height: 108 }}>
      <svg width="108" height="108" className="-rotate-90">
        <circle cx="54" cy="54" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
        <circle
          cx="54" cy="54" r={r} fill="none"
          stroke="currentColor" strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xs font-bold text-foreground">Lv {level}</span>
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
  const totalTexts     = texts.length;

  const levelInfo  = getLevelInfo(xp);
  const xpProgress = getXPProgress(xp);

  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.check(allWords.length, completedTexts, xp));
  const lockedAchievements   = ACHIEVEMENTS.filter(a => !a.check(allWords.length, completedTexts, xp));

  return (
    <div className="animate-fade-in space-y-6">

      {/* Level card with ring */}
      <Card className={`border-2 p-5 ${levelInfo.color}`}>
        <div className="flex items-center gap-5">
          <XPRing pct={xpProgress.pct} level={levelInfo.level} />
          <div className="flex-1 min-w-0">
            <p className={`font-heading text-xl font-bold ${levelInfo.textColor}`}>{levelInfo.title}</p>
            <p className="text-sm text-muted-foreground mb-2">{xp} XP total</p>
            {levelInfo.maxXP !== Infinity ? (
              <>
                <Progress value={xpProgress.pct} className="h-2.5 mb-1" />
                <p className="text-xs text-muted-foreground">
                  {xpProgress.current} / {xpProgress.needed} XP → Level {levelInfo.level + 1}
                </p>
              </>
            ) : (
              <p className={`text-sm font-semibold ${levelInfo.textColor}`}>Max level!</p>
            )}
          </div>
        </div>

        {/* Level path */}
        <div className="mt-4 flex items-center gap-1">
          {LEVELS.map((l, i) => (
            <div key={l.level} className="flex items-center gap-1 flex-1">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 transition-all ${
                l.level < levelInfo.level  ? 'bg-primary border-primary text-primary-foreground' :
                l.level === levelInfo.level ? 'bg-primary/20 border-primary text-primary scale-110' :
                'bg-background border-border text-muted-foreground'
              }`}>
                {l.level < levelInfo.level ? '✓' : l.level}
              </div>
              {i < LEVELS.length - 1 && (
                <div className={`h-0.5 flex-1 rounded ${l.level < levelInfo.level ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* XP how-to */}
      <Card className="p-4 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-primary" /> How to earn XP
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { action: 'Complete a text',    xp: XP.READ_TEXT       },
            { action: 'Correct flashcard',  xp: XP.FLASHCARD_RIGHT },
            { action: 'Master a word',      xp: XP.WORD_MASTERED   },
            { action: 'Save a new word',    xp: XP.WORD_SAVED      },
          ].map(({ action, xp: pts }) => (
            <div key={action} className="flex items-center gap-2 rounded-lg bg-secondary p-2.5">
              <span className="text-xs font-bold text-primary">+{pts} XP</span>
              <span className="text-xs text-muted-foreground">{action}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Brain,    label: 'Words saved',      value: allWords.length,              color: 'text-primary'           },
          { icon: BookOpen, label: 'Texts completed',  value: `${completedTexts}/${totalTexts}`, color: 'text-sky-600'      },
          { icon: Trophy,   label: 'Words mastered',   value: knownWords,                   color: 'text-emerald-600'       },
          { icon: Zap,      label: 'Total XP',         value: xp,                           color: 'text-amber-600'         },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="p-4 text-center">
            <Icon className={`mx-auto h-5 w-5 ${color}`} />
            <p className="mt-1.5 font-heading text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </Card>
        ))}
      </div>

      {/* Vocabulary breakdown */}
      <Card className="p-4 space-y-3">
        <h3 className="font-heading font-semibold text-foreground">Vocabulary Breakdown</h3>
        {[
          { label: 'New',      count: newWords,      color: 'bg-sky-500',     total: allWords.length },
          { label: 'Learning', count: learningWords, color: 'bg-amber-400',   total: allWords.length },
          { label: 'Mastered', count: knownWords,    color: 'bg-emerald-500', total: allWords.length },
        ].map(({ label, count, color, total }) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{count}</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${color}`}
                style={{ width: total ? `${(count / total) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </Card>

      {/* Achievements */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">Achievements</h3>

        {unlockedAchievements.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {unlockedAchievements.map(a => (
              <Card key={a.id} className="p-3 flex items-center gap-2.5 bg-primary/5 border-primary/20">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground leading-tight">{a.label}</p>
                  <p className="text-xs text-muted-foreground leading-tight truncate">{a.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {lockedAchievements.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {lockedAchievements.map(a => (
              <Card key={a.id} className="p-3 flex items-center gap-2.5 opacity-40">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground leading-tight">{a.label}</p>
                  <p className="text-xs text-muted-foreground leading-tight truncate">{a.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
