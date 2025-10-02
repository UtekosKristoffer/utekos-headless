// Path: src/lib/actions/perform/performCartClearMutation.ts
'use server'

import { mutationCartLinesUpdate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  CartResponse,
  ShopifyUpdateCartLineQuantityOperation
} from '@types'

/**
 * Executes a clear-cart mutation using the modern shopifyFetch client.
 * This function follows the "throw on failure" error handling pattern.
 *
 * @param cartId - The identifier of the cart to clear.
 * @returns The updated (empty) cart on success.
 * @throws {ShopifyApiError} When API errors occur during the mutation.
 */
export const performCartClearMutation = async (
  cartId: string
): Promise<CartResponse | null> => {
  const result = await shopifyFetch<ShopifyUpdateCartLineQuantityOperation>({
    query: mutationCartLinesUpdate,
    variables: {
      cartId,
      lines: []
    }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to clear cart in performCartClearMutation.',
      result.error.errors
    )
  }

  return result.body.cartLinesUpdate.cart ?? null
}
