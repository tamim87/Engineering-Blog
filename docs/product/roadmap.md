# Roadmap

## Phase 1: Foundation (current)

- [x] Next.js (App Router) + strict TypeScript + Tailwind + pnpm + ESLint
- [x] Documentation structure, `README.md`, `AGENTS.md`
- [x] Content model types and documentation
- [x] Vitest (unit) and Playwright (e2e, with axe accessibility check)
- [x] GitHub Actions CI, Dependabot
- [x] SEO foundation: metadata, `robots`, `sitemap`
- [x] Baseline security headers
- [ ] Create the GitHub repository and enable required status checks on `main`
- [x] i18n routing decided and implemented: `/[locale]/`, `/` redirects to `/en` ([ADR 0004](../architecture/decisions/0004-i18n-strategy.md))
- [x] MDX pipeline and content file layout decided ([ADR 0003](../architecture/decisions/0003-content-storage-and-model.md))
- [x] Deployment platform decided: Cloudflare Workers static assets ([ADR 0005](../architecture/decisions/0005-deployment-platform.md))
- [ ] Replace default favicon; confirm site name/description in `src/lib/site.ts`

## Phase 2: Content pipeline

Blog and project loaders, MDX rendering, blog index and article pages, RSS if
wanted, sitemap entries for content. Tests for metadata validation and routing.

## Phase 3: Core pages and design

Visual design; home, about, projects, resume. Real content only.

## Phase 4: Launch

Select deployment platform (ADR), production deployment, custom domain, error
and uptime monitoring, Core Web Vitals baseline.

## Phase 5: Bengali

UI translation and first translated content, once the i18n design is final.

## Open decisions

1. i18n routing: `/en/` prefix from day one, or unprefixed default locale.
2. MDX tooling and content file layout.
3. Deployment platform.
4. Site name, domain, canonical URL.
5. Provisional blog categories and project statuses.
