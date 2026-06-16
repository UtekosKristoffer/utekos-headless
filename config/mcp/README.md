# Docker AI MCP Workspace

## Status

- Docker Desktop Engine: `29.5.3`
- Docker MCP Toolkit CLI: `0.42.2`
- Devcontainer base: Node 24, Debian Bookworm
- Production deployment target: Vercel
- Next.js custom adapter: not used

## Commands

```bash
npm run mcp:build
npm run mcp:doctor
npm run mcp:docker:doctor
npm run mcp:chatgpt:apply
npm run mcp:chatgpt:doctor
npm run mcp:tunnel:check
```

## Docker MCP Profiles

| Profile | Purpose | Required State |
|---|---|---|
| `utekos_core_safe` | Safe docs, GitHub, code inspection, fetch, Context7 | Required |
| `utekos_observability_live` | Sentry and observability tools | Required for live incident work |
| `utekos_commerce_live` | Reserved for commerce catalog servers | Empty in Docker catalog V1 |
| `utekos_research_browser` | Browser, Playwright, Firecrawl, Next DevTools | Optional live-research profile |

## Client Wiring

- Codex host stdio: user config references `docker mcp gateway run --profile utekos_core_safe`.
- Codex Docker Sandbox HTTP: project config uses `MCP_DOCKER_CORE_HTTP` at `http://host.docker.internal:8812/mcp`.
- Gordon: mapped to `utekos_core_safe` in Docker MCP profile config.
- Cursor, Claude Desktop, Gemini, and VS Code can use generated `mcp.json` / `.vscode/mcp.json` or Docker Desktop client wiring.

## Sandbox Gateway

Start only when using Docker Sandbox Codex:

```bash
MCP_GATEWAY_AUTH_TOKEN=<local-runtime-token> \
  docker mcp gateway run --profile utekos_core_safe --transport streaming --port 8812
```

The same `MCP_GATEWAY_AUTH_TOKEN` must be available to Codex inside the sandbox session.

## OpenAI Secure MCP Tunnel

Use this when ChatGPT, Codex, the Responses API, or another supported OpenAI surface must reach the local Docker MCP gateway without exposing it publicly.

## ChatGPT Agent Insight Fabric

Declarative profile source:

```bash
config/mcp/chatgpt-profiles.json
```

Apply Docker MCP profiles:

```bash
npm run mcp:chatgpt:apply
npm run mcp:chatgpt:doctor
```

The applier manages only profiles whose id starts with `utekos_chatgpt_`. It also disables Docker MCP `dynamic-tools`, because those tools expose profile mutation and execution tools in otherwise safe ChatGPT profiles.

| Profile | ChatGPT App | Mode |
|---|---|---|
| `utekos_chatgpt_insight` | Utekos Local Insight | Default read/verify; no write tools |
| `utekos_chatgpt_browser` | Utekos Browser Workbench | Runtime, DOM, console, network, screenshot |
| `utekos_chatgpt_live_ops` | Utekos Live Ops | Explicit write mode only |
| `utekos_chatgpt_commerce_tracking` | Utekos Commerce/Tracking | Live diagnostics where Docker catalog supports it |

Run target-specific tunnel profiles:

```bash
npm run mcp:insight:doctor
npm run mcp:tunnel:init:insight
npm run mcp:tunnel:doctor:insight
npm run mcp:tunnel:run:insight
npm run mcp:tunnel:stop:insight
```

Other targets: `browser`, `live-ops`, `commerce-tracking`.

`utekos_chatgpt_insight` uses the local canonical server:

```bash
node scripts/mcp/utekos-insight-server.mjs
```

This is intentional. ChatGPT should see six schema-bound read-only tools:

- `insight_bootstrap`
- `read_context_bundle`
- `tool_inventory`
- `safe_git_overview`
- `project_locate`
- `read_project_files`

It should not call Docker MCP admin tools such as `mcp-find`, `mcp-add`, `mcp-activate-profile`, or `mcp-exec` in the default insight app. If ChatGPT still sees those tools after this change, recreate or reconnect the ChatGPT app while `npm run mcp:tunnel:run:insight` is running so the connector discovers the new tool surface.

Do not ask ChatGPT to activate `utekos_chatgpt_insight` with `mcp-activate-profile`. The profile is already selected by the tunnel-client command. If ChatGPT tries `mcp-activate-profile` or `mcp-find`, it is using stale connector metadata from an older Docker MCP surface. Restarting `tunnel-client` is not enough by itself; refresh or recreate the ChatGPT app so tool discovery runs against `node scripts/mcp/utekos-insight-server.mjs`.

`utekos_chatgpt_browser` uses the local canonical Browser Workbench server:

```bash
npm run mcp:browser:doctor
npm run mcp:tunnel:init:browser
npm run mcp:tunnel:doctor:browser
npm run mcp:tunnel:run:browser
npm run mcp:tunnel:stop:browser
```

It exposes schema-bound tools for navigation, viewport resize, ARIA/DOM snapshot, console logs, network request summaries, screenshot artifacts, axe-core accessibility audit, local browser performance timing, and Chrome DevTools Protocol metrics. Screenshot artifacts are written under `.agent-artifacts/browser/`.

