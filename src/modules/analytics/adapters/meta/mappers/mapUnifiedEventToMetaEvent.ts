import {
  ServerEvent,
  UserData,
  CustomData,
  Content
} from 'facebook-nodejs-business-sdk'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import { ensureString, ensureNumber } from '@/lib/utils/ensure'

/**
 * Maps Strict Domain Event -> Meta SDK ServerEvent
 * STRICT TYPE SAFETY IMPLEMENTATION:
 * The Meta SDK setters (v24.0) do not accept 'undefined'.
 * We must check existence of every optional field before calling the setter.
 */
export function mapUnifiedEventToMetaEvent(
  event: UnifiedAnalyticsEvent
): ServerEvent {
  const u = event.user
  const d = event.data
  const userData = new UserData()
  const emailHash = ensureString(u.emailHash)
  const email = ensureString(u.email)
  const phone = ensureString(u.phone)
  const firstName = ensureString(u.firstName)
  const lastName = ensureString(u.lastName)
  const city = ensureString(u.city)
  const state = ensureString(u.state)
  const zip = ensureString(u.zip)
  const country = ensureString(u.countryCode)
  const clientIp = ensureString(u.clientIp)
  const userAgent = ensureString(u.userAgent)
  const fbp = ensureString(u.fbp)
  const fbc = ensureString(u.fbc)
  const externalId = ensureString(u.externalId)

  // Prioritize pre-hashed email, fall back to raw if necessary
  if (emailHash) {
    userData.setEmail(emailHash)
  } else if (email) {
    userData.setEmail(email)
  }

  if (phone) userData.setPhone(phone)
  if (firstName) userData.setFirstName(firstName)
  if (lastName) userData.setLastName(lastName)
  if (city) userData.setCity(city)
  if (state) userData.setState(state)
  if (zip) userData.setZip(zip)
  if (country) userData.setCountry(country)
  if (clientIp) userData.setClientIpAddress(clientIp)
  if (userAgent) userData.setClientUserAgent(userAgent)
  if (fbp) userData.setFbp(fbp)
  if (fbc) userData.setFbc(fbc)
  if (externalId) userData.setExternalId(externalId)

  const contents: Content[] = []

  if (d?.items && d.items.length > 0) {
    d.items.forEach(item => {
      // SDK Content constructor args are optional, but setters are strict.
      // We create a clean instance and set strictly.
      const content = new Content()

      const id = ensureString(item.item_id)
      const quantity = ensureNumber(item.quantity)
      const price = ensureNumber(item.price)
      const title = ensureString(item.item_name)
      const brand = ensureString(item.item_brand)
      const category = ensureString(item.item_category)

      if (id) content.setId(id)
      if (quantity !== undefined) content.setQuantity(quantity)
      if (price !== undefined) content.setItemPrice(price)
      if (title) content.setTitle(title)
      if (brand) content.setBrand(brand)
      if (category) content.setCategory(category)

      contents.push(content)
    })
  }

  const customData = new CustomData()

  if (d?.currency) customData.setCurrency(d.currency)

  const val = ensureNumber(d?.value)
  if (val !== undefined) customData.setValue(val)

  if (d?.contentIds && d.contentIds.length > 0) {
    customData.setContentIds(d.contentIds)
  }

  if (contents.length > 0) {
    customData.setContents(contents)
  }

  if (
    ['Purchase', 'AddToCart', 'InitiateCheckout', 'ViewContent'].includes(
      event.eventName
    )
  ) {
    customData.setContentType('product')
  }

  if (event.eventName) customData.setContentName(event.eventName)

  const orderId = ensureString(d?.transactionId)
  if (orderId) customData.setOrderId(orderId)

  const serverEvent = new ServerEvent()
    .setEventName(event.eventName)
    .setEventTime(event.occurredAt)
    .setActionSource('website')
    .setUserData(userData)
    .setCustomData(customData)

  if (event.eventId) serverEvent.setEventId(event.eventId)
  if (event.sourceUrl) serverEvent.setEventSourceUrl(event.sourceUrl)

  return serverEvent
}
