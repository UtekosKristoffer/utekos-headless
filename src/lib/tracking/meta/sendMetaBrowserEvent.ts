import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content
} from 'facebook-nodejs-business-sdk'
import type { MetaEventPayload, ClientUserData, MetaContentItem } from '@types'

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

if (ACCESS_TOKEN) FacebookAdsApi.init(ACCESS_TOKEN)

export async function sendMetaBrowserEvent(
  payload: MetaEventPayload,
  userData: ClientUserData
) {
  if (!ACCESS_TOKEN || !PIXEL_ID) throw new Error('Missing Meta Credentials')
  if (!payload.eventName) throw new Error('Missing eventName in payload')

  const user = new UserData()
  if (userData.client_ip_address)
    user.setClientIpAddress(userData.client_ip_address)
  if (userData.client_user_agent)
    user.setClientUserAgent(userData.client_user_agent)
  if (userData.fbp) user.setFbp(userData.fbp)
  if (userData.fbc) user.setFbc(userData.fbc)
  if (userData.external_id) user.setExternalId(userData.external_id)
  if (userData.email) user.setEmail(userData.email)
  else if (userData.email_hash) user.setEmails([userData.email_hash])

  if (userData.phone) user.setPhone(userData.phone)
  if (userData.first_name) user.setFirstName(userData.first_name)
  if (userData.last_name) user.setLastName(userData.last_name)
  if (userData.city) user.setCity(userData.city)
  if (userData.state) user.setState(userData.state)
  if (userData.zip) user.setZip(userData.zip)
  if (userData.country) user.setCountry(userData.country)

  const custom = new CustomData()
  const { eventData } = payload

  if (eventData) {
    if (eventData.value !== undefined) custom.setValue(eventData.value)
    if (eventData.currency) custom.setCurrency(eventData.currency)
    if (eventData.content_name) custom.setContentName(eventData.content_name)
    if (eventData.content_type) custom.setContentType(eventData.content_type)
    if (eventData.content_category)
      custom.setContentCategory(eventData.content_category)
    if (eventData.search_string) custom.setSearchString(eventData.search_string)
    if (eventData.num_items) custom.setNumItems(eventData.num_items)
    if (eventData.content_ids) custom.setContentIds(eventData.content_ids)

    if (eventData.contents && Array.isArray(eventData.contents)) {
      const contentList = eventData.contents.map((item: MetaContentItem) => {
        const content = new Content()
          .setId(item.id)
          .setQuantity(item.quantity)
          .setItemPrice(item.item_price ?? 0)

        const title = item.title || item.content_name
        if (title) content.setTitle(title)

        return content
      })
      custom.setContents(contentList)
    }
  }

  const serverEvent = new ServerEvent()
    .setEventName(payload.eventName)
    .setEventTime(payload.eventTime || Math.floor(Date.now() / 1000))
    .setUserData(user)
    .setCustomData(custom)

  if (payload.eventId) serverEvent.setEventId(payload.eventId)
  if (payload.eventSourceUrl)
    serverEvent.setEventSourceUrl(payload.eventSourceUrl)

  serverEvent.setActionSource(payload.actionSource || 'website')

  const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
    serverEvent
  ])
  if (TEST_EVENT_CODE) eventRequest.setTestEventCode(TEST_EVENT_CODE)

  return await eventRequest.execute()
}
