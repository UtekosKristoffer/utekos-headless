// Path: types/commerce/optimistic/index.ts
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

export type OptimisticItemInput = {
  product: ShopifyProduct
  variant: ShopifyProductVariant
  quantity: number
  customPrice?: number
}
