# Personal Engineering Website

A portfolio and engineering blog, built with Next.js (App Router), strict
TypeScript and Tailwind CSS. Content lives in Markdown/MDX; there is no
database or authentication.

> **Status:** Phase 1 (foundation). The site currently renders a placeholder
> homepage. See [`docs/product/roadmap.md`](docs/product/roadmap.md).

## Requirements

- Node.js 24 (see `.nvmrc`)
- pnpm, via Corepack: `corepack enable` (version pinned in `package.json`)

## Getting started

```bash
corepack enable
pnpm install
cp .env.example .env.local   # optional; see below
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command          | What it does                                           |
| ---------------- | ------------------------------------------------------ |
| `pnpm dev`       | Start the development server                           |
| `pnpm build`     | Production build                                       |
| `pnpm start`     | Serve the production build                             |
| `pnpm lint`      | ESLint                                                 |
| `pnpm typecheck` | TypeScript, no emit                                    |
| `pnpm test`      | Unit tests (Vitest)                                    |
| `pnpm test:e2e`  | End-to-end tests (Playwright); build first in CI mode  |
| `pnpm check`     | lint + typecheck + unit tests + build                  |

First-time e2e setup: `pnpm exec playwright install chromium`.

## Configuration

| Variable               | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonical URLs, sitemap, robots |

Never commit real secrets. `.env*` files are git-ignored except `.env.example`.

## Documentation

Start at [`docs/README.md`](docs/README.md). Coding agents: see
[`AGENTS.md`](AGENTS.md).

## Project layout

```text
src/app/        routes, layout, robots, sitemap
src/lib/        site config, i18n helpers (loaders are added with content)
src/types/      shared domain types (content model)
e2e/            Playwright tests
docs/           product, architecture (incl. ADRs), engineering, content
```
