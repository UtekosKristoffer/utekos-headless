import type { Connection, Image } from '@/api/shopify/types/types'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'

export const reshapeImages = (
  images: Connection<Image>,
  productTitle: string
) => {
  const flattened = removeEdgesAndNodes(images)

  return flattened.map(image => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1]
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    }
  })
}
