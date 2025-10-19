// Path: src/components/ProductCard/initializeCarouselProducts.ts
import type { ShopifyProduct } from '@types'
import { FORCED_COLORS } from 'src/constants/forced-colors'
import { getInitialAvailableOptions } from './getInitialAvailableOptions'
import { getInitialOptionsForProduct } from './getInitialOptionsForProduct'
interface ProductContext {
  usedColors?: Set<string>
}

// Hjelpefunksjon for å initialisere alle produkter i karusellen
export function initializeCarouselProducts(
  products: ShopifyProduct[]
): Map<string, Record<string, string>> {
  const usedColors = new Set<string>()
  const productOptions = new Map<string, Record<string, string>>()

  for (const product of products) {
    const options = getInitialOptionsForProduct(product, { usedColors })
    productOptions.set(product.handle, options)

    // Legg til fargen i settet av brukte farger
    const selectedColor = options.Farge
    if (selectedColor) {
      usedColors.add(selectedColor)
    }
  }

  return productOptions
}
