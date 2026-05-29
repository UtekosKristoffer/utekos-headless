# Home tracking & below-fold lazy-load update

Date: 2026-05-23 Run id: `2026-05-23-171207` Scope: Homepage TBT/JS-evaluation
remediation, Phase 1 (root layout & tracking) and Phase 2 (below-the-fold client
section lazy-loading).

## Documentation Sources Used

- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L21-L34`
  — `next/dynamic` is a composite of `React.lazy()` + Suspense; lazy loading
  applies to Client Components.
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L36-L67`
  — `dynamic({ ssr: false })` example inside a Client Component for client-only
  loading.
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L69-L80`
  — `ssr: false` only works in Client Components; must be moved into a Client
  Component to ensure client code-splitting works.
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L99-L107`
  — `ssr: false` is not supported in Server Components and throws an error.
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L137-L160`
  — `dynamic(..., { loading: () => <Placeholder /> })` for a custom loading
  fallback while the chunk is being fetched.
- `UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L164-L177`
  — Importing named exports via `import('...').then(mod => mod.Name)`.
- `UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L97-L141` —
  `afterInteractive` is the recommended default for analytics, chat widgets,
  payment forms, social embeds, A/B testing. Loads after the page is
  interactive, minimal user-facing delay.
- `UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L143-L181` —
  `lazyOnload` is the lowest-priority strategy: "non-essential chat widgets,
  social media share buttons, comment systems, background metrics collection,
  optional features users may not interact with". Lowest priority, loads after
  everything else, zero impact on core functionality.
- `UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L207-L221` —
  Optional (lazyOnload) classification explicitly includes Twitter/Facebook
  social embeds, background metrics, and "non-essential widgets".

## Local Evidence Checked

- `pagespeed-raport/2026-05-23-171207-homepage-rerun-status.md#L51-L60` records
  the fresh JS-analysis baseline: mobile total JS execution 7 406 ms, script
  evaluation 2 965 ms, style/layout 1 809 ms, unused JS 242,4 KB.
- `pagespeed-raport/2026-05-23-171207-homepage-rerun-status.md#L64-L74` records
  the root-script footprint findings, naming GTM, Microsoft UET, Meta Pixel,
  click tracking, visitor analytics, Vercel Analytics, and the ChatBot still
  mounting from `src/app/layout.tsx`.
- `pagespeed-raport/2026-05-23-171207-homepage-rerun-status.md#L100-L106` lists
  the recommended next work: keep ChatBot lazy-loaded, re-check GTM/Meta
  Pixel/UET/click tracking/visitor analytics for consent gating and delayed
  loading.
- `src/app/layout.tsx#L8-L21` (post-change) shows the root-layout imports now
  using `TrackingRoot` (consolidated tracking) and removing the earlier
  `ClickTracker`, `VisitorAnalyticsTracker`, and `MetaPixelEvents` direct
  mounts.
- `src/app/layout.tsx#L120-L140` (post-change) shows GTM bootstrap kept
  `afterInteractive` in `<head>`, `MicrosoftUetTag` kept (already consent-gated
  upstream), and the body now mounts a single `<TrackingRoot />` instead of two
  separate islands.
- `src/components/analytics/MicrosoftUetTag.tsx#L17-L65` is the existing
  reference pattern: marketing-consent check via `utekos_cookie_consent` /
  `cookie-consent` before pushing `ad_storage: 'granted' | 'denied'`. The new
  `MarketingPixels` wrapper follows the same gate at the React level instead of
  inside an inline script.
- `src/components/analytics/MarketingPixels.tsx#L1-L34` is the new consent-gated
  wrapper for Meta + Snap + Pinterest + TikTok. Wraps the four `'use client'`
  pixel components and renders `null` until `useConsentFor('marketing')` returns
  `true`. Keeps the Meta env gate (`NEXT_PUBLIC_META_PIXEL_ID` +
  production/test-event) intact.
- `src/components/analytics/TrackingRoot.tsx#L1-L22` is the new consolidated
  client island that combines `ClickTracker` and `VisitorAnalyticsTracker` into
  a single `'use client'` boundary.
- `src/components/providers/Providers.tsx#L11-L16` and
  `src/components/providers/Providers.tsx#L60-L75` (post-change) now render
  `<MarketingPixels />` once inside the existing `CookieConsentProvider`,
  replacing three separate ungated pixel mounts (`SnapPixel`, `PinterestTag`,
  `TikTokPixel`).
- `src/components/analytics/Meta/MetaPixelEvents.tsx#L26-L36` (post-change)
  shows the base `fbevents.js` loader switched from
  `strategy='afterInteractive'` to `strategy='lazyOnload'`.
- `src/components/analytics/SnapPixel/SnapPixel.tsx#L26-L32` (post-change) shows
  the Snap base loader switched to `lazyOnload`.
- `src/components/analytics/TikTokPixel/TikTokPixel.tsx#L21-L27` (post-change)
  shows the TikTok base loader switched to `lazyOnload`.
