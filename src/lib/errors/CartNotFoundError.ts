// Path: src/lib/errors/CartNotFoundError.ts

/**
 * @module lib/errors
 */

/**
 * Custom error class to represent a "Cart Not Found" error.
 * Exist because carts can be deleted or expire, and we want to handle that case specifically.
 * @class CartNotFoundError
 * @extends Error
 * @author Hjelmeland
 */

export class CartNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CartNotFoundError'
  }
}
