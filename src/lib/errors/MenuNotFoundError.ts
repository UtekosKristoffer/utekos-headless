// Path: src/lib/errors/menuErrors.ts

import { CartErrorCode } from '@/constants/CartErrorCode'

/**
 * Custom error for when a menu is not found.
 * Allows for type-safe error handling with instanceof.
 *
 * @module lib/errors
 * @public
 * @readonly
 * @author Hjelmeland
 */
export class MenuNotFoundError extends Error {
  public readonly code = CartErrorCode.API_ERROR
  constructor(handle: string) {
    super(`Menu with handle "${handle}" was not found.`)
    this.name = 'MenuNotFoundError'
  }
}
