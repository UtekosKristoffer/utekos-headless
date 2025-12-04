// Path: types/meta.types.ts

export interface UserDataStored {
  fbp?: string | undefined
  fbc?: string | undefined
  external_id?: string | undefined
  client_user_agent?: string | undefined
  client_ip_address?: string | undefined
}

export interface CheckoutAttribution {
  cartId: string | null
  checkoutUrl: string | null
  userData: MetaUserData
  ts: number
  eventId?: string | undefined
}

export interface CaptureBody {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData: MetaUserData
}

export type ContentItem = {
  id: string
  quantity?: number | undefined
  item_price?: number | undefined
  delivery_category?: string | undefined
}

export type LogPayload = {
  event: string
  level?: 'info' | 'warn' | 'error'
  data?: Record<string, unknown>
  context?: {
    cartId?: string
    path?: string
  }
}

export type AddToCartContent = {
  id: string
  quantity?: number | undefined
  item_price?: number | undefined
}

export type AddToCartInput = {
  value?: number | undefined
  currency?: string | undefined
  contents: AddToCartContent[]
  content_type?: 'product' | 'product_group' | undefined
  content_ids?: string[] | undefined
  eventId?: string | undefined
  sourceUrl?: string | undefined
  eventName?: string | undefined
  userData: {
    fbp?: string | undefined
    fbc?: string | undefined
    client_user_agent?: string | undefined
    client_ip_address?: string | undefined
    external_id?: string | undefined
  }
  occuredAt?: number | undefined
}

export interface MetaUserData {
  fbp?: string | undefined
  fbc?: string | undefined
  external_id?: string | undefined
  client_user_agent?: string | undefined
  client_ip_address?: string | undefined
  email_hash?: string | undefined
  email?: string | undefined
  phone?: string | undefined
  first_name?: string | undefined
  last_name?: string | undefined
  city?: string | undefined
  state?: string | undefined
  zip?: string | undefined
  country?: string | undefined
}

export interface MetaContentItem {
  id: string
  quantity: number
  item_price?: number | undefined
  title?: string | undefined
  delivery_category?: string | undefined
}
export type MetaPurchaseCustomData = {
  currency: string
  value: number
  contents?: MetaContentItem[] | undefined
  content_type?: 'product' | 'product_group' | undefined
  content_ids?: string[] | undefined
  order_id?: string | undefined
  shipping?: number | null | undefined
  tax?: number | null | undefined
  coupon?: string | null | undefined
  num_items?: number | null | undefined
}

export type MetaEvent = {
  event_name: 'Purchase'
  event_time: number
  action_source: 'website'
  user_data: MetaUserData
  custom_data: MetaPurchaseCustomData
  event_id?: string | undefined
  event_source_url?: string | undefined
}

export interface MetaEventData {
  value?: number | undefined
  currency?: string | undefined
  content_name?: string | undefined
  content_type?: string | undefined
  content_ids?: string[] | undefined
  contents?: MetaContentItem[] | undefined
  num_items?: number | undefined
  order_id?: string | undefined
  search_string?: string | undefined
}

export type MetaEventType =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'HeroInteract'
  | 'InteractWithAccordion'
  | 'OpenQuickView'

export interface MetaEventPayload {
  eventName: MetaEventType
  eventId: string
  eventSourceUrl: string
  eventTime?: number | undefined
  actionSource: 'website'
  userData: MetaUserData
  eventData?: MetaEventData | undefined
}
export type CustomData = {
  value?: number | undefined
  currency?: string | undefined
  content_name: string
  content_type?: 'product' | 'product_group' | undefined
  content_ids?: string[] | undefined
  contents?: ContentItem[] | undefined
  num_items?: number | undefined
  order_id?: string | undefined
}

export interface TrackingProps {
  googleTagManagerId?: string | undefined
  metaPixelId?: string | undefined
  postHogApiKey?: string | undefined
  postHogHost?: string | undefined
  snapPixelId?: string | undefined
}
