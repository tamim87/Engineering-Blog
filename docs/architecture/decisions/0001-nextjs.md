# ADR 0001: Use Next.js

## Status

Accepted

## Context

The site needs static content pages, good SEO, image optimization, and room to
add server-side features later without a rewrite. The owner works in React and
TypeScript.

## Decision

Use Next.js with TypeScript, Tailwind CSS and pnpm.

## Alternatives considered

- **Astro:** purpose-built for content sites and ships less JavaScript by
  default. A strong option; not chosen because the owner specified Next.js.
- **Plain React (Vite) SPA:** weaker SEO and performance defaults for
  content.
- **Hugo / other static generators:** fast and simple, but a different stack
  and less room for interactive features.

## Consequences

- Rich ecosystem, first-class Server Components, metadata API, `sitemap`/`robots`
  conventions, image optimization.
- Framework moves quickly and this major version differs from older
  conventions; consult `node_modules/next/dist/docs/` before relying on memory.
- More runtime machinery than a pure static generator; mitigated by using
  Server Components and keeping client JavaScript minimal.
