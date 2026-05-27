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
