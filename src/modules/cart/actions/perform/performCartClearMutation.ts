// Path: src/lib/actions/perform/performCartClearMutation.ts
'use server'

import { mutationCartLinesUpdate } from '@/modules/cart/graphql/mutations'
import { fetchShopify } from '@/lib/shopify/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type {
  CartResponse,
  ShopifyUpdateCartLineQuantityOperation
} from '@types'

export const performCartClearMutation = async (
  cartId: string
): Promise<CartResponse | null> => {
  const result = await fetchShopify<ShopifyUpdateCartLineQuantityOperation>({
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
