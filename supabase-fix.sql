-- ============================================================
-- Run this entire script in your Supabase SQL Editor once.
-- It is safe to run multiple times (all statements are idempotent).
-- ============================================================

-- ── 1. Grant table-level privileges ─────────────────────────────────────────
-- Without these, every read/write from the app is silently denied.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vocabulary  TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_stats  TO anon, authenticated;

-- ── 2. Add missing columns to vocabulary ────────────────────────────────────
ALTER TABLE public.vocabulary
  ADD COLUMN IF NOT EXISTS review_interval    INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS last_review        TEXT,
  ADD COLUMN IF NOT EXISTS stability          FLOAT,
  ADD COLUMN IF NOT EXISTS difficulty         FLOAT,
  ADD COLUMN IF NOT EXISTS next_review        TEXT,
  ADD COLUMN IF NOT EXISTS fsrs_state         TEXT,
  ADD COLUMN IF NOT EXISTS times_encountered  INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS example            TEXT,
  ADD COLUMN IF NOT EXISTS plural             TEXT,
  ADD COLUMN IF NOT EXISTS due_date           TEXT,
  ADD COLUMN IF NOT EXISTS interval           INTEGER;

-- ── 3. Add missing column to user_stats ─────────────────────────────────────
ALTER TABLE public.user_stats
  ADD COLUMN IF NOT EXISTS text_progress JSONB;

-- ── 4. Enable Row Level Security ────────────────────────────────────────────
ALTER TABLE public.vocabulary  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats  ENABLE ROW LEVEL SECURITY;

-- ── 5. Create RLS policies (users can only access their own data) ────────────
DROP POLICY IF EXISTS "Users can manage their own vocabulary" ON public.vocabulary;
CREATE POLICY "Users can manage their own vocabulary"
  ON public.vocabulary FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own stats" ON public.user_stats;
CREATE POLICY "Users can manage their own stats"
  ON public.user_stats FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── 6. Ensure unique constraint for vocabulary upsert ───────────────────────
-- Required for `onConflict: 'user_id,dutch'` to work correctly.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'vocabulary_user_id_dutch_key'
      AND conrelid = 'public.vocabulary'::regclass
  ) THEN
    ALTER TABLE public.vocabulary
      ADD CONSTRAINT vocabulary_user_id_dutch_key UNIQUE (user_id, dutch);
  END IF;
END $$;
