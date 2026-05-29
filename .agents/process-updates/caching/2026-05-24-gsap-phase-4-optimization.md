# 2026-05-24 GSAP Phase 4 Optimization

## Documentation Status

Updated documentation is confirmed for this implementation.

Sources used:

- Context7 `/websites/gsap`: ScrollTrigger registration, `gsap.matchMedia()`, `once: true`, safe `ScrollTrigger.refresh(true)`, ScrollToPlugin and GSDevTools plugin usage.
- Context7 `/greensock/react`: React cleanup patterns and scoped GSAP context behavior.
- Context7 `/utekoskristoffer/gemini-docs`: Next.js 16 dynamic client imports and `cacheComponents` behavior.
- Local GSAP skill refs:
  - `.agents/skills/gsap-performance/SKILL.md`
  - `.agents/skills/gsap-framer-scroll-animation/SKILL.md`
  - `.agents/skills/gsap-plugins/SKILL.md`
  - `.agents/skills/gsap/references/advanced-patterns.md`
  - `.agents/skills/gsap/references/cheatsheet.md`

## Changes

- Added dynamic GSAP helpers in `src/lib/gsap/`:
  - `loadGsap.ts`
  - `loadScrollTrigger.ts`
  - `loadScrollToPlugin.ts`
  - `createGsapDevTools.ts`
  - `scrollToElement.ts`
- `GSDevTools` is dynamically imported only in development and only when `?gsdevtools=1` or `localStorage["utekos:gsdevtools"] === "1"` is enabled.
- Homepage GSAP was moved out of static imports for:
  - `TextReveal`
  - `MomentsHeader`
  - `SocialProofHeader`
  - `ChevronDownSection`
  - `TechTeaserMotion` / `mountTechTeaser`
- Added small client enhancers:
  - `MomentsHeaderMotion.tsx`
  - `SocialProofHeaderMotion.tsx`
- Added `MomentCardsGrid.tsx` as a client-only grid so `moments` can keep
  Lucide icon component references inside the client boundary. This avoids
  passing component functions from `MomentsSection` Server Component to
  `MomentCard` Client Component.
- Converted active route GSAP imports to dynamic loaders for:
  - `TerrasseCarousel`
  - `Hero`
  - `useEmpathySectionAnimations`
  - `useSocialProofMarqueeAnimations`
  - `useTechDownSliderAnimations`
  - `useThreeInOneAnimations`
- Replaced targeted smooth `scrollIntoView()` usage with `scrollToElement()` and ScrollToPlugin in:
  - `ScrollToButton`
  - `ScrollToTextLink`
  - `StickyMobileAction`
  - `EmpathySection`
  - `Hero`
  - `useMicrofiberLogic`
- Swapped relevant `framer-motion` imports to `motion/react` in:
  - `Hero`
  - `StickyMobileAction`
- Kept interactivity intact:
  - Hover CTA motion remains GSAP-driven.
  - Embla carousel autoplay/dots remain.
  - Marquee pause/resume remains.
  - TechDown slider drag/content swap remains.
  - Scroll reveals remain GSAP/ScrollTrigger based.

## Verification

- `npx tsc --noEmit --pretty false`: passed.
- Targeted `npm run lint -- <changed phase-4 files>`: passed.
- Follow-up fix for `MomentsSection` serialization error:
  - `npx tsc --noEmit --pretty false`: passed.
  - `npm run lint -- src/components/frontpage/MomentCardsGrid.tsx src/components/frontpage/MomentsSection.tsx src/components/frontpage/MomentCard.tsx`: passed.
  - `npx playwright screenshot --wait-for-timeout=1500 --viewport-size=1440,1100 http://localhost:3000/ /private/tmp/utekos-home-phase4-fixed.png`: passed.
- Source search confirms no static `gsap`, `@gsap/react`, `gsap/ScrollTrigger`, `framer-motion`, or targeted `scrollIntoView({ behavior: "smooth" })` remains in the optimized phase-4 files.

## Blocked Verification

- `npm run build`: blocked. `next build` stayed in `Creating an optimized production build ...` for more than 10 minutes with no further output and had to be stopped. The stopped process exited with code `143`.
- `npm run analyze`: not run because it depends on the same production build path.
- `npx next experimental-analyze --output`: not run because a reliable fresh `.next` production build was unavailable.

## Notes

- `ScrollTrigger.matchMedia` was not used; all migrated code uses `gsap.matchMedia()`.
- Entrance reveals use `once: true` where reverse-on-scroll is not needed.
- Expensive layout animation was avoided in migrated paths; underline/highlight motion uses `scaleX`, and reveal motion uses transform/opacity/filter.
- `willChange` is applied only during active animations and cleared with `clearProps`.
- `FrontpageIcebathingSection.tsx` still has static GSAP imports, but `rg "FrontpageIcebathingSection" src` finds no route import. I left it untouched because it is outside the active phase-4 route surface and not part of the homepage import graph.
