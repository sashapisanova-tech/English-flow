import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Moon, Sun, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { ProgressView } from '@/components/ProgressView';
import { StreakState } from '@/hooks/useStreak';

function StreakCalendar({ streak }: { streak: StreakState }) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date().toLocaleDateString('en-CA', { timeZone: tz });

  // Build last 35 days (5 weeks), oldest → newest
  const days: string[] = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('en-CA', { timeZone: tz }));
  }

  const active = new Set(streak.activityDates);

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
          <p className="font-heading text-xl font-bold text-foreground">{streak.currentStreak}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">current streak</p>
        </div>
        <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
          <p className="font-heading text-xl font-bold text-foreground">{streak.longestStreak}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">longest streak</p>
        </div>
        <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
          <p className="font-heading text-xl font-bold text-foreground">
            {streak.freezesAvailable > 0 ? `🧊×${streak.freezesAvailable}` : '—'}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {streak.freezesAvailable > 0 ? 'freezes' : 'no freezes'}
          </p>
        </div>
      </div>

      {/* 5-week heatmap grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map(date => {
          const isActive  = active.has(date);
          const isToday   = date === today;
          return (
            <div
              key={date}
              title={date}
              className={`aspect-square rounded-[5px] transition-colors ${
                isActive
                  ? 'bg-primary'
                  : isToday
                  ? 'bg-border ring-1 ring-primary/50'
                  : 'bg-secondary'
              }`}
            />
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground text-center">Last 35 days of activity</p>
    </div>
  );
}

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('dutch-theme', next ? 'dark' : 'light');
  }
  return { dark, toggle };
}

export function MeView() {
  const { user, signOut } = useAuth();
  const { streak } = useLearning();
  const { dark, toggle } = useDarkMode();

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : '??';

  return (
    <div className="animate-fade-in space-y-5">

      {/* Profile card */}
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-semibold text-foreground truncate">{user?.email}</p>
            <p className="text-xs text-muted-foreground">Dutch learner</p>
          </div>
        </div>
      </Card>

      {/* Settings rows */}
      <Card className="overflow-hidden p-0">
        {/* Dark mode toggle */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <div className="flex items-center gap-3">
            {dark
              ? <Moon className="h-4 w-4 text-muted-foreground" />
              : <Sun className="h-4 w-4 text-muted-foreground" />
            }
            <span className="text-sm font-medium text-foreground">Dark mode</span>
          </div>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              dark ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                dark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* App tour replay */}
        <button
          onClick={() => window.dispatchEvent(new Event('show-app-tour'))}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors border-b border-border"
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Show app tour</span>
        </button>

        {/* Sign out */}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors"
        >
          <LogOut className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">Sign out</span>
        </button>
      </Card>

      {/* Streak calendar */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Streak
        </p>
        <Card className="p-4">
          <StreakCalendar streak={streak} />
        </Card>
      </div>

      {/* Progress stats below */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Your progress
        </p>
        <ProgressView />
      </div>

    </div>
  );
}
