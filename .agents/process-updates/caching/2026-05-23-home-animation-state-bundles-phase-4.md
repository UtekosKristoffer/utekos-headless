# Home animation and state bundle phase 4

Date: 2026-05-23

## Scope

This note records the Fase 4 measurement and verification pass from the
homepage PageSpeed remediation plan. The phase requires bundle analysis,
preview PageSpeed checks, comparison against `PLAN.md` goals, and an
accessibility/WCAG regression check
(`/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L54-L60`,
`/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L81-L85`).

Updated documentation access was confirmed for this phase. Next.js bundle
analysis docs were available through Context7/Next DevTools, and Vercel preview
deploy/protection docs were available through the Vercel MCP docs search.

## Documentation Sources Used

- `https://nextjs.org/docs/app/guides/package-bundling.md#L27-L31`
- `https://nextjs.org/docs/app/guides/package-bundling.md#L33-L40`
- `https://nextjs.org/docs/app/guides/package-bundling.md#L65-L88`
- `https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports.md#L16-L20`
- `https://vercel.com/docs/cli/deploying-from-cli`
- `https://vercel.com/docs/projects/deploy-from-cli`
- `https://vercel.com/docs/cli`
- `https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation`

## Files Written

- `pagespeed-raport/bundle/2026-05-23-phase-4-home-animation-state-bundles.md`

No source code was changed in Fase 4. This phase only created measurement and
process documentation.

## Bundle Analysis

`npm run analyze` passed. In this repository the script runs
`cross-env ANALYZE=true next build`, but it did not write a separate analyzer
artifact. I then ran the documented Next.js analyzer command:

```txt
npx next experimental-analyze --output
```

It passed and wrote `.next/diagnostics/analyze`, which is the documented output
directory for the analyzer output mode
(`https://nextjs.org/docs/app/guides/package-bundling.md#L65-L88`).

The homepage route bundle stats from
`.next/diagnostics/route-bundle-stats.json` show:

```txt
route: /
firstLoadUncompressedJsBytes: 1206437
firstLoadChunkCount: 22
```

The Fase 4 target chunks were checked
(`/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L56-L56`):

- `0956.uguclzfz.js` exists, is `226465` bytes, and is still in `/` first
  load.
- `052_rgenbp_yq.js` is not present in the current Turbopack chunk output.
- `main.MWJkOTJmOWRkMQ.js` is not present in the current Turbopack chunk
  output.

The two missing names appear to be stale generated chunk names from the earlier
PageSpeed run, so `0956.uguclzfz.js` is the only direct target-name comparison
available in this build.

## Findings

Fase 3's animation-bundle goal is not fully met yet. The homepage first-load
chunk list still contains three chunks with `ScrollTrigger` markers and one
chunk with `xstate` markers:

```txt
54909  .next/static/chunks/02cmpg7o.tbk5.js      ScrollTrigger
43376  .next/static/chunks/07dopi2zta51..js      ScrollTrigger
71087  .next/static/chunks/0gtvujxczlfzb.js      ScrollTrigger
48254  .next/static/chunks/0z_viha7s5h_o.js      xstate
```

Representative remaining static frontpage GSAP sources:

- `src/components/frontpage/TextReveal.tsx#L4-L9`
- `src/components/frontpage/FrontpageIcebathingSection.tsx#L15-L25`
- `src/components/frontpage/components/mountTechTeaser.ts#L1-L5`
- `src/components/frontpage/components/HeroSection/ChevronDown.tsx#L8-L16`

This matches the local evidence that Fase 3 moved a subset of GSAP imports, but
did not remove every homepage GSAP/ScrollTrigger path.

The XState marker is expected from the earlier Fase 3 decision not to defer the
cart mutation provider yet, because product-card quick-buy and cart line item
updates use that state outside a drawer-only path.

## Preview Deploy

Vercel docs confirm the current project can be deployed from the linked project
root with the Vercel CLI
(`https://vercel.com/docs/cli/deploying-from-cli`). The Vercel MCP deploy tool
returned CLI instructions instead of initiating the deployment, so I used:

```txt
vercel deploy -y --no-wait
```

Deployment:

```txt
id: dpl_DqJ7JpvBNthPxbsTqsgnU67N8t6B
url: https://utekos-headless-cndyh01kq-utekos-marketing-group.vercel.app
state: READY
target: preview
meta: gitDirty=1, bundler=turbopack
```

## PageSpeed Status

PageSpeed MCP mobile and desktop runs were attempted against the preview URL.
Those results were discarded because the preview deployment is protected by
Vercel Authentication and returns an auth wall to unauthenticated HTTP clients:

```txt
curl preview: 401 0 https://utekos-headless-cndyh01kq-utekos-marketing-group.vercel.app/
vercel curl preview: HTTP/2 403
Vercel web_fetch_vercel_url: status 401, Authentication Required HTML
```

Vercel docs say `vercel curl` can make requests with deployment protection
bypass and also document protection-bypass automation secrets, but this project
did not expose a usable bypass for the PageSpeed MCP run in this session
(`https://vercel.com/docs/projects/deploy-from-cli`,
`https://vercel.com/docs/cli`,
`https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation`).

The discarded PageSpeed MCP values were saved only as blocked evidence in the
bundle report. They should not be compared against `PLAN.md` performance goals
because they are likely measuring the auth wall, not the homepage.

## Accessibility / WCAG

No visual UI components were introduced in Fase 4. PageSpeed MCP accepted the
`accessibility` category but returned no accessibility score in the response,
and the alternate Lighthouse MCP endpoint returned `401` against the protected
preview.

Regression status: no new contrast surface in this phase. A valid automated
accessibility run is blocked until preview protection is bypassed or disabled
for the measurement URL.

## Validation

- `npm run analyze` passed.
- `npx next experimental-analyze --output` passed and wrote
  `.next/diagnostics/analyze`.
- Vercel preview deploy reached `READY`.
- Preview PageSpeed was attempted with PageSpeed MCP for mobile and desktop,
  then marked invalid because the preview URL is protected.
- Bundle report was written to
  `pagespeed-raport/bundle/2026-05-23-phase-4-home-animation-state-bundles.md`.
