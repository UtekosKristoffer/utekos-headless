import { NextResponse } from 'next/server'
const bizSdk = require('facebook-nodejs-business-sdk')

const { ServerEvent, EventRequest, UserData, CustomData, FacebookAdsApi } =
  bizSdk

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

if (PIXEL_ID && ACCESS_TOKEN) {
  FacebookAdsApi.init(ACCESS_TOKEN)
}

export async function POST(request: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Meta configuration' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { eventName, eventId, eventSourceUrl, userData, eventData } = body

    const user = new UserData()
      .setClientIpAddress(request.headers.get('x-forwarded-for') || undefined)
      .setClientUserAgent(userData.client_user_agent)

    if (userData.fbp) user.setFbp(userData.fbp)
    if (userData.fbc) user.setFbc(userData.fbc)
    if (userData.external_id) user.setExternalIds([userData.external_id])

    if (userData.email_hash) {
      user.setEmails([userData.email_hash])
    }

    const custom = new CustomData()

    if (eventData) {
      if (eventData.value) custom.setValue(eventData.value)
      if (eventData.currency) custom.setCurrency(eventData.currency)
      if (eventData.content_name) custom.setContentName(eventData.content_name)
      if (eventData.content_type) custom.setContentType(eventData.content_type)

      if (eventData.content_ids && Array.isArray(eventData.content_ids)) {
        custom.setContentIds(eventData.content_ids)
      }
    }

    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(Math.floor(Date.now() / 1000))
      .setEventId(eventId)
      .setEventSourceUrl(eventSourceUrl)
      .setActionSource('website')
      .setUserData(user)
      .setCustomData(custom)

    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      serverEvent
    ])

    if (process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(
        process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE
      )
    }

    await eventRequest.execute()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Meta CAPI] Error:', error.response?.data || error.message)
    return NextResponse.json({ error: 'Failed to send event' }, { status: 500 })
  }
}
