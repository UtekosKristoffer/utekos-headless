import { reshapeMetaobject } from '@/lib/utils/reshapeMetaobject'
import type { ShopifyProduct } from '@types'

export function reshapeProductWithMetafields(
  productData: ShopifyProduct | undefined
) {
  if (!productData) return undefined

  return {
    ...productData,
    variants: {
      ...productData.variants,
      edges: productData.variants.edges.map(edge => ({
        ...edge,
        node: {
          ...edge.node,
          variantProfileData: reshapeMetaobject(
            edge.node.metafield?.reference?.fields
          )
        }
      }))
    }
  }
}
