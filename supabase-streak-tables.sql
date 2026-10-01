CREATE TABLE IF NOT EXISTS public.user_streaks (
  user_id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak     INTEGER NOT NULL DEFAULT 0,
  longest_streak     INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  freezes_available  INTEGER NOT NULL DEFAULT 0,
  freezes_used_total INTEGER NOT NULL DEFAULT 0,
  timezone           TEXT,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.activity_log (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date    DATE NOT NULL,
  PRIMARY KEY (user_id, date)
);

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['user_streaks', 'activity_log']
  LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "Users can manage their own rows" ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY "Users can manage their own rows" ON public.%I
         FOR ALL TO authenticated
         USING (auth.uid()::text = user_id::text)
         WITH CHECK (auth.uid()::text = user_id::text)', t);
  END LOOP;
END $$;

SELECT t.name AS table_name,
       to_regclass('public.' || t.name) IS NOT NULL AS exists,
       c.relrowsecurity AS rls_enabled,
       string_agg(p.policyname, ', ') AS policies
FROM unnest(ARRAY['vocabulary', 'user_stats', 'user_streaks', 'activity_log', 'practice_sessions']) AS t(name)
LEFT JOIN pg_class c ON c.oid = to_regclass('public.' || t.name)
LEFT JOIN pg_policies p ON p.schemaname = 'public' AND p.tablename = t.name
GROUP BY t.name, c.relrowsecurity
ORDER BY t.name;
