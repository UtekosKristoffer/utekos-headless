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
