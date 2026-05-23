# Plan

## Current Session: `src/app/produkter/(oversikt)/page.tsx` and src/app/produkter/(oversikt)/layout.tsx in in focus.

## Goal

Correct, and maximum utilization of next.js 16's latest updates. Specificly
target potential related to `cacheComponents`, `use cache`, `cacheHandlers`,
`use cache: private`, `use cache: remote`, `cachehandlers`, `cacheLife`,
`cacheTag`, `updateTag`, `serverfunctions`, `use server`, `use client`,
`Suspense`, `Server Components`, `CDN Caching`, `LazyLoading` `Activity`,
`useEffectEvent` to make the site world class and as good as possible related to
performance:

| Metric                         | Goal     | Status                               |
| ------------------------------ | -------- | ------------------------------------ |
| First Contentful Paint (FCP)   | < 0.5 s  | Acceptable start of visual rendering |
| Largest Contentful Paint (LCP) | < 1 s    | Main bottleneck                      |
| Total Blocking Time (TBT)      | < 100 ms | Significant main-thread blocking     |
| Cumulative Layout Shift (CLS)  | 0        | Status: 0. Good visual stability     |
| Speed Index                    | < 2 s    | Slow perceived loading               |

## Highest-Impact Opportunities (Results on mobilescreens)

| Opportunity                   | Estimated savings | Primary impact     |
| ----------------------------- | ----------------- | ------------------ |
| Render-blocking requests      | 1,470 ms          | LCP, FCP           |
| Improve image delivery        | 926 KiB           | LCP, FCP           |
| Reduce unused JavaScript      | 293 KiB           | LCP, FCP           |
| Use efficient cache lifetimes | 243 KiB           | Repeat-visit speed |
| Legacy JavaScript             | 56 KiB            | Parse/eval cost    |

## Notable Diagnostics (Results on mobilescreens)

| Diagnostic                | Value     |
| ------------------------- | --------- |
| Main-thread work          | 6.0 s     |
| JavaScript execution time | 2.4 s     |
| Total network payload     | 2,797 KiB |
| Long main-thread tasks    | 7         |
| DOM elements              | 1,779     |
| Max critical path latency | 2,843 ms  |
| LCP element render delay  | 3,030 ms  |

## Prioritized Action Plan

1. Reduce LCP by addressing render-blocking CSS and critical-path fonts.
2. Compress and resize large images, especially hero/above-the-fold media.
3. Reduce JS cost by code-splitting and deferring non-critical scripts.
4. Tighten third-party loading strategy (lazy load, consent-gating, sequencing).
5. Improve caching strategy for static assets and third-party endpoints where
   possible.
6. Investigate forced reflow sources and non-composited animations.

## Critical & Basic Assumptions

Assessments and decision-making must based the "up to date" the latest
documentation. Source to get this is only through my repo
UtekosKristoffer/utekos-docs trough my Context7 Pro subscription and/or Context7
MCP - absolutely every docs we need , and are always up to date.

**MANDATORY**: Not able to connect to Context7 MCP and use tools? Stop, try to
find the reason and fix it and try to connect again. Not able to connect even
after troubleshooting and retrying? Try directly through GitHub with GitHub MCP
connection. Not able to connect to GitHub either? Stop. You have to stop.
Continuing without insight to updates docs is not wanted.

## Forced reflow

