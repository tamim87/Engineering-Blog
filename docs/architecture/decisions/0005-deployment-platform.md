# ADR 0005: Deployment platform

## Status

Accepted

## Context

The site needs a real production deployment ([requirement](../../product/requirements.md)):
reproducible builds, HTTPS, CDN/edge caching, no hand-run server. The owner is
currently on free tiers only. The site has no server-side state, database,
auth, or per-request personalization — every page is knowable at build time
per [ADR 0003](0003-content-storage-and-model.md) and
[ADR 0004](0004-i18n-strategy.md).

## Options considered

- **Vercel (Hobby):** first-party Next.js host; SSR/ISR "just work" with no
  config. Free tier is explicitly personal/non-commercial use, which this
  portfolio site qualifies for. 100 GB/month transfer, 1M function
  invocations. Preview deployments per pull request are a genuine workflow
  win for reviewing design changes before merging.
- **Cloudflare Workers, full SSR (OpenNext adapter, `@opennextjs/cloudflare`):**
  keeps Next.js SSR/ISR. Requires the Workers **Paid** plan ($5/month): the
  Free plan's 3 MiB compressed script-size limit is tight for a Next.js SSR
  bundle in practice (confirmed via current OpenNext/Cloudflare
  documentation and reports from other projects). Does not fit "free tier
  only."
- **Cloudflare Workers, static assets (`output: "export"`, no adapter):**
  Next.js builds a static `out/` directory; Cloudflare serves it directly, no
  Worker script/function on the request path for pages. Verified for this
  project (see Verification): the exported site is ~800 KB, far under the
  Free plan's 3 MiB Worker-script limit — and static assets aren't counted
  against that limit at all, since there is no Worker script serving them.
  Requests to static assets are free and unlimited on every plan, not just
  metered generously.
- **Netlify (Free):** comparable to Vercel; not evaluated in depth since
  Vercel already covers that shape of option and the owner asked about
  Cloudflare specifically.

## Decision

**Cloudflare Workers, static assets — Next.js built with `output: "export"`.**

This matches what the site actually is: no database, no auth, no per-request
logic (all explicitly out of scope per the project's product requirements).
A static export gives a real production deployment with none of the
free-tier ceilings that come with SSR hosting: static-asset requests are free
and unlimited, whereas both the SSR options meter or gate on function
invocations or Worker bundle size.

## Verification

Built the current placeholder site with `output: "export"` and served the
resulting `out/` directory with `wrangler dev` (Cloudflare's actual Workers
runtime, not a generic static server):

- Output size: 788 KB uncompressed, well under the 3 MiB Free plan limit that
  applies to Worker *scripts* (irrelevant here, since static assets aren't a
  Worker script).
- `/` → 302 to `/en` (via a `public/_redirects` rule).
- `/en` → 200, correct `<html lang>`, correct canonical URL.
- `/bn` and any unmatched path → 404 (Bengali is not in `ENABLED_LOCALES` yet;
  see ADR 0004).
- `/robots.txt` and `/sitemap.xml` served correctly as static files.
- Baseline security headers present on every response (via
  `public/_headers`).

## Consequences

- **Lost, by using `output: "export"`:** Route Handlers that read the
  request, Server Actions, ISR, on-demand revalidation, and the default
  `next/image` loader (optimization is disabled; `images.unoptimized = true`
  is required). None of these are used or currently planned.
- `next.config.ts`'s `headers()` function is unsupported (and errors) under
  static export. Security headers moved to `public/_headers`, a Cloudflare
  convention, copied into `out/` by the Next.js build like any other public
  asset.
- Redirects (`/` → `/en`) similarly move from `next.config.ts`/middleware
  into `public/_redirects`, also a Cloudflare convention.
- Deploys via GitHub Actions on push to `main`, running `pnpm build` then
  `wrangler deploy` (see `docs/architecture/deployment.md`).
- **Upgrade path if real SSR is ever needed:** switch to the OpenNext
  Cloudflare adapter and the Workers Paid plan ($5/month), on the same
  platform, without moving providers. This is a config change (add the
  adapter, remove `output: "export"`), not a migration.
- **Custom domain:** free on Cloudflare (DNS + HTTPS), no separate step or
  cost when the owner has one.
