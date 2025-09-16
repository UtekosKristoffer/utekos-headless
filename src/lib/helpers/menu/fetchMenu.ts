// Path: src/lib/helpers/menu/fetchMenu.ts

/**
 * @fileoverview Server-side menu fetching with Zod v4 + zod-validation-error integration.
 *
 * This module provides type-safe menu data fetching from the Shopify Storefront API.
 * It integrates with the centralized error mapping system to provide consistent
 * error handling and Norwegian error messages for menu-related operations.
 */

import { menuQuery } from '@/api/graphql/queries/menu/menuQuery'
import { storefrontClient } from '@/clients/storefrontApiClient'
import { extractErrorMessage } from '@/lib/errors/extractErrorMessage'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import { normalizeMenu } from '@/lib/helpers/normalizers/normalizeMenu'
import { validateMenuResponse } from '@/lib/helpers/validations/validateMenuResponse'
import type { MenuItem, MenuQueryResponse } from '@/types/menu'

import { validateMenuHandle } from '../validations/validateMenuHandle'

/**
 * Retrieves a navigation menu by handle from the Shopify Storefront API.
 *
 * This function implements comprehensive error handling with Zod v4 validation
 * and provides Norwegian error messages through zod-validation-error integration.
 */
export const fetchMenu = async (handle: string): Promise<MenuItem[]> => {
  try {
    validateMenuHandle(handle)

    const { data, errors } = await storefrontClient.request<MenuQueryResponse>(
      menuQuery,
      {
        variables: { handle }
      }
    )
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
