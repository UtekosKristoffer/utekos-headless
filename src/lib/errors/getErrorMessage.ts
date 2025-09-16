// Path: src/lib/errors/getErrorMessage.ts

import type { CartActionsResult } from '@types'
import { isValidationErrorLike } from 'zod-validation-error'

/**
 * @fileoverview Utilities for extracting user-friendly error messages.
 *
 * This module provides pure functions for determining appropriate error messages
 * based on error types and server action results. These functions integrate with
 * zod-validation-error to provide consistent Norwegian error messaging across
 * the application. The functions are designed for reuse in any context where
 * user-friendly error presentation is needed.
 *
 * @module lib/errors
 */

/**
 * Determines the most appropriate error message based on error type and context.
 *
 * This function prioritizes error sources in order of specificity:
 * validation errors (from zod-validation-error) take highest priority as they
 * already contain localized Norwegian messages, followed by server action
 * messages, then generic Error messages, with a safe fallback for unknown types.
 * @param getErrorMessage - The function to get error messages
 * @param error - The error that occurred during operation
 * @param data - Optional server action result containing additional context
 * @returns Human-readable error message in Norwegian
 */
export const getErrorMessage = (
  error: Error,
  data?: CartActionsResult
): string => {
  // Validation errors from zod-validation-error already contain Norwegian messages
  if (isValidationErrorLike(error)) {
    return error.toString()
  }

  // Server action results contain contextual error messages
  if (data && !data.success && data.message) {
    return data.message
  }

  // Standard Error instances contain developer or API messages
  if (error.message) {
    return error.message
  }

  // Fallback for completely unknown error types
  return 'En uventet feil oppstod under behandling'
}
