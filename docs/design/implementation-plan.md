# Initial Implementation Plan

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Motion for React
- static content files for work/case studies/writing
- Vercel deployment

## Phase 1 — Static Shell

Build the full page without scroll animation first.

Components:

- `SiteNav`
- `HeroWorld`
- `DeskReveal`
- `WorkSystem`
- `CaseStudies`
- `WritingNotes`
- `StatusPanel`
- `FooterTerminal`
- `Button`
- `WorkCard`
- `SectionHeader`

## Phase 2 — Tokens

Wire `docs/design/tailwind-v4-theme.css` into `src/app/globals.css`.

Rules:

- exact colors only
- Mercury Blue only for primary CTA / active indicators
- no extra saturated colors
- no heavy shadows
- buttons are pills

## Phase 3 — Scroll Experience

Use a sticky `HeroExperience` section around `220vh` high.

Map scroll progress:

```txt
0.00 → wide mountain world, hero copy visible
0.35 → camera starts zooming toward desk
0.55 → hero copy fades, desk/laptop identity appears
0.80 → system UI becomes visible
1.00 → transition into proof-of-work content
```

## Phase 4 — Content System

Move content into data files:

- `src/data/work.ts`
- `src/data/case-studies.ts`
- `src/data/notes.ts`

## Phase 5 — Polish

- responsive mobile fallback
- reduced-motion support
- metadata / SEO
- keyboard focus states
- optimized hero image
- Vercel deploy

## Do Not Build Yet

- CMS
- 3D scene
- complex page transitions
- fake terminal gimmicks everywhere
- over-animated cards
