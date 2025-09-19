import { storefrontClient } from '@/clients/storefrontApiClient'
import { extractErrorMessage } from '@/lib/errors/extractErrorMessage'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import type { MenuQueryResponse, ShopifyFooterMenu } from '@types'

import { menuQuery } from '@/api/graphql/queries/menu/menuQuery'
import { normalizeMenu } from '@/lib/helpers/normalizers/normalizeMenu'
import { validateMenuHandle } from '@/lib/helpers/validations/validateMenuHandle'
import { validateMenuResponse } from '@/lib/helpers/validations/validateMenuResponse'

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

    // Antar at normalizeMenu nå returnerer objekter med { title, url }
    const normalizedMenu: ShopifyFooterMenu[] = normalizeMenu(
      validatedMenu.items
    )

    const validMenu = normalizedMenu.filter(item => {
      if (!item.url) {
        console.warn('Menu item missing url:', item)
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
