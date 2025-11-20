export type MoneySet = { shop_money: { amount: string; currency_code: string } }
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
  id: number
  admin_graphql_api_id: string
  app_id: number | null
  browser_ip: string | null
  buyer_accepts_marketing: boolean
  cancel_reason: string | null
  cancelled_at: string | null
  cart_token: string | null
  checkout_id: number | null
  checkout_token: string | null
  client_details: Record<string, unknown> | null
  closed_at: string | null
  confirmation_number: string | null
  confirmed: boolean
  contact_email: string | null
  created_at: string
  currency: string
  current_shipping_price_set: MoneySet
  current_subtotal_price: string
  current_subtotal_price_set: MoneySet
  current_total_additional_fees_set: MoneySet | null
  current_total_discounts: string
  current_total_discounts_set: MoneySet
  current_total_duties_set: MoneySet | null
  current_total_price: string
  current_total_price_set: MoneySet
  current_total_tax: string
  current_total_tax_set: MoneySet
  customer_locale: string
  device_id: number | null
  discount_codes: Array<{ code: string; amount: string; type: string }> | null
  duties_included: boolean
  email: string | null
  estimated_taxes: boolean
  financial_status: string | null
  fulfillment_status: string | null
  landing_site: string | null
  landing_site_ref: string | null
  location_id: number | null
  merchant_business_entity_id: string
  merchant_of_record_app_id: number | null
  name: string | null
  note: string | null
  note_attributes: Array<{ name: string; value: string }>
  number: number
  order_number: number
  order_status_url: string | null
  original_total_additional_fees_set: MoneySet | null
  original_total_duties_set: MoneySet | null
  payment_gateway_names: string[]
  phone: string | null
  po_number: string | null
  presentment_currency: string
  processed_at: string | null
  reference: string | null
  referring_site: string | null
  source_identifier: string | null
  source_name: string
  source_url: string | null
  subtotal_price: string
  subtotal_price_set: MoneySet
  tags: string
  tax_exempt: boolean
  tax_lines: TaxLine[]
  taxes_included: boolean
  test: boolean
  token: string | null
  total_cash_rounding_payment_adjustment_set: MoneySet
  total_cash_rounding_refund_adjustment_set: MoneySet
  total_discounts: string
  total_discounts_set: MoneySet
  total_line_items_price: string
  total_line_items_price_set: MoneySet
  total_outstanding: string
  total_price: string
  total_price_set: MoneySet
  total_shipping_price_set: MoneySet
  total_tax: string
  total_tax_set: MoneySet
  total_tip_received: string
  total_weight: number
  updated_at: string
  user_id: number | null
  billing_address: Address | null
  customer: Customer | null
  discount_applications: DiscountApplication[]
  fulfillments: Fulfillment[]
  line_items: LineItem[]
  payment_terms: PaymentTerms | null
  refunds: Refund[]
  shipping_address: Address | null
  shipping_lines: ShippingLine[]
  returns: Return[]
  line_item_groups: LineItemGroup[]
}
export type Address = {
  id?: number
  customer_id?: number
  first_name: string | null
  last_name: string | null
  company: string | null
  address1: string | null
  address2: string | null
  city: string | null
  province: string | null
  country: string | null
  zip: string | null
  phone: string | null
  name: string | null
  province_code: string | null
  country_code: string | null
  country_name?: string | null
  latitude: number | null
  longitude: number | null
  default?: boolean
}

export type Customer = {
  id: number
  created_at: string | null
  updated_at: string | null
  first_name: string | null
  last_name: string | null
  state: string
  note: string | null
  verified_email: boolean
  multipass_identifier: string | null
  tax_exempt: boolean
  email: string | null
  phone: string | null
  currency: string
  tax_exemptions: string[]
  admin_graphql_api_id: string
  default_address: Address | null
}

export type LineItem = {
  id: number
  admin_graphql_api_id: string
  attributed_staffs: Array<{
    id: string
    quantity: number
  }>
  current_quantity: number
  fulfillable_quantity: number
  fulfillment_service: string
  fulfillment_status: string | null
  gift_card: boolean
  grams: number
  name: string
  price: string
  price_set: MoneySet
  product_exists: boolean
  product_id: number
  properties: Array<{ name: string; value: string }>
  quantity: number
  requires_shipping: boolean
  sales_line_item_group_id: number | null
  sku: string | null
  taxable: boolean
  title: string
  total_discount: string
  total_discount_set: MoneySet
  variant_id: number | null
  variant_inventory_management: string | null
  variant_title: string | null
  vendor: string | null
  tax_lines: TaxLine[]
  discount_allocations: DiscountAllocation[]
}

export type TaxLine = {
  title: string
  price: string
  price_set: MoneySet
  rate: number
}
export type DiscountAllocation = {
  amount: string
  amount_set: MoneySet
  discount_application_index: number
}

export type DiscountApplication = {
  type: string
  value: string
  value_type: string
  allocation_method: string
  target_selection: string
  target_type: string
  description?: string
  title?: string
  code?: string
}

export type Fulfillment = {
  id: number
  order_id: number
  status: string
  created_at: string
  service: string
  updated_at: string
  tracking_company: string | null
  shipment_status: string | null
  location_id: number | null
  line_items: LineItem[]
  tracking_number: string | null
  tracking_numbers: string[]
  tracking_url: string | null
  tracking_urls: string[]
  receipt: Record<string, unknown>
  name: string
  admin_graphql_api_id: string
}

export type ShippingLine = {
  id: number
  carrier_identifier: string | null
  code: string | null
  current_discounted_price_set: MoneySet
  discounted_price: string
  discounted_price_set: MoneySet
  is_removed: boolean
  phone: string | null
  price: string
  price_set: MoneySet
  requested_fulfillment_service_id: string | null
  source: string
  title: string
  tax_lines: TaxLine[]
  discount_allocations: DiscountAllocation[]
}

export type PaymentTerms = {
  amount: number
  currency: string
  payment_terms_name: string
  payment_terms_type: string
  due_in_days: number
  payment_schedules: Array<{
    amount: number
    currency: string
    issued_at: string
    due_at: string
    completed_at: string | null
    expected_payment_method: string
  }>
}

export type Refund = {
  id: number
  order_id: number
  created_at: string
  note: string | null
  user_id: number | null
  processed_at: string
  refund_line_items: Array<{
    id: number
    line_item_id: number
    quantity: number
    restock_type: string
    location_id: number | null
    subtotal: string
    total_tax: string
    subtotal_set: MoneySet
    total_tax_set: MoneySet
  }>
  transactions: Array<{
    id: number
    order_id: number
    amount: string
    kind: string
    gateway: string
    status: string
    created_at: string
  }>
  admin_graphql_api_id: string
}

export type Return = {
  id: number
  order_id: number
  created_at: string
  status: string
  admin_graphql_api_id: string
}

export type LineItemGroup = {
  id: number
  title: string
  line_items: LineItem[]
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
  admin_graphql_api_id?: string
  contact_email?: string
  client_user_agent?: string
  client_ip_address?: string
  external_id?: string
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ge?: string[]
  db?: string[]
  ct?: string[]
  st?: string[]
  zp?: string[]
  zip?: string[]
  country_code?: string[]
  country?: string[]
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
  checkoutUrl: string | null
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

export interface TrackingProps {
  googleTagManagerId?: string
  metaPixelId?: string
  postHogApiKey?: string
  postHogHost?: string
  snapPixelId?: string
}
