# ADR 0002: Use the App Router

## Status

Accepted

## Context

Next.js offers the Pages Router and the App Router. New Next.js features are
built around the App Router.

## Decision

Use the App Router with Server Components by default. Add `"use client"` only
where interactivity requires it.

## Alternatives considered

- **Pages Router:** stable, but the older model, with more client JavaScript by
  default and no Server Components.

## Consequences

- Less client JavaScript; content pages render on the server or at build time.
- Layouts, metadata and file-based conventions (`robots.ts`, `sitemap.ts`) fit
  the site's needs.
- Client/server boundaries must be managed deliberately.
