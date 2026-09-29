# Content model

Types live in `src/types/content.ts`. This document explains the fields and
rules. Loaders (Phase 2) validate front matter against them.

## Principles

- Content is separate from presentation. UI depends on typed objects from
  loaders, never on raw files.
- Slugs come from file names; they are not front matter fields.
- Every item has `locale` and `translationKey` from the start.

## BlogPost

| Field | Type | Notes |
| ----- | ---- | ----- |
| `title` | string | |
| `description` | string | Used for meta description and listings |
| `publishDate` | `YYYY-MM-DD` | |
| `updatedDate` | `YYYY-MM-DD`, optional | Must not precede `publishDate` |
| `tags` | string[] | Specific, lowercase kebab-case (`spring-boot`, `postgresql`) |
| `category` | enum | One broad category; provisional set: backend, frontend, database, devops, architecture, career |
| `series` | string, optional | Series name |
| `seriesOrder` | number, optional | 1-based; required when `series` is set, unique within a series |
| `draft` | boolean | Drafts are excluded from production listings, feeds and the sitemap |
| `featured` | boolean | |
| `locale` | `en` \| `bn` | |
| `translationKey` | string | Shared by translations of one article |

Do not create dozens of categories. Use tags for specifics.

## Project

| Field | Type | Notes |
| ----- | ---- | ----- |
| `title`, `description` | string | |
| `status` | enum | Provisional: active, completed, archived |
| `technologies` | string[] | |
| `links` | `{ label, url }[]` | Source, demo, etc. |
| `image` | string, optional | Path under `/public` |
| `featured` | boolean | |
| `locale`, `translationKey` | | As for blog posts |

Body content (Markdown/MDX) may cover: what it is, context, motivation,
approach, architecture, technical decisions, implementation, interesting
problems, results/current state, links. Company projects may be limited by
confidentiality; do not invent details.

## Translations

`locale` + `translationKey` link translated versions. UI translation (labels,
navigation) and content translation are separate concerns. See
[ADR 0004](../architecture/decisions/0004-i18n-strategy.md).

## File layout

`src/content/blog/<slug>.<locale>.mdx` and
`src/content/projects/<slug>.<locale>.mdx`, e.g.
`src/content/blog/spring-transactions.en.mdx`. `slug` and `locale` are parsed
from the file name; neither is repeated in front matter. See
[ADR 0003](../architecture/decisions/0003-content-storage-and-model.md) for
the full decision, including the loader approach.
