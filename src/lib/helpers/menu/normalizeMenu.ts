// Path: src/lib/helpers/normalizeMenu.ts

/**
 * @fileoverview Provides a pure function for transforming raw Shopify menu data
 * into the application's clean `MenuItem` data structure.
 *
 * @module lib/helpers/normalizeMenu
 */

import type { MenuItem } from '@/types'

/**
 * Represents the raw, nested structure of a menu item as returned by the
 * Shopify Storefront API.
 */
export interface ShopifyMenuItem {
  title: string
  url: string
  items?: ShopifyMenuItem[]
}

/**
 * A pure, recursive transformation function that maps the raw Shopify menu items
 * to our clean, application-specific `MenuItem` array.
 *
 * @param {ShopifyMenuItem[]} items - The raw menu items array from the Shopify API.
 * @returns {MenuItem[]} The normalized array of menu items.
 */
export const normalizeMenu = (items: ShopifyMenuItem[]): MenuItem[] => {
  return items.map(item => ({
    title: item.title,
    url: item.url,
    // Recursively call normalizeMenu for sub-items if they exist.
    items: item.items ? normalizeMenu(item.items) : []
  }))
}

export default normalizeMenu
