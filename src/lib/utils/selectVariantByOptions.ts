/**
 * @fileoverview Provides functionality to find matching product variants based on option updates.
 * @module utils/selectVariantByOptions
 */

import type { ShopifyProductVariant } from '@/types/products'

/**
 * Represents the input for updating a variant selection
 */
type UpdateInput = {
  current: ShopifyProductVariant
  optionName: string
  value: string
}

/**
 * Builds an options map from the current variant and applies the update
 */
const buildNextOptions = (update: UpdateInput): Record<string, string> => {
  const nextOptions = update.current.selectedOptions.reduce<
    Record<string, string>
  >((acc, option) => {
    acc[option.name] = option.value
    return acc
  }, {})

  nextOptions[update.optionName] = update.value
  return nextOptions
}

/**
 * Checks if a variant matches the provided options
 */
const isMatchingVariant = (
  variant: ShopifyProductVariant,
  targetOptions: Record<string, string>
): boolean =>
  variant.selectedOptions.every(
    option => targetOptions[option.name] === option.value
  )

/**
 * Finds a product variant that matches the updated option selection.
 *
 * @param variants - Array of all available product variants
 * @param update - Object containing current variant and option to update
 * @returns The matching variant or null if no match found
 */
export const selectVariantByOptions = (
  variants: readonly ShopifyProductVariant[],
  update: UpdateInput
): ShopifyProductVariant | null => {
  const nextOptions = buildNextOptions(update)
  const match = variants.find(variant =>
    isMatchingVariant(variant, nextOptions)
  )
  return match ?? null
}
