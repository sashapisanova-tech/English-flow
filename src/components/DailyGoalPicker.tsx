import { GOAL_OPTIONS } from '@/lib/activeTime';

/** Segmented 5 / 10 / 15 / 20 min control, styled like the Light/Dark switch in Settings. */
export function DailyGoalPicker({ value, onChange }: { value: number; onChange: (minutes: number) => void }) {
  return (
    <div className="flex gap-1 rounded-xl bg-track p-1" role="radiogroup" aria-label="Daily goal">
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
  );
}
