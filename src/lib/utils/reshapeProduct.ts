// Path: src/lib/utils/reshapeProduct.ts

/**
 * @fileoverview Product reshaping utility for Shopify data transformation
 * @module lib/utils/reshapeProduct
 * @why Normalize product structure for consistent component consumption
 */

import type { ShopifyProduct } from '@/api/shopify/types/types'

/**
 * Transform raw Shopify product to normalized format
 * @why Ensure consistent product structure across application
 * @param product - Raw Shopify product data
 * @param filterHiddenProducts - Currently unused, kept for API compatibility
 */
export const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
): ShopifyProduct | undefined => {
  if (!product) {
    return undefined
  }

  // Note: Tag filtering removed as tags are not included in current GraphQL query
  // To enable filtering, add tags to the product fragment in GraphQL

  return product
}
