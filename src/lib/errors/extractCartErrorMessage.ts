// Path: src/lib/errors/extractCartErrorMessage.ts

import { extractErrorMessage } from './extractErrorMessage'

/**
 * Specialized version for cart operations that adds cart-specific context.
 *
 * This function extends the base error message extraction with cart-specific
 * messaging while maintaining the same error precedence hierarchy.
 * @module lib/errors
 * @param extractCartErrorMessage - The function to extract cart error messages
 * @param thrown - The error that occurred during cart operation
 * @param baseMessage - Human-readable cart error message in Norwegian
 * @returns baseMessage
 */

export const extractCartErrorMessage = (thrown: unknown): string => {
  /**
   * @param baseMessage - Extracted human-readable cart error message in Norwegian
   */
  const baseMessage = extractErrorMessage(thrown)

  // For generic messages, provide cart-specific context
  if (baseMessage === 'En uventet feil oppstod') {
    return 'En uventet feil oppstod under behandling av handleposen'
  }

  return baseMessage
}
