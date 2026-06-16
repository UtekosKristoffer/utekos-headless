# PROJECT UTEKOS MAIN TEAM FILE

## Operating Contract

This file is the authoritative operating contract for all agents working in this repository. Read this file first, then read `PLAN.md`, `docs/agents.txt`, `docs/sitemap.md`, `docs/llms.txt`, and the relevant local documentation before changing code or giving architectural recommendations.

Every user-facing response must include `Dokumentasjonsstatus:` and explicitly say whether the current work has enough updated documentation and runtime context to proceed. If the answer is no, stop, identify the missing source, and fetch or request it before implementation.

Zero-Assumption Protocol:

- Do not assume current APIs, framework behavior, provider requirements, tracking semantics, or deployment state.
- Use local docs, Context7, official docs, runtime tools, or provider tools before implementing or concluding.
- If a needed tool or MCP fails and is relevant to the task, fix the tool path first or mark the task blocked. Do not silently continue with a weaker context surface.
- Final delivery must list verification performed and any blocked verification. Uverified UI, tracking, provider, deployment, or data-flow changes are not acceptable deliverables.

Code and architecture rules:

- Never use `useMemo` or `useCallback`; React Compiler is enabled.
- Prefer domain-oriented files and one function/component per file when touching related code.
- Keep code clean and self-explanatory. Do not add internal narration comments unless they prevent real misunderstanding.
- Validate all external data, tool inputs, route inputs, and agent schemas with Zod or an existing stricter local contract.
- Do not hand-edit generated MCP files such as `mcp.json`, `.vscode/mcp.json`, or `.cursor/mcp.json`.

Verification gates:

- UI work requires browser/runtime verification: console, network, DOM/snapshot, screenshot, responsive viewport, and contrast/WCAG when visual or brand-critical.
- Tracking work requires real provider-oriented verification paths: consent state, dataLayer/browser event, server ledger/queue, provider response, and external dashboard/API status where credentials permit.
- Next.js, React, Vercel AI SDK, OpenAI, Shopify, Supabase, analytics, consent, and ad-platform changes require current local or official documentation.
- Production deploy, GTM publish, PR merge, provider-resource mutation, ad campaign creation, Shopify catalog mutation, and Supabase schema mutation require explicit user confirmation and must not be hidden behind a default agent profile.

Brand and business-critical posture:

- Utekos brand elements, tracking fidelity, product data, consent handling, and paid-media events are business-critical surfaces.
- Prefer fail-closed behavior over silent degradation when legal, tracking, revenue, or brand correctness is uncertain.
- Distinctive brand assets, colors, type, tone of voice, and category entry points must be checked against project sources before implementation.

### Required env for core storefront E2E

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

These are pre-provisioned in the Cloud Agent environment. Pull additional secrets with
`vercel env pull .env.local` if the project is linked.

### Production build caveat

`npm run build` fails without `SHOPIFY_ADMIN_API_TOKEN` because cron routes import `src/lib/shopify/admin.ts`
at module load. Dev mode (`npm run dev`) works with Storefront credentials only.

### Lint and tests

- Lint: `npm run lint` (ESLint; repo has pre-existing violations)
- No Jest/Playwright test suite in-repo; smoke-test via browser against `/`, `/produkter`, and
  `/produkter/[handle]`

### Optional local database

```bash
npm run db:start   # Supabase local stack
npm run db:reset   # apply migrations
```

### Usercentrics sGTM env (production)

See [src/lib/tracking/server-side-tagging.md](src/lib/tracking/server-side-tagging.md). Minimum:

- `NEXT_PUBLIC_USERCENTRICS_SGTM_ORIGIN=https://cloud.server.utekos.no`
- `NEXT_PUBLIC_GOOGLE_GTM_ID=GTM-5TWMJQFP`
- Resilient GTM script URL is defaulted in `googleTagManagerConfig.ts`; override with
  `NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL` only if regenerated in Usercentrics Admin
- `GOOGLE_BROWSER_EVENT_TRANSPORT=sgtm` (only after GTM/sGTM preview passes on utekos.no)
- `NEXT_PUBLIC_ENABLE_GTM_IN_DEV=1` for local GTM smoke only

### Local MCP and secrets

MCP servers are generated from committed templates — not hand-edited in `mcp.json` or `.vscode/settings.json`.

```bash
cp .env.mcp.example .env.mcp.local   # first-time setup
npm run mcp:build                    # writes mcp.json + .vscode/mcp.json
npm run mcp:doctor                   # validate env + credential files
```

See [docs/local-secrets.md](docs/local-secrets.md) for the full layering (`.env.local` vs `.env.mcp.local` vs
`src/api/lib/cloud-credentials/`).
