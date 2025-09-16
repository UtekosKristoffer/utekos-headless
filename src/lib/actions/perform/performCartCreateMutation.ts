// Path: src/lib/actions/perform/performCartCreateMutation.ts
'use server'

import { mutationCartCreate } from '@/api/graphql/mutations/cart'
import { storefrontClient } from '@/clients/storefrontApiClient'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import type { AddToCartFormValues, CartResponse } from '@types'

/**
 * Performs cart creation mutation against Shopify Storefront API
 * @why Isolates the GraphQL mutation from business logic, following SRP
 * @returns Raw CartResponse from Shopify API, null if cart creation fails
 */
export const performCartCreateMutation = async (
  input: AddToCartFormValues
): Promise<CartResponse | null> => {
  const { data, errors } = await storefrontClient.request<{
    cartCreate: { cart: CartResponse }
  }>(mutationCartCreate, {
    variables: {
      lines: [{ merchandiseId: input.variantId, quantity: input.quantity }]
    }
  })

  if (errors) {
    handleShopifyErrors(errors)
  }

  return data?.cartCreate?.cart ?? null
}
