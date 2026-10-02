-- Daily time goal + active-time tracking. Safe to run more than once.
-- Run in the English Flow project's SQL editor (rkiivy…).
--
-- activity_log.active_seconds : total active learning seconds for that local date
--                               (written by the app about every 30 s).
-- activity_log.goal_met       : true when the daily goal was reached that day (or the
--                               day was bridged by a streak freeze). The calendar / week
--                               dots show only goal_met days. A separate flag is used
--                               (instead of active_seconds >= goal) because the goal can
--                               change and freeze-bridged days have no active time.
-- user_stats.daily_goal_minutes: 5 / 10 / 15 / 20; NULL means the app default (10).
--
-- RLS policies ("Users can manage their own rows") are unchanged.

ALTER TABLE public.activity_log ADD COLUMN IF NOT EXISTS active_seconds INTEGER NOT NULL DEFAULT 0;

-- goal_met: rows that existed before this change were written under the old rule
-- ("any activity counted"), so they are marked true once, when the column is created.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'activity_log' AND column_name = 'goal_met'
  ) THEN
    ALTER TABLE public.activity_log ADD COLUMN goal_met BOOLEAN NOT NULL DEFAULT false;
    UPDATE public.activity_log SET goal_met = true;
  END IF;
END $$;

ALTER TABLE public.user_stats ADD COLUMN IF NOT EXISTS daily_goal_minutes INTEGER;

-- Check
SELECT table_name, column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND ((table_name = 'activity_log' AND column_name IN ('active_seconds', 'goal_met'))
    OR (table_name = 'user_stats'   AND column_name = 'daily_goal_minutes'))
ORDER BY table_name, column_name;
