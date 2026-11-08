# Portfolio

Personal proof-of-work website for Hemang Doshi.

The portfolio is an evidence-first marketplace for selected engineering work,
case-study thinking, and writing. Its visual language follows the supplied
Outseta sunset-marketplace reference: a warm gradient hero, Aubergine structural
ink, one Fuchsia conversion color, UI-led project previews, and restrained
editorial motion.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS v4
- Phosphor Icons
- Vitest

## Commands

```bash
pnpm dev
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Design Source Of Truth

- [`src/app/globals.css`](src/app/globals.css) — canonical runtime tokens
- [`docs/design/tokens.json`](docs/design/tokens.json) — structured token reference
- [`docs/design/outseta-style-reference.md`](docs/design/outseta-style-reference.md) — usage rules
- [`docs/design/experience-brief.md`](docs/design/experience-brief.md) — page narrative and content rules

The previous Mercury command-center design, cinematic mountain hero, fake
operational metrics, and placeholder links are intentionally retired.

## Deploying (Cloudflare Workers)

Live at https://hemangbuilds.com, on Cloudflare Workers through the OpenNext adapter.

```bash
pnpm install
pnpm run deploy      # opennextjs-cloudflare build && deploy
```

- The page is static. The Instagram phone loads `/api/instagram/feed`, which reads a snapshot from the `INSTAGRAM` KV namespace.
- An hourly cron (`worker.ts`) rebuilds that snapshot and rotates the Instagram token once a week, so the 60-day token never expires.
- `INSTAGRAM_ACCESS_TOKEN` is a Worker secret that only seeds the first token: `pnpm wrangler secret put INSTAGRAM_ACCESS_TOKEN`. Get a new one with `/api/instagram/connect` in local dev only if the stored token was ever revoked.
