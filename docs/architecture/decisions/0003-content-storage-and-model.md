# ADR 0003: Content storage and model

## Status

Accepted for storage and model. The MDX pipeline and file layout are still
open (see Open questions).

## Context

The blog and case studies are core to the site. Content must be separate from
presentation, portable, and compatible with later English/Bengali support.

## Decision

- Store content as Markdown/MDX files in the repository, with front matter
  metadata. No CMS and no database.
- Define typed domain models in `src/types/content.ts` (`BlogPostMeta`,
  `ProjectMeta`). Components consume these types through loaders in `src/lib/`,
  never raw files.
- Represent series through metadata (`series`, `seriesOrder`), not directories.
- Include `locale` and `translationKey` in every content item from the start.

## Alternatives considered

- **Headless CMS:** editing UI, but adds a service, cost and a dependency for
  one author.
- **Database:** unnecessary for read-mostly content by one author.
- **Hard-coded TSX pages:** mixes content into presentation and blocks reuse.

## Consequences

- Content is versioned with code, reviewable in pull requests, and free to host.
- Publishing requires a commit/deploy.
- Metadata needs validation at load time (added with the loaders).

## Open questions

1. MDX tooling: `@next/mdx`, a runtime MDX library, or a content-collection
   tool. Decide when Phase 2 starts.
2. File layout with locales, e.g. `src/content/blog/<slug>.<locale>.mdx` vs
   `src/content/blog/<locale>/<slug>.mdx`. Decide together with ADR 0004.
