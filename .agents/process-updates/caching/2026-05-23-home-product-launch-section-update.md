# Home product launch section update

Date: 2026-05-23

## Scope

This note records the optimization pass for the first section after the home
hero:

- `src/components/frontpage/AsyncProductLaunchWrapper.tsx`
- `src/components/frontpage/components/NewProductLaunchSection/NewProductLaunchSection.tsx`
- `src/components/frontpage/components/NewProductLaunchSection/ImageColumn.tsx`

## Changes

### Cached server wrapper cleanup

File: `src/components/frontpage/AsyncProductLaunchWrapper.tsx`

- Added explicit `cacheLife('hours')` next to the existing
  `cacheTag('products')`.
- Removed the server-side `QueryClient` instance.
- Replaced `prefetchQuery()` + `getQueryData()` with a direct
  `await getFeaturedProducts()` call.

Why:

- Documentation basis: `nextconfig/next-config-js/cacheComponents.md` says the
  `cacheComponents` flag enables component and function-level caching with the
  `use cache` directive, and that data fetching is dynamic by default while you
  choose what to cache at the page, component, or function level.
- Documentation basis: `next/essentials/cache/use-cache-remote.md` shows static
  product data using `'use cache'` with `cacheTag(...)`, and shared runtime data
  using `cacheLife(...)` with `cacheTag(...)`.
- Code evidence: `AsyncProductLaunchWrapper` reads featured products, finds the
  product where `handle === 'utekos-techdown'`, derives one available variant
  id, returns `null` if that id is missing, and otherwise renders
  `NewProductLaunchSection variantId={techDownId}`. This is app-specific local
  evidence, not a documentation claim.
- Decision: because no TanStack Query state is dehydrated or passed to the
  client in this wrapper, using `QueryClient.prefetchQuery()` only to read the
  result back on the server adds an intermediate cache object without supporting
  a documented client hydration use case in this slice.

### Deferred quick-view modal code

File:
`src/components/frontpage/components/NewProductLaunchSection/NewProductLaunchSection.tsx`

- Replaced the static `QuickViewModal` import with a `next/dynamic` named
  import.
- Removed the hidden `Activity` wrapper around the closed modal.
- Rendered `QuickViewModal` only when `isModalOpen` is true.

Why:

- Documentation basis: React `src/content/reference/react/Activity.md` says
  hidden mode renders children at lower priority without mounting their Effects,
  and that this allows the component to load code or data ahead of time.
- Documentation basis: the same React Activity reference says Activity
  boundaries can prepare content the user has not seen yet, so it appears faster
  later with reduced loading time.
- Documentation basis: `next/official-updated-docs/guides/lazy-loading.md` shows
  a Client Component imported with `next/dynamic` and rendered only when a state
  condition is met, described as loading on demand only when/if the condition is
  met.
- Code evidence: in this section, `QuickViewModal` is closed until
  `handleQuickViewClick` sets `isModalOpen` to true. That makes on-demand
  dynamic rendering the documented lazy-loading fit, while `Activity hidden`
  would intentionally prepare the modal before the user asks for it.

### Product carousel image delivery

File:
`src/components/frontpage/components/NewProductLaunchSection/ImageColumn.tsx`

- Removed `priority` from the first carousel image.
- Lowered carousel image `quality` from `95` to `80`.
- Removed the now-unused `index` argument from the image map.

Why:

- Documentation basis: `next/academy/next-image.md` says to use image priority
  for images critical to Largest Contentful Paint, such as hero images, and to
  omit priority for below-the-fold images so automatic lazy loading applies.
- Documentation basis: `next/academy/advanced-image-optimization.md` says the
  Next.js 16 replacement for `priority` is `preload`, and that it is for images
  critical for LCP and above the fold.
- Code evidence: `src/app/(home)/page.tsx` renders `HeroSection` before this
  product launch section, and this carousel is inside the section after the
  hero. The inspected image files are PNGs, including
  `public/1080/utekos-techdown.png` at about 1.4 MB.
- Decision: this carousel is not the documented LCP/above-the-fold priority
  target, so removing priority and lowering optimized quality reduces pressure
  from a later section without changing layout or semantics.

## Documentation sources used

- `nextconfig/next-config-js/cacheComponents.md`: states that `cacheComponents`
  enables component and function-level caching with `use cache`, while data
  fetching is dynamic by default and caching is chosen at the page, component,
  or function level.
- `next/essentials/cache/use-cache-remote.md`: shows static product data using
  `'use cache'` and `cacheTag(...)`, shared runtime data using `cacheLife(...)`
  and `cacheTag(...)`, and user-specific data using `'use cache: private'`.
- `next/official-updated-docs/guides/lazy-loading.md`: shows `next/dynamic`
  Client Components, including a component that loads on demand only when a
  state condition is met.
- `next/academy/next-image.md`: states that image priority is for images
  critical to LCP, such as hero images, and that below-the-fold images should
  omit priority so they lazy load.
- `next/academy/advanced-image-optimization.md`: states that in Next.js 16 the
  `priority` prop is deprecated in favor of `preload` for LCP-critical,
  above-the-fold images.
- React `src/content/reference/react/Activity.md`: states that hidden Activity
  renders children at lower priority without mounting Effects and can load code
  or data ahead of time.
- React `src/content/reference/react/hooks.md`: lists `useEffectEvent` as a
  non-reactive event fired from an Effect and `useDeferredValue` as a way to
  defer non-critical UI updates.

## Local code evidence checked

- `AsyncProductLaunchWrapper` only passes `variantId` into
  `NewProductLaunchSection`; no dehydrated TanStack Query state crosses this
  boundary.
- `NewProductLaunchSection` opens `QuickViewModal` only after
  `handleQuickViewClick` sets `isModalOpen` to true.
- `src/app/(home)/page.tsx` renders `HeroSection` before this product launch
  section.
- The product launch carousel source images are PNGs, with
  `public/1080/utekos-techdown.png` roughly 1.4 MB.

## Validation

- `node ./.agents/skills/next-compile/scripts/check.mjs 3000` passed after the
  dynamic modal split.
- `node ./.agents/skills/next-compile/scripts/check.mjs 3000` passed after the
  cached wrapper cleanup.
- `node ./.agents/skills/next-compile/scripts/check.mjs 3000` passed after the
  image delivery changes.
- `npm run lint -- src/components/frontpage/AsyncProductLaunchWrapper.tsx src/components/frontpage/components/NewProductLaunchSection/NewProductLaunchSection.tsx src/components/frontpage/components/NewProductLaunchSection/ImageColumn.tsx`
  passed.
- Runtime browser check passed: `#featured-product` rendered, clicking
  `Legg i handlekurv` opened the dynamically loaded quick-view dialog, and the
  dialog was closed afterward.

## Notes

- `use cache: private`, `use cache: remote`, custom `cacheHandlers`, and
  `updateTag` were not applied here. The wrapper uses shared product data, not
  user-specific data, and no mutation occurs in this slice.
- `useDeferredValue` was not applied because this section has no expensive
  user-typed input or deferred search/result UI.
- `useEffectEvent` was already present in `QuickViewModal` for the fetch error
  path and did not need changes in this pass.
