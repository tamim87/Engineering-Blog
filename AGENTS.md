# AGENTS.md

Instructions for coding agents working in this repository. Humans should read
[`docs/README.md`](docs/README.md) first.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project in one paragraph

A personal engineering website: portfolio/case studies plus an engineering
blog. Next.js (App Router), strict TypeScript, Tailwind CSS, pnpm, Markdown/MDX
content. Guiding principle: **production-ready does not mean
production-complex.** Production-grade practices, minimal infrastructure.

## Before you change anything

1. Read the relevant docs: [`docs/architecture/overview.md`](docs/architecture/overview.md),
   the ADRs in [`docs/architecture/decisions/`](docs/architecture/decisions/), and
   [`docs/content/content-model.md`](docs/content/content-model.md) for content work.
2. Inspect existing code and patterns. Reuse an existing utility, component or
   type before creating a new one. Do not add abstractions "for architecture".
3. If a change needs a new architectural decision, stop and ask. Do not decide
   it silently; record it as an ADR once agreed.

## Rules

- **Content model:** preserve it. Types live in `src/types/content.ts`. UI
  components must not read raw content files; go through loaders in `src/lib/`.
  Content is Markdown/MDX kept separate from presentation.
- **TypeScript:** strict mode. No `any`, `@ts-ignore`, or `@ts-nocheck`.
  `@ts-expect-error` only with a written reason. Keep domain types centralized;
  do not duplicate them.
- **Components:** Server Components by default. Add `"use client"` only for
  browser APIs, interactive state, event handlers, or client-only libraries,
  and keep the client boundary as small as possible. Never mark a whole page
  client-side for convenience.
- **Dependencies:** avoid new ones. Justify any addition in the PR/commit. Do
  not add a database, auth, state library, GraphQL/tRPC, or an ORM without a
  demonstrated requirement and agreement.
- **i18n:** do not make English/Bengali support harder. See
  `docs/architecture/decisions/0004-i18n-strategy.md` before touching routing
  or content loading.
- **Static export:** the site builds with `output: "export"`
  (`next.config.ts`). No Route Handlers that read the request, no Server
  Actions, no ISR, no `next/image` runtime optimization. `headers()` and
  `redirects()` in `next.config.ts` are unsupported and will fail the build;
  use `public/_headers` and `public/_redirects` instead. See
  `docs/architecture/decisions/0005-deployment-platform.md`.
- **Accessibility:** semantic HTML, heading hierarchy, keyboard access,
  visible focus, alt text, contrast. Do not claim WCAG compliance.
- **Security:** never commit secrets or `.env*` files (only `.env.example`).
  Avoid unsafe HTML rendering (`dangerouslySetInnerHTML`) unless the input is
  trusted and the reason is documented.
- **Placeholders:** never invent projects, articles, or biography. Mark
  placeholder content clearly as placeholder.

## Verify your work

Run what is relevant to the change; run all of it before finishing:

```bash
pnpm lint
pnpm typecheck
pnpm test          # unit tests (Vitest)
pnpm build         # production build
pnpm test:e2e      # Playwright; requires `pnpm exec playwright install chromium` once
```

`pnpm check` runs lint, typecheck, unit tests and build in sequence.

## Documentation

Update docs in the same change when behavior or architecture changes. Add an
ADR for important architectural choices (format in
`docs/architecture/decisions/README.md`).

## Git

- Default branch: `main`. Focused commits; no giant unrelated commits.
- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`,
  `chore:`, `build:`, `ci:`.
- Never commit `.env` files with secrets, build artifacts, `node_modules`,
  temporary files, or local IDE state.
