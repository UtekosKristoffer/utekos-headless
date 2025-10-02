// Path: src/lib/actions/perform/performCartCreateMutation.ts
'use server'

import { mutationCartCreate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  AddToCartFormValues,
  CartResponse,
  ShopifyCreateCartOperation
} from '@types'

/**
 * Performs cart creation mutation using the modern shopifyFetch client.
 *
 * @param input - The input containing the initial variant and quantity.
 * @returns The newly created cart on success.
 * @throws {ShopifyApiError} When API errors occur during the mutation.
 */
export const performCartCreateMutation = async (
  input: AddToCartFormValues
): Promise<CartResponse | null> => {
  const result = await shopifyFetch<ShopifyCreateCartOperation>({
    query: mutationCartCreate,
    variables: {
      lines: [{ merchandiseId: input.variantId, quantity: input.quantity }]
    }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to create cart in performCartCreateMutation.',
      result.error.errors
    )
  }

  return result.body.cartCreate.cart ?? null
}
