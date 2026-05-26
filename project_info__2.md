# Utekos Headless — Codebase Overview

## Summary

This is a Next.js 16 storefront for Utekos, a Norwegian commerce site built around product merchandising,
checkout, analytics, and ad attribution. The app combines a public-facing shopping experience with a fairly
sophisticated tracking stack that sends events to Meta, Google, Pinterest, TikTok, Snapchat, and internal
logs.

The codebase is optimized for server-rendered product pages, SEO metadata generation, and coordinated
client/server event dispatch. A lot of the hidden complexity lives in the tracking and catalog-sync layer
rather than in the page shells themselves.

## Architecture

**Primary pattern:** layered Next.js App Router application with a clear split between:

- `src/app` for routes, layouts, metadata, and API endpoints
- `src/components` for reusable UI and tracking/analytics widgets
- `src/lib` for cross-cutting logic, especially tracking, analytics, and service integrations
- `src/api` for Shopify/admin-facing data access and GraphQL helpers

**Major subsystems**

1. **Storefront UI**
   - Home page, product pages, informational pages, and checkout redirects.
   - Uses server components heavily, with targeted client-side hydration for product interactions and
     tracking.

2. **Product data and Shopify integration**
   - Product pages fetch Shopify data through `src/api/lib/products/*`.
   - Product pages hydrate React Query caches so client components can reuse server-fetched data without
     refetching.

3. **Tracking and attribution**
   - Browser events are normalized into a common payload and dispatched to a tracking API route.
   - Server-side Meta Conversions API support handles purchase events and browser event forwarding.
   - Catalog synchronization builds Meta catalog item payloads from Shopify product/variant data.

4. **SEO and metadata generation**
   - Root metadata is centralized in `src/app/layout.tsx`.
   - Product-level metadata is generated dynamically and cached using Next’s `use cache` directive.

5. **Operational/integration layer**
   - Internal routes such as tracking, checkout redirect, and other API surfaces are used as thin adapters
     around library code.
   - Environment variables control ad tags, analytics, and Meta credentials, with normalization to avoid
     broken deployment values.

**Technology stack**

- **Runtime/framework:** Next.js 16, React 19, TypeScript
- **Styling/UI:** Tailwind CSS 4, Radix UI, Lucide, Framer Motion, GSAP, Vaul, Sonner
- **State/data:** TanStack React Query, XState, React Hook Form, Zod
- **Analytics/ad tech:** Vercel Analytics, Vercel Speed Insights, Google Tag Manager / sGTM, Meta Pixel/CAPI,
  Microsoft UET, Pinterest, TikTok, Snapchat
- **Commerce/integration:** Shopify, `facebook-nodejs-business-sdk`, Redis, Resend, OpenTelemetry

**Execution entry points**

- `src/app/layout.tsx` is the root shell for the entire site.
- `src/app/(home)/page.tsx` is the home page entry.
- `src/app/produkter/[handle]/page.tsx` is the primary product detail page entry.
- `src/app/api/tracking-events/route.ts` is the main event ingestion endpoint.
- `src/app/api/fb-checkout/route.ts` is a lightweight redirect adapter for checkout deep links.

## Directory Structure

```text
project-root/
├── src/
│   ├── app/                         — Route segments, layouts, metadata, and API routes
│   │   ├── (home)/                  — Home page and home-specific layout
│   │   ├── produkter/[handle]/      — Product detail route, metadata, and hydration flow
│   │   ├── api/                     — Tracking, checkout, and internal HTTP endpoints
│   │   ├── frakt-og-retur/          — Shipping and returns content
│   │   ├── gaveguide/, inspirasjon/, om-oss/, personvern/, vilkar-betingelser/ — Editorial/info pages
│   │   └── layout.tsx               — Root app shell, analytics loaders, global metadata
│   ├── components/                  — Reusable UI, analytics widgets, forms, emails, product components
│   ├── lib/                         — Shared logic, service integrations, tracking, utilities
│   │   ├── tracking/                — Event normalization, Meta/Google/ad network dispatch, catalog sync
│   │   ├── shopify/                — Shopify-specific helpers and middleware
│   │   ├── google/, redis/, email/, graphql/, state/, utils/ — Supporting infrastructure
│   ├── api/                         — Server-side data access and GraphQL helpers for Shopify/admin tasks
│   ├── hooks/                       — Client/server hooks for cart, product, animations, analytics
│   ├── clients/                     — Provider components for cart mutation and related external clients
│   ├── constants/                   — Shared business constants and thresholds
│   ├── db/                          — Configuration and Zod/data definitions used by the app
│   └── globals.css                  — Global styling
├── public/                          — Images, logos, media assets, and OG/share artwork
├── docs/, documentation/, ga_docs/, prompt-docs/, pagespeed-raport/ — Supporting documentation and audit artifacts
└── package.json                     — Next.js app scripts and dependency manifest
```

