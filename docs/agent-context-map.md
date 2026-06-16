# Utekos Agent Context Map

## Navigation Roots

- Contract: `AGENTS.md`
- Current plan/status: `PLAN.md`
- Local docs index: `docs/sitemap.md`
- Agent docs entry: `docs/agents.txt`
- LLM-facing docs entry: `docs/llms.txt`
- Compact bundle: `docs/context-bundle/index.md`

## Domains

### Storefront

- Framework: Next.js 16.2.7, React 19.2.7.
- Primary runtime: Vercel production, host-native local dev via `npm run dev`.
- Verification: Next runtime, Playwright/browser, console, network, screenshot, responsive viewport.
- Critical docs: `docs/app/`, `docs/nextjs/`, `docs/react/`, `reference/rsc/`.

### Commerce

- Shopify Storefront API powers product and cart flows.
- Shopify Admin API is required for cron/admin imports and production build paths that import admin modules.
- Critical checks: product handle, variant/SKU, inventory state, price/currency, GTIN/product identifiers, cache invalidation tags.
- Critical docs: `docs/shopify/`, `docs/merchant/`.

### Tracking And Consent

- Usercentrics CMP is the consent authority.
- GTM ID: `GTM-5TWMJQFP`.
- sGTM origin: `https://cloud.server.utekos.no`.
- Canonical browser events include `page_view`, `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `search`, `generate_lead`.
- Microsoft UET uses lowercase action names.
- Critical docs: `src/lib/tracking/server-side-tagging.md`, `docs/meta/`, `docs/google/`, `docs/measurement/`, `docs/consent-management/`.

### Brand

- Distinctive brand assets, color, typography, form, tone, slogans, and category entry points are implementation constraints.
- Visual changes require screenshot and contrast verification.
- Relevant skills/docs: Utekos brand skills, local brand documentation when present.

### Deployment

- Production target: Vercel.
- Do not deploy or alias production without explicit user confirmation.
- Production build may fail without `SHOPIFY_ADMIN_API_TOKEN`.
- Critical config: `vercel.json`, `next.config.ts`, Vercel environment.

### Observability

- Sentry: `@sentry/nextjs`, `@sentry/browser`, `@sentry/profiling-node`.
- PostHog and Vercel analytics are present.
- Use live tools only when credentials/profile support it.

### Local Data

- Supabase local stack is host-managed via `npm run db:start`.
- Local Postgres: `localhost:54322`.
- Studio: `localhost:54323`.
- Do not add pooler or long-lived DB clients without an explicit task.

### MCP And Agent Fabric

- Direct MCP config is generated from `config/mcp/servers.base.json`.
- Docker MCP ChatGPT profiles are declared in `config/mcp/chatgpt-profiles.json`.
- OpenAI tunnel target runner is `scripts/mcp/openai-tunnel.mjs`.
- Default ChatGPT profile is read/verify; write mode is separate.
- Default ChatGPT Insight uses `connector_surface_audit` to detect stale connector metadata, Docker catalog tool leakage, missing OutputSchema warnings, and forbidden `mcp-*` admin tool exposure.

## Known V1 Gaps

- Docker MCP catalog currently covers core docs/search/browser/repo tools.
- Browser Workbench covers local performance timing, axe/WCAG diagnostics, and Chrome DevTools Protocol metrics through canonical schema-bound tools.
- Commerce/Tracking has 22 canonical read-only tools for provider credential readiness, local architecture inventory, event contracts, docs/source routing, and provider probes.
- Commerce/Tracking has `provider_access_remediation_report` for provider-by-provider remediation of missing credentials, IAM scopes, project ids, malformed tokens, and partial API access. It returns presence/status only and never secret values.
- Shopify Admin catalog probes are implemented and currently verify live Admin API reads for shop/product/variant/inventory signals.
- Shopify Storefront product/variant/SKU probes are implemented and currently verify live Storefront API reads.
- GA4 Data API event-status probes are available when service account access permits it.
- Merchant API status probes are available when Merchant account, quota project, and service account access permit it.
- Google Ads REST/GAQL probes are implemented for accessible customer resources, campaign performance, conversion actions, and search terms when `GOOGLE_ADS_CUSTOMER_ID`, `GOOGLE_ADS_DEVELOPER_TOKEN`, and read-capable OAuth/service-account credentials permit it.
- PostHog Projects API discovery probes are implemented for read-only project lookup when `POSTHOG_ORGANIZATION_ID` and a personal/query API key are present.
- PostHog Query API event-status probes are implemented but require `POSTHOG_PROJECT_ID` and a personal/query API key.
- Sentry Issues API probes are implemented but require a token with sufficient issue read scope for the configured org/project.
- Vercel Deployments API probes are implemented but require `VERCEL_TOKEN` and `VERCEL_PROJECT_ID`.
- Public sGTM/GTM endpoint probes are implemented and currently verify `cloud.server.utekos.no` endpoints with HTTP 200.
- Authenticated GTM API workspace probes are implemented but currently require OAuth/access token and numeric account/container IDs.
- Meta Dataset Quality API probes are implemented but currently fail closed with malformed/invalid access token.
- Public Microsoft UET endpoint probes are implemented and currently verify `bat.bing.com` loader endpoints with HTTP 200.
- Full repo filesystem cannot be exposed to default ChatGPT because `.env*` and local credentials live in the repo root.
