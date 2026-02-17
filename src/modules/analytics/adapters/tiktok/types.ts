export type TikTokUser = {
  ttclid?: string
  ttp?: string
  external_id?: string
  email?: string // SHA256 hashed
  phone?: string // SHA256 hashed
  ip?: string
  user_agent?: string
}

export type TikTokPage = {
  url?: string
  referrer?: string
}

export type TikTokContext = {
  user?: TikTokUser
  page?: TikTokPage
  ip?: string
  user_agent?: string
}

export type TikTokContent = {
  content_id?: string
  content_type?: 'product' | 'product_group'
  content_name?: string
  content_category?: string
  price?: number
  quantity?: number
  brand?: string
}

export type TikTokProperties = {
  contents?: TikTokContent[]
  content_type?: 'product' | 'product_group'
  currency?: string
  value?: number
  query?: string
  description?: string
  order_id?: string
  shop_id?: string
}

export type TikTokEvent = {
  type: 'track'
  event: string
  event_id?: string
  timestamp?: string
  context?: TikTokContext
  properties?: TikTokProperties
  test_event_code?: string
}

export type TikTokPayload = {
  pixel_code: string
  event?: string // Deprecated in batch, but used in single
  batch: TikTokEvent[]
  test_event_code?: string
}