## Key Abstractions

### `RootLayout`

- **File**: `src/app/layout.tsx`
- **Responsibility**: Defines the global HTML shell, metadata, analytics loaders, and app-wide providers.
- **Interface**: Exports `metadata` and the default layout component.
- **Lifecycle**: Mounted once for the entire app tree; controls whether GTM and Vercel analytics load based on
  environment.
- **Used by**: Every page and route in the site.

### `HomePage`

- **File**: `src/app/(home)/page.tsx`
- **Responsibility**: Composes the front page from marketing sections, featured products, and lazy-loaded
  heavy components.
- **Interface**: Default server component returning a section tree.
- **Lifecycle**: Rendered for the homepage route; uses `Suspense` and `Activity` to defer non-critical
  sections.
- **Used by**: The site’s landing page.

### `ProductPage`

- **File**: `src/app/produkter/[handle]/page.tsx`
- **Responsibility**: Fetches product data, computes metadata, resolves the initial variant, and hydrates
  React Query for the client controller.
- **Interface**: `generateStaticParams`, `generateMetadata`, `AsyncProductContent`, default page component.
- **Lifecycle**: Executed per product route; server-fetched data is passed into a client controller through
  hydration.
- **Used by**: All product detail pages.

### `dispatchMetaTrackingEvent`

- **File**: `src/lib/tracking/meta/dispatchMetaTrackingEvent.ts`
- **Responsibility**: Normalizes a browser event into a tracking payload, optionally fires the Meta Pixel
  event, and posts the event to the internal tracking API.
- **Interface**: `dispatchMetaTrackingEvent(input)`
- **Lifecycle**: Called from client-side tracking flows when a user action should be recorded.
- **Used by**: Client tracking components and event handlers that need unified browser/server dispatch.

### `sendMetaBrowserEvent`

- **File**: `src/lib/tracking/meta/sendMetaBrowserEvent.ts`
- **Responsibility**: Sends a Meta Conversions API event for browser-originated activity using the Facebook
  business SDK.
- **Interface**: `sendMetaBrowserEvent(payload, userData)`
- **Lifecycle**: Invoked by the tracking API route on the server.
- **Used by**: `src/app/api/tracking-events/route.ts`.

### `sendMetaPurchase`

- **File**: `src/lib/tracking/meta/sendMetaPurchase.ts`
- **Responsibility**: Sends purchase events to Meta CAPI with rich user, order, and content data.
- **Interface**: `sendMetaPurchase({ order, customer, redisData, contentIds })`
- **Lifecycle**: Runs during purchase confirmation or order processing flows.
- **Used by**: Checkout/order-related server logic.

### `syncProductsToMetaCatalog`

- **File**: `src/lib/tracking/meta/catalogSync.ts`
- **Responsibility**: Pulls Shopify products, transforms them into Meta catalog items, and submits batch
  updates to the Meta Product Catalog.
- **Interface**: `syncProductsToMetaCatalog()`
- **Lifecycle**: Likely triggered by an internal route, cron, or admin action when catalog sync is needed.
- **Used by**: Catalog sync automation and admin workflows.

### `buildMetaCatalogItemPayload`

- **File**: `src/lib/tracking/meta/buildMetaCatalogItemPayload.ts`
- **Responsibility**: Converts a Shopify product variant into the exact payload format expected by Meta
  Catalog.
- **Interface**:
  `buildMetaCatalogItemPayload({ product, variant, retailerId, retailerProductGroupId, customLabels })`
