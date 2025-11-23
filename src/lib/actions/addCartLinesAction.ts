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
import { updateTag } from 'next/cache'

export const addCartLinesAction = async (
  input: AddToCartFormValues
): Promise<CartActionsResult> => {
  try {
    await validateAddLineInput(input)

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

    if (rawCart.id) {
      updateTag(`cart-${rawCart.id}`)
      updateTag('cart')
    }

    const cart = normalizeCart(rawCart)
    return { success: true, message: 'Vare lagt til.', cart }
  } catch (error) {
    return mapThrownErrorToActionResult(error)
  }
}
