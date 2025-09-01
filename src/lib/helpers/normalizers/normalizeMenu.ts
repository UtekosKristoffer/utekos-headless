// Path: src/lib/helpers/normalizeMenu.ts

/**
 * @fileoverview Pure transformation functions for menu data with Zod v4 integration.
 *
 * This module provides type-safe transformation of Shopify menu data into the
 * application's clean MenuItem structure. It includes validation to ensure
 * data integrity and follows functional programming principles for predictable
 * transformations.
 *
 * @module lib/helpers/normalizeMenu
 */

import { ShopifyMenuItemSchema } from '@/db/zod/schemas/menuSchemas'
import { fromError } from 'zod-validation-error'
import { InvalidMenuDataError } from '@/lib/errors/MenuNotFoundError'
import type { MenuItem } from '@/types'
import type { ShopifyMenuItem } from '@/db/zod/schemas/menuSchemas'

/**
 * Validates a single menu item against the Zod schema.
 * Provides early validation to catch malformed menu items.
 *
 * @param item - Raw menu item from Shopify
 * @throws {InvalidMenuDataError} When item structure is invalid
 */
const validateMenuItem = (item: unknown): ShopifyMenuItem => {
  const result = ShopifyMenuItemSchema.safeParse(item)

  if (!result.success) {
    const validationError = fromError(result.error)
    throw new InvalidMenuDataError(`Invalid menu item structure: ${validationError.toString()}`)
  }

  return result.data
}

/**
 * Transforms a single validated Shopify menu item into application format.
 * This is a pure transformation function that handles recursive structure.
 *
 * @param item - Validated Shopify menu item
 * @returns Transformed MenuItem for application use
 */
const transformMenuItem = (item: ShopifyMenuItem): MenuItem => ({
  title: item.title,
  url: item.url,
  items: item.items ? item.items.map(transformMenuItem) : []
})

/**
 * Pure, recursive transformation function that maps Shopify menu items
 * to the application's clean MenuItem array structure.
 *
 * This function combines validation and transformation to ensure data integrity
 * while providing graceful error handling for malformed menu items.
 *
 * @param items - Raw menu items array from Shopify API
 * @returns Normalized MenuItem array for application use
 */
export const normalizeMenu = (items: unknown[]): MenuItem[] => {
  try {
    // Validate and transform each item
    const validatedItems = items.map(validateMenuItem)
    return validatedItems.map(transformMenuItem)
  } catch (error) {
    console.error('Menu normalization failed:', error)
    // Return empty array for graceful degradation
    return []
  }
}

export default normalizeMenu

// Re-export the type for backward compatibility
export type { ShopifyMenuItem } from '@/db/zod/schemas/menuSchemas'
