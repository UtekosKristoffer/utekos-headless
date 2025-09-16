/**
 * Debug version of fetchFooterMenu to help identify the issue
 */

/* eslint-disable max-statements */

import { storefrontClient } from '@/clients/storefrontApiClient'
import { extractErrorMessage } from '@/lib/errors/extractErrorMessage'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import type { MenuQueryResponse, ShopifyFooterMenu } from '@/types/menu'

import { menuQuery } from '../../queries/menuQuery'
import { normalizeMenu } from '../normalizers/normalizeMenu'
import { validateMenuHandle } from '../validations/validateMenuHandle'
import { validateMenuResponse } from '../validations/validateMenuResponse'
export const fetchFooterMenu = async (
  handle: string
): Promise<ShopifyFooterMenu[]> => {
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

    // Debug logging
    console.log(
      `Raw Shopify response for menu "${handle}":`,
      JSON.stringify(data, null, 2)
    )

    const validatedMenu = validateMenuResponse(data, handle)

    // Debug logging before normalization
    console.log(`Validated menu items for "${handle}":`, validatedMenu.items)

    const normalizedMenu: ShopifyFooterMenu[] = normalizeMenu(
      validatedMenu.items
    )

    // Debug logging after normalization
    console.log(`Normalized menu for "${handle}":`, normalizedMenu)

    // Extra validation - ensure all items have path
    const validMenu = normalizedMenu.filter(item => {
      if (!item.path) {
        console.error('Menu item missing path:', item)
        return false
      }
      return true
    })

    return validMenu
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
