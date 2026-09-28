# Architecture overview

Current state (Phase 1). A statically generated Next.js site; no server-side
state.

## Stack

Next.js (App Router), React Server Components by default, TypeScript (strict),
Tailwind CSS, pnpm. Content will be Markdown/MDX files in the repository.
No database, authentication, or external services.

## Layout

```text
src/
├── app/       routes, root layout, robots.ts, sitemap.ts
├── lib/       site config/URL helpers, i18n locale helpers
└── types/     domain types (content model)
e2e/           Playwright tests
```

Directories are created only when code exists for them. Planned, not yet
created: `src/components/`, `src/content/{blog,projects}/`, and content loaders
under `src/lib/`.

## Boundaries

```text
content files (MDX)  ->  loaders in src/lib  ->  typed domain objects  ->  components
```

Components depend on the types in `src/types/content.ts`, never on raw files.
This lets the content source change (files, another format, a CMS) without
touching UI.

## Rendering

Pages are static. Client Components are used only for real interactivity, and
none exist yet.

## Cross-cutting

- **SEO:** root metadata in `src/app/layout.tsx`; `robots.ts`, `sitemap.ts`;
  canonical origin from `NEXT_PUBLIC_SITE_URL` via `src/lib/site.ts`.
- **Security:** baseline headers in `next.config.ts`. See
  [security](../engineering/security.md).
- **i18n:** locale list in `src/lib/i18n/locales.ts`. Routing is undecided; see
  [ADR 0004](decisions/0004-i18n-strategy.md).
