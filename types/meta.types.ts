export type MoneySet = { shop_money: { amount: string; currency_code: string } }

export type LineItem = {
  quantity: number
  price_set: MoneySet
  variant_id: number | null
  product_id: number | null
}

export type UserData = {
  fbp?: string
  fbc?: string
  client_user_agent?: string
  client_ip_address?: string
  external_id?: string
  em?: string[] // (hash: SHA-256 lowercased email) – valgfritt, når/om du har det
  ph?: string[] // (hash: SHA-256 phone, E.164)     – valgfritt, når/om du har det
}

export type OrderPaid = {
  id?: number // ← REST ID (finnes i orders/paid)
  admin_graphql_api_id: string
  token: string | null
  currency: string
  total_price_set?: MoneySet
  current_total_price_set?: MoneySet
  created_at: string
  processed_at?: string | null
  line_items: LineItem[]
  phone: string | number | null
  email: string | null
  customer: any
  OrderPaid: any
  total_shipping_price_set?: MoneySet
  total_tax_set?: MoneySet
  discount_codes?: { code: string | null }[] | null
}

export type ContentItem = {
  id: string
  quantity?: number
  item_price?: number
  delivery_category?: string
}

export type PurchaseCustomData = {
  currency: string
  value: number
  contents?: ContentItem[]
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  order_id?: string
}

// --- Add to Cart ---
export type AddToCartContent = {
  id: string
  quantity?: number
  item_price?: number
}
export type Body = {
  cartId: string
  checkoutUrl: string
  userData: {
    fbp?: string
    fbc?: string
    client_user_agent?: string
    client_ip_address?: string
    external_id?: string
  }
  eventId?: string
}
export type AddToCartInput = {
  value?: number
  currency?: string
  contents: AddToCartContent[]
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  eventId?: string
  sourceUrl?: string
  eventName?: string
  userData: {
    fbp?: string
    fbc?: string
    client_user_agent?: string
    client_ip_address?: string
    external_id?: string
  }
  occuredAt?: number
}

// --- Initiate Checkout ---
export type InitiateCheckoutInput = {
  value?: number
  currency?: string
  contents?: AddToCartContent[]
  num_items?: number
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  eventId?: string
  sourceUrl?: string
  userData: {
    fbp?: string
    fbc?: string
    client_user_agent?: string
    client_ip_address?: string
    external_id?: string
  }
  occuredAt?: number
}

export type MetaUserData = {
  fbp?: string
  fbc?: string
  client_user_agent?: string
  client_ip_address?: string
  external_id?: string
  em?: string[]
  ph?: string[]
  fn?: string[] // first name
  ln?: string[] // last name
  ge?: string[] //
  db?: string[] // date of birth
  ct?: string[] // city
  st?: string[] // state
  zp?: string[] // zip code
  country?: string[] // country
}

export type MetaContentItem = {
  id: string
  quantity?: number
  item_price?: number
  delivery_category?: string
}

export type MetaPurchaseCustomData = {
  currency: string
  value: number
  contents?: MetaContentItem[]
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  order_id?: string
  shipping?: number | null
  tax?: number | null
  coupon?: string | null
  num_items?: number | null
}

export type MetaEvent = {
  event_name: 'Purchase'
  event_time: number
  action_source: 'website'
  user_data: MetaUserData
  custom_data: MetaPurchaseCustomData
  event_id?: string
  event_source_url?: string
}

export type MetaEventsRequest =
  | { data: [MetaEvent] }
  | { data: [MetaEvent]; test_event_code: string }

export type MetaEventsSuccess = {
  events_received: number
  messages?: string[]
  fbtrace_id: string
}

export type MetaGraphError = {
  error: {
    message: string
    type: string
    code: number
    error_subcode?: number
    fbtrace_id: string
  }
}

export type PurchaseInput = {
  value: number
  currency: string
  userData: MetaUserData
  contents?: MetaContentItem[]
  content_ids?: string[]
  content_type?: 'product' | 'product_group'
  eventId?: string
  sourceUrl?: string
  orderId?: string
  occuredAt?: number
}

export type CheckoutAttribution = {
  cartId: string | null
  checkoutUrl: string
  userData: {
    fbp?: string
    fbc?: string
    client_user_agent?: string
    client_ip_address?: string
    external_id?: string
  }
  eventId?: string
  ts: number
}

export type CustomData = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
}
