import type { ShopifyProduct } from '@types'
import { buildFallbackOptions } from './buildFallbackOptions'
export function getInitialAvailableOptionsWithHint(
  product: ShopifyProduct,
  preferredColor?: string
): Record<string, string> {
  const variants = product.variants?.edges
  if (!variants?.length) {
    return buildFallbackOptions(product.options)
  }

  if (preferredColor) {
    for (const edge of variants) {
      const variant = edge.node
      if (
        variant.availableForSale
        && variant.selectedOptions?.some(
          opt => opt.name === 'Farge' && opt.value === preferredColor
        )
      ) {
        return Object.fromEntries(
          variant.selectedOptions.map(opt => [opt.name, opt.value])
        )
      }
    }
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
