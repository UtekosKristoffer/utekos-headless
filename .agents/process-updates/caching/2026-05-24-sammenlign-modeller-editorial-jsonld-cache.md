# Sammenlign modeller editorial JSON-LD cache update

## What changed

The `sammenlign-modeller` route now renders a route-level JSON-LD graph from
the page tree, before the visible editorial sections. The page imports and
renders `CompareModelsJsonLd` directly in `page.tsx`, then renders the hero,
model guide, comparison table, deep dive, and FAQ closer as server-first
sections. Local evidence: `src/app/handlehjelp/sammenlign-modeller/page.tsx`
lines 54-63.

The JSON-LD component uses a cached async Server Component with `'use cache'`
and `cacheLife('max')`, matching the route's static guide content and the
project's enabled `cacheComponents` configuration. Local evidence:
`src/app/handlehjelp/sammenlign-modeller/components/CompareModelsJsonLd.tsx`
lines 17-19 and `next.config.ts` lines 12-16. Documentation evidence:
`UtekosKristoffer/utekos-docs/next/essentials/cache/use-cache.md` lines 21-44
and `UtekosKristoffer/utekos-docs/next/essentials/cache/cacheLife.md` lines
16-47.

## Why

The route is a curated buying guide, not an internal search results page, so the
schema uses `WebPage`, `BreadcrumbList`, `ItemList`, and `FAQPage` instead of
`SearchResultsPage`. The SearchResultsPage docs say that type is for pages that
primarily represent search results, while generic information pages should use
`WebPage`; the route content is a fixed editorial guide. Documentation evidence:
`UtekosKristoffer/utekos-docs/schema-org/SearchResultsPage.md` lines 14-36.
Local evidence: `src/app/handlehjelp/sammenlign-modeller/components/CompareModelsJsonLd.tsx`
lines 21-45 and 100-115.

The product comparison list uses `ItemList` with ordered `ListItem` entries and
positions because Schema.org notes that ordered lists should use `ListItem` with
`position` rather than relying on markup order alone. Documentation evidence:
`UtekosKristoffer/utekos-docs/schema-org/ItemList.md` lines 13-23. Local
evidence:
`src/app/handlehjelp/sammenlign-modeller/components/CompareModelsJsonLd.tsx`
lines 72-98.

`ProductGroup` was not used because that documentation is for product variants
and variant-determining properties. These three URLs are separate Shopify
product model pages in this route, so the safer structured-data shape is a
curated `ItemList`. Documentation evidence:
`UtekosKristoffer/utekos-docs/google/seo/ProductGroup.md` lines 13-32. Local
evidence:
`src/app/handlehjelp/sammenlign-modeller/components/CompareModelsJsonLd.tsx`
lines 72-98.

## Validation

`npx eslint` on the changed `sammenlign-modeller` files passed.

`npm run build` passed. Next.js reported
`/handlehjelp/sammenlign-modeller` as a Partial Prerender route with `30d`
revalidate and `1y` expire.

Browser verification at
`http://localhost:3000/handlehjelp/sammenlign-modeller` found no console errors.
The page exposed JSON-LD graph node types `OnlineStore`, `WebPage`,
`BreadcrumbList`, `ItemList`, and `FAQPage`; `OnlineStore` comes from the global
layout schema, while the latter four come from this route.

## Sources used

- `UtekosKristoffer/utekos-docs/next/essentials/cache/use-cache.md` lines 21-44
- `UtekosKristoffer/utekos-docs/next/essentials/cache/cacheLife.md` lines 16-47
- `UtekosKristoffer/utekos-docs/schema-org/ItemList.md` lines 13-23
- `UtekosKristoffer/utekos-docs/schema-org/SearchResultsPage.md` lines 14-36
- `UtekosKristoffer/utekos-docs/google/seo/ProductGroup.md` lines 13-32

## Local evidence checked

- `next.config.ts` lines 12-16
- `src/app/handlehjelp/sammenlign-modeller/page.tsx` lines 54-63
- `src/app/handlehjelp/sammenlign-modeller/components/CompareModelsJsonLd.tsx`
  lines 17-19, 21-45, 72-98, and 100-115
