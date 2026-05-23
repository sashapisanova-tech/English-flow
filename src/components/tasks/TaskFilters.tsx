import { useState } from 'react';

const LEVELS = ['A1', 'A2', 'B1'] as const;
export type Level = typeof LEVELS[number];
export type Theme = string; // open string — can be a preset or custom

export const SUGGESTED_THEMES = [
  'Dagelijks leven',
  'Werk & Studie',
  'Reizen',
  'Eten & Drinken',
  'Familie & Vrienden',
  'Vrije tijd',
  'In de stad',
  'Gezondheid',
];

interface TaskFiltersProps {
  level: Level;
  theme: Theme;
  onLevelChange: (l: Level) => void;
  onThemeChange: (t: Theme) => void;
  hideTheme?: boolean;
}

export function TaskFilters({ level, theme, onLevelChange, onThemeChange, hideTheme = false }: TaskFiltersProps) {
  const isCustom = !SUGGESTED_THEMES.includes(theme);
  const [customMode, setCustomMode] = useState(isCustom);
  const [draft, setDraft] = useState(isCustom ? theme : '');

  function activateCustom() {
    setCustomMode(true);
    onThemeChange(draft.trim() || '');
  }

  function applyCustom() {
    const val = draft.trim();
    if (val) onThemeChange(val);
  }

  function pickSuggested(t: string) {
    setCustomMode(false);
    onThemeChange(t);
  }

  return (
    <div className="space-y-3">
      {/* Level */}
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

      {/* Theme */}
      {!hideTheme && <div className="space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Theme</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_THEMES.map(t => (
            <button
              key={t}
              onClick={() => pickSuggested(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                !customMode && theme === t
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              {t}
            </button>
          ))}
          {/* Own theme toggle */}
          <button
            onClick={activateCustom}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              customMode
                ? 'bg-primary text-primary-foreground'
                : 'border border-dashed border-border text-muted-foreground hover:border-primary/40'
            }`}
          >
            Own theme
          </button>
        </div>

        {/* Custom theme input — shown when Own theme is active */}
        {customMode && (
          <div className="flex gap-2 pt-1 animate-fade-in">
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && applyCustom()}
              placeholder="e.g. Shopping for clothes…"
              autoComplete="off"
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60"
            />
            <button
              onClick={applyCustom}
              disabled={!draft.trim()}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-40 transition-opacity"
            >
              Use
            </button>
          </div>
        )}
      </div>}
    </div>
  );
}
