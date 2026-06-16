# Utekos Context Bundle

## Read First

1. `AGENTS.md`
2. `docs/agent-operating-contract.md`
3. `docs/agent-context-map.md`
4. `PLAN.md`
5. `docs/sitemap.md`

## Operating Rule

Do not write, deploy, mutate provider resources, or conclude runtime state from memory. Use the appropriate profile:

- `utekos_chatgpt_insight`: default read/verify.
- `utekos_chatgpt_insight` canonical tools: `insight_bootstrap`, `read_context_bundle`, `tool_inventory`, `connector_surface_audit`, `safe_git_overview`, `project_locate`, `read_project_files`.
- Default ChatGPT Insight must not use `mcp-find`, `mcp-add`, `mcp-activate-profile`, or `mcp-exec`; Docker dynamic tools are intentionally disabled.
- If ChatGPT sees Docker catalog tools or `OutputSchema anbefales` warnings in the default Insight app, call `connector_surface_audit`; this indicates stale connector metadata or a non-canonical app surface.
- `utekos_chatgpt_browser`: runtime/browser verification.
- `utekos_chatgpt_browser` canonical tools: `browser_bootstrap`, `browser_open`, `browser_resize`, `browser_snapshot`, `browser_console_messages`, `browser_network_requests`, `browser_network_request`, `browser_take_screenshot`, `browser_accessibility_audit`, `browser_performance_audit`, `browser_devtools_metrics`, `browser_close`.
- `utekos_chatgpt_live_ops`: explicit write mode.
- `utekos_chatgpt_commerce_tracking`: commerce/tracking diagnostics.
- `utekos_chatgpt_commerce_tracking` canonical tools (22): `commerce_tracking_bootstrap`, `provider_env_readiness`, `provider_access_remediation_report`, `shopify_admin_catalog_probe`, `shopify_storefront_product_probe`, `ga4_event_status_probe`, `merchant_center_status_probe`, `google_ads_account_access_probe`, `google_ads_campaign_performance_probe`, `google_ads_conversion_action_probe`, `google_ads_search_terms_probe`, `posthog_project_discovery_probe`, `posthog_event_status_probe`, `sentry_issue_status_probe`, `vercel_deployment_status_probe`, `gtm_sgtm_endpoint_status_probe`, `meta_dataset_quality_probe`, `microsoft_uet_endpoint_status_probe`, `gtm_api_workspace_probe`, `tracking_architecture_inventory`, `tracking_event_contract`, `commerce_tracking_docs_map`.

## Verification Baseline

- Documentation checked.
- Git status/diff checked.
- Runtime/browser checked when UI/runtime/tracking is affected.
- Provider dashboard/API checked when paid-media, commerce, or observability claims are made.
- Remaining assumptions listed.

## Critical Prohibitions

- No `useMemo` or `useCallback`.
- No unverified final delivery.
- No hidden write tools in default ChatGPT profile.
- No reading or printing local secrets.
- No production deploy or provider mutation without explicit confirmation.

## Safe Local Documentation Roots

- `docs/`
- `reference/`
- `types/`

Root files such as `AGENTS.md`, `PLAN.md`, `llms.txt`, `package.json`, and `next.config.ts` are accessed through Git/read-only repo tools in the default profile. Full filesystem root access is reserved for `utekos_chatgpt_live_ops`.
