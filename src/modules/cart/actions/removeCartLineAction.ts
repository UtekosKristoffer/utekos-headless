// Path: src/lib/actions/removeCartLineAction.ts
'use server'

import { performCartLinesRemoveMutation } from '@/modules/cart/actions/perform/performCartLinesRemoveMutation'
import { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
import { MissingCartIdError } from '@/lib/errors/MissingCartIdError'
import { getCartIdFromCookie } from '@/modules/cart/actions/getCartIdFromCookie'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { validateRemoveCartLineInput } from '@/modules/cart/actions/validations/validateRemoveCartLineInput'
import type { CartActionsResult, RemoveCartLineInput } from '@types'
import { updateTag } from 'next/cache'

export const removeCartLineAction = async (
  input: RemoveCartLineInput
): Promise<CartActionsResult> => {
  try {
    await validateRemoveCartLineInput(input)

    const cartId = await getCartIdFromCookie()
    if (!cartId) {
      throw new MissingCartIdError()
    }

    const rawCart = await performCartLinesRemoveMutation(cartId, input)
    if (!rawCart) {
      throw new Error('Fjerning av vare fra handlekurv returnerte ingen data.')
    }

    if (rawCart.id) {
      updateTag(`cart-${rawCart.id}`)
      updateTag('cart')
    }

    const cart = normalizeCart(rawCart)

    return { success: true, message: 'Vare fjernet fra handlekurv.', cart }
  } catch (e) {
    console.error(
      `An error occurred in removeCartLineAction for input: ${JSON.stringify(
        input
      )}`,
      e
    )
    return mapThrownErrorToActionResult(e)
  }
}
