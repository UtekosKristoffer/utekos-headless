// Path: src/lib/errors/extractErrorMessage.ts

import { isValidationErrorLike } from 'zod-validation-error'

import { isShopifyErrorResponse } from '@/lib/errors/isShopifyErrorResponse'
import { MissingCartIdError } from '@/lib/errors/MissingCartIdError'

export const extractErrorMessage = (thrown: unknown): string => {
  // Validation errors from zod-validation-error already contain Norwegian messages
  if (isValidationErrorLike(thrown)) {
    return thrown.toString()
  }

  if (thrown instanceof MissingCartIdError) {
    return 'Handlekurven din ble ikke funnet.'
  }

  // For Shopify API errors, we need to extract from the formatted response
  if (isShopifyErrorResponse(thrown)) {
    return 'En feil oppstod ved kommunikasjon med Shopify.'
  }

  if (thrown instanceof Error) {
    return thrown.message
  }

  return 'En uventet feil oppstod'
}
