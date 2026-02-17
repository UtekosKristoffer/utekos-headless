// Path: src/lib/actions/perform/performCartLinesAddMutation.ts
'use server'

import { mutationCartLinesAdd } from '@/modules/cart/graphql/mutations'
import { fetchShopify } from '@/lib/shopify/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type { CartResponse, ShopifyAddToCartOperation } from '@types'

export const performCartLinesAddMutation = async (
  cartId: string,
  lines: { variantId: string; quantity: number }[]
): Promise<CartResponse | null> => {
  const result = await fetchShopify<ShopifyAddToCartOperation>({
    query: mutationCartLinesAdd,
    variables: {
      cartId,
      lines: lines.map(line => ({
        merchandiseId: line.variantId,
        quantity: line.quantity
      }))
    }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to add lines in performCartLinesAddMutation.',
      result.error.errors
    )
  }

  return result.body.cartLinesAdd.cart ?? null
}
