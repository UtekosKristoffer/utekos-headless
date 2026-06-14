# PROJECT UTEKOS MAIN TEAM FILE

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
