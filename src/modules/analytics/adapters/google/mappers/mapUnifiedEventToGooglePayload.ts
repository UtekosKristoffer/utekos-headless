import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import type {
  GoogleMeasurementProtocolPayload,
  GoogleMeasurementProtocolEvent,
  GoogleMeasurementProtocolItem,
  GoogleUserData,
  GoogleUserDataAddress
} from '../types'
import { ensureString, ensureNumber } from '@/lib/utils/ensure'

/**
 * Maps Unified Domain Event -> Google Measurement Protocol Payload
 * Handles strictly typed mapping for Ecommerce, User Data, and Session logic.
 */
export function mapUnifiedEventToGooglePayload(
  event: UnifiedAnalyticsEvent
): GoogleMeasurementProtocolPayload {
  const u = event.user
  const d = event.data

  const eventNameMap: Record<string, string> = {
    Purchase: 'purchase',
    AddToCart: 'add_to_cart',
    InitiateCheckout: 'begin_checkout',
    ViewContent: 'view_item',
    PageView: 'page_view',
    Search: 'search',
    Login: 'login',
    SignUp: 'sign_up'
  }
  const gaEventName = eventNameMap[event.eventName] || 'custom_event'

  const items: GoogleMeasurementProtocolItem[] = (d?.items || []).map(item => {
    const mappedItem: GoogleMeasurementProtocolItem = {}
    const itemId = ensureString(item.item_id)
    const itemName = ensureString(item.item_name)
    const itemBrand = ensureString(item.item_brand)
    const itemCategory = ensureString(item.item_category)
    const itemVariant = ensureString(item.item_variant)
    const itemPrice = ensureNumber(item.price)
    const itemQuantity = ensureNumber(item.quantity)

    if (itemId !== undefined) mappedItem.item_id = itemId
    if (itemName !== undefined) mappedItem.item_name = itemName
    if (itemBrand !== undefined) mappedItem.item_brand = itemBrand
    if (itemCategory !== undefined) mappedItem.item_category = itemCategory
    if (itemVariant !== undefined) mappedItem.item_variant = itemVariant
    if (itemPrice !== undefined) mappedItem.price = itemPrice
    if (itemQuantity !== undefined) mappedItem.quantity = itemQuantity

    return mappedItem
  })

  const params: Record<string, any> = {
    engagement_time_msec: 1
    // debug_mode: 1
  }

  if (d?.currency) params.currency = d.currency
  if (d?.value !== undefined) params.value = d.value
  if (d?.transactionId) params.transaction_id = d.transactionId
  if (d?.tax) params.tax = d.tax
  if (d?.shipping) params.shipping = d.shipping
  if (items.length > 0) params.items = items
  if (u.gaSessionId) params.session_id = u.gaSessionId

  const gaEvent: GoogleMeasurementProtocolEvent = {
    name: gaEventName,
    params: params
  }

  const emailVal = ensureString(u.emailHash) || ensureString(u.email)
  const phoneVal = ensureString(u.phone)
  const addressObj: GoogleUserDataAddress = {}
  const firstName = ensureString(u.firstName)
  const lastName = ensureString(u.lastName)
  const city = ensureString(u.city)
  const state = ensureString(u.state)
  const zip = ensureString(u.zip)
  const countryCode = ensureString(u.countryCode)

  if (firstName !== undefined) addressObj.sha256_first_name = firstName // Should technically be hashed if using 'sha256_' key
  if (lastName !== undefined) addressObj.sha256_last_name = lastName // But for now mapping direct fields as per strict strictness
  if (city !== undefined) addressObj.city = city
  if (state !== undefined) addressObj.region = state
  if (zip !== undefined) addressObj.postal_code = zip
  if (countryCode !== undefined) addressObj.country = countryCode

  let userData: GoogleUserData | undefined = undefined
  const hasAddress = Object.keys(addressObj).length > 0

  if (emailVal || phoneVal || hasAddress) {
    userData = {}
    if (emailVal) userData.sha256_email_address = [emailVal]
    if (phoneVal) userData.sha256_phone_number = [phoneVal]
    if (hasAddress) userData.address = [addressObj]
  }

  const clientId = ensureString(u.gaClientId) || `server-${Date.now()}`

  const payload: GoogleMeasurementProtocolPayload = {
    client_id: clientId,
    timestamp_micros: Math.floor(event.occurredAt * 1000000), // GA4 expects microseconds
    non_personalized_ads: false,
    events: [gaEvent]
  }

  const userId = u.id ? ensureString(u.id) : undefined
  if (userId !== undefined) payload.user_id = userId
  if (userData) payload.user_data = userData

  return payload
}
