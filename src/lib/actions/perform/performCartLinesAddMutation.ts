// Path: src/lib/actions/perform/performCartLinesAddMutation.ts
'use server'

import { mutationCartLinesAdd } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  AddToCartFormValues,
  CartResponse,
  ShopifyAddToCartOperation
} from '@types'

/**
 * Adds a line to the cart using the Shopify Storefront API.
 * This function uses the modern `shopifyFetch` client and follows the
 * "throw on failure" error handling pattern expected by higher-level orchestrators.
 *
 * @param {string} cartId - The identifier of the cart.
 * @param {AddToCartFormValues} input - The variant ID and quantity.
 * @returns {Promise<CartResponse | null>} The updated cart on success.
 * @throws {ShopifyApiError} When the API returns GraphQL errors.
 */
export const performCartLinesAddMutation = async (
  cartId: string,
  input: AddToCartFormValues
): Promise<CartResponse | null> => {
  const result = await shopifyFetch<ShopifyAddToCartOperation>({
    query: mutationCartLinesAdd,
    variables: {
      cartId,
      lines: [{ merchandiseId: input.variantId, quantity: input.quantity }]
    }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to add lines to cart in performCartLinesAddMutation.',
      result.error.errors
    )
  }

  return result.body.cartLinesAdd.cart ?? null
}
