// Path: src/lib/utils/syncVariantFromUrl.ts

import type { ShopifyProductVariant } from '@/types/shopify'

/**
 * @module utils/syncVariantFromUrl
 * @description Synchronizes the selected product variant based on the URL search parameters.
 * @function syncVariantFromUrl
 * @param {URLSearchParams} searchParams - The URL search parameters.
 * @param {ShopifyProductVariant[]} allVariants - Array of all product variants.
 * @param {(variant: ShopifyProductVariant) => void} setVariant - Function to update the selected variant state.
 */

export function syncVariantFromUrl(
  searchParams: URLSearchParams,
  allVariants: ShopifyProductVariant[],
  setVariant: (variant: ShopifyProductVariant) => void
) {
  const id = searchParams.get('variant')
  if (!id) return

  const matched = allVariants.find(v => v.id === id)
  if (matched) setVariant(matched)
}
