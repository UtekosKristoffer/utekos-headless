// Path: src/lib/helpers/normalizers/normalizeCartLine.ts
import type { CartLine, ShopifyCartLineEdge } from '@types'
import { normalizeProductImage } from './normalizeProductImage'

export const normalizeCartLine = ({ node }: ShopifyCartLineEdge): CartLine => ({
  id: node.id,
  quantity: node.quantity,
  cost: node.cost,
  merchandise: {
    ...node.merchandise,
    product: {
      ...node.merchandise.product,
      featuredImage: normalizeProductImage(
        node.merchandise.product.featuredImage,
        node.merchandise.product.title
      )
    }
  }
})
