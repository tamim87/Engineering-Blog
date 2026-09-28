# ADR 0004: Internationalization strategy

## Status

Proposed

## Context

English at launch, Bengali later. Two separate concerns: UI strings and content
translations. The preferred future URL shape is `/en/...` and `/bn/...`.
Bengali requires font support for the Bengali script (to be verified when
designing typography).

Today only `/` exists, so changing route structure is nearly free. After
launch, moving `/about` to `/en/about` requires redirects and risks search
ranking.

## Options

A. **Locale prefix from day one:** all routes under `app/[locale]/...`,
   `/` redirects to `/en`. Matches the preferred future structure; small
   up-front routing cost; no later URL migration.

B. **Default locale unprefixed, others prefixed:** `/about` (English) and
   `/bn/about`. Cleaner English URLs; adding `/bn` later is easy, but the
   English URLs then differ from the `/en/...` shape originally preferred.

C. **No i18n routing until Bengali content exists:** simplest now, most costly
   to retrofit.

## Recommendation (needs owner decision)

Option A, decided before building the content pages in Phase 2. Content items
already carry `locale` and `translationKey`, so translations can be linked
(and `hreflang` alternates generated) without further model changes. UI
strings would start as a small typed dictionary per locale, with no i18n
library until needed.

## Consequences (if A is accepted)

- Every page lives under `[locale]`; `generateStaticParams` enumerates locales.
- Sitemap and canonical URLs include the locale; `hreflang` alternates are
  emitted only where a translation exists.
- Content file layout (ADR 0003, open question 2) is decided at the same time.
