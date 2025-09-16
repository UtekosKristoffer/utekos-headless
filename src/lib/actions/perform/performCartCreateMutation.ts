// Path: src/lib/actions/perform/performCartCreateMutation.ts
'use server'

import { mutationCartCreate } from '@/api/graphql/mutations/cart'
import type { ShopifyCreateCartOperation } from '@/api/shopify/types/api.types'
import { storefrontClient } from '@/clients/storefrontApiClient'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import type { AddToCartFormValues, CartResponse } from '@/types/cart'

export const performCartCreateMutation = async (
  input: AddToCartFormValues
): Promise<CartResponse | null> => {
  const { data, errors } =
    await storefrontClient.request<ShopifyCreateCartOperation>(
      mutationCartCreate,
      {
        variables: {
          lines: [{ merchandiseId: input.variantId, quantity: input.quantity }]
        }
      }
    )

  if (errors) {
    handleShopifyErrors(errors)
  }

  return data?.data?.cartCreate?.cart ?? null
}
