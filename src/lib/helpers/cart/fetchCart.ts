// Path: src/lib/helpers/cart/fetchCart.ts

import { getCartQuery } from '@/api/graphql/queries/cart/getCartQuery'
import { storefrontClient } from '@/clients/storefrontApiClient'
import { CartNotFoundError } from '@/lib/errors/CartNotFoundError'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import type { Cart, CartQueryResult } from '@types'

export const fetchCart = async (cartId: string): Promise<Cart> => {
  const { data, errors } = await storefrontClient.request<CartQueryResult>(
    getCartQuery,
    {
      variables: { cartId } // Bruk cartId parameteren direkte
    }
  )

  if (errors) {
    handleShopifyErrors(errors)
  }

  if (!data || !data.cart) {
    throw new CartNotFoundError(`Cart with ID ${cartId} was not found.`)
  }

  return normalizeCart(data.cart)
}
