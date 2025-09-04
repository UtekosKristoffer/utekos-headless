import type { ProductsQueryResponse } from '@/types'
import type { ShopifyProduct } from '@/types/'
import { normalizeProductImage } from '@/lib/helpers/normalizers'
/**
 * Transforms raw Shopify product data into normalized application Product format.
 * @param product - Raw product from Shopify GraphQL response
 * @returns Normalized Product for consistent application usage
 */
/**
 * Transforms raw Shopify product data into normalized application Product format.
 * @param product - Raw product from Shopify GraphQL response
 * @returns Normalized Product for consistent application usage
 */
export const normalizeProduct = (
  product: ProductsQueryResponse
): ShopifyProduct => {
  return {
    // Egenskaper du allerede hadde:
    id: product.id,
    title: product.title,
    handle: product.handle,
    descriptionHtml: product.descriptionHtml,
    featuredImage: normalizeProductImage(product.featuredImage, product.title),
    priceRange: product.priceRange,
    options: product.options,
    media: product.media,
    variants: product.variants
  }
}
