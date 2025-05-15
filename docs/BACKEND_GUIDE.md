# BACKEND\_GUIDE

> \*\*Audience \*\*: Engineers, AI agents, and SREs contributing to or operating the Node 18 ESM + Express 5 + TypeScript 5 API.
> \*\*Goal \*\*: Encode every invariant—technical, operational, and organizational—so the service behaves predictably, scales safely, and can be maintained by humans *and* LLMs.

---

## Table of Contents

1. Scope & responsibilities
2. Directory / layer diagram
3. Runtime & dev tooling scripts
4. File-suffix conventions table
5. API design
6. Zod validation middleware & typed request pattern
7. Controller / service / DAO contracts
8. Global error-handling strategy
9. AuthN & AuthZ
10. Security hardening vs OWASP Top 10
11. Structured logging
12. Observability (metrics & tracing)
13. Performance & caching layer
14. PostgreSQL access via Knex
15. Messaging & async jobs
16. Testing strategy
17. Local dev stack
18. CI pipeline
19. Deployment
20. Incident response / rollback protocol
21. Appendix – boilerplate snippets

---

## 1. Scope & responsibilities

* Own all server-side business logic, persistence, and integrations.
* Expose a stable, versioned REST interface documented by OpenAPI.
* Enforce data contracts, auth, observability, and performance budgets.
* Provide DX tooling that enables shipping to prod in ≤ 15 min with confidence.
* Guarantee mean-time-to-recovery (MTTR) < 30 min and error budget < 0.1%.

---

## 2. Directory / layer diagram (route → middleware → controller → service → DAO)

```
src/
├─ routes/              # ↑ HTTP surface            (REST, health, metrics)
│   └─ *.route.ts
├─ middleware/          # ↑ cross-cutting concerns  (auth, validation, errors)
│   └─ *.mw.ts
├─ controllers/         # ↑ request orchestration   (1-file-per-resource)
│   └─ *.controller.ts
├─ services/            # ↑ business rules          (pure, unit-tested)
│   └─ *.service.ts
├─ daos/                # ↑ DB/Data access          (Knex queries, txns)
│   └─ *.dao.ts
├─ jobs/                # ↑ bullmq processors       (queues + sched)
├─ lib/                 # shared utils (pino, AppError, config)
├─ config/              # env schemas, feature flags
└─ index.ts             # app bootstrap
```

**Flow:**
`HTTP → route → (validation mw → auth guard mw) → controller → service → DAO → PostgreSQL`

---

## 3. Runtime & dev tooling scripts

| Script           | Purpose                 | Command                                 |
| ---------------- | ----------------------- | --------------------------------------- |
| **dev**          | Hot-reload TS in memory | `tsx watch --clear-screen src/index.ts` |
| **build**        | ESM + CJS bundles       | `tsup src --format esm,cjs --dts`       |
| **start**        | Run built JS            | `node dist/index.js`                    |
| **lint**         | ESLint + Prettier       | `eslint ./src --max-warnings 0`         |
| **typecheck**    | Strict TS check         | `tsc --noEmit`                          |
| **test**         | Jest suites             | `jest --runInBand`                      |
| **test\:watch**  | Jest watch              | `jest --watch`                          |
| **migrate**      | DB migrate              | `knex migrate:latest`                   |
| **seed**         | Seed data               | `knex seed:run`                         |
| **docker\:up**   | Local stack             | `docker compose up -d`                  |
| **docker\:down** | Teardown                | `docker compose down -v`                |

---

## 4. File-suffix conventions table

| Suffix           | Layer            | Example                |
| ---------------- | ---------------- | ---------------------- |
| `.route.ts`      | Route definition | `user.route.ts`        |
| `.mw.ts`         | Express MW       | `auth.mw.ts`           |
| `.controller.ts` | Controller       | `order.controller.ts`  |
| `.service.ts`    | Business logic   | `payment.service.ts`   |
| `.dao.ts`        | Data access      | `invoice.dao.ts`       |
| `.schema.ts`     | Zod schema       | `user.schema.ts`       |
| `.types.ts`      | Shared types     | `common.types.ts`      |
| `.test.ts`       | Unit / IT test   | `cart.service.test.ts` |

---

## 5. API design (REST envelope, pagination, OpenAPI)

* **Envelope**

  ```jsonc
  {
    "data": {...},
    "meta": {"requestId": "uuid", "elapsedMs": 42}
  }
  ```

  *Errors* follow RFC 7807 Problem Details.

* **Pagination**

  * Cursor-based: `/items?cursor=abc&limit=30`
  * Response: `{ data, paging: { nextCursor } }`

* **Versioning** – Header `Accept-Version: 2025-05-14` (calendar-versioning).

* **Spec** – Source of truth lives in `/openapi.yaml`; auto-generated via `express-openapi-validator` annotations + `pnpm run openapi:bundle`. CI fails if diff vs git tracked spec.

---

## 6. Zod validation middleware & typed request object pattern

