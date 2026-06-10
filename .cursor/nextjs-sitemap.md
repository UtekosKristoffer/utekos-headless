# Next.js Documentation

**Version:** 16.2.9 **Documentation URL:** https://nextjs.org/docs **Framework:** React framework for building
full-stack web applications

## Metadata

- `@doc-version`: 16.2.9
- `@doc-version-notes`: Some features may have extended or refined behavior in minor or patch releases.

---

# Getting Started

**URL:** https://nextjs.org/docs/app/getting-started

Learn how to create full-stack web applications with the Next.js App Router.

## Topics

### Installation

- URL: https://nextjs.org/docs/app/getting-started/installation
- Learn how to create a new Next.js application with the `create-next-app` CLI and set up TypeScript, ESLint,
  and Module Path Aliases.

### Project Structure

- URL: https://nextjs.org/docs/app/getting-started/project-structure
- Learn the folder and file conventions in Next.js and how to organize your project.

### Layouts and Pages

- URL: https://nextjs.org/docs/app/getting-started/layouts-and-pages
- Learn how to create your first pages and layouts and link between them with the Link component.

### Linking and Navigating

- URL: https://nextjs.org/docs/app/getting-started/linking-and-navigating
- Learn how built-in navigation optimizations work, including:
  - Prefetching
  - Prerendering
  - Client-side navigation
  - Dynamic route optimization
  - Slow-network optimization

### Server and Client Components

- URL: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Learn how React Server Components and Client Components work in Next.js.

### Fetching Data

- URL: https://nextjs.org/docs/app/getting-started/fetching-data
- Learn how to fetch data and stream content that depends on data.

### Mutating Data

- URL: https://nextjs.org/docs/app/getting-started/mutating-data
- Learn how to mutate data using Server Functions and Server Actions.

### Caching

- URL: https://nextjs.org/docs/app/getting-started/caching
- Learn how to cache data and UI in Next.js.

### Revalidating

- URL: https://nextjs.org/docs/app/getting-started/revalidating
- Learn how to revalidate cached data using:
  - Time-based strategies
  - On-demand strategies

### Error Handling

- URL: https://nextjs.org/docs/app/getting-started/error-handling
- Learn how to display expected errors and handle uncaught exceptions.

### CSS

- URL: https://nextjs.org/docs/app/getting-started/css
- Learn different ways to add CSS:
  - Tailwind CSS
  - CSS Modules
  - Global CSS
  - Other styling approaches

### Image Optimization

- URL: https://nextjs.org/docs/app/getting-started/images
- Learn how to optimize images in Next.js.

### Font Optimization

- URL: https://nextjs.org/docs/app/getting-started/fonts
- Learn how to optimize fonts in Next.js.

### Metadata and OG Images

- URL: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Learn how to:
  - Add metadata
  - Create dynamic Open Graph images

### Route Handlers

- URL: https://nextjs.org/docs/app/getting-started/route-handlers
- Learn how to use Route Handlers.

### Proxy

- URL: https://nextjs.org/docs/app/getting-started/proxy
- Learn how to use Proxy.

### Deploying

- URL: https://nextjs.org/docs/app/getting-started/deploying
- Learn how to deploy a Next.js application.

### Upgrading

- URL: https://nextjs.org/docs/app/getting-started/upgrading
- Learn how to upgrade to the latest version or canary release.

---

# Guides

**URL:** https://nextjs.org/docs/app/guides

Learn common patterns and real-world use cases using Next.js.

## AI & Developer Experience

### AI Coding Agents

- URL: https://nextjs.org/docs/app/guides/ai-agents
- Configure your project so AI coding agents use current documentation instead of outdated training data.

### Debugging

- URL: https://nextjs.org/docs/app/guides/debugging
- Debug with:
  - VS Code
  - Chrome DevTools
  - Firefox DevTools

### Development Environment

- URL: https://nextjs.org/docs/app/guides/local-development
- Optimize your local development environment.

### Next.js MCP Server

- URL: https://nextjs.org/docs/app/guides/mcp
- Allow coding agents access to application state.

### Memory Usage

- URL: https://nextjs.org/docs/app/guides/memory-usage
- Optimize memory usage in development and production.

---

## Authentication & Security

### Authentication

- URL: https://nextjs.org/docs/app/guides/authentication
- Implement authentication in Next.js.

### Content Security Policy

- URL: https://nextjs.org/docs/app/guides/content-security-policy
- Configure CSP for your application.

### Data Security

- URL: https://nextjs.org/docs/app/guides/data-security
- Learn built-in security features and best practices.

### Environment Variables

- URL: https://nextjs.org/docs/app/guides/environment-variables
- Add and access environment variables.

---

## Data, Caching & Rendering

### Backend for Frontend

- URL: https://nextjs.org/docs/app/guides/backend-for-frontend
- Use Next.js as a backend framework.

### Caching (Previous Model)

