# Development guidelines

## Principles

DRY, KISS, YAGNI, and SOLID where it fits. Do not apply patterns mechanically.
Before adding a utility, hook, mapper, component or abstraction, check whether
one already exists. Keep components cohesive and keep content-processing logic
out of presentation components.

## TypeScript

Strict mode plus `noUncheckedIndexedAccess`. No `any`, `@ts-ignore`,
`@ts-nocheck` (enforced by ESLint). `@ts-expect-error` needs a written reason.
Keep domain types centralized in `src/types/`; do not duplicate them.

## Components

Server Components by default. Client Components only for browser APIs,
interactive state, event handlers, or client-only libraries, with the smallest
possible boundary.

## Directories

Create a directory only when code lives in it.

## Workflow for a substantial change

1. Understand the requirement.
2. Read the relevant docs and ADRs.
3. Inspect existing code and patterns.
4. Decide whether the architecture must change; if so, discuss and write an ADR.
5. Make the smallest appropriate change.
6. Add or update tests.
7. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`
   (`pnpm test:e2e` when behavior or routing changed).
8. Update documentation.
9. Summarize what changed and why.

## Git

Default branch `main`. Focused commits using Conventional Commits (`feat`,
`fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`). Do not commit
secrets, `.env*` (except `.env.example`), build artifacts, `node_modules`,
temporary files, or IDE state.
