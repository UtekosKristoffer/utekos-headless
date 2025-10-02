// Path: src/lib/errors/mapThrownErrorToActionResult.ts

/**
 * @fileoverview Centralized error mapping that leverages reusable error message utilities.
 *
 * This mapper composes error message extraction utilities with CartActionsResult
 * formatting to provide consistent error responses. By delegating message extraction
 * to pure utility functions, we achieve better separation of concerns and reusability.
 */

import { isValidationErrorLike } from 'zod-validation-error'

import {
  CartErrorCode,
  type CartErrorCodeType
} from '@/constants/CartErrorCode'
import { isShopifyErrorResponse } from '@/lib/errors/isShopifyErrorResponse'
import { MissingCartIdError } from '@/lib/errors/MissingCartIdError'

import { extractCartErrorMessage } from './extractCartErrorMessage'
import { formatShopifyErrorResponse } from './formatShopifyErrorResponse'

import type { CartActionsResult } from '@types'
/**
 * Maps any thrown error into a standardized CartActionsResult.
 *
 * This function focuses on determining the appropriate error code and delegating
 * message extraction to specialized utilities. This separation allows the same
 * error message logic to be reused in different contexts.
 */
export function mapThrownErrorToActionResult(
  thrown: unknown
): CartActionsResult {
  if (isShopifyErrorResponse(thrown)) {
    return formatShopifyErrorResponse(thrown)
  }

  let errorCode: CartErrorCodeType
  if (isValidationErrorLike(thrown)) {
    errorCode = CartErrorCode.VALIDATION_ERROR
  } else if (thrown instanceof MissingCartIdError) {
    errorCode = CartErrorCode.MISSING_CART_ID
  } else {
    errorCode = CartErrorCode.UNEXPECTED_SERVER_ERROR
  }

  const message = extractCartErrorMessage(thrown)

  return {
    success: false,
    message,
    error: errorCode
  }
}
