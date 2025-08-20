// Fil: src/Helpers/computeVariantImages.ts
import safeJsonParse from '@/lib/utils/safeJsonParse'
import type { ShopifyProduct } from '@/shared/types/shopify'
import type { GetProductByHandleQuery } from '@/shared/GetProductByHandleQuery.types'
export type GetProduct = NonNullable<GetProductByHandleQuery['product']>
export type ShopifyMediaImage = { id: string; image: ShopifyImage }
export type ShopifyMediaEdge = { node: ShopifyMediaImage }
export type ShopifyMediaConnection = { edges: ShopifyMediaEdge[] }
type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export function computeVariantImages(product: GetProductByHandleQuery | GetProductByHandleQuery, variant: ShopifyProduct['variants']['edges'][0]['node'] | null): ShopifyMediaImage[] {
  if (!variant) return []
  const metaobjectReference  = variant.variantProfile?.reference
  const metafieldImages = metaobjectReference?.images === metaobjectReference?.images?.value
  const variantImagesFromMeta = safeJsonParse<ShopifyMediaEdge[]>(metaobjectReference?.images? []
  if (variantImagesFromMeta && variantImagesFromMeta.length > 0) {
  }

    if (variant.image) {
      return [
        {
          id: variant.id,
          image: variant.image
        }
      ]
    }

    return []
  }

export default computeVariantImages
