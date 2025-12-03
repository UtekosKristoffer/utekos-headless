// Path: types/order-paid-related-types.ts
export type MoneySet = { shop_money: { amount: string; currency_code: string } }

export type Address = {
  id: number | undefined
  customer_id: number | undefined
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
  country_name: string | null | undefined
  latitude: number | null
  longitude: number | null
  default: boolean | undefined
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
  description: string | undefined
  title: string | undefined
  code: string | undefined
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
