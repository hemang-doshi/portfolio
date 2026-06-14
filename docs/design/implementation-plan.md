# Sunset-Marketplace Implementation Notes

## Architecture

- Static, server-rendered Next.js homepage.
- Typed modules for projects, engineering evidence, notes, and site identity.
- Shared primitives for buttons, eyebrows, tags, status, headings, annotations,
  work cards, and project previews.
- No runtime APIs, CMS, form backend, or client state.

## Component Map

- `SiteNav`
- `HeroExperience`
- `WorkSystem`
- `CaseStudies`
- `WritingNotes`
- `ContactBand`
- `FooterTerminal`
- `Button`
- `Eyebrow`
- `PillTag`
- `StatusBadge`
- `SectionHeader`
- `WorkCard`
- `ProjectPreview`
- `HandDrawnAnnotation`

## Verification

- `pnpm test`
- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm build`
- Browser review at desktop, tablet, and mobile widths
- Keyboard, reduced-motion, overflow, anchor, and link validation
