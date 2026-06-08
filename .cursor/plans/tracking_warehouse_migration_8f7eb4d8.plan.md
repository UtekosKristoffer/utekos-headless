---
name: Tracking warehouse migration
overview: "Complete the tracking/observability migration onto the correct (empty) Supabase project hkoawfbomhnzupcsdggb: deploy the warehouse schema (the #1 blocker causing silent write failures), add a retry/dead-letter worker, wire Sentry, persist web vitals, harden Redis logging, remove sGTM in favor of direct GA4, consolidate PostHog, add the Meta Dataset Quality poller, complete advanced matching, stand up the Iceberg analytics FDW, and clean up dead code."
todos:
  - id: deploy-schema
    content: Apply 00..90 declarative schema to hkoawfbomhnzupcsdggb via user-supabase apply_migration; extend 00_extensions.sql with pg_cron/pg_net/wrappers; mirror into supabase/migrations/; verify via list_tables/get_advisors; regenerate db:types.
    status: completed
  - id: retry-worker
    content: Add /api/cron/retry-dispatch route (CRON_SECRET-guarded) draining ops.provider_dispatch_attempts with FOR UPDATE SKIP LOCKED, backoff, dead-letter; register cron in vercel.json.
    status: completed
  - id: sentry
    content: Install @sentry/nextjs; wire via instrumentation + withSentryConfig + global-error + captureRequestError + source maps (verify Next16/Turbopack setup via docs MCP).
    status: completed
  - id: web-vitals-persist
    content: Add web_vitals table and persist from /api/analytics/web-vitals/route.ts via the warehouse (non-blocking) instead of console-only.
    status: completed
  - id: redis-logging
    content: Make logToAppLogs non-blocking + timeout-protected (pipeline push+trim, Promise.race, fire-and-forget).
    status: completed
  - id: sgtm-removal
    content: Remove sGTM transport; make direct GA4 Measurement Protocol canonical across trackingServerEvent/handlePurchaseEvents/sendGooglePurchase/sendGA4BrowserEvent/server/sendGA4Events; delete health checker; drop sGTM env usage.
    status: completed
  - id: meta-matching
    content: Consolidate duplicated user-data normalization/hashing into one module and complete Meta advanced matching (db, ge, ct, st, zp, country, external_id).
    status: completed
  - id: meta-quality-poller
    content: Add /api/cron/meta-quality route populating marketing.meta_quality_snapshots from the Meta Dataset Quality API; register cron.
    status: pending
  - id: posthog-consolidate
    content: Consolidate PostHog to a single consent-gated init via the managed portal.utekos.no proxy; delete competing relay and ingest host variants.
    status: completed
  - id: iceberg-fdw
    content: Verify Iceberg catalog, then create wrappers analytics_bucket_fdw foreign server + analytics foreign tables (vault creds); optional pg_cron ETL from event_ledger; add to declarative SQL.
    status: pending
  - id: cleanup-docs
    content: Remove orphaned Pinterest browser-event/Snapchat code (keep wired Pinterest paths); reconcile PLAN/AGENTS.md; document two-project split and fix plugin-supabase MCP org scope.
    status: pending
  - id: verify-e2e
    content: "End-to-end: POST synthetic event, confirm ledger + dispatch rows via MCP, force a failure and confirm retry drain, confirm advisors clean."
    status: pending
isProject: false
---

# Complete the Utekos tracking & observability migration

## Context / ground truth (verified live via MCP + code)

- App already targets the correct project: `getTrackingWarehouseUrl()` in [src/lib/tracking/warehouse/getTrackingWarehouse.ts](src/lib/tracking/warehouse/getTrackingWarehouse.ts) resolves `SUPABASE_VERCEL_POSTGRES_URL_NON_POOLING` -> `hkoawfbomhnzupcsdggb` (eu-north-1).
- That project is EMPTY: no `marketing`/`ops`/`partner` schemas, 0 tables, 0 migrations. So every write in [persistAcceptedTrackingEvent.ts](src/lib/tracking/warehouse/persistAcceptedTrackingEvent.ts) / [recordProviderDispatchAttempt.ts](src/lib/tracking/warehouse/recordProviderDispatchAttempt.ts) fails and is swallowed by `Promise.allSettled` in [src/app/api/tracking-events/route.ts](src/app/api/tracking-events/route.ts). This is the critical blocker.
- Extensions live: `pg_cron`, `pg_net`, `supabase_vault`, `wrappers`. Available: `pgmq` 1.5.1, `http` 1.6, `pg_partman` 5.3.1. Vault already holds `analytics_bucket_fdw_*` (Iceberg) creds.
- MCP access: `user-supabase` is project-scoped to `hkoawfbomhnzupcsdggb` (works). `plugin-supabase-supabase` is scoped to the wrong org (Utekos Atlas / `ajnhvakqfniwkywxzkbt`) and returns permission-denied — use `user-supabase` for all live ops, and flag the plugin scope for a later fix.

