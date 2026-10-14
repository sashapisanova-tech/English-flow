# English Flow — Status and next steps

Last updated: 2026-10-14.

A2 quality pass done (see git log "A2 quality pass"): narration joined (A2 ≈ 9–10 words per
narration sentence, B1-1 ≈ 12), key words used twice in their text, and A2 key words recycled
across modules (words never reused: A2-1 0, A2-2/3/4 3 each, down from 11–21). Read this together with CLAUDE.md.

## Where things stand (all published to GitHub `main`)

- **Content:** A1 complete, 5 modules × 8 episodes = 40 texts (`src/data/english/`).
  A2 complete: 6 modules × 8 episodes = 48 texts (A2-1 … A2-6). B1-1 *The Startup* and B1-2 *Mystery at the Hostel* written,
  self-reviewed by Claude, pass the checker).
  Missing basic words added to the lists: minute, into, better, best, end, plan, most, worse,
  worst (`a1.json`), will, should, might, must (`starter.json`).
  English A2/B1 text IDs reuse Dutch Flow IDs; `isLegacyTextProgress` drops Dutch-era
  progress on them (anything saved before 2026-10-14).
  All pass the automatic checker. Only A1-1 has been read and approved by the owner;
  A1-2 to A1-5 still need the owner's read-through (especially Russian translations
  and grammar notes). A2 (6 modules) and B1 (7 modules) are planned in
  `content/CURRICULUM.md` but not written.
- **Design:** Flow series "Union" design (navy actions, UK-red details) on all
  screens, phone and laptop (`lg:` ≥1024px). Design exports live in `design/flow-series*`;
  newer designs come through the Claude Design MCP handoff.
- **Logo:** "drop cap" navy E (`src/components/BrandLogo.tsx`); favicons in `public/`.
- **Pip the fox** (mascot): `src/components/Pip.tsx`, poses in `src/assets/mascot/`;
  celebrations (`src/components/PipCelebration.tsx`, `src/lib/pip.ts`), home line,
  empty states, login, tour (flag pose).
- **Tour:** 6-step welcome tour (`src/components/AppOnboarding.tsx`, `src/lib/tour.ts`)
  plus one-time tips (`src/lib/coachMarks.ts`, `src/components/CoachMark.tsx`).
- **Daily goal:** active-time tracker, 5/10/15/20 min goal, streak counts only when
  the goal is met, weekly chart (`src/hooks/useActiveTime.ts`, `src/lib/streakRule.ts`).
- **Expression of the day:** `src/components/DailyExpressionCard.tsx`,
  `src/lib/dailyExpression.ts` (one AI call per learner per day).
- **Translations:** tapped words use the prepared dictionary (`src/lib/dictionary.ts`,
  built from `content/wordlists`) before the AI.
- **Dutch leftovers:** removed everywhere; old Dutch-era account data is cleaned on
  load (`src/lib/legacyDutch.ts`). English Flow must never show Dutch.
- **Database:** `supabase-account-isolation.sql`, `supabase-streak-tables.sql` and
  `supabase-daily-goal.sql` have been run in the English project (`rkiivy…`).
- **Supabase auth:** email confirmation is turned off for testing. Before launch:
  turn it back on and connect an email provider (Resend/Brevo) via Auth → SMTP.

## Open items

1. Owner reviews A1-2 … A1-5 in the app; apply feedback to `content/CONTENT_GUIDE.md`.
2. Write B1, module by module: B1-3 *Burnout* next, to the B1 rules agreed on 2026-10-14
   (CURRICULUM.md, top of the B1 section: simple relative clauses and passive allowed for
   reading, narration 14–18 words, 2–3 episodes in another text type, one opinion/purpose
   question). B1-1 and B1-2 already follow them. Every B1 module should
   recycle A2-5 and A2-6 key words (they have the fewest later texts): run the content test
   and look at the "appears in N later texts" warnings. Narration target at B1: 12+ words
   per sentence, joined with connectors; no relative clauses before B1-6. The owner has no time to review
   everything: Claude reviews each text critically as the owner would (guide + checklist),
   fixes, then reports.
3. "Richer Screens" design (Claude Design, file `Richer Screens.dc.html`) not implemented yet.
4. Dutch Flow (`~/Desktop/go-dutch-flow-main`) still has the old design; port the
   redesign with Hugo the heron when the owner asks.
5. Before launch: email provider + confirmation on, PWA install + reminders (later).

## Working agreements with the owner

- Owner writes in English, sometimes briefly; explain in plain language.
- Keep costs low: prefer doing work directly over many parallel subagents.
- Visual changes: check in a real browser (headless Chrome screenshots at 390 and
  1280px) before reporting.
- Ask before pushing unless the owner said to push.
- Only one Claude session should edit the project at a time.
