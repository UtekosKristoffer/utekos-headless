// Path: src/lib/actions/perform/performCartLinesRemoveMutation.ts
'use server'

import { mutationCartLinesRemove } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  CartResponse,
  RemoveCartLineInput,
  ShopifyRemoveFromCartOperation
} from '@types'

/**
 * Removes a single line from the cart using the modern shopifyFetch client.
 * This function follows the "throw on failure" error handling pattern.
 *
 * @param cartId - The identifier of the cart.
 * @param input - Contains the identifier of the line to remove.
 * @returns The updated cart on success.
 * @throws {ShopifyApiError} When API errors occur during the mutation.
 */
export const performCartLinesRemoveMutation = async (
  cartId: string,
  input: RemoveCartLineInput
): Promise<CartResponse | null> => {
  const result = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: mutationCartLinesRemove,
    variables: { cartId, lineIds: [input.lineId] }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to remove line from cart in performCartLinesRemoveMutation.',
      result.error.errors
    )
  }

  return result.body.cartLinesRemove.cart ?? null
}
