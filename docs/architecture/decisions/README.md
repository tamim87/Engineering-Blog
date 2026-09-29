# Architecture Decision Records

ADRs record important architectural choices. Do not write ADRs for trivial
implementation details.

## Template

```markdown
# ADR XXXX: Title

## Status

Accepted / Superseded / Proposed

## Context

Why the decision was necessary.

## Decision

What we chose.

## Alternatives considered

What else we considered.

## Consequences

Benefits, costs, and trade-offs.
```

Number sequentially. Never rewrite history: supersede an ADR with a new one.

## Index

| ADR                                        | Title                       | Status   |
| ------------------------------------------ | --------------------------- | -------- |
| [0001](0001-nextjs.md)                     | Use Next.js                 | Accepted |
| [0002](0002-app-router.md)                 | Use the App Router          | Accepted |
| [0003](0003-content-storage-and-model.md)  | Content storage and model   | Accepted (MDX tooling open) |
| [0004](0004-i18n-strategy.md)              | Internationalization strategy | Accepted |
| [0005](0005-deployment-platform.md)        | Deployment platform         | Accepted |

Deployment platform ADR: to be written when a platform is selected.
