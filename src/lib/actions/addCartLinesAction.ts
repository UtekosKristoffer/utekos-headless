// Path: src/lib/actions/addCartLinesAction.ts
'use server'

import { performCartCreateMutation } from '@/lib/actions/perform/performCartCreateMutation'
import { performCartLinesAddMutation } from '@/lib/actions/perform/performCartLinesAddMutation'
import { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { setCartIdInCookie } from '@/lib/helpers/cart/setCartIdInCookie'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { validateAddLineInput } from '@/lib/helpers/validations/validateAddLineInput'
import type {
  AddToCartFormValues,
  CartActionsResult,
  CartResponse
} from '@types'

/**
 * Orchestrates the process of adding a line item to a cart.
 * This server action follows the Single Responsibility and Step-down principles by delegating
 * tasks to specialized functions.
 *
 * @param {AddToCartFormValues} input - The validated input for adding an item.
 * @returns {Promise<CartActionsResult>} The result of the cart operation.
 */
export const addCartLinesAction = async (
  input: AddToCartFormValues
): Promise<CartActionsResult> => {
  try {
    validateAddLineInput(input)

    const cartId = await getCartIdFromCookie()

    let rawCart: CartResponse | null

    if (cartId) {
      rawCart = await performCartLinesAddMutation(cartId, input)
    } else {
      rawCart = await performCartCreateMutation(input)
      if (rawCart) {
        await setCartIdInCookie(rawCart.id)
      }
    }

    if (!rawCart) {
      throw new Error('Klarte ikke å legge produkt i handlekurv.')
    }

    const cart = normalizeCart(rawCart)

    return { success: true, message: 'Vare lagt til.', cart }
  } catch (error) {
    return mapThrownErrorToActionResult(error)
  }
}
