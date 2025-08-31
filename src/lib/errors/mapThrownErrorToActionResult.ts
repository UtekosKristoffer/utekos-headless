// Path: src/lib/errors/mapThrownErrorToActionResult.ts
import { isValidationErrorLike } from 'zod-validation-error'
import { MissingCartIdError } from '@/lib/errors'
import { isShopifyErrorResponse, formatShopifyErrorResponse } from '@/lib/errors'
import { CartErrorCode } from '@/lib/constants/errorCodes'
import type { CartActionsResult } from '@/types'

/**
 * Centralized error mapping that handles all error types consistently.
 * Now leverages the global errorMap for validation errors.
 */
export function mapThrownErrorToActionResult(thrown: unknown): CartActionsResult {
  // Validation errors (now using global errorMap)
  if (isValidationErrorLike(thrown)) {
    return {
      success: false,
      message: thrown.toString(), // Dette vil nå bruke den norske errorMap
      error: CartErrorCode.VALIDATION_ERROR
    }
  }

  // Domain-specific errors
  if (thrown instanceof MissingCartIdError) {
    return {
      success: false,
      message: 'Handlekurven din ble ikke funnet.',
      error: CartErrorCode.MISSING_CART_ID
    }
  }

  // Shopify API errors (also using zod-validation-error)
  if (isShopifyErrorResponse(thrown)) {
    return formatShopifyErrorResponse(thrown)
  }

  // Fallback for unknown errors
  const message = thrown instanceof Error ? thrown.message : 'En uventet serverfeil oppstod.'

  return {
    success: false,
    message,
    error: CartErrorCode.UNEXPECTED_SERVER_ERROR
  }
}
