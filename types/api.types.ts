// Path: types/api.types.ts

import type { ShopifyCart } from './cart.types'
import type { ShopifyProduct } from './product.types'

export type ShopifyOperation<TData, TVariables = never> = {
  data: TData
  variables: TVariables
}

export type ShopifyResponse<T> =
  | { success: true; status: number; body: T }
  | { success: false; status: number; error: string }

export type Connection<T> = {
  edges: Array<Edge<T>>
}

export type Edge<T> = {
  node: T
}

export type ShopifyErrorDetail = {
  message: string
  locations?: { line: number; column: number }[]
  path?: (string | number)[]
  extensions?: Record<string, unknown>
}

export type ShopifyCartOperation = ShopifyOperation<
  { cart: ShopifyCart },
  { cartId: string }
>

export type ShopifyCreateCartOperation = ShopifyOperation<{
  cartCreate: { cart: ShopifyCart }
}>

export type ShopifyAddToCartOperation = ShopifyOperation<
  { cartLinesAdd: { cart: ShopifyCart } },
  {
    cartId: string
    lines: { merchandiseId: string; quantity: number }[]
  }
>

export type ShopifyRemoveFromCartOperation = ShopifyOperation<
  { cartLinesRemove: { cart: ShopifyCart } },
  { cartId: string; lineIds: string[] }
>

export type ShopifyUpdateCartOperation = ShopifyOperation<
  { cartLinesUpdate: { cart: ShopifyCart } },
  {
    cartId: string
    lines: { id: string; merchandiseId: string; quantity: number }[]
  }
>

export type ShopifyProductOperation = ShopifyOperation<
  { product: ShopifyProduct },
  { handle: string }
>

export type ShopifyProductsOperation = ShopifyOperation<
  { products: Connection<ShopifyProduct> },
  { query?: string; reverse?: boolean; sortKey?: string }
>

export type GetProductsParams = {
  query?: string
  reverse?: boolean
  sortKey?: string
  first?: number
}

export type ExtractVariables<T> =
  T extends { variables: object } ? T['variables'] : never
