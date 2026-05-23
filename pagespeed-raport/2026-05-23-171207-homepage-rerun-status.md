# Homepage PageSpeed rerun status

Date: 2026-05-23
Run id: `2026-05-23-171207`
URL: `https://utekos.no`

## Measurement status

Fresh PageSpeed MCP measurements were run after local code changes. The
production URL was measured, so local changes only appear in these results if
they were already deployed.

Successful fresh MCP calls:

- Mobile: summary, full audit, broad PageSpeed analysis, JavaScript analysis,
  render-blocking details, image details, and element analysis.
- Desktop: broad PageSpeed analysis, network analysis, JavaScript analysis,
  render-blocking details, image details, element analysis, and third-party
  impact.

Partial limitations:

- Mobile network and third-party detail calls returned `FAILED_DOCUMENT_REQUEST`
  / `net::ERR_TIMED_OUT` on retry.
- Desktop summary and full audit aborted, but desktop broad PageSpeed analysis
  returned usable Core Web Vitals and opportunities.

## Status vs `PLAN.md`

`PLAN.md` defines the target metrics at lines 15-21.

| Metric | PLAN.md goal | Fresh mobile | Fresh desktop |
| --- | ---: | ---: | ---: |
| Performance score | Not specified | 52/100 broad analysis, 47/100 summary | 55/100 |
| FCP | < 0.5 s | 1.8 s | 0.4 s |
| LCP | < 1 s | 6.9-7.3 s | 1.9 s |
| TBT | < 100 ms | 700-930 ms | 1,210 ms |
| CLS | 0 | 0 | 0 |
| Speed Index | < 2 s | 6.4-7.4 s | 3.0 s |

## Delta from prior 2026-05-23 report

| Area | Prior 2026-05-23 report | Fresh rerun |
| --- | ---: | ---: |
| Mobile LCP | 8.63-9.6 s | 6.9-7.3 s |
| Mobile TBT | 527-850 ms | 700-930 ms |
| Mobile Speed Index | 7.4-7.86 s | 6.4-7.4 s |
| Mobile unused JS | 289.3 KB | 242-243 KB |
| Desktop LCP | 1.9 s | 1.9 s |
| Desktop TBT | 570-600 ms | 1,210 ms |
| Desktop Speed Index | 2.5 s | 3.0 s |
| Desktop transfer size | 2.73 MB | 1.73 MB |
| Desktop unused JS | 287.7 KB | 240-240.5 KB |

Interpretation: payload and unused JS are lower, and mobile LCP improved, but
TBT is still far above target and desktop TBT regressed in this run.

## Highest-impact findings

### 1. JavaScript remains the main blocker

Fresh JavaScript analysis:

| Signal | Mobile | Desktop |
| --- | ---: | ---: |
| Total JS execution | 7,406 ms | 4,076 ms |
| Script evaluation | 2,965 ms | 1,830 ms |
| Style/layout work | 1,809 ms | 1,089 ms |
| Unused JS | 242.4 KB | 240.5 KB |

The slowest first-party chunks are still `0956.uguclzfz.js` and
`052_rgenbp_yq.js` on both mobile and desktop.

### 2. Root script footprint changed, but still matters

Local code evidence:

- `src/app/layout.tsx` lines 126-131 still load GTM and Microsoft UET in the
  document head.
- `src/app/layout.tsx` lines 133-155 still mount Meta Pixel, click tracking,
  visitor analytics, Vercel Analytics, and ChatBot from the root layout.
- `src/components/chat/ChatBotAgent/source-code.tsx` lines 21-28 now use a
  `lazyOnload` script, which is directionally good, but the component still
  exists in the root tree through `src/app/layout.tsx` line 155.

### 3. Hero asset is improved on desktop waterfall

Fresh desktop network analysis no longer reports the old 905 KB
`linn-kate-kikkert.webp` as the largest resource. The reported hero-related
resource is now:

- `kate-linn-2560-1440-85...webp`
- 93.6 KB
- Priority: High

Local code evidence: `src/components/frontpage/components/HeroSection/HeroImage.tsx`
lines 6-12 set `fetchPriority: 'high'`, `loading: 'eager'`, `quality: 80`,
and responsive `sizes`.

### 4. Render blocking and image optimization are currently not the primary findings

Fresh PageSpeed detail tools reported:

- Mobile render-blocking: no render-blocking resources found.
- Desktop render-blocking: no render-blocking resources found.
- Mobile image optimization: 0.00 MB potential savings.
- Desktop image optimization: 0.00 MB potential savings.

This shifts the next work toward JavaScript ownership, hydration, third-party
timing, and redirects.

### 5. PageSpeed still suggests reducing unused JavaScript and avoiding redirects

Fresh broad PageSpeed analysis lists:

- Reduce unused JavaScript: 243 KB mobile, 240 KB desktop.
- Avoid multiple page redirects.
- Minify CSS, minify JavaScript, and reduce unused CSS are listed, but with
  passing scores in the summary-style output.

## Recommended next work

1. Run the Next.js analyzer and map `0956.uguclzfz.js`,
   `052_rgenbp_yq.js`, `main.MWJkOTJmOWRkMQ.js`, `0v_cgqk~qyaaj.js`, and
   `05bd4com9hhpe.js` to imports and client boundaries.
2. Keep ChatBot lazy-loaded, but check whether the root client component and
   `usePathname` boundary can be moved lower or conditionally rendered after
   first interaction.
3. Re-check GTM, Meta Pixel, Microsoft UET, click tracking, and visitor
   analytics for consent-gating and delayed loading strategy.
4. Verify the redirect chain for `https://utekos.no` with a header trace,
   because PageSpeed continues to list redirect avoidance.
5. Re-run mobile network analysis later; this run returned a PageSpeed
   document-load timeout for that detail view even though mobile summary,
   full audit, and JS analysis succeeded.

## Documentation status

No new framework implementation was done in this pass. The report relies on
fresh PageSpeed MCP results and local code evidence. Prior Context7 Next.js
16.2.2 and Vercel documentation remained available for interpreting cache,
image, and script-loading context.
