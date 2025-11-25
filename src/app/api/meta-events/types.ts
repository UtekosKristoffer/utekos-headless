export type CustomData = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
}
export type UserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ge?: string[]
  db?: string[]
  ct?: string[]
  st?: string[]
  zp?: string[]
  country?: string[]
  client_ip_address?: string | null
  client_user_agent?: string | null
  fbc?: string | null
  fbp?: string | null
  external_id?: string | undefined
  page_id?: string
  ig_account_id?: string
}
export type OldBody = {
  eventName:
    | 'ViewContent'
    | 'AddToCart'
    | 'InitiateCheckout'
    | 'Purchase'
    | 'PageView'
    | string
  eventData?: CustomData
  userData?: UserData
  eventId?: string
  eventSourceUrl?: string
  eventTime?: number
}

type ContentItem = { id: string; quantity: number; item_price?: number }
export type CustomDataInput = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
  search_string?: string
}
export type UserDataInput = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ge?: string[]
  db?: string[]
  ct?: string[]
  st?: string[]
  zp?: string[]
  country?: string[]
  client_ip_address?: string | null
  client_user_agent?: string | null
  fbc?: string | null
  fbp?: string | null
  external_id?: string | undefined
}
export type Body = {
  eventName: string
  eventData?: CustomDataInput
  userData?: UserDataInput
  eventId?: string
  eventSourceUrl?: string
  eventTime?: number
  action_source?: string
}
