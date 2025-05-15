# PROJECT\_GUIDE.md

## Table of Contents

1. Philosophy & Non-Goals
2. Repository Topology
3. Branching & Release Strategy
4. Commit Message Convention
5. Versioning & Changelogs
6. Workspace & Package Management
7. Dependency Hygiene & Security
8. TypeScript Configuration & Standards
9. Coding Standards & Style Guide
10. Testing Strategy
11. Static Analysis Gates
12. Infrastructure-as-Code
13. Observability & Telemetry
14. Performance Budgets
15. LLM Agent Usage Policy
16. Code Review Checklist
17. Common Anti-Patterns
18. Glossary & References

---

## 1 Philosophy & Non-Goals

* **Humane Velocity** — ship daily without quality regression.
* **Single Source of Truth** — monorepo hosts everything: infra, docs, code.
* **Boring Tech First** — proven tooling unless ROI > 10×.
* **LLM‑First DX** — structure enables autonomous agents to reason locally.
* **Non‑Goals**

  * Bleeding‑edge experiments in mainline.
  * Vendor lock‑in; every provider must be abstracted.
  * Monolith deployments; each app must containerize independently.

---

## 2 Repository Topology

```text
/
├─ apps/                # Executables (nextjs, nestjs, cron…)
│  ├─ web/              # Public website (Next 13 app router)
│  ├─ api/              # GraphQL + REST gateway (Nest 10)
│  └─ worker/           # Background queues (BullMQ)
├─ packages/            # Shared libs
│  ├─ ui/               # Shadcn-based component library
│  ├─ config/           # Typed runtime configs
│  ├─ eslint-config/    # Internal ESLint preset
│  └─ ts-config/        # Base tsconfigs
├─ infra/               # IaC (Pulumi + Helm charts)
│  ├─ aws/              # VPC, EKS, RDS, S3
│  └─ gcp/              # BigQuery, GKE (optional)
├─ docs/                # All design docs and this guide
│  └─ ADR/              # Architecture Decision Records
└─ .github/             # Workflow helpers & codeowners
```

* Paths aliased as `@apps/*` & `@packages/*` for TS & bundlers.

---

## 3 Branching & Release Strategy

* **Default branch:** `main` (protected).
* **Working branches:** `feat/*`, `fix/*`, `chore/*`, `docs/*`.
* **Hotfix branches:** `hotfix/*` cut from latest tag.
* **Pull‑request rules**

  * At least one human reviewer.
  * Title must follow Conventional Commits.
* **Merge method:** squash‑merge → semantic‑release tags.

---

## 4 Commit Message Convention

```
<type>(<scope>): <subject>

<body>
```

* **type**: feat | fix | chore | docs | perf | refactor | test.
* **scope**: apps‑web | pkg‑ui | infra‑aws etc.
* **subject**: ≤ 50 chars, imperative.
* Footer supports `BREAKING CHANGE:` for major bumps.

---

## 5 Versioning & Changelogs

* Managed by **semantic‑release**.
* Auto‑tags after each merge to `main`.
* Multi‑package publishing via `@semantic-release/exec` with `pnpm publish`.
* CHANGELOG.md generated per package, aggregated at root.

---

## 6 Workspace & Package Management

### pnpm‑workspaces.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

* **Immutable lockfile**; automated checks fail on mismatch.
* **Turbo cache** for build/test/lint.
* **Renovate** bot — weekly PRs, grouped by major.

---

## 7 Dependency Hygiene & Security

| Tool                    | Hook           | Enforcement                    |
| ----------------------- | -------------- | ------------------------------ |
| **pnpm audit**          | pre‑merge      | High severity ⇢ block          |
| **Snyk**                | nightly task   | CVE diff → Slack               |
| **CodeQL**              | push + nightly | OWASP, DoS patterns            |
| **npm‑deprecate‑check** | weekly         | fails automation if deprecated |

* No transitive deps in `packages/` without explicit top‑level pin.
* Approved licenses: MIT, Apache‑2.0, BSD‑2/3.

---

## 8 TypeScript Configuration & Standards

