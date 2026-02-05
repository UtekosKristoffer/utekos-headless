// Path: src/types/meta.types.ts
import type { TrackingUserData, GA4DataPayload } from '@types'

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
  userData: TrackingUserData
  ts: number
  eventId?: string | undefined
  ga_client_id?: string | undefined
  ga_session_id?: string | undefined
}

export interface CaptureBody {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData?: TrackingUserData | undefined
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
  context?: Record<string, unknown>
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

export type NewUserData = {
  setFbp: string | undefined
  setFbc: string | undefined
  external_id: string | undefined
  client_user_agent: string | undefined
  client_ip_address: string | undefined
  email_hash?: string | undefined
  setClientIpAddress?: string | undefined
  setClientUserAgent?: string | undefined
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
  content_name?: string | undefined
  content_category?: string | undefined
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
  content_category?: string | undefined
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
  | 'Lead' // NY EVENT-TYPE

export interface MetaEventPayload {
  eventName: MetaEventType | undefined
  eventId: string | undefined
  eventSourceUrl: string | undefined
  eventTime?: number | undefined
  actionSource: 'website' | undefined
  userData: MetaUserData | undefined
  eventData?: MetaEventData | undefined
  ga4Data?: GA4DataPayload | undefined
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

export interface MetaEventRequestBody {
  event_name: string
  event_id: string
  event_source_url: string
  custom_data?: Record<string, unknown>
}

export interface MetaEventResponse {
  events_received: number
  messages: string[]
  fbtrace_id: string
}

export interface FacebookUserData {
  setClientIpAddress(ip: string): FacebookUserData
  setClientUserAgent(ua: string): FacebookUserData
  setFbc(fbc: string): FacebookUserData
  setFbp(fbp: string): FacebookUserData
}

export interface FacebookServerEvent {
  setEventName(name: string): FacebookServerEvent
  setEventId(id: string): FacebookServerEvent
  setEventTime(timestamp: number): FacebookServerEvent
  setEventSourceUrl(url: string): FacebookServerEvent
  setActionSource(source: string): FacebookServerEvent
  setUserData(userData: FacebookUserData): FacebookServerEvent
  setCustomData(data: Record<string, unknown>): FacebookServerEvent
}

export interface FacebookEventRequest {
  setEvents(events: FacebookServerEvent[]): FacebookEventRequest
  execute(): Promise<MetaEventResponse>
}

export interface BrowserIdentifiers {
  clientIp?: string
  userAgent?: string
  fbp?: string
  fbc?: string
}

export type MetaErrorResponseData = {
  error?: {
    message?: string
    type?: string
    code?: number
  }
  [key: string]: unknown
}

export type MetaErrorResponse = {
  data?: MetaErrorResponseData
  status?: number
}

export type MetaEventRequestResult = {
  events_received?: number
  fbtrace_id?: string
}
