# PageSpeed MCP status

Date: 2026-05-23

## Status

PageSpeed contact was restored for this session through direct stdio execution
of `pagespeed-insights-mcp`.

The callable tool initially available in Codex was `mcp__dfs__.on_page_lighthouse`.
That tool returned `401`, so it was not usable as the PageSpeed measurement
source for this audit.

## Root cause

The local Codex MCP config had a malformed `pagespeed` entry:

- `args` repeated `pagespeed-insights-mcp`.
- `cwd` pointed at a JSON config path instead of a working directory.
- The Google API key value was stored under an env key named `env`, not
  `GOOGLE_API_KEY`.

The `pagespeed-insights-mcp` package expects `GOOGLE_API_KEY`.

## Fix applied

Updated `~/.codex/config.toml` locally:

```toml
[mcp_servers.pagespeed]
command = "npx"
args = ["-y", "pagespeed-insights-mcp"]
enabled = true

[mcp_servers.pagespeed.env]
GOOGLE_API_KEY = "[REDACTED]"
```

No secret value is recorded in this repository.

## Verification

Direct stdio MCP initialization succeeded and listed these relevant tools:

- `analyze_page_speed`
- `get_performance_summary`
- `full_report`
- `get_recommendations`
- `get_visual_analysis`
- `get_element_analysis`
- `get_network_analysis`
- `get_javascript_analysis`
- `get_image_optimization_details`
- `get_render_blocking_details`
- `get_third_party_impact`
- `get_full_audit`

Fresh MCP calls completed for:

- Mobile `get_performance_summary`
- Mobile `get_full_audit`
- Mobile render blocking, image, JavaScript, network, element, and third-party
  details
- Desktop `get_performance_summary`
- Desktop `analyze_page_speed`
- Desktop render blocking, image, JavaScript, network, element, and third-party
  details

The long-running broad calls had partial limitations:

- Mobile `analyze_page_speed` aborted after the detailed calls had already
  returned usable data.
- Desktop `get_full_audit` aborted, but desktop `analyze_page_speed` and detail
  calls returned usable data.
- `tool_search` did not hot-reload the new `pagespeed` namespace inside the
  current Codex session. The fixed config should be available after a new
  session or MCP reload.

## Documentation status

Updated documentation was available before interpretation:

- Context7 returned Next.js `v16.2.2` docs for `cacheComponents`, `use cache`,
  `cacheLife`, `cacheTag`, and performance-related cache behavior.
- Vercel documentation search returned current docs for CDN cache headers,
  Next.js image optimization on Vercel, and Vercel image/cache behavior.

## Security notes

- No API key, token, password, or credential value is stored in the report.
- The repo working tree was already dirty before this audit; existing app-code
  changes were not reverted or modified as part of the MCP fix.
