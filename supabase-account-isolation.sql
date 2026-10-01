-- ============================================================
-- Account isolation: every user can only see and change their own rows.
-- Run this entire script in your Supabase SQL Editor once per project.
-- It is safe to run multiple times (all statements are idempotent).
-- ============================================================

-- ── 0. Create practice_sessions if it's missing (used by src/lib/practiceSession.ts) ──
CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  task_type            TEXT NOT NULL,
  level                TEXT,
  grammar_focus        TEXT,
  easy_count           INTEGER NOT NULL DEFAULT 0,
  hard_count           INTEGER NOT NULL DEFAULT 0,
  correct_count        INTEGER NOT NULL DEFAULT 0,
  session_length       INTEGER NOT NULL DEFAULT 0,
  hard_grammar_targets TEXT[] NOT NULL DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS practice_sessions_user_created_idx
  ON public.practice_sessions (user_id, created_at DESC);

DO $$
DECLARE
  t TEXT;
  r RECORD;
BEGIN
  FOREACH t IN ARRAY ARRAY['vocabulary', 'user_stats', 'user_streaks', 'activity_log', 'practice_sessions']
  LOOP
    IF to_regclass('public.' || t) IS NULL THEN
      RAISE NOTICE 'Skipping %: table does not exist', t;
      CONTINUE;
    END IF;

    -- ── 1. Only signed-in users get table access; anonymous visitors get none ──
    EXECUTE format('REVOKE ALL ON public.%I FROM anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);

    -- ── 2. Enable Row Level Security ──
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

    -- ── 3. Drop every existing policy: permissive policies are OR-ed, so one
    --       overly broad leftover would let users see each other's rows ──
    FOR r IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t
    LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', r.policyname, t);
    END LOOP;

    -- ── 4. One policy: a row is visible/writable only by the user it belongs to ──
    EXECUTE format(
      'CREATE POLICY "Users can manage their own rows" ON public.%I
         FOR ALL TO authenticated
         USING (auth.uid()::text = user_id::text)
         WITH CHECK (auth.uid()::text = user_id::text)', t);

    -- ── 5. Every row must have an owner ──
    EXECUTE format('ALTER TABLE public.%I ALTER COLUMN user_id SET NOT NULL', t);
  END LOOP;
END $$;

-- ── Check: expect 5 rows, each with exactly one policy "Users can manage their own rows" ──
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('vocabulary', 'user_stats', 'user_streaks', 'activity_log', 'practice_sessions')
ORDER BY tablename;
