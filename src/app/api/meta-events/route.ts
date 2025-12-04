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
import { normalize } from '@/lib/meta/normalization'
import { logToAppLogs } from '@/lib/utils/logToAppLogs' // <--- Ny import
import type { MetaEventPayload } from '@types'

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

if (!ACCESS_TOKEN || !PIXEL_ID) {
  console.error(
    '[Meta CAPI] Critical: Mangler META_ACCESS_TOKEN eller NEXT_PUBLIC_META_PIXEL_ID env variabler.'
  )
} else {
  FacebookAdsApi.init(ACCESS_TOKEN)
}

function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? null
  }
  return null
}

export async function POST(request: Request) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    return NextResponse.json(
      { error: 'Server misconfiguration: Missing Meta credentials' },
      { status: 500 }
    )
  }

  let eventName = 'Unknown event'
  let body: MetaEventPayload | null = null

  try {
    body = (await request.json()) as MetaEventPayload

    if (!body.eventName || !body.eventId) {
      return NextResponse.json(
        { error: 'Missing required parameters: eventName or eventId' },
        { status: 400 }
      )
    }

    eventName = body.eventName
    const {
      eventId,
      eventSourceUrl,
      actionSource = 'website',
      userData,
      eventData
    } = body

    const user = new UserData()
    const requestIp = getClientIp(request)
    const requestAgent = request.headers.get('user-agent')

    const finalIp = userData.client_ip_address || requestIp
    const finalAgent = userData.client_user_agent || requestAgent

    if (finalIp) user.setClientIpAddress(finalIp)
    if (finalAgent) user.setClientUserAgent(finalAgent)

    if (userData.fbp) user.setFbp(userData.fbp)
    if (userData.fbc) user.setFbc(userData.fbc)
    if (userData.external_id) user.setExternalId(userData.external_id)

    if (userData.email) {
      const normalizedEmail = normalize.email(userData.email)
      if (normalizedEmail) user.setEmail(normalizedEmail)
    } else if (userData.email_hash) {
      user.setEmails([userData.email_hash])
    }

    if (userData.phone) {
      const normalizedPhone = normalize.phone(userData.phone)
      if (normalizedPhone) user.setPhone(normalizedPhone)
    }

    if (userData.first_name) {
      const fn = normalize.name(userData.first_name)
      if (fn) user.setFirstName(fn)
    }
    if (userData.last_name) {
      const ln = normalize.name(userData.last_name)
      if (ln) user.setLastName(ln)
    }
    if (userData.city) {
      const city = normalize.city(userData.city)
      if (city) user.setCity(city)
    }
    if (userData.state) {
      const state = normalize.state(userData.state)
      if (state) user.setState(state)
    }
    if (userData.zip) {
      const zip = normalize.zip(userData.zip)
      if (zip) user.setZip(zip)
    }
    if (userData.country) {
      const country = normalize.country(userData.country)
      if (country) user.setCountry(country)
    }

    const custom = new CustomData()

    if (eventData) {
      if (eventData.value !== undefined) custom.setValue(eventData.value)
      if (eventData.currency) custom.setCurrency(eventData.currency)
      if (eventData.content_name) custom.setContentName(eventData.content_name)
      if (eventData.content_type) custom.setContentType(eventData.content_type)
      if (eventData.search_string)
        custom.setSearchString(eventData.search_string)
      if (eventData.num_items) custom.setNumItems(eventData.num_items)

      if (eventData.content_ids && Array.isArray(eventData.content_ids)) {
        custom.setContentIds(eventData.content_ids)
      }

      if (eventData.contents && Array.isArray(eventData.contents)) {
        const contentList = eventData.contents.map((item: any) => {
          return new Content()
            .setId(item.id)
            .setQuantity(item.quantity)
            .setItemPrice(item.item_price ?? 0)
            .setTitle(item.title || item.content_name || undefined)
        })
        custom.setContents(contentList)
      }
    }

    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(body.eventTime || Math.floor(Date.now() / 1000))
      .setEventId(eventId)
      .setEventSourceUrl(eventSourceUrl || request.headers.get('referer') || '')
      .setActionSource(actionSource)
      .setUserData(user)
      .setCustomData(custom)

    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      serverEvent
    ])

    if (TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(TEST_EVENT_CODE)
    }

    const response = await eventRequest.execute()

    // LOGG SUKSESS
    await logToAppLogs(
      'INFO',
      `CAPI Sent: ${eventName}`,
      {
        eventId,
        events_received: response.events_received,
        fbtrace_id: response.fbtrace_id
      },
      {
        actionSource,
        hasFbp: !!userData.fbp,
        hasFbc: !!userData.fbc,
        hasExtId: !!userData.external_id,
        hasEmail: !!userData.email || !!userData.email_hash,
        clientIp: finalIp
      }
    )

    return NextResponse.json({
      success: true,
      events_received: response.events_received,
      fbtrace_id: response.fbtrace_id
    })
  } catch (error: any) {
    const errorResponse = error.response || {}
    const errorData = errorResponse.data || {}

    await logToAppLogs(
      'ERROR',
      `CAPI Failed: ${eventName}`,
      {
        error: error.message,
        details: errorData,
        type: errorData.error?.type,
        code: errorData.error?.code
      },
      { eventId: body?.eventId }
    )

    console.error(
      `[Meta CAPI] Error for ${eventName}:`,
      JSON.stringify(errorData, null, 2)
    )

    return NextResponse.json(
      {
        error: 'Failed to send event to Meta',
        details: errorData.error?.message || error.message || 'Unknown error'
      },
      { status: errorResponse.status || 500 }
    )
  }
}
