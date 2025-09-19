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

export const addCartLinesAction = async (
  input: AddToCartFormValues
): Promise<CartActionsResult> => {
  try {
    validateAddLineInput(input)

    let cartId = await getCartIdFromCookie()
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
      throw new Error('API mutation returned no cart data.')
    }

    const cart = normalizeCart(rawCart)

    return { success: true, message: 'Item added successfully.' }
  } catch (error) {
    console.error('An error occurred during addCartLinesAction:', error)
    return mapThrownErrorToActionResult(error)
  }
}
