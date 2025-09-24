import type { ShopifyProduct } from '@types'
import { FORCED_COLORS } from 'src/constants/forced-colors'
import { getInitialAvailableOptions } from './getInitialAvailableOptions'

export function getInitialOptionsForProduct(
  product: ShopifyProduct
): Record<string, string> {
  const forcedColor = FORCED_COLORS[product.handle]

  if (!forcedColor) {
    return getInitialAvailableOptions(product)
  }

  const variants = product.variants?.edges
  if (!variants?.length) {
    return getInitialAvailableOptions(product)
  }

  for (const edge of variants) {
    const variant = edge.node
    if (
      variant.availableForSale
      && variant.selectedOptions?.some(
        opt => opt.name === 'Farge' && opt.value === forcedColor
      )
    ) {
      return Object.fromEntries(
        variant.selectedOptions.map(opt => [opt.name, opt.value])
      )
    }
  }

  return getInitialAvailableOptions(product)
}
