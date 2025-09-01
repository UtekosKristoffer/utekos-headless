// Path: src/lib/helpers/cart/fetchCart.ts
import { storefrontClient } from '@/clients/storefrontApiClient'
import { cartQuery } from '@/lib/queries'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import { CartNotFoundError } from '@/lib/errors'
import type { Cart, CartQueryResult } from '@/types'

/**
 * Fetches cart data from the Shopify Storefront API. This is an impure function
 * that performs a network request.
 */
export const fetchCart = async (cartId: string): Promise<Cart> => {
  const { data, errors } = await storefrontClient.request<CartQueryResult>(cartQuery, {
    variables: { cartId } // Bruk cartId parameteren direkte
  })

  if (errors) {
    handleShopifyErrors(errors)
  }

  if (!data || !data.cart) {
    throw new CartNotFoundError(`Cart with ID ${cartId} was not found.`)
  }

  return normalizeCart(data.cart)
}
