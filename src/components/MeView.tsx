import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProgressView } from '@/components/ProgressView';

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

        {/* Sign out */}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors"
        >
          <LogOut className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">Sign out</span>
        </button>
      </Card>

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
