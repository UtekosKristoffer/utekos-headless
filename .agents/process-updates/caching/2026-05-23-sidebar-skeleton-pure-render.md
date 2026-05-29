# Sidebar skeleton pure render update

## Specific changes

- Replaced the sidebar menu skeleton's render-time random width with the
  module-level `SIDEBAR_MENU_SKELETON_TEXT_WIDTH` constant
  (`src/components/ui/sidebar.tsx#L28-L34`,
  `src/components/ui/sidebar.tsx#L626-L633`).
- Removed the `React.useMemo` wrapper that called `Math.random()` inside
  `SidebarMenuSkeleton` render logic
  (`src/components/ui/sidebar.tsx#L606-L637`).

## Why

React render logic must be idempotent: code that runs during render should
return the same result for the same inputs, and React identifies
`Math.random()` as non-idempotent because it returns different values for the
same inputs
(`reactjs/react.dev/src/content/reference/rules/components-and-hooks-must-be-pure.md#L71-L86`).
The compiler lint also treats `Math.random()` during render as an impure
function call that can produce hydration mismatches, incorrect memoization, and
unpredictable behavior
(`reactjs/react.dev/src/content/reference/eslint-plugin-react-hooks/lints/purity.md#L7-L20`,
`reactjs/react.dev/src/content/reference/eslint-plugin-react-hooks/lints/purity.md#L24-L40`).
Using a fixed module-level width keeps the skeleton markup stable while
preserving the existing CSS custom-property path used by the text skeleton
(`src/components/ui/sidebar.tsx#L28-L34`,
`src/components/ui/sidebar.tsx#L626-L633`).

## Sources used

- Context7 resolved the project documentation source as
  `/utekoskristoffer/gemini-docs` and returned `react/README.md` sections for
  "Components and Hooks must be pure" and "Keeping Components Pure"; Context7
  did not expose exact line ranges for that private/project documentation
  source.
- React official docs:
  `reactjs/react.dev/src/content/reference/rules/components-and-hooks-must-be-pure.md#L71-L86`.
- React official lint docs:
  `reactjs/react.dev/src/content/reference/eslint-plugin-react-hooks/lints/purity.md#L7-L20`.
- React official lint docs:
  `reactjs/react.dev/src/content/reference/eslint-plugin-react-hooks/lints/purity.md#L24-L40`.

## Local evidence checked

- `PLAN.md#L205-L207` requires a process update under
  `.agents/process-updates/caching/` after rendering/cache-related fixes.
- `PLAN.md#L215-L230` requires line-based citations and explicit assumptions
  when a claim cannot be tied to an exact line range.
- `src/components/ui/sidebar.tsx#L606-L637` is the local component area changed
  by this fix.

## Validation

- `npm run lint -- src/components/ui/sidebar.tsx` passed.
- `git diff --check -- src/components/ui/sidebar.tsx` passed.
- `npm run build` passed with Next.js 16.2.3 and Cache Components enabled.
- The process update file was written under `.agents/process-updates/caching/`;
  `.agents/` is ignored by Git in this workspace (`.gitignore#L15-L16`).
