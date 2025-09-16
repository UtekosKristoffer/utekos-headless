// Path: src/lib/helpers/normalizers/normalizeShopifyUrl.ts

import type { Route } from 'next'

/**
 * Normalizes Shopify URLs to local paths
 * Returns Route type for Next.js Link compatibility
 */
export function normalizeShopifyUrl(url: string): Route {
  // Remove domain and get just the path
  const urlPath = url.replace(/^https?:\/\/[^\/]+/, '')

  // Map Shopify URLs to your local paths
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
