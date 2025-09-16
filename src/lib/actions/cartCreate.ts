import { mutationCartCreate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { reshapeCart } from '@/lib/utils/reshapeCart'

import type { Cart, ShopifyCreateCartOperation } from '@types'

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: mutationCartCreate
  })

  return reshapeCart(res.body.data.cartCreate.cart)
}
