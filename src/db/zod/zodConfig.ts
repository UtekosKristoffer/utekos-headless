// Path: src/db/zod/zodConfig.ts
import * as z from 'zod'
import { createErrorMap } from 'zod-validation-error'

/**
 * Global Zod configuration with Norwegian error messages.
 * Ensures all validation errors across the application have
 * consistent, user-friendly messages in Norwegian.
 */
z.config({
  customError: createErrorMap({
    displayInvalidFormatDetails: true,
    maxAllowedValuesToDisplay: 5,
    maxUnrecognizedKeysToDisplay: 3,
    allowedValuesSeparator: ', ',
    allowedValuesLastSeparator: ' eller ',
    wrapAllowedValuesInQuote: true
  })
})

export { z }
