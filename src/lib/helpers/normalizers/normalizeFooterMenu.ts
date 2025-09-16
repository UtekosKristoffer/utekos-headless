// Path: src/lib/helpers/normalizeMenu.ts

import type { MenuItem, ShopifyFooterMenu } from '@types'
/**
 * Transforms a single validated Shopify menu item into application format.
 * This is a pure transformation function that handles recursive structure.
 *
 * @param item - Validated Shopify menu item
 * @returns Transformed MenuItem for application use
 */

/**
 * Checks if a menu item is a special action item (phone, email, etc)
 */
function isActionItem(item: MenuItem): boolean {
  const title = item.title.toLowerCase()
  return (
    title.includes('tlf:')
    || title.includes('e-post:')
    || title.includes('email:')
    || title.includes('tel:')
  )
}

/**
 * Transforms action items to appropriate links
 */
function transformActionItem(item: MenuItem): ShopifyFooterMenu | null {
  const title = item.title

  // Phone number
  if (
    title.toLowerCase().includes('tlf:')
    || title.toLowerCase().includes('tel:')
  ) {
    const phoneNumber = title.match(/[\d\s+]+/)?.[0]?.replace(/\s/g, '') || ''
    if (phoneNumber) {
      return {
        title: title,
        path: `tel:${phoneNumber}`
      }
    }
  }

  // Email
  if (
    title.toLowerCase().includes('e-post:')
    || title.toLowerCase().includes('email:')
  ) {
    const email = title.match(/[^\s]+@[^\s]+/)?.[0] || ''
    if (email) {
      return {
        title: title,
        path: `mailto:${email}`
      }
    }
  }

  // If we can't parse it, return null to filter it out
  return null
}

/**
 * Transforms Shopify URL to local path
 */
function transformShopifyUrl(url: string): string {
  // Remove domain and get just the path
  const urlPath = url.replace(/^https?:\/\/[^\/]+/, '')

  // Map Shopify URLs to your local paths
  const urlMappings: Record<string, string> = {
    '/pages/vaske-og-vedlikehold/produktguide':
      '/handlehjelp/vask-og-vedlikehold',
    '/pages/utekos/storrelsesguide': '/handlehjelp/storrelsesguide',
    '/pages/productinfo/teknologi-og-materialer':
      '/handlehjelp/teknologi-materialer',
    '/pages/kundeservice/kontaktskjema': '/handlehjelp/kontakt-oss',
    '/pages/kontakt-oss': '/handlehjelp/kontakt-oss'
    // Add more mappings as needed
  }

  // Return mapped URL or use the path as-is if no mapping exists
  return urlMappings[urlPath] || urlPath
}

/**
 * Normalizes menu items from Shopify to ShopifyFooterMenu format
 */
export function normalizeFooterMenu(items: MenuItem[]): ShopifyFooterMenu[] {
  return items
    .map(item => {
      // Check if it's a special action item (phone, email)
      if (isActionItem(item)) {
        return transformActionItem(item)
      }

      // Regular menu item - transform URL to path
      return {
        title: item.title || 'Untitled',
        path: transformShopifyUrl(item.url || '')
      }
    })
    .filter((item): item is ShopifyFooterMenu => {
      // Type guard to filter out nulls and ensure all items have path
      return item !== null && item.path !== ''
    })
}
