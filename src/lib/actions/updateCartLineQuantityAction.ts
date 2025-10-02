// Path: src/lib/actions/updateCartLineQuantityAction.ts
'use server'

import { performCartLinesUpdateMutation } from '@/lib/actions/perform/performCartLinesUpdateMutation'
import { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
import { MissingCartIdError } from '@/lib/errors/MissingCartIdError'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { validateUpdateLineInput } from '@/lib/helpers/validations/validateUpdateLineInput'
import type { CartActionsResult, UpdateCartLineInput } from '@types'

/**
 * Orchestrates updating the quantity of an existing line item in the cart.
 * This server action follows the Single Responsibility and Step-down principles.
 *
 * @param input - The line to update and the new quantity.
 * @returns The result of the cart operation.
 */
export const updateCartLineQuantityAction = async (
  input: UpdateCartLineInput
): Promise<CartActionsResult> => {
  try {
    validateUpdateLineInput(input)

    const cartId = await getCartIdFromCookie()
    if (!cartId) {
      throw new MissingCartIdError()
    }
    const rawCart = await performCartLinesUpdateMutation(cartId, input)
    if (!rawCart) {
      throw new Error('Oppdatering av handlekurv returnerte ingen data.')
    }

    const cart = normalizeCart(rawCart)

    return { success: true, message: 'Handlekurv oppdatert.', cart }
  } catch (e) {
    console.error(
      `An error occurred in updateLineQuantityAction for input: ${JSON.stringify(
        input
      )}`,
      e
    )
    return mapThrownErrorToActionResult(e)
  }
}
