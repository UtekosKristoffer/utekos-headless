# Home animation and state bundle phase 3

Date: 2026-05-23

## Scope

This note records the Fase 3 pass from the homepage remediation plan: move
animation packages away from the initial path where practical, check
`optimizePackageImports`, and review whether cart state can be deferred. The
phase target is to remove GSAP and Framer Motion pressure from chunks loaded
before FCP, with explicit checks for `animate-icons`, homepage GSAP users,
XState/cart state, and React Query DevTools
(`/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L43-L52`).

Context7 access was confirmed before implementation. Context7 returned the
Utekos/Next.js, Motion, and GSAP docs for this work; for exact line-numbered
citations, this note cites the fetched official Next.js markdown and local
package docs because the Context7 snippets do not expose line ranges
(`PLAN.md#L55-L66`).

## Documentation Sources Used

- `https://nextjs.org/docs/app/guides/lazy-loading.md#L14-L23`
- `https://nextjs.org/docs/app/guides/lazy-loading.md#L100-L102`
- `https://nextjs.org/docs/app/guides/lazy-loading.md#L158-L175`
- `https://nextjs.org/docs/app/guides/package-bundling.md#L15-L18`
- `https://nextjs.org/docs/app/guides/package-bundling.md#L144-L150`
- `https://nextjs.org/docs/app/guides/package-bundling.md#L165-L171`
- `https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports.md#L16-L20`
- `https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports.md#L30-L58`
- `node_modules/motion/README.md#L42-L55`
- `node_modules/@gsap/react/README.md#L7-L10`
- `node_modules/@gsap/react/README.md#L19-L24`
- `node_modules/@gsap/react/README.md#L76-L80`
- `node_modules/@gsap/react/README.md#L166-L197`

## Local Evidence Checked

- `next.config.ts#L17-L40` shows the existing
  `experimental.optimizePackageImports` block and the added `motion` and
  `framer-motion` entries.
- `src/components/animate-icons/icons/icon.tsx#L1-L10`,
  `src/components/animate-icons/icons/smile.tsx#L1-L5`, and
  `src/components/animate-icons/icons/chart-bar.tsx#L1-L11` show the shared
  icon wrapper and representative leaf icons importing from `motion/react`.
- `src/components/header/MobileMenu/MobileMenuPanel.tsx#L37-L116` and
  `src/components/header/MobileMenu/MobileMenuPanel.tsx#L144-L178` show GSAP
  loaded only inside the open-menu effect path, with cleanup and fallback
  visibility.
- `src/hooks/useNewProductLaunchAnimations.ts#L15-L132` shows dynamic
  `gsap`/`ScrollTrigger` imports, scoped context cleanup, reduced-motion
  handling, and a static reveal fallback if the dynamic import fails.
- `src/components/frontpage/components/NewProductLaunchSection/AmbientBackgroundGlow.tsx#L12-L69`
  shows the decorative glow importing GSAP inside the effect and cleaning up
  its context.
- `src/components/frontpage/TestimonialConstellation.tsx#L16-L70` shows
  dynamic `gsap`/`ScrollTrigger` import and context cleanup; lines 82-99 show
  the touched badge no longer uses an uppercase transform.
- `src/components/BrandComponents/utils/UtekosWordmark.tsx#L1-L15` shows no
  static GSAP import in the wordmark component; it only emits optional
  animation classes.
- `src/components/providers/Providers.tsx#L16-L24` shows React Query DevTools
  still loaded only in development through `next/dynamic({ ssr: false })`.
- `src/components/providers/Providers.tsx#L42-L58`,
  `src/clients/CartMutationProvider.tsx#L20-L38`,
  `src/lib/context/CartMutationContext.ts#L31-L42`,
  `src/components/ProductCard/ProductCard.tsx#L38-L77`, and
  `src/components/cart/CartLineItem.tsx#L32-L58` show cart mutation state is
  used outside the drawer-only path.

## Changes

### Motion icon imports

Implementation: the `animate-icons` package imports were moved from
`framer-motion` to `motion/react`, and `next.config.ts` now includes both
`motion` and `framer-motion` in the existing `experimental.optimizePackageImports`
list. Motion's package docs say React users should import from `motion/react`
instead of `framer-motion`, and Next.js docs say `optimizePackageImports` only
loads used modules for configured packages with many exports
(`node_modules/motion/README.md#L42-L55`,
`https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports.md#L16-L20`).
The local icon wrapper and representative icons now import from `motion/react`,
and the config includes both package names
(`src/components/animate-icons/icons/icon.tsx#L1-L10`,
`src/components/animate-icons/icons/smile.tsx#L1-L5`,
`src/components/animate-icons/icons/chart-bar.tsx#L1-L11`,
`next.config.ts#L17-L40`).

