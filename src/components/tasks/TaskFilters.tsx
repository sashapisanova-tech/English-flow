const LEVELS = ['A1', 'A2', 'B1'] as const;
export type Level = typeof LEVELS[number];

export const THEMES = [
  'Dagelijks leven',
  'Werk & Studie',
  'Reizen',
  'Eten & Drinken',
  'Familie & Vrienden',
  'Vrije tijd',
  'In de stad',
  'Gezondheid',
] as const;
export type Theme = typeof THEMES[number];

interface TaskFiltersProps {
  level: Level;
  theme: Theme;
  onLevelChange: (l: Level) => void;
  onThemeChange: (t: Theme) => void;
}

export function TaskFilters({ level, theme, onLevelChange, onThemeChange }: TaskFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Level</p>
        <div className="flex gap-2">
          {LEVELS.map(l => (
            <button
              key={l}
              onClick={() => onLevelChange(l)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                level === l
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Theme</p>
        <div className="flex flex-wrap gap-2">
          {THEMES.map(t => (
            <button
              key={t}
              onClick={() => onThemeChange(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                theme === t
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
