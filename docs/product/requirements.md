# Requirements

Only requirements that have been stated appear here. Do not add speculative
ones; propose them in the roadmap first.

## Functional

| Area      | Requirement                                                                 |
| --------- | --------------------------------------------------------------------------- |
| Pages     | `/`, `/about`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/resume` |
| Home      | Intro, short description, profile links, selected projects, recent writing, short about, CTA |
| About     | Detailed professional narrative; must not duplicate the resume              |
| Projects  | Engineering case studies (not screenshot cards); confidential company work may have limited detail |
| Blog      | First-class. Markdown/MDX, tags, a small set of categories, series via metadata, draft flag |
| Languages | English at launch; Bengali later, without a redesign                        |
| SEO       | Metadata, canonical URLs, Open Graph/Twitter cards, sitemap, robots, article metadata |

## Non-functional

- **Accessibility:** semantic HTML, heading hierarchy, keyboard navigation,
  visible focus, alt text, contrast, reduced-motion consideration. Automated
  checks where practical. No WCAG-compliance claim without validation.
- **Performance:** Server Components by default, minimal client JS, optimized
  images. Measured with Core Web Vitals, not arbitrary load-time targets.
- **Security:** no committed secrets, secure framework defaults, no unsafe HTML
  rendering, dependency monitoring.
- **Quality:** strict TypeScript; lint, typecheck, tests and build in CI on
  every pull request.
- **Operability:** reproducible builds, simple managed deployment, rollback
  path, error and uptime monitoring when the site is live.

## Explicit non-requirements (until a real need appears)

Database, authentication/RBAC, global state libraries, GraphQL/tRPC/ORM, CMS,
Kubernetes, load balancers, Redis, queues, multi-region infrastructure.
