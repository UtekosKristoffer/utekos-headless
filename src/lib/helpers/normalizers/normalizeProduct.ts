import { normalizeProductImage } from '@/lib/helpers/normalizers/normalizeProductImage'
import type { ProductQueryResponse, ShopifyProduct } from '@types'
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
  product: ProductQueryResponse['product']
): ShopifyProduct => {
  return {
    // Egenskaper du allerede hadde:
    id: product.id,
    title: product.title,
    handle: product.handle,
    compareAtPriceRange: product.compareAtPriceRange,
    selectedOrFirstAvailableVariant: product.selectedOrFirstAvailableVariant,
    availableForSale: product.availableForSale,
    descriptionHtml: product.descriptionHtml,
    featuredImage: normalizeProductImage(product.featuredImage, product.title),
    priceRange: product.priceRange,
    options: product.options,
    variants: product.variants,
    images: product.images
  }
}
