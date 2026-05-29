# Home header and hero cache update

Date: 2026-05-23

## Scope

This note records the home page header and hero pass. Local evidence: the home
page renders `HeroSection`, then the product launch section inside `Activity`
and `Suspense` (`src/app/(home)/page.tsx#L19-L25`); `Header` renders
`HeaderSearch`, `Cart`, and `ClientMobileMenu` in the header control area
(`src/components/header/Header.tsx#L25-L33`).

## Documentation Sources Used

- `UtekosKristoffer/utekos-docs:nextconfig/next-config-js/cacheComponents.md#L0-L61`
- `UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache.md#L32-L76`
- `UtekosKristoffer/utekos-docs:next/cache/cacheLife.md#L25-L56`
- `UtekosKristoffer/utekos-docs:next/cache/cacheLife.md#L141-L151`
- `UtekosKristoffer/utekos-docs:next/api-reference/functions/cache-tag.md#L24-L66`
- `UtekosKristoffer/utekos-docs:next/api-reference/functions/cache-tag.md#L110-L150`
- `UtekosKristoffer/utekos-docs:next/academy/next-image.md#L48-L64`
- `UtekosKristoffer/utekos-docs:next/academy/next-image.md#L278-L285`
- `UtekosKristoffer/utekos-docs:next/academy/advanced-image-optimization.md#L195-L249`
- `UtekosKristoffer/utekos-docs:next/academy/advanced-image-optimization.md#L425-L451`
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L0-L18`
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L30-L76`
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L133-L177`
- `UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L22-L60`
- `UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L179-L218`
- `UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L330-L372`
- `UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache-private.md#L0-L21`
- `UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache-private.md#L39-L65`
- `UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache-remote.md#L22-L65`
- `UtekosKristoffer/utekos-docs:next/essentials/cache/cacheHandlers.md#L0-L19`
- `UtekosKristoffer/utekos-docs:next/api-reference/functions/updateTag.md#L18-L26`
- `UtekosKristoffer/utekos-docs:next/api-reference/functions/updateTag.md#L58-L73`

## Local Evidence Checked

- `next.config.ts#L13-L15` shows typed routes, React Compiler, and
  `cacheComponents: true`; `next.config.ts#L41-L50` shows the image quality
  allowlist.
- `src/components/frontpage/components/HeroSection/HeroSection.tsx#L1-L9` shows
  `'use cache'`, `cacheLife('days')`, and
  `cacheTag('static-sections', 'home-hero')`.
- `src/components/frontpage/components/HeroSection/HeroImage.tsx#L1-L13` shows
  static image imports, `getImageProps`, `fetchPriority: 'high'`,
  `loading: 'eager'`, `quality: 80`, and `sizes`.
- `src/components/frontpage/components/HeroSection/HeroImage.tsx#L38-L50` shows
  the aspect-ratio wrapper, `<picture>` sources, and fallback `<img>`.
- `src/components/frontpage/components/HeroSection/SocialProofCard.tsx#L27-L35`
  shows the solid social proof card surface without `backdrop-blur-md`.
- `src/components/header/Header.tsx#L13-L33` shows the solid sticky header
  surface and header controls.
- `src/components/header/HeaderLogo.tsx#L14-L20` shows the logo image using
  `loading='eager'` without `priority`.
- `src/components/header/ClientDesktopNavigation.tsx#L7-L43` shows the desktop
  media-query gate, named dynamic import, subscription, and render branch.
- `src/components/header/ClientMobileMenu.tsx#L8-L49` shows the mobile
  media-query gate, named dynamic import, loading placeholder, subscription, and
  reserved non-mobile placeholder.
- `src/components/cart/Cart.tsx#L7-L22` shows the cart snapshot functions,
  `useSyncExternalStore`, and reserved placeholder.
- `src/components/header/HeaderSearch/HeaderSearch.tsx#L25-L35` shows an
  existing local `useSyncExternalStore` mounted-state pattern in the header.
- `ga_docs/skills/gsap/SKILL.md#L479-L496` documents applying `will-change`
  before animation and resetting it afterward.
- `pagespeed-raport/mobile/performance.md#L2648-L2656` records the local
  PageSpeed warning that non-composited animations can be poor, slow, and
  increase CLS.
- `pagespeed-raport/mobile/performance.md#L2686-L2686` records a local
  filter-related moving-pixels warning.
- `pagespeed-raport/fix-one.md#L220-L226` records the local layout-shift note
  about elements moving or being added/removed without user interaction.

## Changes

### Hero Section Cache Boundary

