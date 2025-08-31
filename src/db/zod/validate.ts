// Path: src/db/zod/validations.ts
'use server'

/**
 * Simplified validation functions that leverage the global errorMap
 * for consistent error messages across the application.
 */

import { fromZodError } from 'zod-validation-error'
import { AddToCartSchema, UpdateCartSchema, RemoveCartLineSchema, ClearCartLineSchema } from '@/db/zod/cartSchemas'
import type { AddToCartFormValues, UpdateCartLineInput, RemoveCartLineInput, ClearCartLineInput } from '@/types/cart'

/**
 * Validates add-to-cart input using global errorMap for consistent messaging.
 */
export const validateAddLineInput = (input: AddToCartFormValues): void => {
  const result = AddToCartSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}

/**
 * Validates update-line input using global errorMap for consistent messaging.
 */
export const validateUpdateLineInput = (input: UpdateCartLineInput): void => {
  const result = UpdateCartSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}

/**
 * Validates remove-line input using global errorMap for consistent messaging.
 */
export const validateRemoveCartLineInput = (input: RemoveCartLineInput): void => {
  const result = RemoveCartLineSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}

/**
 * Validates clear-cart input using global errorMap for consistent messaging.
 */
export const validateClearCartInput = (input: ClearCartLineInput): void => {
  const result = ClearCartLineSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
