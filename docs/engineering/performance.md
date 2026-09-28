# Performance

## Approach

- Static pages and Server Components by default; minimal client JavaScript.
- Optimize images (`next/image`) and avoid unnecessary dependencies and
  network requests.
- Use system fonts until a typeface is chosen deliberately; avoid build-time
  font fetches unless needed. Bengali will need a script-appropriate font.
- Measure with Core Web Vitals (LCP, INP, CLS), on real and lab data. No
  arbitrary "loads in N seconds" target, and no optimization based on guesses.

## Checks

- Review the client JS reported per route in `pnpm build` output when adding
  dependencies or Client Components.
- Run Lighthouse or PageSpeed on preview/production builds before launch and
  record a baseline here.

## Baseline

Not yet measured (placeholder page only).
