import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'
import type { Connection, Image } from '@types'

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