Implementation: kept the existing `'use cache'` boundary and added
`cacheLife('days')` plus `cacheTag('static-sections', 'home-hero')` in
`src/components/frontpage/components/HeroSection/HeroSection.tsx`.

Why: Cache Components enables component/function-level caching with `use cache`;
`cacheComponents: true` enables `use cache`, `cacheLife`, and `cacheTag`;
`cacheLife` must run inside a cache directive scope; and the docs recommend
explicit profiles so cache behavior is clear
(`UtekosKristoffer/utekos-docs:nextconfig/next-config-js/cacheComponents.md#L0-L37`,
`UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache.md#L32-L76`,
`UtekosKristoffer/utekos-docs:next/cache/cacheLife.md#L25-L56`,
`UtekosKristoffer/utekos-docs:next/cache/cacheLife.md#L141-L151`). The local
component now keeps that cache behavior in the cached hero scope
(`src/components/frontpage/components/HeroSection/HeroSection.tsx#L1-L9`).

Why the tag was added: `cacheTag` is documented for tagging cached components or
functions and accepting one or more string tags for later invalidation
(`UtekosKristoffer/utekos-docs:next/api-reference/functions/cache-tag.md#L24-L66`,
`UtekosKristoffer/utekos-docs:next/api-reference/functions/cache-tag.md#L110-L150`),
and the local hero scope now carries `static-sections` and `home-hero` tags
(`src/components/frontpage/components/HeroSection/HeroSection.tsx#L7-L9`).

### Hero Image And Social Proof Paint Work

Implementation: removed permanent `will-change-transform` from the hero image
wrapper; kept static imports, `getImageProps()` art direction,
`fetchPriority: 'high'`, `loading: 'eager'`, `quality: 80`, and responsive
`sizes`; removed `backdrop-blur-md` from the social proof card surface.

Why the image path stayed: the image docs identify hero/LCP images as early-load
candidates, document `getImageProps()` with `<picture>` for art direction, and
warn that Next.js 16 uses `preload` instead of `priority` while also saying not
to use `preload` together with `loading` or `fetchPriority`
(`UtekosKristoffer/utekos-docs:next/academy/next-image.md#L48-L64`,
`UtekosKristoffer/utekos-docs:next/academy/advanced-image-optimization.md#L195-L249`,
`UtekosKristoffer/utekos-docs:next/academy/advanced-image-optimization.md#L425-L451`).
The local hero image uses `getImageProps`, `fetchPriority`, `loading`,
`quality: 80`, `sizes`, and a `<picture>` wrapper, with `80` allowed in the
project image config
(`src/components/frontpage/components/HeroSection/HeroImage.tsx#L1-L13`,
`src/components/frontpage/components/HeroSection/HeroImage.tsx#L38-L50`,
`next.config.ts#L41-L50`).

Why `will-change-transform` was removed: the local GSAP/performance note shows
`will-change` being applied before animation and reset afterward, and the local
PageSpeed report points at non-composited animation and filter-related risk
areas (`ga_docs/skills/gsap/SKILL.md#L479-L496`,
`pagespeed-raport/mobile/performance.md#L2648-L2656`,
`pagespeed-raport/mobile/performance.md#L2686-L2686`). The hero wrapper now
reserves aspect ratio without a permanent `will-change` class
(`src/components/frontpage/components/HeroSection/HeroImage.tsx#L38-L50`).

Why `backdrop-blur-md` was removed: the local social proof card remains a solid
surface in code, and the local report gave enough evidence to remove avoidable
filter-style work in this hero slice
(`src/components/frontpage/components/HeroSection/SocialProofCard.tsx#L27-L35`,
`pagespeed-raport/mobile/performance.md#L2686-L2686`).

### Header Paint Work

Implementation: replaced the translucent/backdrop-blur sticky header surface
with a solid `bg-maritime-blue` surface in `src/components/header/Header.tsx`.

Why: the header now uses a solid sticky class in the local code, and the local
reports identify compositing/filter-related areas as performance risks in this
project (`src/components/header/Header.tsx#L13-L33`,
`pagespeed-raport/mobile/performance.md#L2648-L2656`,
`pagespeed-raport/mobile/performance.md#L2686-L2686`).

### Header Logo Loading

Implementation: replaced `priority` with `loading='eager'` on the small logo
image in `src/components/header/HeaderLogo.tsx`.