### ts‑config/base.json

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "useUnknownInCatchVariables": true,
    "moduleResolution": "NodeNext",
    "verbatimModuleSyntax": true,
    "importsNotUsedAsValues": "error",
    "incremental": true,
    "types": ["node"],
    "paths": {
      "@apps/*": ["../apps/*"],
      "@packages/*": ["../packages/*"]
    }
  }
}
```

* **Rule of Most Precision:** prefer `readonly`, `const`, `$Exact`.
* No `any`, no `null`; use `unknown` + type‑guards or result wrappers.

---

## 9 Coding Standards & Style Guide

* **eslint**: airbnb‑typescript base + custom rules.
* **prettier**: 100 cols, trailing comma, single quotes.
* **madge**: forbid circular deps.
* **depcheck**: zero unused.
* Enums banned; use union literals.
* React: functional components + hooks; no classes.
* Backend: NestJS discrete modules, 1 provider per file.
* Error handling: async fn returns `Result<T, Err>` (never throw inside domain).

---

## 10 Testing Strategy

| Layer       | Framework               | Trigger          | Coverage Target       |
| ----------- | ----------------------- | ---------------- | --------------------- |
| Unit        | vitest                  | PR               | 90 % lines            |
| Integration | vitest + docker‑compose | PR               | critical paths        |
| Contract    | pact‑js                 | nightly          | 100 % provider states |
| E2E Web     | playwright              | merge to staging | core flows            |
| Load        | k6 in worker            | weekly           | API p95 < 300 ms      |

* **Test Manifest** per package (`tests.yaml`) describes scope → LLM knows.

---

## 11 Static Analysis Gates

* **eslint** + **type‑check**: must pass before merge.
* **sonarlint** (local) → SonarCloud quality gate ≥ A.
* **CodeQL** scans for vuln patterns.
* **npq** audits install for malicious packages.
* **OpenAPI‑lint** validates `apps/api/openapi.yaml`.

---

## 12 Infrastructure‑as‑Code

* **Pulumi (TypeScript)** for cloud resources.
* **Helm** charts version‑controlled under `infra/helm/*`.
* **tfsec** & **checkov** scan generated Terraform state.
* `envs/` folder per stage: dev, staging, prod with sealed‑secret manifests.

---

## 13 Observability & Telemetry

* **Logging**: pino (pretty in dev, JSON in prod).
* **Tracing**: OpenTelemetry SDK → OTLP → Jaeger.
* **Metrics**: prom‑client exposes `/metrics`; Prometheus scrape.
* **Dashboards**: Grafana persisted JSON in `infra/grafana/`.
* Log levels: fatal > error > warn > info > debug.

---

## 14 Performance Budgets

| Target            | Threshold                    | Enforcement                    |
| ----------------- | ---------------------------- | ------------------------------ |
| Web bundle (gzip) | 200 KB main, 20 KB per chunk | `webpack‑bundle‑analyzer` gate |
| API p95           | 300 ms                       | k6 guardrail                   |
| DB query p99      | 50 ms                        | pg\_stat\_statements           |
| Cold start        | 1 s                          | lambda‑power‑tuner test        |

* Budgets stored in `/packages/config/perf‑budgets.json`.

---

## 15 LLM Agent Usage Policy

* Agents must **grep table of contents first**, then stream only relevant section.
* Max 2 000 tokens context; summarize doc chunk if larger.
* All write operations must output **unified diff**.
* Forbidden: executing unreviewed shell commands, sending PHI/PII to LLM.
* Red‑team prompts run nightly via evaluation harness; failures block merge.

---

## 16 Code Review Checklist

1. 📐 Correctness: passes tests, no race conditions.
2. 🔒 Security: no SQL injection, header leaks, secrets.
3. 🧮 Types: no `any`, sound nullability.
4. 🪢 Dependencies: no new major without ADR.
5. 🚦 Observability: logs + trace ids added.
6. 📊 Metrics: critical paths emit histogram.
7. 🔄 Errors: returns typed `Result`, surfaces in API contract.
8. 🧹 Style: eslint/prettier clean.
9. 📦 Bundle: ↓ size, tree‑shaken.
10. 📚 Docs: README / JSDoc updated.

---

## 17 Common Anti‑Patterns

* **God Modules** → split by bounded context.
* **Implicit any** → tech‑debt ticket immediate.
* **Logic in React useEffect** substituting for backend.
* **Commented‑out code** → delete.
* **Long mocks** in unit tests; prefer factories.
* **Changelog‑less hotfix**.
* **No guardrail** before critical path change.

---

## 18 Glossary & References

| Term   | Meaning                                      |                           |
| ------ | -------------------------------------------- | ------------------------- |
| ADR    | Architecture Decision Record                 |                           |
| SLO    | Service Level Objective                      |                           |
| OTLP   | OpenTelemetry Protocol                       |                           |
| p95    | 95th percentile latency                      |                           |
| Result | \`type Result\<T,E> = { ok: true; value: T } | { ok: false; error: E }\` |

### Further Reading

* *Accelerate*, Forsgren et al.
* Google SRE Book, chapters 4‑6.
* OWASP Top 10 2023.