Why the config stays under `experimental`: the project already uses
`experimental.optimizePackageImports`, and the current Next.js docs still mark
that feature experimental while documenting the `experimental` config shape
(`https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports.md#L16-L28`,
`next.config.ts#L17-L40`).

### Dynamic GSAP imports

Implementation: the homepage/mobile-menu GSAP users in this slice now import
`gsap` and `ScrollTrigger` inside effects instead of static module imports.
Next.js lazy-loading docs say lazy loading can defer Client Components and
imported libraries until needed, and they show external libraries loaded on
demand with dynamic `import()`; GSAP's React docs show `gsap.context()` with
cleanup via `ctx.revert()`
(`https://nextjs.org/docs/app/guides/lazy-loading.md#L14-L23`,
`https://nextjs.org/docs/app/guides/lazy-loading.md#L100-L102`,
`node_modules/@gsap/react/README.md#L7-L10`,
`node_modules/@gsap/react/README.md#L19-L24`).
The local mobile menu, product launch hook, ambient glow, and testimonial
section all now use effect-local dynamic imports and cleanup contexts
(`src/components/header/MobileMenu/MobileMenuPanel.tsx#L37-L116`,
`src/hooks/useNewProductLaunchAnimations.ts#L15-L132`,
`src/components/frontpage/components/NewProductLaunchSection/AmbientBackgroundGlow.tsx#L12-L69`,
`src/components/frontpage/TestimonialConstellation.tsx#L16-L70`).

Why the wordmark was not changed: the Fase 3 plan listed `UtekosWordmark`, but
the local component has no static GSAP import to move; it only adds optional
`gsap-char` classes when `animated` is true
(`/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L47-L48`,
`src/components/BrandComponents/utils/UtekosWordmark.tsx#L1-L15`).

### XState and DevTools assessment

Implementation: I did not move XState/cart mutation state behind drawer-open
lazy loading in this pass. The local cart mutation provider wraps the app
children, product cards use the actor for quick-buy before the drawer opens,
and cart line items use the same actor for quantity changes; moving this safely
requires a broader cart architecture pass rather than a mechanical defer
(`src/components/providers/Providers.tsx#L42-L58`,
`src/clients/CartMutationProvider.tsx#L20-L38`,
`src/components/ProductCard/ProductCard.tsx#L38-L77`,
`src/components/cart/CartLineItem.tsx#L32-L58`). This keeps the phase aligned
with the plan's instruction to confirm whether these machines are needed before
hydration before deferring them
(`/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L49-L50`).

React Query DevTools stayed unchanged because it is already development-only
and dynamically imported with `ssr: false`
(`src/components/providers/Providers.tsx#L16-L24`).

## Validation

- `rg -l "from ['\"]motion/react['\"]" src/components/animate-icons | wc -l`
  returned `43`.
- `rg -n "from ['\"]framer-motion['\"]" src/components/animate-icons` returned
  no matches.
- `npx tsc --noEmit --pretty false` passed.
- `npm run lint -- next.config.ts src/components/header/MobileMenu/MobileMenuPanel.tsx src/components/frontpage/TestimonialConstellation.tsx src/hooks/useNewProductLaunchAnimations.ts src/components/frontpage/components/NewProductLaunchSection/AmbientBackgroundGlow.tsx src/components/animate-icons`
  passed.
- `npm run build` passed with Next.js 16.2.3, Turbopack, and Cache Components.

## Not Applied In This Slice

- `motion/react-client` was not used for the icon rewrite because the current
  icon components import Motion hooks and types as well as the `motion`
  component, while Motion's local package entry documents the `motion/react`
  React import path and the installed `motion/react` entry re-exports the
  expected API surface (`node_modules/motion/README.md#L42-L55`,
  `node_modules/motion/dist/react.d.ts#L1-L2`,
  `src/components/animate-icons/icons/icon.tsx#L1-L10`).
- `npm run analyze` and PageSpeed reruns were not run in this slice. The phase
  plan places bundle analyzer and PageSpeed verification in Fase 4 after phase
  implementation
  (`/Users/kristofferohnstadhjelmeland/Library/Application Support/Code/User/workspaceStorage/7452d533ab5157f465d5135746cbe9f5/GitHub.copilot-chat/memory-tool/memories/YWI4OTJkZmQtZjQ5NS00ZDA2LWIxYTAtMDhkYWI0OWNlNzU0/plan.md#L54-L59`).
