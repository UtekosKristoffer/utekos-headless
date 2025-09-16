// Path: types/menu.types.ts

import { FOOTER_MENUS } from '@/constants/footer/footer-handles'

export type FooterMenuHandle = (typeof FOOTER_MENUS)[number]
export type MenuItem = {
  title: string
  url: string
  items?: MenuItem[] | undefined
  path: string
}

export type MenuQueryResponse = {
  menu: {
    items: MenuItem[]
  } | null
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
  items?: ShopifyMenuItem[] | undefined
  path: string // Eksplisitt undefined for exactOptionalPropertyTypes
}

export type ShopifyFooterMenu = {
  title: string
  path: string // Eksplisitt undefined for exactOptionalPropertyTypes
}
