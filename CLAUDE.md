# English Flow

App for Russian speakers learning British English, A1 → B1. React + Vite + Supabase.
Sister app: Dutch Flow (`~/Desktop/go-dutch-flow-main`), same codebase and design, teaches Dutch.

## Content

All reading content follows two files. Read both before writing or reviewing any text:
- `content/CONTENT_GUIDE.md`: how texts are written (rules, field glossary, checklist).
- `content/CURRICULUM.md`: what is written (modules, stories, grammar order).

Word lists (`content/wordlists/*.json`) define which words count as known at each
level. Texts take most of their key words from them.

New modules go in `src/data/english/` and are registered in order in
`src/data/english/index.ts`. Check them with `npx vitest run src/test/content.test.ts`
(rules in `src/lib/contentCheck.ts`).

`src/data/` still contains the Dutch content copied from Dutch Flow. It is being
replaced module by module; don't edit the Dutch files except to remove them.

## Gotchas

- Types live in `src/types/dutch.ts`; the `english` field on words holds the
  *translation* (Russian in this app).
- Two Supabase projects: this app uses `rkiivy…`, Dutch Flow uses `cuwajw…`.
  Schema changes must be run in each project's SQL editor.
- Local progress is per account (`src/lib/userStorage.ts`); new localStorage keys
  holding user progress must be added to `USER_DATA_KEYS`.

## Commands

- `npm run dev`, `npm run build`, `npm test` (vitest), `npm run lint`
