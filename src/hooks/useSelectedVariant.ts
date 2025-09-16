// Hooks/useSelectedVariant.ts
import type { ShopifyProduct } from '@types'
import { useSearchParams } from 'next/navigation'

export function useSelectedVariant(product: ShopifyProduct) {
  const searchParams = useSearchParams()

  const variantId = searchParams.get('variant')
  const allVariants = product.variants.edges.map(e => e.node)
  return allVariants.find(v => v.id === variantId) || allVariants[0]
}