- **Lifecycle**: Called per eligible variant during catalog sync.
- **Used by**: `catalogSync.ts`.

### `resolveMetaCatalogAccessToken`

- **File**: `src/lib/tracking/meta/resolveMetaCatalogAccessToken.ts`
- **Responsibility**: Chooses the best available Meta catalog token from environment variables and records its
  source.
- **Interface**: `resolveMetaCatalogAccessToken()`
- **Lifecycle**: Called before catalog sync initialization.
- **Used by**: `catalogSync.ts`.

## Data Flow

### 1) Browser tracking event flow

1. A client action calls `dispatchMetaTrackingEvent`.
2. It optionally fires `window.fbq` immediately via `sendMetaPixelEvent`.
3. It builds a payload with event metadata, GA4 context, and normalized client user data.
4. It POSTs the payload to `/api/tracking-events`.
5. `src/app/api/tracking-events/route.ts` validates the request, extracts request context/cookies, and
   enriches the `epik` cookie from the query string if present.
6. `processBrowserEvent` fans the payload out to Meta, Pinterest, TikTok, Google, and Snapchat senders, plus
   logging.
7. The route returns a unified tracking response via `createTrackingResponse`.

### 2) Product page render flow

1. The product route receives `params.handle`.
2. Server code fetches the raw product through `getProduct`.
3. Product metafields are reshaped if needed, and metadata is generated from the resolved product state.
4. Variant images, canonical URLs, and Open Graph/Twitter metadata are derived on the server.
5. A `QueryClient` is pre-populated with product data and dehydrated.
6. `ProductPageController` receives the hydrated state plus initial variant selection and related products.

### 3) Meta purchase flow

1. Checkout/order logic calls `sendMetaPurchase`.
2. The function resolves access token and pixel ID from env.
3. It builds Meta `UserData` from customer/order inputs and `Content` items from line items.
4. It constructs `CustomData` and `ServerEvent`, then submits them through `EventRequest`.
5. Success and failure are both logged to app logs with traceable metadata.

### 4) Meta catalog sync flow

1. `syncProductsToMetaCatalog` resolves a catalog token and initializes the Facebook SDK.
2. It fetches all Shopify products intended for sync.
3. Each product/variant is filtered against ID exclusions, activity status, and identifier availability.
4. Custom labels are extracted and missing-label counters are incremented for reporting.
5. Eligible variants are transformed with `buildMetaCatalogItemPayload`.
6. The payloads are submitted as a batch `PRODUCT_ITEM` update to the Meta catalog.

## Non-Obvious Behaviors & Design Decisions

- **Environment values are normalized before use.**  
  `normalizeEnvValue` trims whitespace and strips wrapping quotes from env vars. This is a defensive fix for
  deployments where secrets are pasted with accidental quotes or extra spaces.

- **Token resolution is ordered and tolerant.**  
  `resolveMetaCatalogAccessToken` tries `META_SYSTEM_USER_TOKEN`, then `CATALOG_ACCESS_TOKEN`, then
  `META_ACCESS_TOKEN`. That ordering implies the code prefers a dedicated system-user token but still supports
  older environment setups.

- **Tracking is intentionally dual-path.**  
  `dispatchMetaTrackingEvent` sends the Meta Pixel event in the browser and also posts the same event to the
  server-side tracking route. That pattern improves attribution resilience and allows the server to fan out to
  multiple vendors.

- **The API route enriches request context with query-derived data.**  
  The `epik` parameter from the URL is merged into cookies before browser-event processing. This is a subtle
  attribution workaround that likely preserves campaign metadata through redirects or browser limitations.

- **Purchase sending is fault-tolerant, not exception-driven.**  
  `sendMetaPurchase` catches SDK errors, logs detailed Graph API diagnostics, and returns a structured failure
  object instead of throwing. That makes downstream checkout flows easier to keep alive even when Meta is
  unavailable.

- **Catalog sync is selective by design.**  
  The sync excludes specific products and variants, skips inactive products, and ignores variants without
  clean identifiers. This prevents polluting the catalog with unsupported or intentionally hidden items.

- **Payload shaping is strict and Meta-specific.**  
  `buildMetaCatalogItemPayload` always emits canonical fields like availability, age group, brand, condition,
  and gender, then adds optional fields only when they are derivable. It also strips HTML from descriptions
  and truncates them to avoid oversized catalog values.

