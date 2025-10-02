// Path: src/app/produkter/%5Bhandle%5D/ProductPageController/types.ts
import type { ShopifyProduct } from '@types'

export type ProductControllerProps = {
  productData: ShopifyProduct
  relatedProducts: ShopifyProduct[]
}
