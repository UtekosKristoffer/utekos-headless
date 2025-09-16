// Path: src/lib/helpers/validations/validateMenuItem.ts

import { fromError } from 'zod-validation-error'

import { ShopifyMenuItemSchema } from '@/db/zod/schemas/ShopifyMenuItemSchema'
import { InvalidMenuDataError } from '@/lib/errors/InvalidMenuDataError'
import type { ShopifyMenuItem } from '@types'

/**
 * Validates a single menu item against the Zod schema.
 * Provides early validation to catch malformed menu items.
 *
 * @param item - Raw menu item from Shopify
 * @throws {InvalidMenuDataError} When item structure is invalid
 */
export const validateMenuItem = (item: unknown): ShopifyMenuItem => {
  const result = ShopifyMenuItemSchema.safeParse(item)

  if (!result.success) {
    const validationError = fromError(result.error)
    throw new InvalidMenuDataError(
      `Invalid menu item structure: ${validationError.toString()}`
    )
  }

  return result.data
}
