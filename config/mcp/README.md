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

Run in two terminals:

```bash
npm run mcp:tunnel:gateway
npm run mcp:tunnel:proxy
npm run mcp:tunnel:doctor
npm run mcp:tunnel:run
```

The gateway command starts Docker MCP on `127.0.0.1:8812`; the proxy listens on `127.0.0.1:8813` and injects the local Docker MCP bearer header; `tunnel-client` forwards the OpenAI tunnel to the proxy URL.

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