## Recommended defaults (chosen; veto at confirm)

- Deploy: MCP `apply_migration` to `hkoawfbomhnzupcsdggb` AND commit identical SQL under `supabase/migrations/` to keep the declarative repo in sync.
- Retry worker: Vercel Cron (matches existing [vercel.json](vercel.json) + [src/app/api/cron/sync-catalog/route.ts](src/app/api/cron/sync-catalog/route.ts) convention, co-located in `arn1`), reusing the TS dispatch logic. `pgmq`/`pg_cron+pg_net` rejected: `ops.provider_dispatch_attempts` already has queue semantics, and a second execution plane would force reimplementing Meta SDK hashing in SQL (violates DRY/determinism).
- Sentry: full `@sentry/nextjs` (env already provisions DSN/auth/OTLP), kept alongside the first-party `/api/log` beacon.
- PostHog: consolidate to a single consent-gated init using the managed `portal.utekos.no` proxy; delete competing Vercel relay and ingest host strategies.

## Phase 1 - CRITICAL: deploy warehouse schema (unblocks everything)

- Apply, in order, the declarative files to `hkoawfbomhnzupcsdggb` via `user-supabase` `apply_migration`: [00_extensions.sql](supabase/schemas/00_extensions.sql), [10_schemas.sql](supabase/schemas/10_schemas.sql), [20_marketing.sql](supabase/schemas/20_marketing.sql), [30_partner.sql](supabase/schemas/30_partner.sql), [40_ops.sql](supabase/schemas/40_ops.sql), [90_rls.sql](supabase/schemas/90_rls.sql).
- Extend [00_extensions.sql](supabase/schemas/00_extensions.sql) to declare the infra the project actually relies on so it is reproducible: `pg_cron`, `pg_net`, `wrappers` (and `pgmq` only if Phase 2 ends up using it - default: not used).
- Mirror each applied migration into `supabase/migrations/` (repo currently has none) so `supabase db diff`/`db push` stay consistent with the declarative `schema_paths` in [supabase/config.toml](supabase/config.toml).
- Verify with MCP `list_tables` + `get_advisors(security)`; regenerate types via the `db:types` script in [package.json](package.json) (point it at the correct project).

## Phase 2 - Retry / dead-letter worker

- New route `src/app/api/cron/retry-dispatch/route.ts` mirroring the auth pattern (`Bearer ${CRON_SECRET}` or `?key=`, `maxDuration=60`) from [src/app/api/cron/sync-catalog/route.ts](src/app/api/cron/sync-catalog/route.ts).
- Logic: claim due rows from `ops.provider_dispatch_attempts` (`status in ('pending','retry_scheduled') and next_attempt_at<=now()`) with `for update skip locked`; re-dispatch via the existing `sendMeta`/`sendGoogle` deps; update status with exponential backoff (`attempt_count`, `next_attempt_at`); move to `dead_lettered` + insert `ops.dead_letter_events` after max attempts. Reuse [recordProviderDispatchAttempt.ts](src/lib/tracking/warehouse/recordProviderDispatchAttempt.ts).
- Register the cron in [vercel.json](vercel.json) (e.g. `*/2 * * * *`).

## Phase 3 - Observability hardening

- Sentry: add `@sentry/nextjs`; wrap `withBotId(nextConfig)` in [next.config.ts](next.config.ts) with `withSentryConfig`; init via [src/instrumentation.ts](src/instrumentation.ts) (`register`) + [src/instrumentation-client.ts](src/instrumentation-client.ts); route `onRequestError` to `Sentry.captureRequestError`; add `src/app/global-error.tsx`; source maps via `SENTRY_AUTH_TOKEN`. Verify the Next 16 + Turbopack setup against current docs via Context7/Supabase-adjacent docs MCP before coding.
- Web vitals: add a `web_vitals` table (declarative SQL) and make [src/app/api/analytics/web-vitals/route.ts](src/app/api/analytics/web-vitals/route.ts) insert through the warehouse (non-blocking) instead of `console.info` only; reporter [WebVitalsReporter.tsx](src/components/analytics/WebVitalsReporter.tsx) stays as-is.
- Redis logging: make [src/lib/utils/logToAppLogs.ts](src/lib/utils/logToAppLogs.ts) non-blocking + timeout-protected (pipeline `push`+`trim`, `Promise.race` timeout, fire-and-forget) so the awaited call in [src/app/api/log/route.ts](src/app/api/log/route.ts) can never stall a response.

