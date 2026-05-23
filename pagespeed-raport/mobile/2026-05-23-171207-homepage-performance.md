# Mobile homepage performance rerun

Date: 2026-05-23
Run id: `2026-05-23-171207`
URL: `https://utekos.no`

## Measurement source

Fresh PageSpeed MCP calls:

- `get_performance_summary`, timestamp `2026-05-23T15:12:42.166Z`
- `get_full_audit`
- `analyze_page_speed`, timestamp `2026-05-23T15:13:40.250Z`
- `get_javascript_analysis`
- `get_render_blocking_details`
- `get_image_optimization_details`
- `get_element_analysis`

Unavailable detail calls:

- `get_network_analysis` returned `FAILED_DOCUMENT_REQUEST` /
  `net::ERR_TIMED_OUT`.
- `get_third_party_impact` returned `FAILED_DOCUMENT_REQUEST` /
  `net::ERR_TIMED_OUT`.

## Core metrics

| Metric | Fresh mobile result | Status vs `PLAN.md` |
| --- | ---: | --- |
| Performance score | 52/100 broad analysis, 47/100 summary | Needs work |
| FCP | 1.8 s | Fails `< 0.5 s` |
| LCP | 6.9 s broad/full audit, 7.3 s summary | Fails `< 1 s` |
| TBT | 700 ms broad/full audit, 930 ms summary | Fails `< 100 ms` |
| CLS | 0 | Passes `0` |
| Speed Index | 6.4 s broad/full audit, 7.4 s summary | Fails `< 2 s` |
| FID | 477-580 ms | Needs work |
| TTI | 10.43 s | Needs work |

## PageSpeed opportunities

| Opportunity | Fresh mobile value |
| --- | --- |
| Reduce unused JavaScript | 242.4 KB JS analysis / 243 KB broad analysis |
| Avoid multiple page redirects | Listed |
| Minify CSS | Listed with passing score |
| Minify JavaScript | Listed with passing score |
| Reduce unused CSS | Listed with passing score |

Detail tools reported:

- Render-blocking resources: none found.
- Image optimization potential: 0.00 MB.
- Element analysis: no element details returned.

## JavaScript analysis

| Signal | Fresh mobile value |
| --- | ---: |
| Total JS execution | 7,406 ms |
| Script evaluation | 2,965 ms |
| Other main-thread work | 1,989 ms |
| Style and layout | 1,809 ms |
| Parse/compile | 483 ms |
| Rendering | 479 ms |
| Garbage collection | 199 ms |
| Parse HTML/CSS | 47 ms |
| Total unused JS | 242.4 KB |

Top slow scripts:

| Script | Total | Evaluation | Parse/compile |
| --- | ---: | ---: | ---: |
| `0956.uguclzfz.js` | 2,777 ms | 1,262 ms | 33 ms |
| `052_rgenbp_yq.js` | 1,811 ms | 335 ms | 9 ms |
| Inline scripts | 1,175 ms | 93 ms | 81 ms |
| Meta/Facebook config | 356 ms | 295 ms | 57 ms |
| Unattributable | 312 ms | 41 ms | 0 ms |

Top unused JavaScript:

| Script | Unused |
| --- | ---: |
| `main.MWJkOTJmOWRkMQ.js` | 56.0 KB (51%) |
| Meta/Facebook config | 38.7 KB (29%) |
| `0v_cgqk~qyaaj.js` | 33.8 KB (64%) |
| `fbevents.js` | 31.9 KB (33%) |
| `05bd4com9hhpe.js` | 30.6 KB (100%) |

## Accessibility and best practices

Fresh mobile full audit:

- Accessibility: 89/100.
- SEO: 100/100.
- Best Practices: 96/100.

Accessibility issues:

- Elements use prohibited ARIA attributes.
- Background and foreground colors do not have a sufficient contrast ratio.
- Lists contain non-`li` children.
- Visible labels do not match accessible names.

Best Practices issue:

- Browser errors were logged to the console.

## Local code mapping

| Area | Local evidence | Why it matters |
| --- | --- | --- |
| Home render order | `src/app/(home)/page.tsx` lines 19-49 | Above-the-fold and below-the-fold sections still define the hydration and script work seen by PageSpeed. |
| Hero image | `src/components/frontpage/components/HeroSection/HeroImage.tsx` lines 6-12 | Current deployed intent is eager, high-priority, responsive hero image loading. |
| Root scripts | `src/app/layout.tsx` lines 126-155 | GTM, Microsoft UET, Meta Pixel, analytics, and ChatBot are still rooted globally. |
| ChatBot | `src/components/chat/ChatBotAgent/source-code.tsx` lines 21-28 | ChatBot now uses `lazyOnload`, but the component still mounts from the root layout. |

## Recommended next work

1. Use route-level bundle analysis to map the slow first-party chunks to source.
2. Reduce root client/script work before doing more image compression work.
3. Investigate console errors from the mobile Best Practices audit.
4. Re-run mobile network and third-party detail tools later because PSI returned
   document-load timeouts for those detail views.
