// Path: src/lib/errors/index.ts

export { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
export { CartNotFoundError } from '@/lib/errors/CartNotFoundError'
export { MissingCartIdError } from '@/lib/errors/MissingCartIdError'
export { MenuNotFoundError } from '@/lib/errors/MenuNotFoundError'
export { InvalidMenuDataError } from '@/lib/errors/InvalidMenuDataError'
export { formatShopifyErrorResponse } from '@/lib/errors/formatShopifyErrorResponse'
export { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
export { isShopifyErrorResponse } from '@/lib/errors/isShopifyErrorResponse'
export { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
export { getErrorMessage } from './getErrorMessage'
export { getCartErrorMessage } from './getCartErrorMessage'
export { extractErrorMessage } from './extractErrorMessage'
export { extractCartErrorMessage } from './extractCartErrorMessage'

/**
 * @fileoverview Centralized error utilities.
 *
 * This module provides consistent error handling patterns across cart and menu
 * operations, leveraging Zod v4 + zod-validation-error for user-friendly
 * Norwegian error messages.
 *
 * @module lib/errors
 */
