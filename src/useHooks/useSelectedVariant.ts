// Hooks/useSelectedVariant.ts
import { useSearchParams } from 'next/navigation'
import type { ShopifyProduct } from '@/types/shopify'

export function useSelectedVariant(product: ShopifyProduct) {
  const searchParams = useSearchParams()

  const variantId = searchParams.get('variant')
  const allVariants = product.variants.edges.map(e => e.node)
  return allVariants.find(v => v.id === variantId) || allVariants[0]
}
