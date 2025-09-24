/**
 * @fileoverview Product reshaping utility for Shopify data transformation
 * @module lib/utils/reshapeProduct
 * @why Normalize product structure for consistent component consumption
 */

import type { ShopifyProduct } from '@types'

/**
 * Transform raw Shopify product to normalized format
 * @why Ensure consistent product structure across application
 * @param product - Raw Shopify product data
 */
export const reshapeProduct = (
  product: ShopifyProduct
): ShopifyProduct | undefined => {
  if (!product) {
    return undefined
  }

  const reshaped = {
    ...product
  }

  return reshaped
}
