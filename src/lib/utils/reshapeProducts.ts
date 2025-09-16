import type { ShopifyProduct } from '@/api/shopify/types/types'
import { reshapeProduct } from './reshapeProduct'

/**
 * Transform array of products efficiently
 * @why Batch processing with filtering for performance
 */
export const reshapeProducts = (
  products: ShopifyProduct[]
): ShopifyProduct[] => {
  const reshapedProducts: ShopifyProduct[] = []

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product)
      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct)
      }
    }
  }

  return reshapedProducts
}