```ts
// src/middleware/validate.mw.ts
import { z, ZodSchema } from 'zod';
import { AppError } from '../lib/error';

export const validate =
  (schema: ZodSchema) =>
  (req, _res, next) => {
    const result = schema.safeParse(req);
    if (!result.success) {
      return next(new AppError('ValidationFailed', 400, result.error.flatten()));
    }
    Object.assign(req, result.data); // req now typed!
    next();
  };
```

* Every route imports a `.schema.ts` describing `params`, `query`, `body`.
* Controllers reference `TypedRequest<'CreateUser'>` to avoid `any`.

---

## 7. Controller / service / DAO contracts with code samples

```ts
// routes/user.route.ts
router.post(
  '/',
  validate(CreateUserSchema),
  authGuard(['ADMIN']),
  wrap(userController.create)
);

// controllers/user.controller.ts
export const create = async (req: CreateUserRequest, res) => {
  const user = await userService.create(req.body, req.context);
  res.status(201).json({ data: user, meta: buildMeta(req) });
};

// services/user.service.ts
export const create = async (dto: CreateUserDTO, ctx: Ctx) => {
  await ensureUniqueEmail(dto.email);
  return userDao.insert(dto, ctx.tx);
};

// daos/user.dao.ts
export const insert = (dto: CreateUserDTO, trx = knex) =>
  trx('users').insert(dto).returning('*').then(([u]) => u);
```

* **Services** are pure; side-effects delegated to DAOs or queues.
* **DAOs** *never* leak SQL strings upward—only typed models.

---

## 8. Global error-handling strategy (`AppError`, error middleware)

```ts
// lib/error.ts
export class AppError extends Error {
  constructor(
    public code: string,
    public status: number = 500,
    public details?: unknown
  ) {
    super(code);
  }
}
```

```ts
// middleware/error.mw.ts
app.use((err, _req, res, _next) => {
  const isOperational = err instanceof AppError;
  const status = isOperational ? err.status : 500;
  logger.error({ err }, 'UnhandledError');
  res.status(status).json({
    error: { code: err.code ?? 'InternalError', message: err.message }
  });
});
```

* All async controllers wrapped by `wrap(fn)` that pipes to `next(err)`.
* Unhandled rejections crash only in test; in prod, report + graceful shutdown.

---

## 9. AuthN & AuthZ (JWT RS256, role guard)

* **AuthN** – Login issues JWT signed by RS256 (public key baked into image).
* **Header** `Authorization: Bearer <jwt>` required except health, metrics.
* **Rotation** – JWKS endpoint supports key rollover; cache TTL 10 min.
* **AuthZ** – Middleware `roleGuard(['ADMIN','USER'])` reads `req.user.role`.
* **Impersonation** blocked; tokens carry `sub`, `iat`, `exp`, `jti`, `scope`.

---

## 10. Security hardening vs OWASP Top 10

| Risk                | Mitigation                                     |
| ------------------- | ---------------------------------------------- |
| A01 Broken Access   | Central guard, tests for role matrix           |
| A02 Crypto Failures | `jsonwebtoken` RS256, 4096-bit keys in KMS     |
| A03 Injection       | Knex query binder, Zod escaping                |
| A04 IDOR            | Row-level checks in service layer              |
| A05 Misconfig       | Read-only FS; `NODE_ENV` check blocks dev keys |
| A06 Vulnerable libs | Renovate PRs + Snyk in CI                      |
| A07 AuthZ failures  | RBAC + contract tests (`pact`)                 |
| A08 Data leakage    | Pino redactors remove PII paths                |
| A09 SSRF            | Disable `http(s)_proxy` env; validate URLs     |
| A10 Monitor & log   | pino-http, Prom + OTEL; alert on 5xx spike     |

Additional: `helmet()`, `express-rate-limit`, `csurf`, strict CSP via CDN.

---

## 11. Structured logging with pino + correlation IDs

```ts
import pinoHttp from 'pino-http';
import { v4 as uuid } from 'uuid';

app.use(
  pinoHttp({
    genReqId: () => uuid(),
    serializers: { err: pino.stdSerializers.err }
  })
);
```

* `req.id` propagated to services, queues, and OTEL span as `trace_id`.
* Log levels: `fatal`,`error`,`warn`,`info`,`debug` (no `trace` in prod).
* Redact: `["req.headers.authorization","res.headers.set-cookie"]`.
* Retention: 30 d in Loki; 90 d cold storage in S3 Glacier Deep Archive.

---

## 12. Observability: Prometheus metrics & OpenTelemetry tracing

* **Metrics** – `/metrics` exposes default Node + custom counters

  * `http_requests_total{method,status}`
  * `job_queue_lag_seconds{name}`
* **Tracing** – `@opentelemetry/sdk-node` exports to OTLP gRPC collector.

  * Automatic instrumentation for `express`, `knex`, `bullmq`, `redis`.
  * Sampling 20 % in prod; 100 % in staging.
* Dashboards in Grafana: latency, RPS, error %, DB coils, queue depth.

---

## 13. Performance & caching layer (Redis, CDN)

* **Redis** –

  * L1: application cache (`user:{id}` TTL 300 s).
  * L2: bullmq job queue + rate-limit store.

---
