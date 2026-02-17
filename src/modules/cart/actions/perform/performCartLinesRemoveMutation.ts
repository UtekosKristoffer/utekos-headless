// Path: src/lib/actions/perform/performCartLinesRemoveMutation.ts
'use server'

import { mutationCartLinesRemove } from '@/modules/cart/graphql/mutations'
import { fetchShopify } from '@/lib/shopify/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  CartResponse,
  RemoveCartLineInput,
  ShopifyRemoveFromCartOperation
} from '@types'

export const performCartLinesRemoveMutation = async (
  cartId: string,
  input: RemoveCartLineInput
): Promise<CartResponse | null> => {
  const result = await fetchShopify<ShopifyRemoveFromCartOperation>({
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
