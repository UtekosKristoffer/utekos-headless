// Path: src/lib/helpers/menu/fetchMenu.ts (renamed from getMenu.ts)

/**
 * @fileoverview Server-side menu fetching with Zod v4 + zod-validation-error integration.
 *
 * This module provides type-safe menu data fetching from the Shopify Storefront API.
 * It integrates with the centralized error mapping system to provide consistent
 * error handling and Norwegian error messages for menu-related operations.
 */

import { storefrontClient } from '@/clients/storefrontApiClient'
import { menuQuery } from '@/lib/queries'
import { extractErrorMessage, handleShopifyErrors } from '@/lib/errors'
import { normalizeMenu } from '@/lib/helpers/normalizers'
import { validateMenuResponse, validateMenuHandle } from '@/lib/helpers/validations'

import type { MenuItem } from '@/types'

/**
 * Retrieves a navigation menu by handle from the Shopify Storefront API.
 *
 * This function implements comprehensive error handling with Zod v4 validation
 * and provides Norwegian error messages through zod-validation-error integration.
 */
export const fetchMenu = async (handle: string): Promise<MenuItem[]> => {
  try {
    validateMenuHandle(handle)

    const { data, errors } = await storefrontClient.request(menuQuery, {
      variables: { handle }
    })

    if (errors) {
      handleShopifyErrors(errors)
    }

    const validatedMenu = validateMenuResponse(data, handle)

    return normalizeMenu(validatedMenu.items)
  } catch (error) {
    const errorMessage = extractErrorMessage(error)

    console.error(`Error fetching menu "${handle}":`, {
      message: errorMessage,
      handle,
      error
    })

    return []
  }
}

export default fetchMenu
