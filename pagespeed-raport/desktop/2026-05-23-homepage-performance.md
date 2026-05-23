# Desktop homepage performance

Date: 2026-05-23

## Measurement source

Fresh data was captured from `https://utekos.no` with
`pagespeed-insights-mcp` through direct stdio MCP calls after fixing the local
MCP config.

Primary desktop source:

- `get_performance_summary`, timestamp `2026-05-23T14:11:22.749Z`
- `analyze_page_speed`, timestamp `2026-05-23T14:16:55.440Z`
- `get_network_analysis`
- `get_javascript_analysis`
- `get_render_blocking_details`
- `get_image_optimization_details`
- `get_element_analysis`
- `get_third_party_impact`

`get_full_audit` aborted for desktop, so desktop category coverage comes from
`analyze_page_speed` plus the detail tools.

## Status vs PLAN.md

`PLAN.md` defines the target metrics at lines 15-21.

| Metric | PLAN.md goal | Fresh desktop result | Status |
| --- | ---: | ---: | --- |
| Performance score | Not specified | 62/100 | Failing |
| FCP | < 0.5 s | 0.4 s | Passing |
| LCP | < 1 s | 1.9 s | Failing |
| TBT | < 100 ms | 570-600 ms | Failing |
| CLS | 0 | 0 | Passing |
| Speed Index | < 2 s | 2.5 s | Failing |
| FID | Not specified | 350 ms | Failing by Core Web Vitals threshold |

Desktop has crossed the FCP target, but LCP, TBT, and Speed Index remain above
the plan targets.

## PageSpeed findings

### Network and payload

`get_network_analysis` reported:

| Signal | Fresh desktop result |
| --- | ---: |
| Total requests | 101 |
| Total transfer size | 2.73 MB |
| Images | 12 requests, 1.37 MB |
| Scripts | 45 requests, 1.05 MB |
| Fonts | 4 requests, 0.13 MB |
| Stylesheets | 2 requests, 0.06 MB |
| Third-party | 32 requests, 0.47 MB |
| Server latency | 15 ms |
| Network RTT | 9.75 ms |

The largest reported resource is `linn-kate-kikkert.webp` at 905.0 KB with
low priority. The next largest group is the Meta/Facebook config script at
135.8 KB.

### JavaScript and main thread

`get_javascript_analysis` reported:

| Signal | Fresh desktop result |
| --- | ---: |
| Total JS execution time | 3,676 ms |
| Script evaluation | 1,709 ms |
| Style and layout | 904 ms |
| Other main-thread work | 732 ms |
| Total unused JavaScript | 287.7 KB |

Top slow scripts:

| Script | Total | Evaluation | Parse/compile |
| --- | ---: | ---: | ---: |
| `0956.uguclzfz.js` | 1,442 ms | 721 ms | 21 ms |
| `052_rgenbp_yq.js` | 698 ms | 189 ms | 5 ms |
| Inline scripts | 548 ms | 35 ms | 37 ms |
| Meta/Facebook config | 183 ms | 141 ms | 39 ms |
| Unattributable | 177 ms | 8 ms | 0 ms |

Top unused JavaScript:

| Script | Unused |
| --- | ---: |
| `main.MWJkOTJmOWRkMQ.js` | 54.4 KB (50%) |
| `0dq94~m.t_lnn.js` | 47.5 KB (84%) |
| Meta/Facebook config | 38.7 KB (29%) |
| `0nouuhsistbte.js` | 33.3 KB (65%) |
| `fbevents.js` | 31.9 KB (33%) |

### Opportunities returned by PageSpeed

`get_performance_summary` and `analyze_page_speed` listed these opportunities:

| Opportunity | Fresh desktop value |
| --- | --- |
| Minify CSS | Passing score, still listed |
| Minify JavaScript | Passing score, still listed |
| Reduce unused CSS | Passing score, still listed |
| Reduce unused JavaScript | Estimated savings of 288 KiB |
| Avoid multiple page redirects | Passing score, still listed |

Detail tools added:

| Detail tool | Result |
| --- | --- |
| Render-blocking details | No render-blocking resources found |
| Image optimization details | 0.00 MB potential image optimization savings |
| Element analysis | No element-level details returned |
| Third-party impact | No significant third-party impact detected |

## Local code mapping

These are likely areas to inspect next. They are local-code evidence, not
PageSpeed proof by themselves.

| Area | Local evidence | Why it maps to PageSpeed |
| --- | --- | --- |
| Home page order | `src/app/(home)/page.tsx` lines 19-49 | The desktop LCP and JS work start with the same home render order as mobile. |
| Hero cache boundary | `src/components/frontpage/components/HeroSection/HeroSection.tsx` lines 1-15 | The hero is cached with `use cache`, `cacheLife('days')`, and cache tags. |
| Hero image implementation | `src/components/frontpage/components/HeroSection/HeroImage.tsx` lines 1-54 | The hero uses responsive static imports, `getImageProps`, eager loading, and `fetchPriority: 'high'`. |
| Static asset cache headers | `next.config.ts` lines 3-15 and 51-62 | Static assets have immutable headers, but repeat-visit and third-party caching still need separate validation. |
| Root analytics scripts | `src/app/layout.tsx` lines 28-55 and 129-160 | Root-level analytics scripts map to the reported script transfer and inline-script cost. |
| Meta Pixel | `src/components/analytics/Meta/MetaPixelEvents.tsx` lines 15-34 | Meta/Facebook remains among the largest script contributors. |
| Microsoft UET | `src/components/analytics/MicrosoftUetTag.tsx` lines 135-183 | UET contributes root-level inline and external script work after interactive. |
| Fonts | `src/db/config/font.config.ts` lines 1-56 | Desktop requested 4 font resources; font timing should be verified if LCP remains text/font-related in traces. |

## Suggested next fixes

1. Use the Next.js analyzer on the desktop route to map `0956.uguclzfz.js` and
   `052_rgenbp_yq.js` back to client islands and heavy imports.
2. Reduce unused JavaScript before further image work, because desktop still
   shows 287.7 KB unused JS and 570-600 ms TBT.
3. Review root analytics loading order and consent gating. Meta/Facebook is
   still visible in both network size and JS execution.
4. Investigate why `linn-kate-kikkert.webp` appears as a 905 KB low-priority
   resource even though the current hero implementation uses `fetchPriority:
   'high'`.
5. Verify redirects for `https://utekos.no` and canonical host behavior because
   PageSpeed still lists redirect avoidance as an opportunity.

## Documentation status

Updated docs were available for this assessment:

- Context7 Next.js `v16.2.2` docs for `cacheComponents`, `use cache`,
  `cacheLife`, `cacheTag`, and related cache behavior.
- Vercel docs for Next.js image optimization and CDN/cache-control behavior.