A forced reflow occurs when JavaScript queries geometric properties (such as
offsetWidth) after styles have been invalidated by a change to the DOM state.
This can result in poor performance. Learn more about
[forced reflows](https://developer.chrome.com/docs/performance/insights/forced-reflow?utm_source=lighthouse&utm_medium=lr)
and ![Connor Clark](https://web.dev/images/authors/cjamcl.jpg) Connor Clark
[X](https://twitter.com/cjamcl) [GitHub](https://github.com/connorjclark)

A forced reflow occurs when JavaScript queries geometric properties (such as
`offsetWidth`) after styles have been invalidated by a change to the DOM state.
This forces the browser to immediately do a layout, which interrupts script
execution and results in poor performance.

An example of code that causes forced reflow:

Multiple forced reflows in quick succession is called
["layout thrashing"](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing#avoid_layout_thrashing).

## How to pass this insight

- Avoid, or at least reduce, the amount of DOM geometry writes that are done
  just before reads.
- Have no forced reflows that take longer than 30 milliseconds.

## Additional references

- [Insight source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/models/trace/insights/ForcedReflow.ts)
- [Avoid large, complex layouts and layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)
  <https://webperf.tips/tip/layout-thrashing/>
- <https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/EventPhases/explainer.md#how-does-this-happen>

and possible mitigations.

### Use efficient cache lifetimes

### Legacy JavaScript

Polyfills and transforms enable older browsers to use new JavaScript features.
However, many aren't necessary for modern browsers. Modify JavaScript build
process to not transpile
[Baseline](https://web.dev/articles/baseline-and-polyfills?utm_source=lighthouse&utm_medium=lr)
features. A long cache lifetime can speed up repeat visits to our page.

## Documentation pages

### Repository Basics

- [React README](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/README.md)
- [React Rules](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/RULES.md)
- [React Agents](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/AGENTS.md)

### React Mental Model

- [Understanding Your UI as a Tree](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/learn/understanding-your-ui-as-a-tree.md)

### Server Components, Client Components and Boundaries

- [React Server Components](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/directives/server-components.md)
- [React `use client`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/directives/use-client.md)
- [React `use server`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/directives/use-server.md)
- [React Server Functions](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/directives/server-functions)
- [Next.js `use client`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/use-client.md)
- [Next.js `use server`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/use-server.md)
- [Client and Server Component Boundaries](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/academy/client%E2%80%91server-component-boundaries.md)

### Next.js 16 and App Router

- [Next.js 16 Upgrade Guide](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next-js-16-upgrade)
- [Next.js `connection`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/api-reference/functions/connection.md)
- [Static Exports](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/official-updated-docs/guides/static-exports.md)

### Cache Components and Cache Directives

- [Cache Components](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/academy/cache-components.md)
- [Next.js `use cache`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/cache/use-cache.md)
- [Next.js `use cache: private`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/cache/use-cache-private.md)
- [Next.js `use cache: remote`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/cache/use-cache-remote.md)
- [Cache Handlers](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/cache/cacheHandlers.md)
- [React `cacheSignal`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/directives/cacheSignal.md)

### Cache Lifetimes, Tags and Revalidation

- [Next.js `cacheLife`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/cache/cacheLife.md)
- [Next.js `cacheTag`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/api-reference/functions/cache-tag.md)
- [Next.js `updateTag`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/api-reference/functions/updateTag.md)
- [How Revalidation Works](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/official-updated-docs/guides/how-revalidation-works.md)
- [Next.js `refresh`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/official-updated-docs/api-reference/functions/refresh.md)

### CDN and HTTP Caching

- [CDN Caching](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/essentials/cache/cdn-caching.md)

### Data Fetching, Suspense and Streaming

- [Data Fetching Without Waterfalls](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/academy/data-fetching-without-waterfalls.md)
- [Suspense and Streaming](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/academy/suspense-streaming.md)
- [React Suspense](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/Suspence.md)
- [Lazy Loading](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/official-updated-docs/guides/lazy-loading.md)

### React State and Hooks

- [Choosing the State Structure](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/managing-state/choosing-the-state-structure.md)
- [React `useDeferredValue`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/hooks/useDeferredValue.md)
- [React `useDebugValue`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/hooks/useDebugValue.md)
- [React `useSyncExternalStore`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/hooks/useSyncExternalStore.md)
- [React `useEffectEvent`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/hooks/useEffectEvent.md)
- [React Activity](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/reference/react/Activity.md)

### Fonts, Preconnect and Asset Loading

- [React DOM `preconnect`](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/react-dom/preconnect.md)
- [Next.js Font Component](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/official-updated-docs/components/font.md)
- [Next Font](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/fonts-with-next-font.md)
- [Font Optimization](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/official-updated-docs/guides/font-optimization.md)
- [Advanced Image Optimization](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/academy/advanced-image-optimization.md)

### Performance, Profiling and Observability

- [React Profiler](https://github.com/UtekosKristoffer/utekos-docs/blob/main/react/reference/react/Profiler.md)
- [Next.js Logging Config](https://github.com/UtekosKristoffer/utekos-docs/blob/main/nextconfig/next-config-js/logging.md)
- [Web Vitals Attribution Config](https://github.com/UtekosKristoffer/utekos-docs/blob/main/nextconfig/next-config-js%20/webVitalsAttribution.md)

### Proxy and Middleware Migration

- [Proxy Basics](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/academy/proxy-basics.md)
- [Next.js Proxy Docs](https://github.com/UtekosKristoffer/utekos-docs/blob/main/next/official-updated-docs/proxy.md)

### Accessibility and WCAG

- [Organizing a Page Using Headings](https://github.com/UtekosKristoffer/utekos-docs/blob/main/wcag/guidelines/organizing-a-page-using-headings.md)
- [Providing Heading Elements at the Beginning of Each Section](https://github.com/UtekosKristoffer/utekos-docs/blob/main/wcag/guidelines/providing-heading-elements-at-the-beginning-of-each-section-of-content.md)
- [Contrast](https://github.com/UtekosKristoffer/utekos-docs/blob/main/wcag/guidelines/contrast.md)
- [Name, Role and Value](https://github.com/UtekosKristoffer/utekos-docs/blob/main/wcag/guidelines/name-role-value.md)
- [Reading Level](https://github.com/UtekosKristoffer/utekos-docs/blob/main/wcag/guidelines/reading-level.md)
- [Section Headings](https://github.com/UtekosKristoffer/utekos-docs/blob/main/wcag/guidelines/section-headings.md)

**MANDATORY:** After every fix relatied to this process, add a file under
.agents/process-updates/caching/ and note the speficic changes you did, why and
used sources.

### Mandatory source-citation requirements for process updates

Future agents doing cache, rendering, performance, or related optimization work
must treat source references as part of the deliverable, not as optional
context.

- Every technical claim in a process update must include a source reference with
  a file path and line range.
- Claims about Next.js, React, platform APIs, or other library behavior must
  cite documentation files from `UtekosKristoffer/utekos-docs` with exact line
  ranges.
- Claims about this application must cite local workspace files with exact line
  ranges and must be labeled as local code evidence, not documentation evidence.
- Claims based on Lighthouse, PageSpeed, accessibility, or performance reports
  must cite the relevant report or documentation file with exact line ranges.
- The `Sources used` section must list documentation sources only. Put app
  files, audits, screenshots, terminal output, and implementation checks in a
  separate `Local evidence checked` or `Validation` section.
- Each `Why` or decision paragraph must carry its own citation. A broad source
  list at the bottom is not enough for claims made earlier in the note.
- If a claim cannot be tied to a documentation file, report, validation result,
  or local code line range, write it as an explicit assumption or remove it.
- If Context7 MCP and GitHub access to `UtekosKristoffer/utekos-docs` both fail,
  stop before making framework or library claims, following the mandatory access
  rule above.

**See**
[Good Example:](.agents/process-updates/caching/2026-05-23-home-header-hero-cache-update.md)
