// Path: src/app/api/meta-events/route.ts

import { NextResponse } from 'next/server'
import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content
} from 'facebook-nodejs-business-sdk'
import type { MetaEventPayload } from '@types'

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

if (!ACCESS_TOKEN || !PIXEL_ID) {
  console.error(
    '[Meta CAPI] Critical: Missing META_ACCESS_TOKEN or PIXEL_ID env variables.'
  )
}

export async function POST(request: Request) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    return NextResponse.json(
      { error: 'Server misconfiguration: Missing Meta credentials' },
      { status: 500 }
    )
  }

  let eventName = 'Unknown event'

  try {
    const api = FacebookAdsApi.init(ACCESS_TOKEN)

    if (process.env.NODE_ENV === 'development') {
      api.setDebug(true)
    }

    const body = (await request.json()) as MetaEventPayload

    if (body.eventName) {
      eventName = body.eventName
    }

    const { eventId, eventSourceUrl, userData, eventData } = body

    const user = new UserData()

    const requestIp = request.headers
      .get('x-forwarded-for')
      ?.split(',')[0]
      ?.trim()
    const requestAgent = request.headers.get('user-agent')

    const finalIp = userData.client_ip_address || requestIp
    const finalAgent = userData.client_user_agent || requestAgent

    if (finalIp) user.setClientIpAddress(finalIp)
    if (finalAgent) user.setClientUserAgent(finalAgent)

    if (userData.fbp) user.setFbp(userData.fbp)
    if (userData.fbc) user.setFbc(userData.fbc)

    if (userData.external_id) user.setExternalIds([userData.external_id])

    if (userData.email) {
      user.setEmail(userData.email)
    } else if (userData.email_hash) {
      user.setEmails([userData.email_hash])
    }

    if (userData.phone) {
      user.setPhone(userData.phone)
    }

    if (userData.first_name) user.setFirstName(userData.first_name)
    if (userData.last_name) user.setLastName(userData.last_name)
    if (userData.city) user.setCity(userData.city)
    if (userData.state) user.setState(userData.state)
    if (userData.zip) user.setZip(userData.zip)
    if (userData.country) user.setCountry(userData.country)

    const custom = new CustomData()

    if (eventData) {
      if (eventData.value !== undefined) custom.setValue(eventData.value)
      if (eventData.currency) custom.setCurrency(eventData.currency)
      if (eventData.content_name) custom.setContentName(eventData.content_name)
      if (eventData.content_type) custom.setContentType(eventData.content_type)

      if (eventData.content_ids) custom.setContentIds(eventData.content_ids)

      if (eventData.contents && Array.isArray(eventData.contents)) {
        // 'item' utledes automatisk som MetaContentItem fra @types/meta.types.ts
        const contentList = eventData.contents.map(item => {
          return (
            new Content()
              .setId(item.id)
              .setQuantity(item.quantity)
              // Endret fra item.item_price til item.price basert på MetaContentItem-definisjonen din
              .setItemPrice(item.price ?? 0)
          )
        })
        custom.setContents(contentList)
      }
    }

    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(body.eventTime || Math.floor(Date.now() / 1000))
      .setEventId(eventId)
      .setEventSourceUrl(eventSourceUrl)
      .setActionSource('website')
      .setUserData(user)
      .setCustomData(custom)

    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      serverEvent
    ])

    if (TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(TEST_EVENT_CODE)
    }

    const response = await eventRequest.execute()

    return NextResponse.json({
      success: true,
      events_received: response.events_received,
      fbtrace_id: response.fbtrace_id
    })
  } catch (error: unknown) {
    const errObj = error as {
      response?: { data?: Record<string, unknown>; status?: number }
      message?: string
    }

    const errorResponse = errObj.response || errObj
    const errorData = (errObj.response?.data || errorResponse) as Record<
      string,
      unknown
    >

    console.error(
      `[Meta CAPI] Error for ${eventName}:`,
      JSON.stringify(errorData, null, 2)
    )

    const errorMessage =
      typeof errorData.error === 'object' && errorData.error !== null ?
        (errorData.error as { message?: string }).message
      : errObj.message

    return NextResponse.json(
      {
        error: 'Failed to send event to Meta',
        details: errorMessage || 'Unknown error'
      },
      { status: errObj.response?.status || 500 }
    )
  }
}
