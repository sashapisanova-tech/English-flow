import { Minus, Plus } from 'lucide-react';
import { GOAL_OPTIONS, MAX_GOAL_MINUTES, MIN_GOAL_MINUTES } from '@/lib/activeTime';

/**
 * Daily goal control: quick 5 / 10 / 15 / 20 min presets (styled like the Light/Dark
 * switch in Settings) plus a − / + stepper for any number of minutes.
 */
export function DailyGoalPicker({ value, onChange }: { value: number; onChange: (minutes: number) => void }) {
  const step = (delta: number) =>
    onChange(Math.min(MAX_GOAL_MINUTES, Math.max(MIN_GOAL_MINUTES, value + delta)));
  const stepButton = 'grid h-10 w-10 place-items-center rounded-[9px] bg-card text-foreground shadow-sm transition-colors hover:bg-secondary disabled:opacity-40 disabled:hover:bg-card';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 rounded-xl bg-track p-1" role="radiogroup" aria-label="Daily goal presets">
        {GOAL_OPTIONS.map(m => {
          const on = value === m;
          return (
            <button
              key={m}
              role="radio"
              aria-checked={on}
              onClick={() => onChange(m)}
              className={`flex h-10 flex-1 items-center justify-center rounded-[9px] text-sm transition-colors ${
                on
                  ? 'bg-card font-semibold text-foreground shadow-sm'
                  : 'font-medium text-muted-foreground hover:text-foreground'
              }`}
            >
              {m} min
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-track p-1">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={value <= MIN_GOAL_MINUTES}
          aria-label="One minute less"
          className={stepButton}
        >
          <Minus className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-foreground">{value}</span> min a day
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={value >= MAX_GOAL_MINUTES}
          aria-label="One minute more"
          className={stepButton}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
