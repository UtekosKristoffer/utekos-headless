// Path: src/lib/actions/perform/performCartCreateMutation.ts

'use server'

import { mutationCartCreate } from '@/modules/cart/graphql/mutations'
import { fetchShopify } from '@/lib/shopify/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import { getMarketingAttributes } from '@/lib/tracking/google/getMarketingAttributes'

import type { CartResponse, ShopifyCreateCartOperation } from '@types'

export const performCartCreateMutation = async (
  lines: { variantId: string; quantity: number }[],
  discountCode?: string // <--- Ny valgfri parameter
): Promise<CartResponse | null> => {
  const attributes = await getMarketingAttributes()

  const result = await fetchShopify<ShopifyCreateCartOperation>({
    query: mutationCartCreate,
    variables: {
      lines: lines.map(line => ({
        merchandiseId: line.variantId,
        quantity: line.quantity
      })),
      attributes: attributes,
      ...(discountCode && { discountCodes: [discountCode] })
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