- URL: https://nextjs.org/docs/app/guides/caching-without-cache-components
- Cache and revalidate data using:
  - Fetch options
  - `unstable_cache`
  - Route segment configs

### CDN Caching

- URL: https://nextjs.org/docs/app/guides/cdn-caching
- Learn:
  - Current CDN caching behavior
  - Cache variability
  - Pathname-based cache keying

### How Revalidation Works

- URL: https://nextjs.org/docs/app/guides/how-revalidation-works
- Deep dive into:
  - Tag system
  - Cache consistency
  - Multi-instance coordination

### ISR

- URL: https://nextjs.org/docs/app/guides/incremental-static-regeneration
- Create or update static pages at runtime.

### Rendering Philosophy

- URL: https://nextjs.org/docs/app/guides/rendering-philosophy
- Understand static and dynamic rendering as a spectrum.

### Streaming

- URL: https://nextjs.org/docs/app/guides/streaming
- Learn progressive rendering as data becomes available.

### Public Pages

- URL: https://nextjs.org/docs/app/guides/public-static-pages
- Build public static pages such as:
  - Landing pages
  - Product listings
  - Blogs
  - Marketing sites
  - News sites

---

## Performance & Optimization

### Analytics

- URL: https://nextjs.org/docs/app/guides/analytics
- Measure performance using Next.js Speed Insights.

### CI Build Caching

- URL: https://nextjs.org/docs/app/guides/ci-build-caching
- Configure CI build caching.

### Lazy Loading

- URL: https://nextjs.org/docs/app/guides/lazy-loading
- Lazy load:
  - Libraries
  - React components

### Package Bundling

- URL: https://nextjs.org/docs/app/guides/package-bundling
- Analyze and optimize bundles using:
  - Turbopack Bundle Analyzer
  - `@next/bundle-analyzer`

### Prefetching

- URL: https://nextjs.org/docs/app/guides/prefetching
- Configure prefetching behavior.

### Preserving UI State

- URL: https://nextjs.org/docs/app/guides/preserving-ui-state
- Learn how React Activity preserves UI state across navigations.

### Preventing Flash

- URL: https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
- Prevent visible flashes before hydration.

### Production Checklist

- URL: https://nextjs.org/docs/app/guides/production-checklist
- Production readiness recommendations.

### Scripts

- URL: https://nextjs.org/docs/app/guides/scripts
- Optimize third-party scripts using the Script component.

### Third Party Libraries

- URL: https://nextjs.org/docs/app/guides/third-party-libraries
- Optimize third-party libraries using `@next/third-parties`.

### Videos

- URL: https://nextjs.org/docs/app/guides/videos
- Best practices for video optimization.

### View Transitions

- URL: https://nextjs.org/docs/app/guides/view-transitions
- Use view transitions during:
  - Navigation
  - Loading
  - Content changes

---

## Styling

### CSS-in-JS

- URL: https://nextjs.org/docs/app/guides/css-in-js

### Sass

- URL: https://nextjs.org/docs/app/guides/sass

### Tailwind CSS v3

- URL: https://nextjs.org/docs/app/guides/tailwind-v3-css

---

## Content & SEO

### Draft Mode

- URL: https://nextjs.org/docs/app/guides/draft-mode

### JSON-LD

- URL: https://nextjs.org/docs/app/guides/json-ld

### MDX

- URL: https://nextjs.org/docs/app/guides/mdx

---

## Forms

### Forms

- URL: https://nextjs.org/docs/app/guides/forms
- Create forms using React Server Actions.

---

## Internationalization

### Internationalization

- URL: https://nextjs.org/docs/app/guides/internationalization
- Add:
  - Internationalized routing
  - Localized content

---

## Architecture & Deployment

### Custom Server

- URL: https://nextjs.org/docs/app/guides/custom-server

### Deploying to Platforms

- URL: https://nextjs.org/docs/app/guides/deploying-to-platforms

### Instrumentation

- URL: https://nextjs.org/docs/app/guides/instrumentation

### Multi-tenant

- URL: https://nextjs.org/docs/app/guides/multi-tenant

### Multi-zones

- URL: https://nextjs.org/docs/app/guides/multi-zones

### OpenTelemetry

- URL: https://nextjs.org/docs/app/guides/open-telemetry

### PPR Platform Guide

- URL: https://nextjs.org/docs/app/guides/ppr-platform-guide

### Redirecting

- URL: https://nextjs.org/docs/app/guides/redirecting

### Self-Hosting

- URL: https://nextjs.org/docs/app/guides/self-hosting

### SPAs

- URL: https://nextjs.org/docs/app/guides/single-page-applications

### Static Exports

- URL: https://nextjs.org/docs/app/guides/static-exports

### PWAs

- URL: https://nextjs.org/docs/app/guides/progressive-web-apps

---

## Migration & Upgrading

### Migrating

- URL: https://nextjs.org/docs/app/guides/migrating

