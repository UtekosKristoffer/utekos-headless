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
