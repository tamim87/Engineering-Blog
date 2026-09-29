# Deployment

## Platform

Cloudflare Workers, serving the Next.js static export (`output: "export"`) as
Workers static assets. No Worker script runs on the request path for pages;
Cloudflare serves `out/` directly. See
[ADR 0005](decisions/0005-deployment-platform.md) for why, including the
verification that was run before choosing it.

```text
Git (main)  ->  GitHub Actions (deploy.yml)  ->  pnpm build (out/)  ->  wrangler deploy
```

CI (`ci.yml`) and deploy (`deploy.yml`) are separate workflows. CI runs on
every pull request; deploy only runs on `main` (and can be triggered by hand)
and needs the Cloudflare secrets below configured first.

## One-time setup

1. **Create the Cloudflare Worker project.** In the Cloudflare dashboard,
   under Workers & Pages, create a Worker named to match `wrangler.jsonc`
   (`name`), or run `pnpm exec wrangler deploy` once from a machine logged in
   via `wrangler login` to create it from this config.
2. **Custom domain (optional).** Add it under the Worker's Domains &nbsp;Routes
   settings; Cloudflare issues the certificate. Free.
3. **GitHub repository settings → Secrets and variables → Actions:**
   - Secret `CLOUDFLARE_API_TOKEN`: a Cloudflare API token scoped to
     "Edit Cloudflare Workers" for this account. Create it under My Profile →
     API Tokens.
   - Secret `CLOUDFLARE_ACCOUNT_ID`: found on the Cloudflare dashboard's
     right-hand sidebar, or via `wrangler whoami`.
   - Variable `NEXT_PUBLIC_SITE_URL`: the production URL (custom domain, or
     the `*.workers.dev` URL Cloudflare assigns) — used for canonical URLs,
     the sitemap and `robots.txt`.
   - (Optional) a GitHub **environment** named `production` with the same
     secrets/variables, if you want a required-reviewer gate on deploys;
     `deploy.yml` already targets an environment named `production`.

## Manual deploy

From a machine authenticated with `wrangler login`:

```bash
pnpm deploy   # pnpm build && wrangler deploy
```

`pnpm preview` builds and serves `out/` locally with `wrangler dev`, the
closest local equivalent to the deployed environment (used by `pnpm
test:e2e` in CI; see `playwright.config.ts`).

## Rollback

Cloudflare keeps prior Worker versions. Roll back from the dashboard
(Workers & Pages → the Worker → Deployments) or with
`wrangler rollback [deployment-id]`. No database migrations exist to worry
about, since there is no database.

## Constraints from static export

`output: "export"` means no Route Handlers that read the request, no Server
Actions, no ISR, and no `next/image` runtime optimization
(`images.unoptimized = true`). `next.config.ts` cannot use `headers()` or
`redirects()` under static export; the equivalents live in `public/_headers`
and `public/_redirects` (Cloudflare's static-assets conventions), which the
Next.js build copies into `out/` like any other file in `public/`.

## Upgrade path

If the site ever needs real SSR (a contact-form handler, on-demand OG
images, etc.), switch to the OpenNext Cloudflare adapter
(`@opennextjs/cloudflare`) and the Workers **Paid** plan ($5/month), on the
same Cloudflare account — this is a config and cost change, not a provider
migration. Revisit ADR 0005 if/when that happens.

## CI and merging

CI (`ci.yml`) runs on pull requests and pushes to `main`. Branch protection
on `main` requires the `quality` and `e2e` jobs to pass before merging.
