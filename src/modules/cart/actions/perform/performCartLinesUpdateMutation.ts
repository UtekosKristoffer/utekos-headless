// Path: src/lib/actions/perform/performCartLinesUpdateMutation.ts
'use server'

import { mutationCartLinesUpdate } from '@/modules/cart/graphql/mutations'
import { fetchShopify } from '@/lib/shopify/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  CartResponse,
  ShopifyUpdateCartLineQuantityOperation,
  UpdateCartLineInput
} from '@types'

export const performCartLinesUpdateMutation = async (
  cartId: string,
  input: UpdateCartLineInput
): Promise<CartResponse | null> => {
  const lines = [{ id: input.lineId, quantity: input.quantity }]

  const result = await fetchShopify<ShopifyUpdateCartLineQuantityOperation>({
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