- `src/components/chat/ChatBotAgent/source-code.tsx#L21-L29` confirms
  ChatBotAgent already uses `strategy='lazyOnload'` with a script-tag-only
  Chatbase loader (no runtime in the client bundle). Left as-is.
- `src/app/(home)/page.tsx#L1-L56` (post-change) shows
  `NewProductInStoreNotice`, `NewStandardSection`, `TestimonialConstellation`,
  and `PromiseSection` now mounted via lazy wrappers.
- `src/components/frontpage/lazy/LazyHeavyClients.tsx#L1-L65` is the new client
  file exporting four
  `dynamic(() => import(...), { ssr: false, loading: () => <placeholder /> })`
  wrappers.
- `src/components/frontpage/components/CachedPromiseSection.tsx#L1-L11`
  (post-change) keeps `'use cache'`, `cacheLife('days')`, and
  `cacheTag('static-sections', 'promise-section')` around the lazy
  `<LazyPromiseSection />` mount.
- Terminal verification: `curl -A 'Mozilla/5.0' http://localhost:3000/` returns
  HTTP 200 with the dev server running, confirming the homepage still renders
  after the changes.
- Terminal verification: `curl -sIL` against `https://utekos.no/` returns HTTP
  200 directly (no redirect chain on the root path).

## Changes

### Phase 1.1 Marketing pixels consent gate

Implementation: created `src/components/analytics/MarketingPixels.tsx` as a
`'use client'` wrapper that checks `useConsentFor('marketing')` and only renders
`MetaPixelEvents`, `SnapPixel`, `PinterestTag`, and `TikTokPixel` when the user
has granted marketing consent. The Meta env gate (`NEXT_PUBLIC_META_PIXEL_ID` +
production or test-event code) moved into the wrapper.

Why: The Microsoft UET tag is already consent-gated using the same
`utekos_cookie_consent` / `cookie-consent` storage
(`src/components/analytics/MicrosoftUetTag.tsx#L17-L65`). Aligning the four
marketing pixels to the same gate matches the documented behavior of "optional"
/ "non-essential" widgets that should not run before consent
(`UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L143-L181`). This
removes pixel script evaluation from the main thread for all first visits before
consent.

### Phase 1.2 Marketing pixels lazyOnload

Implementation: switched the base loader scripts for Meta, Snap, and TikTok from
`strategy='afterInteractive'` to `strategy='lazyOnload'`
(`src/components/analytics/Meta/MetaPixelEvents.tsx#L26-L36`,
`src/components/analytics/SnapPixel/SnapPixel.tsx#L26-L32`,
`src/components/analytics/TikTokPixel/TikTokPixel.tsx#L21-L27`). Pinterest
already initialises through pure JS hooks (no `<Script>`), unchanged.

Why: The third-party scripts guide classifies social and tracking pixels that
the user "may not interact with" as the lowest-priority category and recommends
`lazyOnload` for them
(`UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L143-L181`,
`#L207-L221`). `lazyOnload` loads after everything else with zero impact on core
functionality, while `afterInteractive` still competes for main thread time
immediately after page interactivity
(`UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L97-L141`). GTM
bootstrap stays `afterInteractive` because it is a tag manager root that
downstream marketing scripts depend on, and
`UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L97-L141` explicitly
lists Google Analytics / GTM under the `afterInteractive` category.

### Phase 1.3 Tracking island consolidation

Implementation: created `src/components/analytics/TrackingRoot.tsx` as a single
`'use client'` component that renders `ClickTracker` and
`VisitorAnalyticsTracker`. Replaced the two separate mounts in
`src/app/layout.tsx#L139-L140` (pre-change) with one `<TrackingRoot />` mount
(`src/app/layout.tsx#L139` post-change).

Why: Each previously independent `'use client'` component became its own
hydration island, increasing the number of small client chunks. Lazy loading
guidance is centered on client component boundaries
(`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L21-L34`)
— collapsing two adjacent first-party tracking islands into one keeps the same
behavior (each child still attaches its own `useEffect`) with fewer boundaries
to hydrate.

### Phase 1.4 ChatBot verification

Implementation: read `src/components/chat/ChatBotAgent/source-code.tsx#L21-L29`
and confirmed it already uses `strategy='lazyOnload'` with a script-tag-only
Chatbase loader. No code change.

Why: This matches the documented `lazyOnload` classification for chat widgets
and non-essential UI
(`UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L143-L181`).

### Phase 1.5 Redirect chain check

Implementation: ran `curl -sIL -A 'Mozilla/5.0 ...' https://utekos.no/` and
observed a single HTTP/2 200 response with no `Location` header. No code change.

Why: PageSpeed continued to flag "avoid multiple page redirects" in the fresh
measurement
(`pagespeed-raport/2026-05-23-171207-homepage-rerun-status.md#L109-L113`), but
the homepage root has no chain on the apex domain. The remaining PSI flag
therefore originates from a sub-resource (likely a third-party endpoint), not
from the application surface.

