# English Flow — Status and next steps

Last updated: 2026-10-18.

All 144 texts are written. A2 quality pass done (see git log "A2 quality pass"), and the B1
recycling pass done on 2026-10-18: key words never reused in a later text are now A2 0 in every
module, B1-1 0, B1-2 2, B1-3 1, B1-4 0, B1-5 13, B1-6 11 (before: 24/16/31/25/33/33). B1-7 is the
last module, so its words can only come back through the flashcards. Read this together with CLAUDE.md.

## Where things stand

- **Content:** A1 complete, 5 modules × 8 episodes = 40 texts (`src/data/english/`).
  A2 complete: 6 modules × 8 episodes = 48 texts (A2-1 … A2-6). B1 complete: 7 modules × 8
  episodes = 56 texts (B1-1 *The Startup* … B1-7 *One Year Abroad*), self-reviewed by Claude.
  The course is complete: 144 texts, all passing the checker.
  Missing basic words added to the lists: minute, into, better, best, end, plan, most, worse,
  worst, wish, build (`a1.json`), will, should, might, must (`starter.json`).
  English A2/B1 text IDs reuse Dutch Flow IDs; `isLegacyTextProgress` drops Dutch-era
  progress on them (anything saved before 2026-10-14).
  All pass the automatic checker. Only A1-1 has been read and approved by the owner;
  A1-2 to A1-5 still need the owner's read-through (especially Russian translations
  and grammar notes). A2 and B1 have been reviewed by Claude only.
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
2. Optional B1 polish (soft warnings from the content test, not errors): many B1-2 … B1-7 texts
   average 10–13.9 words per narration sentence (target 14+), and several B1-5 … B1-7 texts use
   fewer than half their key words twice. Most B1 texts are at the 400-word limit, so fixes must
   rewrite, not add. When editing any text: grammar notes quote sentences from it word for word
   (keep them matching), and a key word that is not in the word lists only counts as recycled in
   its exact form (*dread*, not *dreaded*). Leftover never-reused words (mostly rare: dough,
   solar, planning permission…) can stay.
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
