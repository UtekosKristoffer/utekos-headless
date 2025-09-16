// Path: src/lib/actions/perform/performCartLinesRemoveMutation.ts

/**
 * @fileoverview Performs the mutation to remove a specific line from the cart.
 *
 *   Accepts a cart identifier and an input object containing the line ID to
 *   remove.  Sends a GraphQL mutation and returns the raw cart on success,
 *   throwing on error.  This helper keeps API concerns out of higher‑level
 *   business logic.
 *
 * @module lib/actions/perform
 */
'use server'

import { mutationCartLinesRemove } from '@/api/graphql/mutations/cart'
import { storefrontClient } from '@/clients/storefrontApiClient'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import type { CartLinesRemoveResponse, CartResponse } from '@/types/cart'

/**
 * Removes a single line from the cart via the Storefront API.
 *
 * @param {string} cartId - The identifier of the cart whose line is being removed.
 * @param {{ lineId: string }} input - Contains the identifier of the line to remove.
 * @returns {Promise<CartResponse | null>} The updated cart or null if missing from the response.
 * @throws {Error} Propagates any API errors.
 */
export const performCartLinesRemoveMutation = async (
  cartId: string,
  input: { lineId: string }
): Promise<CartResponse | null> => {
  const { data, errors } =
    await storefrontClient.request<CartLinesRemoveResponse>(
      mutationCartLinesRemove,
      {
        variables: { cartId, lineIds: [input.lineId] }
      }
    )
  if (errors) {
    handleShopifyErrors(errors)
  }
  return data?.cartLinesRemove?.cart ?? null
}
