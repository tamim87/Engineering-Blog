# Observability

Start with useful signals; expand when needed. Nothing is installed yet.

## Target (at launch)

| Signal | Approach | Status |
| ------ | -------- | ------ |
| Error monitoring | Sentry is a candidate; decide when there is client-side behavior worth monitoring | Not started |
| Uptime | An external uptime check on the production URL | Not started |
| Performance | Core Web Vitals from the hosting platform or a lightweight RUM tool | Not started |
| Deployment visibility | Platform deployment history, linked from CI | Depends on platform |

## Principles

- Do not add monitoring for appearance.
- Never send personal data or secrets to a monitoring service.
- Record the chosen tools and configuration here and, if significant, in an ADR.
