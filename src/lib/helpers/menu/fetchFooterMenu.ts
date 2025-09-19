// Path: src/lib/helpers/menu/fetchFooterMenu.ts

import { menuQuery } from '@/api/graphql/queries/menu/menuQuery'
import { storefrontClient } from '@/clients/storefrontApiClient'
import { extractErrorMessage } from '@/lib/errors/extractErrorMessage'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import { normalizeFooterMenu } from '@/lib/helpers/normalizers/normalizeFooterMenu'
import { validateMenuHandle } from '@/lib/helpers/validations/validateMenuHandle'
import { validateMenuResponse } from '@/lib/helpers/validations/validateMenuResponse'

import type { MenuQueryResponse, ShopifyFooterMenu } from '@types'
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

    const validatedMenu = validateMenuResponse(data, handle)

    const normalizedMenu: ShopifyFooterMenu[] = normalizeFooterMenu(
      validatedMenu.items
    )

    const validMenu = normalizedMenu.filter(item => {
      if (!item.url) {
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
