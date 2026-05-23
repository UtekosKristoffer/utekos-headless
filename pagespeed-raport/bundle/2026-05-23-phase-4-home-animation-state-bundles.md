# Phase 4 bundle and preview verification

Date: 2026-05-23

## Scope

This report records Fase 4 from the homepage PageSpeed remediation plan:
bundle analysis, target chunk checks, preview deploy status, PageSpeed
attempts, and accessibility/WCAG regression status.

Updated documentation was confirmed before running deployment and analyzer
steps. Next.js docs were fetched through Context7/Next DevTools for bundle
analysis and package optimization. Vercel docs were fetched through the Vercel
MCP docs search before deploy and preview-access checks.

## Documentation Sources

- `https://nextjs.org/docs/app/guides/package-bundling.md#L27-L31`
- `https://nextjs.org/docs/app/guides/package-bundling.md#L33-L40`
- `https://nextjs.org/docs/app/guides/package-bundling.md#L65-L88`
- `https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports.md#L16-L20`
- `https://vercel.com/docs/cli/deploying-from-cli`
- `https://vercel.com/docs/projects/deploy-from-cli`
- `https://vercel.com/docs/cli`
- `https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation`
- `/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L54-L60`
- `PLAN.md#L15-L21`

## Commands Run

- `npm run analyze`
  - Result: passed.
  - Note: the project script runs `cross-env ANALYZE=true next build`; it did
    not create a separate static analyzer artifact.
- `npx next experimental-analyze --output`
  - Result: passed.
  - Output: `.next/diagnostics/analyze`.
  - Output size: `19M`.
- `vercel deploy -y --no-wait`
  - Result: created preview deployment.
  - Deployment ID: `dpl_DqJ7JpvBNthPxbsTqsgnU67N8t6B`.
  - Preview URL:
    `https://utekos-headless-cndyh01kq-utekos-marketing-group.vercel.app`.
  - Vercel state: `READY`.
  - Vercel metadata: `gitDirty=1`, `bundler=turbopack`.

## Route Bundle Result

Source: `.next/diagnostics/route-bundle-stats.json`.

Homepage route:

```txt
route: /
firstLoadUncompressedJsBytes: 1206437
firstLoadChunkCount: 22
```

Target chunks from the Fase 4 plan:

| Target chunk | Current status |
| --- | --- |
| `0956.uguclzfz.js` | Present, `226465` bytes, still in `/` first load |
| `052_rgenbp_yq.js` | Not present in current `.next/static/chunks` output |
| `main.MWJkOTJmOWRkMQ.js` | Not present in current `.next/static/chunks` output |

The two missing names appear to be stale Turbopack chunk names from the earlier
PageSpeed run, so direct before/after comparison is only possible for
`0956.uguclzfz.js` in this build.

Largest current client chunks:

```txt
271140 .next/static/chunks/0dq94~m.t_lnn.js
271140 .next/static/chunks/0ar_z3ac52q-1.js
226465 .next/static/chunks/0956.uguclzfz.js
168111 .next/static/chunks/04943lxsfq8mf.js
134667 .next/static/chunks/0scmncmdgfr0n.js
134667 .next/static/chunks/0.fctu-ju.f6g.js
112594 .next/static/chunks/03~yq9q893hmn.js
110879 .next/static/chunks/0jmygba28rogz.js
106871 .next/static/chunks/06vjrhvuf_x0g.js
97931 .next/static/chunks/15zyh_u-sm2qh.js
```

Homepage first-load markers:

```txt
54909  .next/static/chunks/02cmpg7o.tbk5.js      ScrollTrigger
43376  .next/static/chunks/07dopi2zta51..js      ScrollTrigger
71087  .next/static/chunks/0gtvujxczlfzb.js      ScrollTrigger
48254  .next/static/chunks/0z_viha7s5h_o.js      xstate
226465 .next/static/chunks/0956.uguclzfz.js
```

Conclusion: Fase 3 reduced some direct animation imports, but the Fase 3 goal
is not fully met yet. `ScrollTrigger` is still present in homepage first-load
chunks, and XState is still present because cart mutation state remains mounted
from the root provider.

Remaining static GSAP sources found in the codebase include frontpage-specific
files such as:

- `src/components/frontpage/TextReveal.tsx#L4-L9`
- `src/components/frontpage/FrontpageIcebathingSection.tsx#L15-L25`
- `src/components/frontpage/components/mountTechTeaser.ts#L1-L5`
- `src/components/frontpage/components/HeroSection/ChevronDown.tsx#L8-L16`

## Whole Build Package Signals

Source: `.next/diagnostics/analyze/data/modules.data`.

These counts are whole-build module signals, not route-specific first-load
proof:

```txt
node_modules/gsap/: 12
node_modules/@gsap/: 2
node_modules/framer-motion/: 165
node_modules/motion/: 0
node_modules/motion-dom/: 366
node_modules/motion-utils/: 50
node_modules/xstate/: 20
node_modules/@xstate/: 8
```

## Preview PageSpeed Status

Preview PageSpeed was attempted with PageSpeed MCP for mobile and desktop, but
the result is invalid for page performance because the preview URL is protected
by Vercel Authentication.

Protection evidence:

```txt
curl preview: 401 0 https://utekos-headless-cndyh01kq-utekos-marketing-group.vercel.app/
vercel curl preview: HTTP/2 403
Vercel web_fetch_vercel_url: status 401, Authentication Required HTML
```

Discarded PageSpeed MCP outputs against the protected preview:

| Strategy | Score | FCP | LCP | TBT | CLS | SI |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 43 | 4.1 s | 13.9 s | 690 ms | 0 | 7.1 s |
| Desktop | 72 | 0.4 s | 2.8 s | 220 ms | 0 | 2.4 s |

These values should not be compared to `PLAN.md` goals because the URL returns
the Vercel auth wall to unauthenticated clients. Valid PageSpeed requires either
an unprotected preview URL or a configured `VERCEL_AUTOMATION_BYPASS_SECRET`
that PageSpeed can use through a bypass-cookie URL.

## Goal Comparison

Current valid comparison is bundle-only:

| Goal area | Status |
| --- | --- |
| FCP < 0.5 s | Not validly measured on preview |
| LCP < 1 s | Not validly measured on preview |
| TBT < 100 ms | Not validly measured on preview |
| CLS 0 | Not validly measured on preview |
| Speed Index < 2 s | Not validly measured on preview |
| Remove GSAP from pre-FCP chunks | Not yet met; `ScrollTrigger` remains in `/` first-load chunks |
| Defer XState/cart state | Not applied; `xstate` remains in `/` first-load chunks |

## WCAG / Accessibility Status

No visual UI components were introduced in Fase 4. PageSpeed MCP accepted the
`accessibility` category but did not return an accessibility score in the MCP
response. The alternate Lighthouse MCP endpoint returned `401` against the
protected preview.

Regression status: no new visual surface to contrast-check in this phase.
Accessibility measurement against the preview is blocked until the deployment
can be accessed without the Vercel auth wall or with an automation bypass.

## Next Work Suggested By Measurement

1. Move the remaining frontpage static GSAP/ScrollTrigger users behind dynamic
   imports or viewport-only client enhancers.
2. Revisit cart mutation provider scope separately if the product-card quick-buy
   path can keep behavior without mounting all XState logic before first paint.
3. Re-run `npx next experimental-analyze --output` after the remaining GSAP
   pass and verify `ScrollTrigger` is absent from `/` first-load chunks.
4. For valid PageSpeed, use either an open preview URL or a Vercel automation
   bypass secret URL as documented by Vercel Deployment Protection.
