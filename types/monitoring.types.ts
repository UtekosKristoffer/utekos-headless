export interface GoogleMarketingParams {
  utm: Record<string, string>
  fbclid: string
  fbc: string
  email: string
  emailHash: string
  additionalParams: Record<string, string>
  all: Record<string, string>
  timestamp: string
}

export interface CookieConfig {
  name: string
  value: string
  maxAge: number
  path: string
  domain?: string
  sameSite: 'Strict' | 'Lax' | 'None'
  secure: boolean
}

export interface AnalyticsItem {
  item_id: string
  item_name: string
  price?: number
  quantity?: number
  item_brand?: string
  item_category?: string
  item_variant?: string
  index?: number
  coupon?: string
  discount?: number
  location_id?: string
  item_list_id?: string
  item_list_name?: string
}

export interface AnalyticsEvent {
  name: string
  params?: Record<string, any>
  ecommerce?: {
    currency: Currency
    value: number
    transaction_id?: string
    coupon?: string
    shipping?: number
    tax?: number
    items: AnalyticsItem[]
    customer_type?: 'new' | 'returning'
  }
}

export interface TrackingOverrides {
  clientId?: string
  sessionId?: string
  userId?: string
  fbp?: string
  fbc?: string
  userData?: any
  userProperties?: Record<string, any>
  userAgent?: string
  ipOverride?: string
  timestampMicros?: number
}
export type Currency = 'NOK' | 'EUR' | 'USD'
