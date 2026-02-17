/**
 * Google Measurement Protocol (GA4) Types
 * Based on official documentation for MP events and User Data.
 */

export type GoogleMeasurementProtocolItem = {
  item_id?: string
  item_name?: string
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price?: number
  quantity?: number
}

export type GoogleMeasurementProtocolEventParams = {
  session_id?: string | number 
  engagement_time_msec?: number // Required for 'active user' metrics
  debug_mode?: number | boolean // 1 or true
  currency?: string
  value?: number
  transaction_id?: string
  coupon?: string
  shipping?: number
  tax?: number
  items?: GoogleMeasurementProtocolItem[]
  [key: string]:
    | string
    | number
    | boolean
    | GoogleMeasurementProtocolItem[]
    | undefined
}

export type GoogleMeasurementProtocolEvent = {
  name: string
  params?: GoogleMeasurementProtocolEventParams
}

export type GoogleUserDataAddress = {
  sha256_first_name?: string
  sha256_last_name?: string
  sha256_street?: string
  city?: string
  region?: string
  postal_code?: string
  country?: string
}

export type GoogleUserData = {
  sha256_email_address?: string[]
  sha256_phone_number?: string[]
  address?: GoogleUserDataAddress[]
}

export type GoogleMeasurementProtocolPayload = {
  client_id: string // Required: The 'cid' from cookie
  user_id?: string // Optional: The 'uid' (Logged in user)
  timestamp_micros?: number
  non_personalized_ads?: boolean
  events: GoogleMeasurementProtocolEvent[]
  user_data?: GoogleUserData
}
