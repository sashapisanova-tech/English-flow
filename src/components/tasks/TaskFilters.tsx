import { useState, type ReactNode } from 'react';
import { ArrowRight, Check, ChevronLeft, Pencil } from 'lucide-react';

const LEVELS = ['A1', 'A2', 'B1'] as const;
export type Level = typeof LEVELS[number];
export type Theme = string; // open string — can be a preset or custom

export const SUGGESTED_THEMES = [
  'Everyday life',
  'Work & Study',
  'Travel',
  'Food & Drink',
  'Family & Friends',
  'Free time',
  'In the city',
  'Health',
];

// ─── Shared setup-screen building blocks (Flow series design) ────────────────

/** Back caret + Lora title, used at the top of every task setup screen. */
export function SetupHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="-ml-2.5 flex items-center gap-1">
      <button
        onClick={onBack}
        aria-label="Back to Tasks"
        className="rounded-lg p-2.5 text-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.25} />
      </button>
      <h1 className="font-heading text-2xl font-semibold leading-tight tracking-[-0.015em] text-foreground">{title}</h1>
    </div>
  );
}

/** Small uppercase section label ("LEVEL", "TOPIC"). */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">{children}</p>
  );
}

/** Segmented A1 / A2 / B1 control on a track background. */
export function LevelSegmented({ level, onChange }: { level: Level; onChange: (l: Level) => void }) {
  return (
    <div role="radiogroup" aria-label="Level" className="grid grid-cols-3 gap-1 rounded-xl bg-track p-1">
      {LEVELS.map(l => {
        const on = level === l;
        return (
          <button
            key={l}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(l)}
            className={`grid h-10 place-items-center rounded-[9px] text-[15px] transition-colors ${
              on
                ? 'bg-card font-bold text-accent-foreground shadow-[0_1px_3px_hsl(var(--foreground)/0.15)]'
                : 'font-medium text-muted-foreground hover:text-foreground'
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

/** Pill chip; selected chips use the UK-red highlight with a check mark. */
export function TopicChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm transition-colors ${
        selected
          ? 'border-[1.5px] border-highlight bg-highlight-soft font-semibold text-highlight-ink'
          : 'border border-border bg-card text-foreground hover:border-primary/40'
      }`}
    >
      {selected && <Check className="h-[13px] w-[13px]" strokeWidth={3} />}
      {label}
    </button>
  );
}

/**
 * Bottom action bar of a setup screen: full-width primary button with a caption.
 * Sticks just above the app's bottom navigation while the setup content scrolls
 * (on laptops, where there is no bottom navigation, to the bottom of the window).
 */
export function SetupFooter({ label, caption, onClick, disabled, busy }: {
  label: ReactNode;
  caption?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  busy?: boolean;
}) {
  return (
    <div className="sticky bottom-[calc(3.375rem+max(1rem,env(safe-area-inset-bottom)))] z-10 lg:bottom-0 -mx-5 mt-2 flex flex-col gap-2 border-t border-border bg-background px-5 pb-3.5 pt-3">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-95 disabled:opacity-50"
      >
        {busy ? <span className="animate-pulse">{label}</span> : <>{label}<ArrowRight className="h-4 w-4" strokeWidth={2.5} /></>}
      </button>
      {caption && <p className="text-center text-xs text-muted-foreground">{caption}</p>}
    </div>
  );
}

// ─── Level + theme filter ────────────────────────────────────────────────────

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
    <div className="flex flex-col gap-[22px]">
      {/* Level */}
      <div className="flex flex-col gap-2">
        <SectionLabel>Level</SectionLabel>
        <LevelSegmented level={level} onChange={onLevelChange} />
      </div>

      {/* Theme */}
      {!hideTheme && (
        <div className="flex flex-col gap-2.5">
          <SectionLabel>Theme</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_THEMES.map(t => (
              <TopicChip key={t} label={t} selected={!customMode && theme === t} onClick={() => pickSuggested(t)} />
            ))}
            <TopicChip label="Own theme" selected={customMode} onClick={activateCustom} />
          </div>

          {customMode && (
            <div className="flex gap-2 animate-fade-in">
              <label className="flex h-[46px] flex-1 items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 focus-within:border-primary">
                <Pencil className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && applyCustom()}
                  placeholder="e.g. Shopping for clothes…"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </label>
              <button
                onClick={applyCustom}
                disabled={!draft.trim()}
                className="rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
              >
                Use
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
