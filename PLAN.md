# Utekos implementation plan

## Current session decision log

- Refactor `/magasinet` into a typed, reusable article system.
- Use Zod-validated article data as the primary authoring model.
- Migrate every existing Magasinet article in the first pass and preserve all current slugs.
- Keep `/magasinet` and `/magasinet/[slug]` as the canonical routes.
- Keep React Server Components as the default. Use client components only for real interactivity.
- Use Next.js 16.2 Cache Components patterns: cached derived content, route-level metadata, and JSON-LD.
- Preserve and incorporate the existing dirty terrasse article edits instead of resetting them.
- Make the Magasinet registry the shared source for routes, overview, sitemap, search index, and AI text indexes.
- Add visible shadcn breadcrumbs and BreadcrumbList JSON-LD to `/produkter` overview without changing product detail breadcrumbs.
- Add visible shadcn breadcrumbs and BreadcrumbList JSON-LD to `/om-oss`.
- Add visible shadcn breadcrumbs and BreadcrumbList JSON-LD to `/kontaktskjema`.
- Add visible shadcn breadcrumbs to `/frakt-og-retur` and connect its existing BreadcrumbList JSON-LD to the WebPage node.
- Add WebPage and ImageObject primary image JSON-LD to `/produkter`.
- Add visible shadcn breadcrumbs to `/skreddersy-varmen`; BreadcrumbList JSON-LD already exists in the route graph.
