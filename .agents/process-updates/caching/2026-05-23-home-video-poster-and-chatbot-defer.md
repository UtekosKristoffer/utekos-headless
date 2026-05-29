# Home video poster and ChatBotAgent script defer

Date: 2026-05-23

## Scope

This note records two changes targeted at the mobile PageSpeed regressions on
the home page: (1) the `<video poster>` source used by the home video section
was pointing at a 905 KB image that PageSpeed continued to flag as the largest
resource on the page, and (2) the chatbase loader script ran on
`afterInteractive`, which puts it on the same priority lane as the GTM bootstrap
during initial hydration. Local evidence: the home page renders
`ProductVideoSection` inside an `Activity` wrapper
(`src/app/(home)/page.tsx#L28-L31`); `ProductVideoSection` passes
`VIDEO_POSTER_URL` to the `<video poster>` attribute via `ProductVideoPlayer`
(`src/app/produkter/(oversikt)/components/ProductVideoSection.tsx#L4`,
`src/app/produkter/(oversikt)/components/ProductVideoSection.tsx#L20`); the chat
bot loader is mounted from the root layout (`src/app/layout.tsx#L155`).

## Documentation Sources Used

- `UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L0-L20`
- `UtekosKristoffer/utekos-docs:webdev/LCP.md` (poster image on an embedded
  video is treated as an LCP candidate)
- `UtekosKristoffer/utekos-docs:next/academy/next-image.md` (responsive image
  sizing and verifying mobile vs desktop images load correctly)
- `UtekosKristoffer/utekos-docs:next/academy/advanced-image-optimization.md`
  (different images per viewport, not just different sizes)

## Local Evidence Checked

- `pagespeed-raport/2026-05-23-homepage-status.md#L67-L83` records
  `linn-kate-kikkert.webp` at 905.0 KB as the largest resource on both mobile
  and desktop in the 2026-05-23 audit.
- `pagespeed-raport/fix-one.md#L174-L183` records the same 905 KB asset is the
  `<video poster>` source via
  `poster="https://utekos.no/linn-kate-kikkert.webp"`.
- `src/api/constants/index.ts#L87-L90` and `src/constants/index.ts#L124-L127`
  defined `VIDEO_POSTER_URL` and `VIDEO_THUMBNAIL_URL` both pointing at the same
  905 KB file before this change.
- `src/app/produkter/(oversikt)/components/ProductVideoPlayer.tsx#L1-L11` shows
  `<video autoPlay muted loop playsInline poster={poster} preload='metadata'>`,
  which causes the browser to fetch the poster image eagerly when the video
  element mounts.
- `src/components/chat/ChatBotAgent/source-code.tsx#L23-L31` shows the chatbase
  inline bootstrap script.
- `src/components/analytics/BrandArmorScript.tsx#L17` and
  `src/components/analytics/BrandArmorScript.tsx#L28` already use
  `strategy='lazyOnload'` for third-party tracking, which is the same
  recommended strategy for the chatbase loader.
- `public/linn-kate-kikkert.webp` is 3200×2133, 926 KB on disk (source asset
  used for SEO/JSON-LD `thumbnailUrl`).
- `public/linn-kate-kikkert-960.webp` was generated from the same source at
  960×640, q78 WebP, 69.3 KB on disk, for the `<video poster>` use case only.

## Changes

### Video poster source

Implementation: split the previously merged constant. `VIDEO_THUMBNAIL_URL`
still points at `https://utekos.no/linn-kate-kikkert.webp` for VideoObject
JSON-LD `thumbnailUrl`, and `VIDEO_POSTER_URL` now points at
`https://utekos.no/linn-kate-kikkert-960.webp`
(`src/api/constants/index.ts#L87-L90`, `src/constants/index.ts#L124-L127`).
`ProductVideoSection` continues to pass `VIDEO_POSTER_URL` to
`ProductVideoPlayer`
(`src/app/produkter/(oversikt)/components/ProductVideoSection.tsx#L4`,
`src/app/produkter/(oversikt)/components/ProductVideoSection.tsx#L20`).
`/video/tensorpix` was updated to use `VIDEO_POSTER_URL` instead of
`VIDEO_THUMBNAIL_URL` so the standalone video page benefits from the same
reduction (`src/app/video/tensorpix/page.tsx#L1-L11`).

Why: the home page audit reports the same WebP file at 905 KB and PageSpeed
flags it as the largest resource on mobile and desktop on 2026-05-23
(`pagespeed-raport/2026-05-23-homepage-status.md#L67-L83`,
`pagespeed-raport/fix-one.md#L174-L183`). The Vercel academy LCP note states
that a poster image on an embedded video is part of the LCP user experience and
should be measured as such (`UtekosKristoffer/utekos-docs:webdev/LCP.md`), which
means a 905 KB poster directly competes with the hero LCP candidate during the
same initial-load window. The Next.js academy image guidance also recommends
serving viewport-appropriate image sizes rather than the same large asset
everywhere (`UtekosKristoffer/utekos-docs:next/academy/next-image.md`,
`UtekosKristoffer/utekos-docs:next/academy/advanced-image-optimization.md`).
Splitting the constants keeps the SEO use case on the original master file and
only reduces the bytes that ship to actual visitors. The poster is a raw `<img>`
consumed by the `<video>` element, not a `next/image` route, so it cannot be
re-encoded by the image optimizer; the on-disk WebP must already be small.

### Chatbase loader script strategy

Implementation: changed the chatbase loader `<Script>` from the default `async`
Script behavior to `strategy='lazyOnload'`
(`src/components/chat/ChatBotAgent/source-code.tsx#L25-L31`). The component
still suppresses on `/skreddersy-varmen` via the existing route check
(`src/components/chat/ChatBotAgent/source-code.tsx`).

Why: the third-party scripts guidance explicitly recommends adding
`strategy="lazyOnload"` to deprioritize non-critical third-party loaders, and
calls out an example saving of about 120 ms for a default-strategy script
(`UtekosKristoffer/utekos-docs:next/third-party-scripts.md#L0-L20`). The
chatbase widget is not part of the above-the-fold experience or the LCP path,
and BrandArmor already uses the same `lazyOnload` strategy for the same reason
(`src/components/analytics/BrandArmorScript.tsx#L17`,
`src/components/analytics/BrandArmorScript.tsx#L28`), so applying the same
pattern keeps the chat bot off the critical hydration window.

## Validation

- `npx tsc --noEmit` returned no errors after both changes.
- Local file checks confirm `public/linn-kate-kikkert-960.webp` exists at 69,320
  bytes and `public/linn-kate-kikkert.webp` remains in place at 926,200 bytes
  for the SEO/JSON-LD use case.
- Production verification is pending: PageSpeed measures `https://utekos.no/`,
  so the cache lifetime / network savings only show up after a Vercel deployment
  of these changes.

## Assumptions

- The `<video poster>` attribute is fetched eagerly by the browser when the
  `<video>` element renders, regardless of `preload='metadata'`. This is HTML
  spec behavior rather than a Next.js feature, so it is not cited from
  `utekos-docs`; it is recorded here as an explicit assumption per PLAN.md
  citation rules.
- `strategy='lazyOnload'` for the chatbase widget is acceptable for product use
  even though it delays availability of the chat widget after first paint; this
  matches the BrandArmor pattern already in use.