- **The app favors SSR + hydration over client-only fetching.**  
  Product pages hydrate TanStack Query with server-fetched product data, which reduces duplicate fetches and
  keeps the initial render SEO-friendly.

- **Heavy front-page content is deferred.**  
  The homepage uses `Suspense` and `Activity` around large sections, signaling that perceived performance
  matters and that not everything should block first paint.

- **Analytics loading is environment gated.**  
  Google Tag Manager and Vercel Analytics only load in production-like environments. That keeps local and
  preview environments cleaner and reduces accidental tracking noise.

## Module Reference

| File                                                     | Purpose                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `src/app/layout.tsx`                                     | Global app shell, metadata, analytics injection, and top-level providers.            |
| `src/app/(home)/page.tsx`                                | Homepage composition with deferred marketing/product sections.                       |
| `src/app/produkter/[handle]/page.tsx`                    | Product detail server entry, metadata generation, hydration, and variant resolution. |
| `src/app/produkter/[handle]/utils/generateMetadata.ts`   | Standalone product metadata generator used by product routes.                        |
| `src/app/api/tracking-events/route.ts`                   | Ingests browser tracking events and fans them out to ad/tracking providers.          |
| `src/app/api/fb-checkout/route.ts`                       | Redirects product/cart query params into the Shopify cart URL format.                |
| `src/lib/tracking/meta/utils/normalizeEnvValue.ts`       | Trims and unquotes environment variable values.                                      |
| `src/lib/tracking/meta/resolveMetaCatalogAccessToken.ts` | Picks the first usable Meta catalog token from environment variables.                |
| `src/lib/tracking/meta/dispatchMetaTrackingEvent.ts`     | Browser-side unified Meta event dispatcher.                                          |
| `src/lib/tracking/meta/sendMetaBrowserEvent.ts`          | Server-side Meta CAPI sender for general browser events.                             |
| `src/lib/tracking/meta/sendMetaPixelEvent.ts`            | Thin wrapper around `window.fbq` for standard/custom Meta pixel events.              |
| `src/lib/tracking/meta/sendMetaPurchase.ts`              | Server-side Meta CAPI purchase sender with detailed logging.                         |
| `src/lib/tracking/meta/catalogSync.ts`                   | Batch-syncs Shopify products into the Meta product catalog.                          |
| `src/lib/tracking/meta/buildMetaCatalogItemPayload.ts`   | Converts a Shopify variant into Meta catalog item format.                            |
| `src/lib/tracking/meta/constants/index.ts`               | Meta catalog IDs, exclusions, standard event names, and custom-label mappings.       |
| `src/lib/tracking/meta/types/index.ts`                   | Shared TypeScript types for tracking inputs and Meta API errors.                     |
| `src/lib/tracking/meta/buildMetaCatalogItemPayload.ts`   | Core catalog payload composer; centralizes Meta field mapping rules.                 |

## Suggested Reading Order

1. `src/app/layout.tsx` — shows the app shell, analytics strategy, and global providers.
2. `src/app/api/tracking-events/route.ts` — explains how browser events are accepted and fanned out.
3. `src/lib/tracking/meta/dispatchMetaTrackingEvent.ts` — shows the browser-side tracking contract.
4. `src/lib/tracking/meta/sendMetaBrowserEvent.ts` — reveals the server-side Meta event shape.
5. `src/lib/tracking/meta/catalogSync.ts` — shows how Shopify product data becomes Meta catalog updates.
6. `src/app/produkter/[handle]/page.tsx` — demonstrates how product pages combine data fetching, SEO, and
   hydration.

## Notes for Developers

- There is no useful top-level README content, so the code itself and the tracking utilities are the primary
  source of truth.
- The tracking layer is more opinionated than the storefront UI; if you change event payloads, you need to
  check both browser dispatch and the `/api/tracking-events` route.
- Product metadata is generated server-side and cached, so metadata changes usually belong in
  `src/app/produkter/[handle]/utils/*` rather than in client components.
- Meta catalog work depends heavily on environment correctness; token normalization and fallback order are
  deliberate safeguards.