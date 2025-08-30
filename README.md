# Eversheds Sutherland (Clone) — Meaningful Code Build
- No filler data: size comes from real components, hooks, utilities, overlays, API logic, and pages.
- Header with mutually-exclusive overlays (capabilities/resources/about/careers + UK/EN).
- Hero word-by-word wipe animation (`#e35205`), exact typographic spec.
- Footer with 3 sections as specified.
- API route `/api/search` using a real fuzzy matcher in `lib/fuzzy.ts` (Levenshtein) for on-site search.

## Run
npm i
npm run dev
open http://localhost:3000 → redirects to /en
