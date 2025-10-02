import { normalizeProductImage } from '@/lib/helpers/normalizers/normalizeProductImage'
import type { RawMetaobject, ShopifyProduct } from '@types'
import { reshapeMetaobject } from './reshapeMetaobject' // Bruk den delte funksjonen

export const reshapeProduct = (product: ShopifyProduct): ShopifyProduct => {
  if (!product) {
    return product
  }

  const normalizedVariants = product.variants.edges.map(edge => {
    const variant = edge.node
    if (variant.metafield?.reference) {
      const newVariant = { ...variant }
      newVariant.variantProfileData = reshapeMetaobject(
        (variant.metafield.reference as unknown as RawMetaobject).fields
      )
      return { ...edge, node: newVariant }
    }
    return edge
  })

  return {
    ...product,
    featuredImage: normalizeProductImage(product.featuredImage, product.title),
    variants: {
      ...product.variants,
      edges: normalizedVariants
    }
  }
}
