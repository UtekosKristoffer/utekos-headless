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

/**
 * ALTERNATIV VERSJON: Med memoization for ekstrem ytelse
 * Bruk denne hvis samme produkt sjekkes flere ganger
 */
const memoCache = new WeakMap<ShopifyProduct, Record<string, string>>()

export function getInitialAvailableOptionsMemoized(
  product: ShopifyProduct
): Record<string, string> {
  const cached = memoCache.get(product)
  if (cached) return cached

  const result = getInitialAvailableOptions(product)
  memoCache.set(product, result)
  return result
}
