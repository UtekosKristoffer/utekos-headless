// Path: src/lib/actions/addCartLinesAction.ts
'use server'

import { revalidateTag } from 'next/cache'

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
 * Adds a new line item to the user's cart.
 * This action uniquely handles cart creation if one does not already exist.
 *
 * @param {AddToCartFormValues} input - The values for the product variant and quantity.
 * @returns {Promise<CartActionsResult>} A promise resolving to a success or failure result.
 */
export const addCartLinesAction = async (
  input: AddToCartFormValues
): Promise<CartActionsResult> => {
  try {
    // 1. Valider input
    validateAddLineInput(input)

    // 2. Hent eksisterende cartId fra cookie
    let cartId = await getCartIdFromCookie()
    let rawCart: CartResponse | null

    if (cartId) {
      // 3a. Hvis handlekurv finnes, legg til varer
      rawCart = await performCartLinesAddMutation(cartId, input)
    } else {
      // 3b. Hvis handlekurv IKKE finnes, opprett en ny med varen
      rawCart = await performCartCreateMutation(input)
      if (rawCart) {
        // 4. Lagre den nye ID-en i en cookie
        await setCartIdInCookie(rawCart.id)
      }
    }

    if (!rawCart) {
      throw new Error('API mutation returned no cart data.')
    }

    // 5. Normaliser data og returner
    revalidateTag('cart')
    const cart = normalizeCart(rawCart)
    return { success: true, message: 'Item added to cart.', cart }
  } catch (thrown: unknown) {
    console.error('An error occurred in addCartLinesAction:', thrown)
    return mapThrownErrorToActionResult(thrown)
  }
}
