# Homepage PageSpeed status

Date: 2026-05-23

## Executive status

Fresh PageSpeed MCP data confirms the home page is still below the `PLAN.md`
performance targets on mobile and desktop.

Mobile remains the critical path:

- Mobile performance score: 47/100
- Mobile LCP: 9.6 s summary / 8.63 s full audit
- Mobile TBT: 850 ms summary / 527 ms full audit
- Mobile Speed Index: 7.4-7.86 s
- Mobile CLS: 0

Desktop is better but still misses all targets except FCP and CLS:

- Desktop performance score: 62/100
- Desktop LCP: 1.9 s
- Desktop TBT: 570-600 ms
- Desktop Speed Index: 2.5 s
- Desktop CLS: 0

## Baseline comparison

`PLAN.md` sets these targets and priorities:

- Metric goals: lines 15-21
- Prior mobile opportunity list: lines 23-31
- Prior diagnostics: lines 33-43
- Prior action plan: lines 45-53

| Area | PLAN.md prior state | Fresh 2026-05-23 state |
| --- | --- | --- |
| FCP | Mobile 1.8 s in prior report | Mobile 1.8 s, desktop 0.4 s |
| LCP | Mobile bottleneck, prior 8.8 s | Mobile 8.63-9.6 s, desktop 1.9 s |
| TBT | Prior 940 ms | Mobile 527-850 ms, desktop 570-600 ms |
| CLS | Prior 0 | Mobile 0, desktop 0 |
| Speed Index | Prior 8.3 s | Mobile 7.4-7.86 s, desktop 2.5 s |
| Payload | Prior 2,797 KiB | Mobile 2.64 MB, desktop 2.73 MB |
| JS execution | Prior 2.4 s | Mobile 5.7 s, desktop 3.676 s |

The results suggest the recent above-the-fold work improved some values, but
the page is not yet near the target bar.

## Highest-impact findings

### 1. JavaScript cost is now the most concrete blocker

Fresh PageSpeed MCP JavaScript analysis reports:

| Signal | Mobile | Desktop |
| --- | ---: | ---: |
| Total JS execution | 5,700 ms | 3,676 ms |
| Script evaluation | 2,512 ms | 1,709 ms |
| Style/layout work | 1,249 ms | 904 ms |
| Unused JS | 289.3 KB | 287.7 KB |

Likely local inspection targets:

- Root layout scripts in `src/app/layout.tsx` lines 28-55 and 129-160
- Meta Pixel in `src/components/analytics/Meta/MetaPixelEvents.tsx` lines 15-34
- Microsoft UET in `src/components/analytics/MicrosoftUetTag.tsx` lines 135-183
- Home route client islands and activity order in `src/app/(home)/page.tsx`
  lines 19-49

### 2. Hero/media resource size still appears in the waterfall

Fresh network analysis reports `linn-kate-kikkert.webp` as the largest resource
at 905.0 KB on both mobile and desktop. Local code now uses responsive static
hero sources through `getImageProps`, eager loading, and `fetchPriority:
'high'` in `src/components/frontpage/components/HeroSection/HeroImage.tsx`
lines 1-54.

The mismatch should be investigated in the deployed build:

- Confirm whether the live deployment has the latest hero image implementation.
- Check whether another section or video poster still references
  `linn-kate-kikkert.webp`.
- Confirm whether PageSpeed is reporting an old cached deployment or a
  below-the-fold poster image.

### 3. Render blocking appears improved

Fresh `get_render_blocking_details` reports no render-blocking resources for
mobile or desktop. This differs from `PLAN.md` lines 25-28, where prior mobile
data reported 1,470 ms estimated savings from render-blocking requests.

This is a positive signal, but it should be confirmed with one more run after a
new deployment because PageSpeed variance and deployment cache state can affect
this audit.

### 4. Image optimization tool reports no direct savings, but payload is still high

Fresh `get_image_optimization_details` reports 0.00 MB potential savings for
both mobile and desktop. At the same time, network analysis reports 1.33 MB of
mobile image transfer and 1.37 MB of desktop image transfer.

This means the next image task should focus on discovery, priority, route
ownership, and whether unused/offscreen images load too early, rather than only
compression.

### 5. Redirects remain listed as an opportunity

Both summary calls still list "Avoid multiple page redirects". The next audit
should verify whether `https://utekos.no`, `https://www.utekos.no`, trailing
slash behavior, locale redirects, or Vercel/domain routing cause extra hops.

## Documentation status

Updated documentation was available before writing this report:

- Context7 Next.js `v16.2.2` docs for `cacheComponents`, `use cache`,
  `cacheLife`, `cacheTag`, and related cache behavior.
- Vercel docs for Next.js image optimization and CDN/cache-control behavior.

## Recommended order of work

1. Run `next experimental-analyze` or the local analyzer equivalent and map
   `0956.uguclzfz.js`, `052_rgenbp_yq.js`, `main.MWJkOTJmOWRkMQ.js`,
   `0dq94~m.t_lnn.js`, and `0nouuhsistbte.js` to source imports.
2. Gate or defer non-critical root scripts and tracking code based on consent
   and first interaction.
3. Verify the deployed hero/media asset references and remove early loading of
   `linn-kate-kikkert.webp` if it is no longer the intended above-the-fold LCP
   asset.
4. Confirm redirect chain for the production URL with a simple `curl -I -L`
   trace and compare it to the PageSpeed redirect finding.
5. Re-run PageSpeed after deployment and update these dated reports rather than
   relying on the older 22 May extract.
