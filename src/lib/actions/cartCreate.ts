import { mutationCartCreate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import type { ShopifyCreateCartOperation } from '@/api/shopify/types/api.types'
import { reshapeCart } from '@/lib/utils/reshapeCart'
import type { Cart } from '@/types/cart'

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: mutationCartCreate
  })

  return reshapeCart(res.body.data.cartCreate.cart)
}
