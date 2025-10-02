// Path: src/lib/actions/clearCartAction.ts
'use server'

import { performCartClearMutation } from '@/lib/actions/perform/performCartClearMutation'
import { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
import { MissingCartIdError } from '@/lib/errors/MissingCartIdError'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { validateClearCartInput } from '@/lib/helpers/validations/validateClearCartInput'
import type { CartActionsResult } from '@types'

/**
 * Orchestrates clearing the current cart of all items.
 * This server action follows the Single Responsibility and Step-down principles.
 *
 * @returns A promise that resolves to a normalized action result.
 */
export const clearCartAction = async (): Promise<CartActionsResult> => {
  try {
    validateClearCartInput({})

    const cartId = await getCartIdFromCookie()
    if (!cartId) {
      throw new MissingCartIdError()
    }
    const rawCart = await performCartClearMutation(cartId)
    if (!rawCart) {
      throw new Error('Tømming av handlekurv returnerte ingen data.')
    }

    const cart = normalizeCart(rawCart)

    return { success: true, message: 'Handlekurven er tømt.', cart }
  } catch (e) {
    console.error('An error occurred in clearCartAction:', e)
    return mapThrownErrorToActionResult(e)
  }
}
