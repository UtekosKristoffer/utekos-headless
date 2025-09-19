// Path: src/lib/helpers/normalizers/normalizeShopifyUrl.ts

import type { Route } from 'next'

/**
 * Normalizes Shopify URLs to local paths
 * Returns Route type for Next.js Link compatibility
 */
export function normalizeShopifyUrl(url: string): Route {
  let urlPath = url.replace(/^https?:\/\/[^\/]+/, '')
  if (urlPath.startsWith('/products/')) {
    urlPath = urlPath.replace('/products/', '/produkter/')
  }

  const urlMappings: Record<string, string> = {
    '/pages/vaske-og-vedlikehold/produktguide':
      '/footer-routes/kjøpshjelp/produktguide/vask-og-vedlikehold',
    '/pages/utekos/storrelsesguide':
      '/footer-routes/kjøpshjelp/storrelsesguide',
    '/pages/productinfo/teknologi-og-materialer':
      '/footer-routes/kjøpshjelp/specs',
    '/pages/kundeservice/kontaktskjema':
      '/footer-routes/kjøpshjelp/kontakt-oss',
    '/pages/kontakt-oss': '/footer-routes/kjøpshjelp/kontakt-oss'
    // Add more mappings as needed
  }

  // Return mapped URL or use the path as-is if no mapping exists
  // Cast to Route to satisfy Next.js Link type requirements
  return (urlMappings[urlPath] || urlPath) as Route
}
