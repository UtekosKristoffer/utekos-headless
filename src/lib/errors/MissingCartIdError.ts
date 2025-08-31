// Path: src/lib/errors/MissingCartIdError.ts
import { CartErrorCode } from '@/lib/constants/errorCodes' // Oppdatert import

/**
 * A custom domain error for when the cart ID cookie is missing.
 * Allows for type-safe error handling with `instanceof`.
 */
export class MissingCartIdError extends Error {
  public readonly code = CartErrorCode.MISSING_CART_ID 
  constructor() {
    super('Missing cart ID cookie.')
    this.name = 'MissingCartIdError'
  }
}