## Phase 4 - Provider correctness

- Remove server-side GTM (sGTM), make direct GA4 Measurement Protocol the sole transport: gut sgtm branches in [trackingServerEvent.ts](src/lib/tracking/google/trackingServerEvent.ts), delete [checkGoogleTagManagerScriptHealth.ts](src/lib/tracking/google/checkGoogleTagManagerScriptHealth.ts), simplify [handlePurchaseEvents.ts](src/lib/tracking/google/handlePurchaseEvents.ts), [sendGooglePurchase.ts](src/lib/tracking/google/sendGooglePurchase.ts), [sendGA4BrowserEvent.ts](src/lib/tracking/google/sendGA4BrowserEvent.ts); make [src/lib/tracking/server/sendGA4Events.ts](src/lib/tracking/server/sendGA4Events.ts) canonical; remove `GA_SERVER_CONTAINER_URL`/`NEXT_PUBLIC_GA_SERVER_CONTAINER_URL`/`SGTM_*` usage. Keep the consent-gated client GTM web container in [ConditionalTracking.tsx](src/components/analytics/ConditionalTracking.tsx).
- Meta advanced matching + normalization: consolidate the duplicated stacks ([user-data/normalizeUserData.ts](src/lib/tracking/user-data/normalizeUserData.ts), [utils/normalizeCustomerData.ts](src/lib/tracking/utils/normalizeCustomerData.ts), [meta/normalization.ts](src/lib/tracking/meta/normalization.ts), [user-data/sanitizeAndHashAttribute.ts](src/lib/tracking/user-data/sanitizeAndHashAttribute.ts), [utils/hashAdData.ts](src/lib/tracking/utils/hashAdData.ts), [hash/\*](src/lib/tracking/hash/sha256.ts)) into one module; add missing fields (`db`, `ge`, `ct`, `st`, `zp`, `country`, `external_id`) per Meta CAPI.
- Meta Dataset Quality poller: new `src/app/api/cron/meta-quality/route.ts` (CRON-guarded) using `META_SYSTEM_USER_TOKEN`/`META_PIXEL_ID` to populate `marketing.meta_quality_snapshots`; register in [vercel.json](vercel.json).

## Phase 5 - PostHog consolidation

- Use `@posthog/next` ([PostHogProvider.tsx](src/components/providers/PostHogProvider.tsx)) without `bootstrapFlags` (static/PPR-safe), consent-gated, with `api_host` = `https://portal.utekos.no`; remove competing Vercel relay and inline snippet strategies. Keep `@flags-sdk/posthog` in [src/flags/flag.ts](src/flags/flag.ts) untouched.

## Phase 6 - Iceberg / S3-Tables analytics FDW (verification-first)

- Confirm the Iceberg catalog/tables in the `analytics-bucket` via Supabase docs MCP + `execute_sql`; create the `wrappers` foreign server `analytics_bucket_fdw` (vault creds already present) and an `analytics` schema of foreign tables over the ledger for long-term query. Optional `pg_cron` ETL to append `marketing.event_ledger` -> Iceberg. Add all of this to declarative SQL.

## Phase 7 - Cleanup & docs

- Pinterest: confirm wired purchase/lead paths ([sendPinterestPurchase.ts](src/lib/tracking/pinterest/sendPinterestPurchase.ts), [sendPinterestLead.ts](src/lib/tracking/pinterest/sendPinterestLead.ts), [PinterestTag.tsx](src/components/analytics/Pinterest/PinterestTag.tsx)) vs the orphaned browser-event path; remove only dead code. Finish the in-progress Snapchat removal (already partially deleted in git).
- Reconcile [PLAN/AGENTS.md](PLAN/AGENTS.md) with reality (it falsely claims sGTM removed); document the two-project split and the `plugin-supabase-supabase` MCP org-scope fix.

## Phase 8 - End-to-end verification

- POST a synthetic event to [src/app/api/tracking-events/route.ts](src/app/api/tracking-events/route.ts); via MCP confirm rows land in `marketing.event_ledger` + `ops.provider_dispatch_attempts`, the retry cron drains a forced failure, and `get_advisors` is clean.