### Phase 2.1 Lazy wrapper module for below-the-fold client sections

Implementation: created `src/components/frontpage/lazy/LazyHeavyClients.tsx` as
a `'use client'` file exporting four wrappers — `LazyNewProductInStoreNotice`,
`LazyPromiseSection`, `LazyNewStandardSection`, `LazyTestimonialConstellation` —
each built with
`dynamic(() => import('@/...').then(m => m.Name), { ssr: false, loading: () => <placeholder /> })`.
Placeholder elements use fixed min-heights (200, 600, 500, 800 px) to keep CLS
at 0 while chunks load.

Why: All four sections are already Client Components that pull GSAP (directly or
through animation hooks) or Embla Carousel + Autoplay into the initial bundle.
`next/dynamic({ ssr: false })` moves them into per-section chunks loaded after
hydration
(`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L36-L67`).
The `ssr: false` option only works from a Client Component, which is why the
file carries `'use client'`
(`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L69-L80`,
`#L99-L107`). The `loading` placeholder is the documented mechanism for custom
fallbacks while the chunk is fetched
(`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L137-L160`).
Named exports are resolved via `import('...').then(m => m.Name)` per the
named-export pattern
(`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L164-L177`).

### Phase 2.2 Wire homepage to lazy wrappers

Implementation: in `src/app/(home)/page.tsx#L1-L56` replaced the
`NewProductInStoreNotice`, `NewStandardSection`, and `TestimonialConstellation`
imports/mounts with their `Lazy*` counterparts. Replaced the inner
`<PromiseSection />` of `CachedPromiseSection` with `<LazyPromiseSection />`
(`src/components/frontpage/components/CachedPromiseSection.tsx#L1-L11`), keeping
the existing `'use cache'`, `cacheLife('days')`, and
`cacheTag('static-sections', 'promise-section')` envelope.

Why: The four sections accounted for GSAP + ScrollTrigger and Embla + Autoplay
imports inside the initial chunks named by the PageSpeed JS analysis
(`pagespeed-raport/2026-05-23-171207-homepage-rerun-status.md#L51-L60`,
`#L100-L106`). Splitting them out is the canonical lazy-loading remedy.
`MomentsSection` was intentionally left synchronous because its children
(`MomentsHeader` `'use client'`, `MomentCard` using `useInView`) are already
client-only and converting them would require a deeper refactor beyond the
current scope. The cached scope around `LazyPromiseSection` remains valid
because `LazyPromiseSection` is a Client Component returned from a Server
Component, which is allowed and recommended by the same guide
(`UtekosKristoffer/utekos-docs:next/official-updated-docs/guides/lazy-loading.md#L99-L116`).

## Verification

- `src/app/layout.tsx` shows `TrackingRoot` in place and the `MetaPixelEvents`
  direct mount removed.
- `src/components/providers/Providers.tsx` shows a single `<MarketingPixels />`
  mount replacing the three pre-existing pixel mounts.
- `src/components/analytics/MarketingPixels.tsx`,
  `src/components/analytics/TrackingRoot.tsx`,
  `src/components/frontpage/lazy/LazyHeavyClients.tsx` are new and pass
  TypeScript compilation with no errors.
- `src/app/(home)/page.tsx` and
  `src/components/frontpage/components/CachedPromiseSection.tsx` pass TypeScript
  compilation with no errors.
- Dev-server probe:
  `curl -sS -A 'Mozilla/5.0' -H 'Accept: text/html' -o /dev/null -w 'http=%{http_code} time=%{time_total}s\n' http://localhost:3000/`
  returned `http=200 time=1.301478s`.
- Redirect probe:
  `curl -sIL -A 'Mozilla/5.0 ...' https://utekos.no/ | grep -iE '^(HTTP|location|x-vercel)'`
  returned a single `HTTP/2 200` with no `location` header.

## Out of scope

- `MomentsSection` server conversion: blocked by `MomentsHeader` `'use client'`
  directive and `MomentCard` `useInView` hook; would require refactoring of the
  animation chain.
- GSAP dynamic-import-on-use refactor (planned for Phase 3).
- `xstate` cart deferred mount (planned for Phase 3).
- `optimizePackageImports` verification for `motion` / `framer-motion` (planned
  for Phase 3).
- Bundle analyzer comparison and follow-up PageSpeed run (planned for Phase 4).

## Expected impact

- Removes Meta + Snap + Pinterest + TikTok base scripts from the pre-consent
  main thread; only Microsoft UET style consent-gated initialization remains for
  users who have not granted marketing consent.
- For users who do grant marketing consent, the four base loaders now run with
  `lazyOnload`, moving their evaluation outside the TBT window.
- The four below-fold client sections move into per-route lazy chunks, trimming
  the initial JS evaluated before/around FCP.
- TBT and total JS execution should drop on mobile; LCP should not regress
  because the hero remains a cached server component with the same eager image.
