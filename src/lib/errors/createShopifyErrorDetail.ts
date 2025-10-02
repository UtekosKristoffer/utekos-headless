import type { ShopifyErrorDetail, ShopifyErrorDetailInput } from '@types'

/**
 * Creates type-safe ShopifyErrorDetail objects from a single input object.
 */
export const createShopifyErrorDetail = ({
  message,
  locations,
  path,
  extensions
}: ShopifyErrorDetailInput): ShopifyErrorDetail => {
  const detail: ShopifyErrorDetail = { message }

  if (locations !== undefined) detail.locations = locations
  if (path !== undefined) detail.path = path
  if (extensions !== undefined) detail.extensions = extensions

  return detail
}
