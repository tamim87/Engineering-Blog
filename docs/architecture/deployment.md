# Deployment

## Current

Not deployed. No platform has been selected.

## Planned

```text
Git (main)  ->  GitHub Actions CI  ->  build/test  ->  managed platform deploy
```

- A simple managed platform, not a hand-run server: no SSH-and-run, no Nginx,
  Kubernetes or custom load balancer.
- The site is static, so CDN/edge caching applies naturally.
- Builds reproducible from the lockfile (`pnpm install --frozen-lockfile`,
  Node version in `.nvmrc`, pnpm pinned by `packageManager`).
- Deployment history and rollback come from the platform (redeploy or promote a
  previous build). Confirm this when the platform is chosen.
- HTTPS is terminated by the platform.
- `NEXT_PUBLIC_SITE_URL` must be set per environment.

## Required decision

Choose the platform and record it as an ADR. Evaluate at least: Vercel
(first-party Next.js host), Cloudflare, Netlify. Criteria: Next.js support
level, preview deployments, rollback, cost at low traffic, custom domain/HTTPS,
lock-in.

## CI and merging

CI runs on pull requests and pushes to `main` (see `.github/workflows/ci.yml`).
Once the GitHub repository exists, enable branch protection on `main` requiring
the `quality` and `e2e` jobs to pass before merging.
