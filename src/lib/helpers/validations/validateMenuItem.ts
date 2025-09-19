// Path: src/lib/helpers/validations/validateMenuItem.ts

import { fromError } from 'zod-validation-error'

import { MenuItemSchema } from '@/db/zod/schemas/MenuItemSchema'
import { InvalidMenuDataError } from '@/lib/errors/InvalidMenuDataError'
import type { MenuItem } from '@types'

/**
 * Validates a single menu item against the Zod schema.
 * Provides early validation to catch malformed menu items.
 *
 * @param item - Raw menu item from Shopify
 * @throws {InvalidMenuDataError} When item structure is invalid
 */
export const validateMenuItem = (item: unknown): MenuItem => {
  const result = MenuItemSchema.safeParse(item)

  if (!result.success) {
    const validationError = fromError(result.error)
    throw new InvalidMenuDataError(
      `Invalid menu item structure: ${validationError.toString()}`
    )
  }

  return result.data
}
