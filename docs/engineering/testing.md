# Testing

Tests target meaningful behavior. Coverage percentages are not a goal.

## Layers

| Layer | Tool | Location | Use for |
| ----- | ---- | -------- | ------- |
| Unit | Vitest (node environment) | `src/**/*.test.ts` | Pure logic: URL helpers, locale helpers, content metadata validation and loaders |
| End-to-end | Playwright (Chromium) | `e2e/` | Routing, page rendering, navigation, robots/sitemap, accessibility smoke checks |
| Build | `pnpm build` | CI | Type errors and route generation problems |

Vitest does not support async Server Components; cover those with Playwright.
React Testing Library is not installed; add it when an interactive Client
Component needs it.

## Accessibility

`@axe-core/playwright` scans pages for automatically detectable violations.
This catches only part of what matters: it is not a WCAG compliance claim.
Manual keyboard and screen-reader checks are still required for new UI.

## Running

```bash
pnpm test                               # unit
pnpm exec playwright install chromium   # once
pnpm test:e2e                           # runs against `pnpm dev`
pnpm build && CI=1 pnpm test:e2e        # runs against the production server
```

For environments with a pre-installed browser, set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

## Planned coverage

As features land: content metadata validation, blog index/article rendering,
draft exclusion, series ordering, locale routing and translation links,
navigation.
