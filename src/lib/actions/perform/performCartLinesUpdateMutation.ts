// Path: src/lib/actions/perform/performCartLinesUpdateMutation.ts
'use server'

import { mutationCartLinesUpdate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  CartResponse,
  ShopifyUpdateCartLineQuantityOperation,
  UpdateCartLineInput
} from '@types'

/**
 * Updates a cart line's quantity using the modern shopifyFetch client.
 * This function follows the "throw on failure" error handling pattern.
 *
 * @param cartId - The identifier of the cart.
 * @param input - The line identifier and the desired quantity.
 * @returns The updated cart on success.
 * @throws {ShopifyApiError} When API errors occur during the mutation.
 */
export const performCartLinesUpdateMutation = async (
  cartId: string,
  input: UpdateCartLineInput
): Promise<CartResponse | null> => {
  const lines = [{ id: input.lineId, quantity: input.quantity }]

  const result = await shopifyFetch<ShopifyUpdateCartLineQuantityOperation>({
    query: mutationCartLinesUpdate,
    variables: {
      cartId,
      lines
    }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to update lines in cart in performCartLinesUpdateMutation.',
      result.error.errors
    )
  }

  return result.body.cartLinesUpdate.cart ?? null
}
