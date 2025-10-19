import { getInitialAvailableOptions } from './getInitialAvailableOptions'
import type { ShopifyProduct } from '@types'
import { FORCED_COLORS } from 'src/constants/forced-colors'

interface ProductContext {
  usedColors?: Set<string>
}
export function getInitialOptionsForProduct(
  product: ShopifyProduct,
  context?: ProductContext
): Record<string, string> {
  const variants = product.variants?.edges
  if (!variants?.length) {
    return getInitialAvailableOptions(product)
  }

  const forcedColor = FORCED_COLORS[product.handle]
  const usedColors = context?.usedColors || new Set<string>()

  // Prøv først forced color hvis den ikke allerede er i bruk
  if (forcedColor && !usedColors.has(forcedColor)) {
    for (const edge of variants) {
      const variant = edge.node
      if (
        variant.availableForSale
        && variant.selectedOptions?.some(
          (opt: { name: string; value: string }) =>
            opt.name === 'Farge' && opt.value === forcedColor
        )
      ) {
        return Object.fromEntries(
          variant.selectedOptions.map(
            (opt: { name: string; value: string }) => [opt.name, opt.value]
          )
        )
      }
    }
  }

  // Hvis forced color er brukt eller utilgjengelig, finn alternativ farge
  for (const edge of variants) {
    const variant = edge.node
    if (variant.availableForSale && variant.selectedOptions?.length) {
      const colorOption = variant.selectedOptions.find(
        (opt: { name: string; value: string }) => opt.name === 'Farge'
      )

      // Velg denne varianten hvis fargen ikke er brukt av naboer
      if (!colorOption || !usedColors.has(colorOption.value)) {
        return Object.fromEntries(
          variant.selectedOptions.map(
            (opt: { name: string; value: string }) => [opt.name, opt.value]
          )
        )
      }
    }
  }

  // Fallback: returner første tilgjengelige selv om fargen er i bruk
  return getInitialAvailableOptions(product)
}
