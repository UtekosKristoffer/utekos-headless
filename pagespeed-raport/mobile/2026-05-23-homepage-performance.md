# Mobile homepage performance

Date: 2026-05-23

## Measurement source

Fresh data was captured from `https://utekos.no` with
`pagespeed-insights-mcp` through direct stdio MCP calls after fixing the local
MCP config.

Primary mobile source:

- `get_performance_summary`, timestamp `2026-05-23T14:07:45.936Z`
- `get_full_audit`
- `get_network_analysis`
- `get_javascript_analysis`
- `get_render_blocking_details`
- `get_image_optimization_details`
- `get_element_analysis`
- `get_third_party_impact`

## Status vs PLAN.md

`PLAN.md` defines the target metrics at lines 15-21.

| Metric | PLAN.md goal | Fresh mobile result | Status |
| --- | ---: | ---: | --- |
| Performance score | Not specified | 47/100 | Failing |
| FCP | < 0.5 s | 1.8 s | Failing |
| LCP | < 1 s | 9.6 s summary / 8.63 s full audit | Failing |
| TBT | < 100 ms | 850 ms summary / 527 ms full audit | Failing |
| CLS | 0 | 0 | Passing |
| Speed Index | < 2 s | 7.4 s summary / 7.86 s full audit | Failing |
| FID | Not specified | 480 ms summary / 315 ms full audit | Failing by Core Web Vitals threshold |

The current mobile status is still aligned with the direction of `PLAN.md`:
LCP, TBT, Speed Index, JavaScript cost, and payload remain the main blockers.

## PageSpeed findings

### Network and payload

`get_network_analysis` reported:

| Signal | Fresh mobile result |
| --- | ---: |
| Total requests | 96 |
| Total transfer size | 2.64 MB |
| Images | 12 requests, 1.33 MB |
| Scripts | 45 requests, 1.05 MB |
| Fonts | 3 requests, 0.10 MB |
| Stylesheets | 2 requests, 0.06 MB |
| Third-party | 32 requests, 0.47 MB |
| Server latency | 21 ms |
| Network RTT | 9.14 ms |

The largest reported resource is `linn-kate-kikkert.webp` at 905.0 KB with
low priority. The next largest group is the Meta/Facebook config script at
135.8 KB.

### JavaScript and main thread

`get_javascript_analysis` reported:

| Signal | Fresh mobile result |
| --- | ---: |
| Total JS execution time | 5,700 ms |
| Script evaluation | 2,512 ms |
| Other main-thread work | 1,587 ms |
| Style and layout | 1,249 ms |
| Total unused JavaScript | 289.3 KB |

Top slow scripts:

| Script | Total | Evaluation | Parse/compile |
| --- | ---: | ---: | ---: |
| `0956.uguclzfz.js` | 2,183 ms | 1,087 ms | 41 ms |
| `052_rgenbp_yq.js` | 1,334 ms | 222 ms | 11 ms |
| Inline scripts | 869 ms | 76 ms | 80 ms |
| Unattributable | 332 ms | 29 ms | 0 ms |
| Meta/Facebook config | 250 ms | 178 ms | 46 ms |

Top unused JavaScript:

| Script | Unused |
| --- | ---: |
| `main.MWJkOTJmOWRkMQ.js` | 56.0 KB (51%) |
| `0dq94~m.t_lnn.js` | 47.5 KB (84%) |
| Meta/Facebook config | 38.7 KB (29%) |
| `0nouuhsistbte.js` | 33.3 KB (65%) |
| `fbevents.js` | 31.9 KB (33%) |

### Opportunities returned by PageSpeed

`get_performance_summary` listed these opportunities:

| Opportunity | Fresh mobile value |
| --- | --- |
| Minify CSS | Passing score, still listed |
| Minify JavaScript | Passing score, still listed |
| Reduce unused CSS | Passing score, still listed |
| Reduce unused JavaScript | Estimated savings of 289 KiB |
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
| Home page order | `src/app/(home)/page.tsx` lines 19-49 | Hero renders first, followed by several `Activity` sections. LCP and JS work should be checked from this render order. |
| Hero cache boundary | `src/components/frontpage/components/HeroSection/HeroSection.tsx` lines 1-15 | The hero is cached with `use cache`, `cacheLife('days')`, and cache tags. |
| Hero image implementation | `src/components/frontpage/components/HeroSection/HeroImage.tsx` lines 1-54 | The current hero uses responsive static imports, `getImageProps`, eager loading, and `fetchPriority: 'high'`. |
| Static asset cache headers | `next.config.ts` lines 3-15 and 51-62 | Static images, fonts, and videos are configured for immutable cache headers. |
| Image quality config | `next.config.ts` lines 41-50 | The allowed quality list includes high values up to 100; PageSpeed currently reports no image optimization savings, but payload remains large. |
| Root analytics scripts | `src/app/layout.tsx` lines 28-55 and 129-160 | GTM, Meta Pixel, Microsoft UET, Vercel Analytics, BrandArmor, and ChatBot are loaded from the root layout. |
| Meta Pixel | `src/components/analytics/Meta/MetaPixelEvents.tsx` lines 15-34 | PageSpeed reports Meta/Facebook scripts among the largest and slowest scripts. |
| Microsoft UET | `src/components/analytics/MicrosoftUetTag.tsx` lines 135-183 | UET injects an external script and inline consent/conversion scripts after interactive. |
| Fonts | `src/db/config/font.config.ts` lines 1-56 | Local fonts use `display: 'swap'` and `preload: false`; font preloading remains worth checking if LCP text/font timing appears in trace data. |

## Suggested next fixes

1. Audit the first-party chunks `0956.uguclzfz.js` and `052_rgenbp_yq.js` with
   the Next.js analyzer to identify which client boundaries and imports create
   the 5.7 s mobile JS execution cost.
2. Re-check whether root layout analytics should be consent-gated or delayed
   further, especially Meta/Facebook and Microsoft UET, because PageSpeed still
   reports a 135.8 KB Meta config script and 31.9 KB unused `fbevents.js`.
3. Keep the latest hero image changes, but investigate why `linn-kate-kikkert.webp`
   still appears as a 905 KB low-priority resource in the network waterfall.
4. Investigate redirects from the measured URL path and canonical host handling,
   since PageSpeed still lists redirect avoidance as an opportunity.
5. Continue forced-reflow investigation from `PLAN.md` lines 68-90 if the
   current JavaScript/style-layout cost is still reproduced in Chrome traces.

## Documentation status

Updated docs were available for this assessment:

- Context7 Next.js `v16.2.2` docs for `cacheComponents`, `use cache`,
  `cacheLife`, `cacheTag`, and related cache behavior.
- Vercel docs for Next.js image optimization and CDN/cache-control behavior.

## Notes

The older mobile report from 22 May 2026 recorded LCP 8.8 s, TBT 940 ms, and
Speed Index 8.3 s. The fresh mobile summary is still failing, but TBT and Speed
Index are lower than that older extract.
