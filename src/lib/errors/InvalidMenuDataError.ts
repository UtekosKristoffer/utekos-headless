// Path: src/lib/errors/InvalidMenuDataError.ts

import { CartErrorCode } from '@/constants/CartErrorCode'

/**
 * Custom error for invalid menu data.
 * @module lib/errors
 * @extends Error
 * @public
 * @readonly
 * @author Hjelmeland
 */
export class InvalidMenuDataError extends Error {
  public readonly code = CartErrorCode.VALIDATION_ERROR
  constructor(message: string) {
    super(message)
    this.name = 'InvalidMenuDataError'
  }
}
