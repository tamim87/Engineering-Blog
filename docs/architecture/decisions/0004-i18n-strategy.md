# ADR 0004: Internationalization strategy

## Status

Accepted

## Context

English at launch, Bengali later. Two separate concerns: UI strings and content
translations. The preferred future URL shape is `/en/...` and `/bn/...`.
Bengali requires font support for the Bengali script (to be verified when
designing typography).

Only `/` existed when this was decided, so changing route structure was
nearly free. After launch, moving `/about` to `/en/about` would have required
redirects and risked search ranking.

## Options considered

A. **Locale prefix from day one:** all routes under `app/[locale]/...`,
   `/` redirects to `/en`. Matches the preferred future structure; small
   up-front routing cost; no later URL migration.

B. **Default locale unprefixed, others prefixed:** `/about` (English) and
   `/bn/about`. Cleaner English URLs; adding `/bn` later is easy, but the
   English URLs would then differ from the `/en/...` shape originally
   preferred.

C. **No i18n routing until Bengali content exists:** simplest short term,
   most costly to retrofit.

## Decision

Option A. Every route lives under `app/[locale]/`, and `app/page.tsx`
redirects `/` to `/en` with a 307. `generateStaticParams` and
`dynamicParams = false` in `app/[locale]/layout.tsx` generate only enabled
locales and 404 the rest, so `/bn` returns 404 until Bengali is enabled.

Locale detection from `Accept-Language` was deliberately not implemented:
it needs request-time logic (a proxy/middleware), which is at odds with a
fully static export (see [ADR 0005](0005-deployment-platform.md)), and it
would make `/` uncacheable per-visitor. The default-locale redirect is enough
until Bengali content exists to detect toward.

Locales are split into two lists in `src/lib/i18n/locales.ts`:

- `LOCALES`: every locale the architecture knows about (`en`, `bn`).
- `ENABLED_LOCALES`: locales that are actually routed, statically generated,
  and present in the sitemap. Currently `["en"]`.

UI strings live in a small typed dictionary (`src/lib/i18n/dictionaries.ts`),
keyed by `Record<EnabledLocale, Dictionary>` so enabling a locale without a
matching dictionary is a compile error. No i18n library is used; the
dictionary is a plain object, resolved server-side.

## Consequences

- Enabling Bengali is: add `"bn"` to `ENABLED_LOCALES`, add a `bn` entry to
  the dictionary, add the first `locale: "bn"` content files. No routing or
  build changes.
- Sitemap URLs (`src/app/sitemap.ts`) are generated from `ENABLED_LOCALES`, so
  they automatically include a locale once it's enabled. `hreflang`
  alternates are added when translated content exists to link (Phase 2).
- Every page under `[locale]` needs its `params` resolved through
  `resolveLocale()` (`src/lib/i18n/route.ts`), which 404s unknown locales.
  This is one extra `await` per page/layout; accepted as the cost of static,
  typed locale handling.
- Content file layout: `src/content/{blog,projects}/<slug>.<locale>.mdx` (see
  [ADR 0003](0003-content-storage-and-model.md)), decided alongside this ADR
  as planned.
