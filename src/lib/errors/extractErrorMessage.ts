// Path: src/lib/errors/extractErrorMessage.ts

/**
 * @fileoverview Pure utilities for extracting error messages from different error types.
 * @module lib/errors
 * These functions focus solely on message extraction, making them reusable across
 * both server-side result mapping and client-side error presentation. By separating
 * message extraction from result formatting, we achieve better composability and
 * avoid duplication.
 */

import { isValidationErrorLike } from 'zod-validation-error'
import { MissingCartIdError, isShopifyErrorResponse } from '@/lib/errors'

/**
 * Extracts the most appropriate error message from any error type.
 *
 * This function implements the same error precedence as mapThrownErrorToActionResult
 * but focuses only on message extraction, making it reusable in different contexts.
 *
 * @function extractErrorMessage
 * @param {unknown} thrown - The error that occurred
 * @returns Human-readable error message in Norwegian
 */
export const extractErrorMessage = (thrown: unknown): string => {
  // Validation errors from zod-validation-error already contain Norwegian messages
  if (isValidationErrorLike(thrown)) {
    return thrown.toString()
  }

  // Domain-specific business rule violations
  if (thrown instanceof MissingCartIdError) {
    return 'Handlekurven din ble ikke funnet.'
  }

  // For Shopify API errors, we need to extract from the formatted response
  if (isShopifyErrorResponse(thrown)) {
    // We could extract the message from formatShopifyErrorResponse here
    // or create a separate utility for this
    return 'En feil oppstod ved kommunikasjon med Shopify.'
  }

  // Fallback for standard Error instances and unknown types
  if (thrown instanceof Error) {
    return thrown.message
  }

  return 'En uventet feil oppstod'
}
