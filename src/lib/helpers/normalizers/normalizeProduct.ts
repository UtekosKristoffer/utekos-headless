import type { ProductsQueryResponse, Product } from '@/types'
import { normalizeProductImage } from './normalizeProductImage'

/**
 * Transforms raw Shopify product data into normalized application Product format.
 * @param product - Raw product from Shopify GraphQL response
 * @returns Normalized Product for consistent application usage
 */
export const normalizeProduct = (product: ProductsQueryResponse): Product => {
  const metafield = product.selectedOrFirstAvailableVariant.metafield

  const baseProduct = {
    id: product.id,
    title: product.title,
    availableForSale: Boolean(product.availableForSale),
    handle: product.handle,
    descriptionHtml: product.descriptionHtml,
    featuredImage: normalizeProductImage(product.featuredImage, product.title),
    price: product.selectedOrFirstAvailableVariant.price.amount
  }

  return metafield ? { ...baseProduct, metafield } : baseProduct
}