Known V1 gap: Docker MCP catalog currently does not provide the repo's direct Shopify, Merchant, GA4, GTM, Meta, Microsoft, PostHog, or Vercel servers as Docker profile entries. Use native ChatGPT connectors, generated direct MCP clients, or a future Utekos bridge server for those live-provider surfaces. External Google PageSpeed remains public-URL oriented; localhost performance verification is handled by `browser_performance_audit`.

`utekos_chatgpt_commerce_tracking` uses the local canonical Commerce/Tracking server:

```bash
npm run mcp:commerce-tracking:doctor
npm run mcp:tunnel:init:commerce-tracking
npm run mcp:tunnel:doctor:commerce-tracking
npm run mcp:tunnel:run:commerce-tracking
npm run mcp:tunnel:stop:commerce-tracking
```

It exposes schema-bound, read-only tools for provider credential readiness, provider access remediation, Shopify Admin catalog probes, Shopify Storefront product/variant/SKU probes, GA4 event-status reads, Merchant Center status reads, PostHog HogQL event reads, Sentry issue reads, Vercel deployment reads, public sGTM/GTM endpoint reads, authenticated GTM API workspace reads, Meta Dataset Quality reads, public Microsoft UET endpoint reads, tracking architecture inventory, canonical event contracts, and local docs/source routing. It never returns secret values and does not mutate Shopify, GTM, ads platforms, Vercel, Supabase, PostHog, or Sentry.

Current verified provider status:

- Shopify Admin catalog probe: live query OK.
- Shopify Storefront probe: live query OK.
- Public sGTM/GTM endpoint probe: live endpoint checks OK for `healthz`, `gtm.js`, `ns.html`, and canonical Google tag destination.
- Public Microsoft UET endpoint probe: live endpoint checks OK for `bat.js` and configured action loader.
- Provider access remediation report: implemented and read-only; use it after `provider_env_readiness` for exact provider-by-provider fix steps.
- GA4 probe: implemented, currently fails closed with service-account/property permission error.
- Merchant Center probe: implemented, currently returns structured partial API/access failure.
- PostHog probe: implemented, currently requires `POSTHOG_PROJECT_ID` plus `POSTHOG_PERSONAL_API_KEY` or `POSTHOG_CUSTOM_API_KEY`.
- Sentry probe: implemented, currently returns permission/scope failure for the configured token.
- Vercel probe: implemented, currently requires `VERCEL_TOKEN` and `VERCEL_PROJECT_ID`.
- Meta Dataset Quality probe: implemented, currently returns `Malformed access token` for the configured token.
- Authenticated GTM API workspace probe: implemented, currently requires `GTM_ACCESS_TOKEN` or `GOOGLE_TAG_MANAGER_ACCESS_TOKEN` plus numeric `GTM_ACCOUNT_ID` and `GTM_CONTAINER_ID`.

Local setup:

```bash
npm run mcp:tunnel:bootstrap-env
```

Then fill `.env.tunnel.local`:

- `CONTROL_PLANE_TUNNEL_ID`: from OpenAI Platform tunnel settings.
- `CONTROL_PLANE_API_KEY`: runtime API key with Tunnels Read + Use.
- `MCP_GATEWAY_AUTH_TOKEN`: generated locally by `bootstrap-env`; keep it private.

Initialize the tunnel-client profile after `.env.tunnel.local` is filled:

```bash
npm run mcp:tunnel:init
```

Run the insight tunnel:

```bash
npm run mcp:tunnel:run:insight
```

The insight, browser, and commerce-tracking tunnel profiles use stdio and let `tunnel-client` start local Utekos canonical MCP servers directly. The live-ops target still uses Docker MCP gateway profiles unless replaced by a future Utekos bridge server. The older HTTP/proxy path is still available for debugging, but it is not the recommended ChatGPT connector path.

For local development, run `tunnel-client` on the host beside Docker Desktop. Moving it into Docker is only useful for a long-lived deployment where a container can reliably reach the private MCP server and store the runtime key outside the image.

## Secret Rules

- Do not commit `mcp.json`, `.vscode/mcp.json`, `.cursor/mcp.json`, `.env.mcp.local`, `.env.local`, or `src/api/lib/cloud-credentials/`.
- Do not commit `.env.tunnel.local` or OpenAI runtime/admin API keys.
- Do not use `docker mcp client ls` in ordinary logs; it can expose client config details.
- Generated MCP stdio servers with secret placeholders run through `scripts/mcp/run-server.mjs`, which resolves local env at runtime.
- `npm run mcp:doctor` fails if generated MCP configs contain known inline secret values.
- See `docs/local-secrets.md` for credential layering.

## Remaining Manual Gates

- Rotate any API tokens that were exposed in previous local terminal/client output.
- Firecrawl key has been rotated and set in Docker MCP secret storage.
- If Firecrawl is rotated again, set the new key:

```bash
docker mcp secret set firecrawl.api_key
```

- Fill or intentionally leave empty `GTM_CLIENT_SECRET`; `npm run mcp:doctor` reports it as an optional warning.

## Verification Notes

- `npm run mcp:docker:doctor` should pass with only the sandbox gateway warning when port `8812` is intentionally stopped.
- `utekos_commerce_live` currently reports internal gateway tools only because Docker's catalog does not provide the required Shopify/Merchant/GA/GTM/Meta split used by this repo.
