# Utekos Agent Operating Contract

## Authority

`AGENTS.md` is the canonical contract. This document expands it into an operational checklist for ChatGPT, Codex, Cursor, Claude, Gemini, and any MCP-backed agent.

## Required First Reads

1. `AGENTS.md`
2. `PLAN.md`
3. `docs/agents.txt`
4. `docs/sitemap.md`
5. `docs/llms.txt`
6. `docs/agent-context-map.md`
7. `docs/context-bundle/index.md`

## Mandatory Response Field

Every agent response must include:

```text
Dokumentasjonsstatus: <confirmed|missing|blocked> ...
```

The field must state whether current, task-relevant documentation and runtime context are sufficient.

## Zero-Assumption Protocol

- Stop on uncertainty that affects correctness.
- Resolve missing context through local files, Context7, official docs, runtime/browser tools, or live provider tools.
- Do not implement with stale memory when modern API behavior matters.
- Do not produce confident summaries of unverified runtime state.
- If a relevant MCP/tool fails, treat the tool failure as part of the task.

## Verification Contract

Final delivery must include:

- Files changed.
- Documentation used or explicitly unavailable.
- Commands/tests run.
- Runtime/browser/provider checks run.
- Blocked checks and exact reason.
- Remaining assumptions, if any.

If verification is technically impossible, state that directly and provide the smallest concrete next step that would make it possible.

## Default Tool Mode

Default ChatGPT profile is `utekos_chatgpt_insight`: read/verify only. It must not expose write tools, provider mutation tools, deploy tools, or hidden profile-management tools.

The default ChatGPT tunnel target uses the Utekos canonical read/verify MCP surface, not raw Docker catalog administration tools. ChatGPT must not call `mcp-find`, `mcp-add`, `mcp-activate-profile`, or `mcp-exec` in this profile. The golden path is:

1. `insight_bootstrap`
2. `read_context_bundle`
3. `safe_git_overview`
4. `project_locate`
5. `read_project_files`
6. Runtime/browser/provider verification through the narrower profile that matches the task.

Each canonical tool must expose `outputSchema`, return `structuredContent`, and declare read-only annotations.

### ChatGPT Connector Schema Refresh

ChatGPT can keep a stale tool catalog after the local tunnel target changes. If ChatGPT shows or calls `mcp-find`, `mcp-add`, `mcp-activate-profile`, or `mcp-exec` in the default insight app, the connector is not using the current canonical Utekos tool surface.

Recovery path:

1. Stop any existing tunnel for the target.
2. Run `npm run mcp:insight:doctor`.
3. Run `npm run mcp:tunnel:doctor:insight`.
4. Start `npm run mcp:tunnel:run:insight` and keep it running.
5. In ChatGPT connector settings, disconnect/reconnect the app. If stale tools remain visible, delete the ChatGPT app and recreate it while the tunnel is running.
6. In the first ChatGPT message, request `insight_bootstrap`. Do not request MCP catalog/profile admin tools.

Expected default insight tool surface:

- `insight_bootstrap`
- `read_context_bundle`
- `tool_inventory`
- `safe_git_overview`
- `project_locate`
- `read_project_files`

Any other default insight tool surface is a connector discovery/cache issue until proven otherwise.

## Explicit Write Mode

Write mode is `utekos_chatgpt_live_ops`. It is not default. These actions require explicit user confirmation:

- Deploy or alias production.
- Publish GTM/Usercentrics/provider configuration.
- Merge PRs or push to protected branches.
- Delete, create, or update provider resources.
- Create ad campaigns or mutate campaign settings.
- Mutate Shopify catalog, inventory, customers, orders, or discounts.
- Alter Supabase schema, production data, RLS, functions, secrets, or cron.

## Runtime Verification Gates

UI and runtime tasks must use available gates:

- Next runtime via `nextjs_runtime` when `npm run dev` is running.
- Browser navigation and snapshot.
- Console messages.
- Network requests.
- Screenshot.
- Local browser performance timing.
- Chrome DevTools Protocol metrics.
- Mobile and desktop viewport checks.
- Lighthouse/PageSpeed/WCAG where available.

## Tracking Verification Gates

Tracking and paid-media tasks must verify:

- Consent category and service gate.
- Browser event emission.
- Server event ledger or dispatch queue.
- Provider payload shape.
- Provider response or dashboard/API evidence.
- Deduplication IDs and attribution IDs where applicable.

## Security

- Never read or print `.env*`, OAuth tokens, API keys, service-account JSON, `src/api/lib/cloud-credentials/`, or `supabase/md.md` unless the task is explicitly credential hygiene and the output redacts values.
- Generated MCP configs are outputs, not sources of truth.
- Committed MCP source of truth is declarative config and scripts only.
