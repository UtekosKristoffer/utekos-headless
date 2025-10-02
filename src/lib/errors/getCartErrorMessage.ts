// Path: src/lib/errors/getCartErrorMessage.ts
import { getErrorMessage } from '@/lib/errors/getErrorMessage'
import type { CartActionsResult } from '@types'

/**
 * Specialized version for cart operations that includes cart-specific messaging.
 *
 * This function extends the base error message logic with cart-specific context,
 * providing more meaningful messages for shopping cart operations while
 * maintaining the same error precedence hierarchy.
 * @param getCartErrorMessage Exist because ?
 * @param error - The error that occurred during cart operation
 * @param data - Optional cart action result
 * @returns Human-readable cart error message in Norwegian
 */
export const getCartErrorMessage = (
  error: Error,
  data?: CartActionsResult
): string => {
  const baseMessage = getErrorMessage(error, data)
  if (baseMessage === 'En uventet feil oppstod under behandling') {
    return 'En uventet feil oppstod under behandling av handleposen'
  }

  return baseMessage
}
