import type { ShopifyProduct } from 'types/product.types'
import { buildFallbackOptions } from './buildFallbackOptions'
export function getInitialAvailableOptions(
  product: ShopifyProduct
): Record<string, string> {
  const variants = product.variants?.edges
  if (!variants?.length) {
    return buildFallbackOptions(product.options)
  }

  for (const edge of variants) {
    const variant = edge.node
    if (variant.availableForSale && variant.selectedOptions?.length) {
      return Object.fromEntries(
        variant.selectedOptions.map(opt => [opt.name, opt.value])
      )
    }
  } 

  return buildFallbackOptions(product.options)
}
