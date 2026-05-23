# Desktop homepage performance rerun

Date: 2026-05-23
Run id: `2026-05-23-171207`
URL: `https://utekos.no`

## Measurement source

Fresh PageSpeed MCP calls:

- `analyze_page_speed`, timestamp `2026-05-23T15:24:33.039Z`
- `get_network_analysis`
- `get_javascript_analysis`
- `get_render_blocking_details`
- `get_image_optimization_details`
- `get_element_analysis` retry
- `get_third_party_impact` retry

Unavailable broad calls:

- `get_performance_summary` aborted.
- `get_full_audit` aborted.

## Core metrics

| Metric | Fresh desktop result | Status vs `PLAN.md` |
| --- | ---: | --- |
| Performance score | 55/100 | Needs work |
| FCP | 0.4 s | Passes `< 0.5 s` |
| LCP | 1.9 s | Fails `< 1 s` |
| TBT | 1,210 ms | Fails `< 100 ms` |
| CLS | 0 | Passes `0` |
| Speed Index | 3.0 s | Fails `< 2 s` |

## PageSpeed opportunities

| Opportunity | Fresh desktop value |
| --- | --- |
| Reduce unused JavaScript | 240.5 KB JS analysis / 240 KB broad analysis |
| Avoid multiple page redirects | Listed |
| Minify CSS | Listed |
| Minify JavaScript | Listed |
| Reduce unused CSS | Listed |

Detail tools reported:

- Render-blocking resources: none found.
- Image optimization potential: 0.00 MB.
- Element analysis: no element details returned.
- Third-party impact: no significant third-party impact detected.

## Network analysis

| Signal | Fresh desktop value |
| --- | ---: |
| Total requests | 98 |
| Total transfer size | 1.73 MB |
| Scripts | 43 requests, 0.97 MB |
| Images | 12 requests, 0.45 MB |
| Fonts | 4 requests, 0.13 MB |
| Other | 34 requests, 0.08 MB |
| Stylesheets | 2 requests, 0.06 MB |
| Third-party | 30 requests, 0.47 MB |
| Server latency | 153.5 ms |
| Network RTT | 15.20 ms |

Top resources:

| Resource | Type | Size | Priority |
| --- | --- | ---: | --- |
| Meta/Facebook config | Script | 135.7 KB | Low |
| `monica-arne-comfy...png` optimized image | Image | 114.0 KB | Low |
| `main.MWJkOTJmOWRkMQ.js` | Script | 110.0 KB | Low |
| `classic-couple-1080...webp` optimized image | Image | 104.9 KB | Low |
| `fbevents.js` | Script | 101.2 KB | Low |
| `kate-linn-2560-1440-85...webp` optimized image | Image | 93.6 KB | High |
| `0956.uguclzfz.js` | Script | 70.9 KB | Low |
| `linn-kate-kikkert-960.webp` | Image | 68.2 KB | Low |
| `10fqf0l1x05_9.css` | Stylesheet | 60.9 KB | VeryHigh |
| `0v_cgqk~qyaaj.js` | Script | 53.1 KB | Low |

## JavaScript analysis

| Signal | Fresh desktop value |
| --- | ---: |
| Total JS execution | 4,076 ms |
| Script evaluation | 1,830 ms |
| Style and layout | 1,089 ms |
| Other main-thread work | 831 ms |
| Parse/compile | 307 ms |
| Rendering | 251 ms |
| Garbage collection | 125 ms |
| Parse HTML/CSS | 31 ms |
| Total unused JS | 240.5 KB |

Top slow scripts:

| Script | Total | Evaluation | Parse/compile |
| --- | ---: | ---: | ---: |
| `0956.uguclzfz.js` | 1,700 ms | 828 ms | 20 ms |
| `052_rgenbp_yq.js` | 783 ms | 192 ms | 6 ms |
| Inline scripts | 599 ms | 33 ms | 44 ms |
| `clarity.js` | 237 ms | 132 ms | 7 ms |
| Unattributable | 197 ms | 7 ms | 0 ms |

Top unused JavaScript:

| Script | Unused |
| --- | ---: |
| `main.MWJkOTJmOWRkMQ.js` | 54.3 KB (50%) |
| Meta/Facebook config | 38.7 KB (29%) |
| `0v_cgqk~qyaaj.js` | 33.5 KB (64%) |
| `fbevents.js` | 31.9 KB (33%) |
| `05bd4com9hhpe.js` | 30.6 KB (100%) |

## Local code mapping

| Area | Local evidence | Why it matters |
| --- | --- | --- |
| Root scripts | `src/app/layout.tsx` lines 126-155 | Root script and analytics loading maps to desktop script transfer, inline script work, and TBT. |
| ChatBot | `src/components/chat/ChatBotAgent/source-code.tsx` lines 21-28 | Script is `lazyOnload`, but component still mounts globally through layout line 155. |
| Hero image | `src/components/frontpage/components/HeroSection/HeroImage.tsx` lines 6-12 | Desktop waterfall now shows the hero image as high priority and much smaller than the old 905 KB image. |
| Home sections | `src/app/(home)/page.tsx` lines 19-49 | Several sections still mount under `Activity`; analyzer should confirm which ones contribute to first-party chunks. |

## Recommended next work

1. Treat desktop TBT as the main regression in this run.
2. Map `0956.uguclzfz.js`, `052_rgenbp_yq.js`, and `main.MWJkOTJmOWRkMQ.js`
   back to source modules with the Next.js analyzer.
3. Inspect why `clarity.js` appears in desktop top slow scripts even though it
   is not directly visible in the inspected root layout snippet.
4. Keep the improved hero-image path; desktop network now shows the hero image
   at 93.6 KB and high priority.
5. Verify redirect chain separately because PageSpeed continues to list
   redirect avoidance.
