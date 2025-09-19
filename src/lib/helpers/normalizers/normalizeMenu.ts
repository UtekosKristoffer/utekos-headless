// Path: src/lib/helpers/normalizers/normalizeMenu.ts

/**
 * @fileoverview Pure transformation functions for menu data with Zod v4 integration.
 * @module lib/helpers/normalizeMenu
 */

import { validateMenuItem } from '@/lib/helpers/validations/validateMenuItem'
import type { MenuItem } from '@types'

/**
 * Transforms a single validated Shopify menu item into application format.
 * @param item - Validated Shopify menu item
 * @returns Transformed MenuItem with recursive structure preserved
 */
const transformMenuItem = (item: MenuItem): MenuItem => ({
  title: item.title,
  url: item.url,
  items: item.items ? item.items.map(transformMenuItem) : []
})

/**
 * Pure, recursive transformation function that maps Shopify menu items
 * to the application's clean MenuItem array structure.
 * @param items - Raw menu items array from Shopify API
 * @returns Normalized MenuItem array for application use
 */
export const normalizeMenu = (items: unknown[]): MenuItem[] => {
  try {
    const validatedItems = items.map(validateMenuItem)
    return validatedItems.map(transformMenuItem)
  } catch (error) {
    console.error('Menu normalization failed:', error)
    return []
  }
}

export default normalizeMenu