#### App Router Migration

- URL: https://nextjs.org/docs/app/guides/migrating/app-router-migration

#### Create React App Migration

- URL: https://nextjs.org/docs/app/guides/migrating/from-create-react-app

#### Vite Migration

- URL: https://nextjs.org/docs/app/guides/migrating/from-vite

### Migrating to Cache Components

- URL: https://nextjs.org/docs/app/guides/migrating-to-cache-components

### Upgrading

- URL: https://nextjs.org/docs/app/guides/upgrading

#### Codemods

- URL: https://nextjs.org/docs/app/guides/upgrading/codemods

#### Version 14

- URL: https://nextjs.org/docs/app/guides/upgrading/version-14

#### Version 15

- URL: https://nextjs.org/docs/app/guides/upgrading/version-15

#### Version 16

- URL: https://nextjs.org/docs/app/guides/upgrading/version-16

---

## Testing

### Testing Overview

- URL: https://nextjs.org/docs/app/guides/testing

Supported tools:

- Cypress
- Playwright
- Vitest
- Jest

#### Cypress

- URL: https://nextjs.org/docs/app/guides/testing/cypress

#### Jest

- URL: https://nextjs.org/docs/app/guides/testing/jest

#### Playwright

- URL: https://nextjs.org/docs/app/guides/testing/playwright

#### Vitest

- URL: https://nextjs.org/docs/app/guides/testing/vitest

---

# API Reference

**URL:** https://nextjs.org/docs/app/api-reference

API reference for the App Router.

---

## Directives

**URL:** https://nextjs.org/docs/app/api-reference/directives

### use cache

- URL: https://nextjs.org/docs/app/api-reference/directives/use-cache

### use cache: private

- URL: https://nextjs.org/docs/app/api-reference/directives/use-cache-private

### use cache: remote

- URL: https://nextjs.org/docs/app/api-reference/directives/use-cache-remote

### use client

- URL: https://nextjs.org/docs/app/api-reference/directives/use-client

### use server

- URL: https://nextjs.org/docs/app/api-reference/directives/use-server

---

## Components

**URL:** https://nextjs.org/docs/app/api-reference/components

### Font

- URL: https://nextjs.org/docs/app/api-reference/components/font

### Form Component

- URL: https://nextjs.org/docs/app/api-reference/components/form

### Image Component

- URL: https://nextjs.org/docs/app/api-reference/components/image

### Link Component

- URL: https://nextjs.org/docs/app/api-reference/components/link

### Script Component

- URL: https://nextjs.org/docs/app/api-reference/components/script

---

## File-System Conventions

**URL:** https://nextjs.org/docs/app/api-reference/file-conventions

### Core Files

| File                      | URL                                                                               |
| ------------------------- | --------------------------------------------------------------------------------- |
| default.js                | https://nextjs.org/docs/app/api-reference/file-conventions/default                |
| error.js                  | https://nextjs.org/docs/app/api-reference/file-conventions/error                  |
| forbidden.js              | https://nextjs.org/docs/app/api-reference/file-conventions/forbidden              |
| instrumentation.js        | https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation        |
| instrumentation-client.js | https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client |
| layout.js                 | https://nextjs.org/docs/app/api-reference/file-conventions/layout                 |
| loading.js                | https://nextjs.org/docs/app/api-reference/file-conventions/loading                |
| mdx-components.js         | https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components         |
| not-found.js              | https://nextjs.org/docs/app/api-reference/file-conventions/not-found              |
| page.js                   | https://nextjs.org/docs/app/api-reference/file-conventions/page                   |
| proxy.js                  | https://nextjs.org/docs/app/api-reference/file-conventions/proxy                  |
| route.js                  | https://nextjs.org/docs/app/api-reference/file-conventions/route                  |
| template.js               | https://nextjs.org/docs/app/api-reference/file-conventions/template               |
| unauthorized.js           | https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized           |

### Routing

#### Dynamic Segments

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes

#### Intercepting Routes

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes

#### Parallel Routes

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes

#### Route Groups

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

### Route Segment Config

#### dynamicParams

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams

#### maxDuration

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/maxDuration

#### preferredRegion

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/preferredRegion

#### runtime

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/runtime

### Other Conventions

#### public

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/public-folder

#### src

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/src-folder

#### Metadata Files

- URL: https://nextjs.org/docs/app/api-reference/file-conventions/metadata

---

# Recommended Navigation Order for LLMs

1. Getting Started
2. Guides
3. API Reference
4. Directives
5. Components
6. File-System Conventions
7. Routing
8. Caching & Revalidation
9. Deployment & Production
10. Migration & Upgrading

---

# Canonical Documentation Root

- Main Docs: https://nextjs.org/docs
- App Router Docs: https://nextjs.org/docs/app
- Guides: https://nextjs.org/docs/app/guides
- API Reference: https://nextjs.org/docs/app/api-reference
- Version: 16.2.9