Why: the docs place priority/preload-style treatment on above-fold LCP
candidates and say Next.js 16 deprecates `priority` in favor of `preload`; the
same Next.js 16 note says not to use `preload` when using `loading` or
`fetchPriority` props
(`UtekosKristoffer/utekos-docs:next/academy/next-image.md#L48-L64`,
`UtekosKristoffer/utekos-docs:next/academy/advanced-image-optimization.md#L425-L451`).
The local logo is a `58x58` image using `loading='eager'`, while the larger hero
visual carries the art-directed early-load path
(`src/components/header/HeaderLogo.tsx#L14-L20`,
`src/components/frontpage/components/HeroSection/HeroImage.tsx#L6-L13`,
`src/components/frontpage/components/HeroSection/HeroImage.tsx#L38-L50`).

### Header Client Island Gating

Implementation: added `useSyncExternalStore` media-query gates before rendering
the dynamic desktop navigation and mobile menu imports; desktop navigation now
renders only for `(min-width: 1024px)`; mobile menu now renders only for
`(max-width: 1023.98px)` and keeps a reserved `size-11` placeholder outside the
active mobile branch.

Why: Next.js lazy-loading docs say lazy loading decreases the JavaScript needed
to render a route, defers Client Components/libraries, includes them only when
needed, and supports conditional dynamic Client Component loading with
`ssr: false` in Client Components
(`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L0-L18`,
`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L30-L76`).
React docs describe `useSyncExternalStore` for reading external/browser-owned
values with `subscribe`, `getSnapshot`, and `getServerSnapshot`
(`UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L22-L60`,
`UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L179-L218`,
`UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L330-L372`).
The local desktop and mobile wrappers implement those media-query snapshots and
dynamic render branches
(`src/components/header/ClientDesktopNavigation.tsx#L7-L43`,
`src/components/header/ClientMobileMenu.tsx#L8-L49`).

### Cart Hydration Stability

Implementation: replaced mount-time `useEffect` plus `setState` with
`useSyncExternalStore`, and replaced the pre-mount `null` return with an
aria-hidden `size-11` placeholder in `src/components/cart/Cart.tsx`.

Why: React docs say `useSyncExternalStore` reads an external snapshot and that
`getServerSnapshot` provides the server/hydration snapshot before the app is
interactive
(`UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L22-L60`,
`UtekosKristoffer/utekos-docs:react/hooks/useSyncExternalStore.md#L330-L372`).
The local cart now defines snapshot functions, uses `useSyncExternalStore`, and
keeps a same-size placeholder; the local layout-shift note says shifts occur
when elements move or are added/removed without user interaction
(`src/components/cart/Cart.tsx#L7-L22`,
`pagespeed-raport/fix-one.md#L220-L226`).

## Validation

- `node ./.agents/skills/next-compile/scripts/check.mjs 3000` passed after the
  hero changes.
- `node ./.agents/skills/next-compile/scripts/check.mjs 3000` passed after the
  header/cart changes.
- `npm run lint -- src/components/header/Header.tsx src/components/header/HeaderLogo.tsx src/components/header/ClientDesktopNavigation.tsx src/components/header/ClientMobileMenu.tsx src/components/cart/Cart.tsx`
  passed.
- Focused lint for the hero files passed.

## Not Applied In This Slice

- `use cache: private` was not applied because this slice did not add a cached
  function that accesses runtime request APIs or user-specific values; the docs
  describe `use cache: private` for functions that access runtime request APIs
  (`UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache-private.md#L0-L21`,
  `UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache-private.md#L39-L65`).
- `use cache: remote` and custom `cacheHandlers` were not applied because this
  slice did not introduce remote shared cache storage; the docs describe remote
  cache as durable shared storage with infrastructure/network tradeoffs and
  `cacheHandlers` as custom storage implementations
  (`UtekosKristoffer/utekos-docs:next/essentials/cache/use-cache-remote.md#L22-L65`,
  `UtekosKristoffer/utekos-docs:next/essentials/cache/cacheHandlers.md#L0-L19`).
- `updateTag` was not applied because this slice did not add a Server Action
  mutation requiring read-your-own-writes invalidation; the docs say `updateTag`
  can only be called from Server Actions and is for immediate cache expiration
  after user writes
  (`UtekosKristoffer/utekos-docs:next/api-reference/functions/updateTag.md#L18-L26`,
  `UtekosKristoffer/utekos-docs:next/api-reference/functions/updateTag.md#L58-L73`).
- `useEffectEvent` and `useDeferredValue` were not applied because this slice
  did not add effect-event synchronization or deferred input rendering; this is
  a local-scope statement based on the changed files, especially the media-query
  and cart changes (`src/components/header/ClientDesktopNavigation.tsx#L17-L43`,
  `src/components/header/ClientMobileMenu.tsx#L21-L49`,
  `src/components/cart/Cart.tsx#L7-L22`).
