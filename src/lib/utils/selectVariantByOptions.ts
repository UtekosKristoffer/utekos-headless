// Path: src/lib/utils/selectVariantByOptions.ts

import type { ShopifyProduct, ShopifyProductVariant } from '@/types/'

/**
 * @module utils/selectVariantByOptions
 * @description Selects a product variant based on the current variant and a changed option.
 * @function selectVariantByOptions
 * @param {ShopifyProduct} product - The Shopify product object containing variants.
 * @param {ShopifyProductVariant | null} current - The currently selected variant.
 * @param {string | null} optionName - The name of the option that has changed.
 * @param {string | null} value - The new value for the changed option.
 * @returns {ShopifyProductVariant | null} - The newly selected variant or null if not found.
 */

export function selectVariantByOptions(
  product: ShopifyProduct,
  current: ShopifyProductVariant | null,
  optionName: string | null,
  value: string | null
): ShopifyProductVariant | null {
  const allVariants = product.variants.edges.map(e => e.node)

  if (!optionName || !value) {
    return allVariants[0] ?? null
  }

  const newOptions = new Map<string, string>()
  current?.selectedOptions.forEach(opt => newOptions.set(opt.name, opt.value))
  newOptions.set(optionName, value)

  const newVariant = allVariants.find(variant =>
    Array.from(newOptions.entries()).every(([key, val]) =>
      variant.selectedOptions.some(opt => opt.name === key && opt.value === val)
    )
  )

  return newVariant ?? null
}
