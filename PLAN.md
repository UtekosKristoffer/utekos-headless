# Plan

## Current Session: `/skreddersy-varmen` Tablet/Mobile Reveal Stability

- Status: Completed.
- Documentation: Confirmed via local GSAP skill files, Context7 for GSAP and
  `@gsap/react`, and Next DevTools documentation for Next.js 16.
- Root cause: Post-hero tablet/mobile layouts still depended on ScrollTrigger
  `fromTo` reveals that initialize text with `autoAlpha: 0`. On smaller
  viewports, text can enter the viewport before the trigger-driven reveal has
  completed, so it appears missing until later scroll interaction.
- Decision: For all viewports below `1280px`, post-hero content must render
  visible-first. Desktop (`>=1280px`) keeps the stronger GSAP reveal/parallax
  treatment.
- Verification: Browser checks at `390x844`, `820x1180`, and `1024x1366`
  returned `hiddenCount: 0` while scrolling downward. Next DevTools reports
  `configErrors: []` and `sessionErrors: []`. Targeted ESLint passed; production
  build passed with the existing Google Sans fallback warning.
