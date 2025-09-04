export type MenuItem = {
  title: string
  url: string
  items?: MenuItem[]
}
export type Action = { type: 'OPEN_MENU' } | { type: 'CLOSE_MENU' }

export type State = {
  status: 'OPEN' | 'CLOSED'
}

/**
 * Type definition with properly optional items array.
 * In Zod v4 + exactOptionalPropertyTypes, undefined must be explicit.
 */
export type ShopifyMenuItem = {
  title: string
  url: string
  items?: ShopifyMenuItem[] | undefined // Eksplisitt undefined for exactOptionalPropertyTypes
}

