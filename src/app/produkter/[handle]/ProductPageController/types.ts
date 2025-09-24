import type { ShopifyProduct } from '@types'

export type ProductControllerProps = {
  productData: ShopifyProduct
  relatedProducts: ShopifyProduct[]
}
