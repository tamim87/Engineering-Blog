# Security

## Current defaults

- No secrets in the repository. Configuration through environment variables;
  `.env*` is git-ignored except `.env.example`. `NEXT_PUBLIC_*` variables are
  public by design: never put secrets in them.
- Baseline headers (`next.config.ts`): `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
  `X-Powered-By` is disabled.
- No user input, forms, sessions, or database, so no authentication, CSRF or
  authorization code exists. Add these only when the functionality exists.
- Dependency monitoring: Dependabot (npm and GitHub Actions) and
  `pnpm audit`.
- CI workflow uses least-privilege `permissions: contents: read`.

## Rules

- Do not render unsanitized HTML. MDX content is authored by the owner (trusted);
  any future user-supplied content must be sanitized.
- Validate external input at the boundary when any is introduced.
- Give any future external service (analytics, monitoring) the least privilege
  it needs.
- HTTPS is enforced at the hosting platform; confirm HSTS when the platform is
  chosen.

## Not yet done

- **Content-Security-Policy.** Deferred until the rendering approach and
  third-party scripts are known. See the Next.js CSP guide in
  `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`.
- Branch protection on `main` (requires the GitHub repository).
- Pinning GitHub Actions to commit SHAs (currently major-version tags,
  kept current by Dependabot).
