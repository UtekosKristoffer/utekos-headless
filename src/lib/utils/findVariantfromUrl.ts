// Path: src/lib/utils/findVariantfromUrl.ts
import type { ShopifyProductVariant } from '@types'

/**
 * Finner en produktvariant fra en liste basert på 'variant'-ID i URL search params.
 * @returns Den matchende varianten, eller undefined hvis ingen blir funnet.
 */
export function findVariantFromUrl(
  searchParams: URLSearchParams,
  allVariants: ShopifyProductVariant[]
): ShopifyProductVariant | undefined {
  const id = searchParams.get('variant')
  if (!id) return undefined

  return allVariants.find(v => v.id === id)
}
