# ADR 0003: Content storage and model

## Status

Accepted

## Context

The blog and case studies are core to the site. Content must be separate from
presentation, portable, and compatible with English/Bengali support
([ADR 0004](0004-i18n-strategy.md)).

## Decision

- Store content as Markdown/MDX files in the repository, with front matter
  metadata. No CMS and no database.
- Define typed domain models in `src/types/content.ts` (`BlogPostMeta`,
  `ProjectMeta`). Components consume these types through loaders in `src/lib/`,
  never raw files.
- Represent series through metadata (`series`, `seriesOrder`), not directories.
- Include `locale` and `translationKey` in every content item from the start.
- **File layout:** `src/content/blog/<slug>.<locale>.mdx` and
  `src/content/projects/<slug>.<locale>.mdx`, e.g.
  `src/content/blog/spring-transactions.en.mdx` and
  `.../spring-transactions.bn.mdx`. Translations of one article sit next to
  each other, so it's visible at a glance which slugs are and aren't
  translated. `slug` and `locale` are both parsed from the file name by the
  loader; neither is duplicated in front matter. `translationKey` in front
  matter still links translations explicitly, since it does not have to equal
  the (locale-independent) slug.
- **MDX pipeline:** `gray-matter` (front matter parsing) + `zod` (schema
  validation, mirroring `src/types/content.ts`) + `next-mdx-remote/rsc`
  (compiles and renders MDX in a Server Component). Wired by hand in
  `src/lib/blog/` and `src/lib/projects/` (a `getAllPosts()` /
  `getPostBySlug()` pair per content type): read the directory, parse each
  file, validate front matter with zod, throw a build-time error naming the
  file on a validation failure, and filter out `draft: true` posts outside
  development.

## Alternatives considered

- **Headless CMS:** editing UI, but adds a service, cost and a dependency for
  one author.
- **Database:** unnecessary for read-mostly content by one author.
- **Hard-coded TSX pages:** mixes content into presentation and blocks reuse.
- **Content-collection build tools (Velite, Content Collections):** generate
  typed collections from a schema in one step, removing most loader
  boilerplate. Not chosen: their official Next.js integration hooks into the
  webpack build (`VeliteWebpackPlugin` and equivalent), which this project
  does not use — Next.js 16 defaults to Turbopack, and neither tool ships a
  Turbopack-native integration as of this decision. Using one would mean
  either forcing the project onto webpack (Next.js 16's non-default bundler)
  or wiring an unofficial workaround. Revisit if the volume of
  content or the number of collections grows enough that the manual loaders
  become the maintenance burden.
- **Contentlayer / Contentlayer2:** the original is unmaintained (no commits
  since 2024); the community fork carries a large, partly stale dependency
  tree. Not chosen for a new project.
- **`@next/mdx`:** simplest wiring for MDX-as-pages, but has no built-in
  front-matter schema validation, which this project wants from day one for
  a typed content model.

## Consequences

- Content is versioned with code, reviewable in pull requests, and free to host.
- Publishing requires a commit/deploy.
- The loaders are project code, not a dependency's generated output: more to
  write once, but nothing to debug through a bundler plugin, and no
  Turbopack/webpack coupling.
- `gray-matter`, `zod` and `next-mdx-remote` are all small, independently
  maintained packages with no shared release cadence to track.
- Adding a field to `BlogPostMeta`/`ProjectMeta` means updating the type, the
  matching zod schema, and any content files missing it — three places, kept
  deliberately close together in `src/lib/blog/` and `src/lib/projects/`.
