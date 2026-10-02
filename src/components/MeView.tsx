import { useState } from 'react';
import { ChevronLeft, ChevronRight, Flame, Moon, Settings, Snowflake, Sun } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { ProgressView } from '@/components/ProgressView';
import { StreakState } from '@/hooks/useStreak';
import { getLevelInfo } from '@/utils/levels';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function StreakCalendar({ streak }: { streak: StreakState }) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const fmt = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: tz });
  const now = new Date();
  const today = fmt(now);

  // Five Monday-first weeks, ending with the current week (later days shown as upcoming).
  const mondayOffset = (now.getDay() + 6) % 7;
  const start = new Date(now);
  start.setDate(now.getDate() - mondayOffset - 28);

  const active = new Set(streak.activityDates);
  const cells = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const date = fmt(d);
    return { date, day: d.getDate(), isToday: date === today, isFuture: date > today, isActive: active.has(date) };
  });
  const pastDays   = cells.filter(c => !c.isFuture).length;
  const activeDays = cells.filter(c => !c.isFuture && c.isActive).length;

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card px-4 py-3.5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-heading text-[17px] font-semibold">Last 5 weeks</h3>
        <span className="text-[13px] text-muted-foreground">{activeDays} of {pastDays} days</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-muted-foreground">
        {WEEKDAYS.map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map(c => {
          let cls = 'bg-track text-muted-foreground';
          if (c.isFuture) cls = 'border border-dashed border-border text-muted-foreground';
          else if (c.isToday && c.isActive) cls = 'border-2 border-highlight bg-primary text-primary-foreground font-bold';
          else if (c.isToday) cls = 'border-2 border-highlight text-highlight-ink font-bold';
          else if (c.isActive) cls = 'bg-primary text-primary-foreground font-semibold';
          return (
            <div
              key={c.date}
              title={c.date}
              className={`grid h-8 place-items-center rounded-lg text-[11px] ${cls}`}
            >
              {c.day}
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex items-center justify-between border-t border-border pt-2.5 text-[13px] text-muted-foreground">
        <span>Longest streak: <span className="font-semibold text-foreground">{streak.longestStreak}</span></span>
        <span className="flex items-center gap-1.5">
          <Snowflake className="h-3.5 w-3.5 text-primary" />
          {streak.freezesAvailable > 0
            ? <>Freezes: <span className="font-semibold text-foreground">{streak.freezesAvailable}</span></>
            : 'No freezes'}
        </span>
      </div>
    </div>
  );
}

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );
  function set(next: boolean) {
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('dutch-theme', next ? 'dark' : 'light');
  }
  return { dark, set };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pl-1 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
      {children}
    </span>
  );
}

const rowClass = 'flex h-[50px] w-full items-center justify-between px-4 text-left text-[15px]';

function SettingsPanel({ onBack }: { onBack: () => void }) {
  const { user, signOut } = useAuth();
  const { dark, set } = useDarkMode();

  const modes = [
    { key: 'light', label: 'Light', icon: Sun,  on: !dark, select: () => set(false) },
    { key: 'dark',  label: 'Dark',  icon: Moon, on: dark,  select: () => set(true)  },
  ];

  return (
    <div className="animate-fade-in flex flex-col gap-[22px]">
      <div className="-ml-2.5 flex items-center gap-1">
        <button
          onClick={onBack}
          aria-label="Back"
          className="rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.4} />
        </button>
        <h2 className="font-heading text-[28px] font-semibold tracking-[-0.015em]">Settings</h2>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Appearance</SectionLabel>
        <div className="flex gap-1 rounded-xl bg-track p-1" role="radiogroup" aria-label="Appearance">
          {modes.map(({ key, label, icon: Icon, on, select }) => (
            <button
              key={key}
              role="radio"
              aria-checked={on}
              onClick={select}
              className={`flex h-10 flex-1 items-center justify-center gap-1.5 rounded-[9px] text-sm transition-colors ${
                on
                  ? 'bg-card font-semibold text-foreground shadow-sm'
                  : 'font-medium text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-[18px] w-[18px] ${on ? 'text-highlight' : ''}`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Help</SectionLabel>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <button
            onClick={() => window.dispatchEvent(new Event('show-app-tour'))}
            className={`${rowClass} transition-colors hover:bg-secondary/50`}
          >
            <span>Show app tour</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Account</SectionLabel>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className={`${rowClass} gap-4`}>
            <span className="shrink-0">Email</span>
            <span className="min-w-0 truncate text-muted-foreground">{user?.email}</span>
          </div>
          <button
            onClick={signOut}
            className={`${rowClass} border-t border-border font-semibold text-highlight-ink transition-colors hover:bg-secondary/50`}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export function MeView() {
  const { user } = useAuth();
  const { streak, vocabulary, texts, xp } = useLearning();
  const [view, setView] = useState<'me' | 'settings'>('me');

  const open = (v: 'me' | 'settings') => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (view === 'settings') return <SettingsPanel onBack={() => open('me')} />;

  const name: string = user?.user_metadata?.full_name || user?.email || '';
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const since = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : null;
  const levelInfo = getLevelInfo(xp);

  const wordCount      = Object.keys(vocabulary).length;
  const completedTexts = texts.filter(t => t.completed).length;

  const stats = [
    { label: 'Day streak', value: streak.currentStreak, flame: true },
    { label: 'Words',      value: wordCount },
    { label: 'Stories',    value: completedTexts, total: texts.length },
  ];

  return (
    <div className="animate-fade-in flex flex-col gap-4">

      {/* Profile */}
      <div className="flex items-center gap-3.5">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent font-heading text-[22px] font-semibold text-accent-foreground">
          {initial}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-heading text-[19px] font-semibold">{name}</span>
          <span className="text-[13px] text-muted-foreground">
            Level {levelInfo.level} · {levelInfo.title}{since ? ` · learning since ${since}` : ''}
          </span>
        </div>
        <button
          onClick={() => open('settings')}
          aria-label="Settings"
          className="-mr-2.5 shrink-0 rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary"
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map(s => (
          <div key={s.label} className="flex flex-col gap-0.5 rounded-xl border border-border bg-card px-3.5 py-3">
            <span className="flex items-center gap-1 font-heading text-2xl font-semibold">
              {s.value}
              {s.flame && <Flame className="h-[18px] w-[18px] text-highlight" />}
              {s.total !== undefined && (
                <span className="font-body text-[13px] font-normal text-muted-foreground">/{s.total}</span>
              )}
            </span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      <StreakCalendar streak={streak} />

      <ProgressView />

    </div>
  );
}
