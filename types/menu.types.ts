// Path: types/menu.types.ts

import { FOOTER_MENUS } from '@/constants/footer/footer-handles'

export type FooterMenuHandle = (typeof FOOTER_MENUS)[number]
export type MenuItem = {
  title: string
  url: string
  items?: MenuItem[] | undefined
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

export type ShopifyFooterMenu = {
  title: string
  url: string
}
