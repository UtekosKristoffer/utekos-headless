// Path: src/app/api/meta-events/route.ts

import { NextRequest, NextResponse } from 'next/server'
import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content
} from 'facebook-nodejs-business-sdk'
import { normalize } from '@/lib/meta/normalization'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type {
  MetaContentItem,
  MetaEventPayload,
  MetaErrorResponse,
  MetaEventRequestResult,
  MetaErrorResponseData
} from '@types'

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

function getClientIp(req: NextRequest): string | null {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const candidates = forwardedFor
      .split(',')
      .map(ip => ip.trim())
      .filter(Boolean)
    const ipv6 = candidates.find(ip => ip.includes(':'))
    if (ipv6) return ipv6
    if (candidates.length > 0) return candidates[0] ?? null
  }

  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const reqIp = (req as NextRequest & { ip?: string }).ip
  if (reqIp) return reqIp

  return null
}

export async function POST(request: NextRequest) {
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

    const cookieFbp = request.cookies.get('_fbp')?.value
    const cookieFbc = request.cookies.get('_fbc')?.value
    const cookieExtId = request.cookies.get('ute_ext_id')?.value
    const cookieUserHash = request.cookies.get('ute_user_hash')?.value

    const fbp = userData.fbp || cookieFbp
    const fbc = userData.fbc || cookieFbc
    const externalId = userData.external_id || cookieExtId
    const emailHash = userData.email_hash || cookieUserHash

    const effectiveUserData = {
      ...userData,
      fbp,
      fbc,
      external_id: externalId,
      email_hash: emailHash
    }

    const user = new UserData()
    const requestIp = getClientIp(request)
    const requestAgent = request.headers.get('user-agent')

    const finalIp = effectiveUserData.client_ip_address || requestIp
    const finalAgent = effectiveUserData.client_user_agent || requestAgent

    if (finalIp) user.setClientIpAddress(finalIp)
    if (finalAgent) user.setClientUserAgent(finalAgent)

    if (fbp) user.setFbp(fbp)
    if (fbc) user.setFbc(fbc)
    if (externalId) user.setExternalId(externalId)

    if (effectiveUserData.email) {
      const normalizedEmail = normalize.email(effectiveUserData.email)
      if (normalizedEmail) user.setEmail(normalizedEmail)
    } else if (emailHash) {
      user.setEmails([emailHash])
    }

    if (effectiveUserData.phone) {
      const normalizedPhone = normalize.phone(effectiveUserData.phone)
      if (normalizedPhone) user.setPhone(normalizedPhone)
    }

    if (effectiveUserData.first_name) {
      const fn = normalize.name(effectiveUserData.first_name)
      if (fn) user.setFirstName(fn)
    }
    if (effectiveUserData.last_name) {
      const ln = normalize.name(effectiveUserData.last_name)
      if (ln) user.setLastName(ln)
    }
    if (effectiveUserData.city) {
      const city = normalize.city(effectiveUserData.city)
      if (city) user.setCity(city)
    }
    if (effectiveUserData.state) {
      const state = normalize.state(effectiveUserData.state)
      if (state) user.setState(state)
    }
    if (effectiveUserData.zip) {
      const zip = normalize.zip(effectiveUserData.zip)
      if (zip) user.setZip(zip)
    }
    if (effectiveUserData.country) {
      const country = normalize.country(effectiveUserData.country)
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

      if (isMetaContentArray(eventData.contents)) {
        const contentList = eventData.contents.map(item => {
          return new Content()
            .setId(item.id)
            .setQuantity(item.quantity)
            .setItemPrice(item.item_price ?? 0)
            .setTitle(item.title || item.content_name || '')
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

    const response: MetaEventRequestResult = await eventRequest.execute()

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
        hasFbp: !!fbp,
        hasFbc: !!fbc,
        hasExtId: !!externalId,
        hasEmail: !!effectiveUserData.email || !!emailHash,
        clientIp: finalIp
      }
    )

    return NextResponse.json({
      success: true,
      events_received: response.events_received,
      fbtrace_id: response.fbtrace_id
    })
  } catch (error: unknown) {
    const { response: errorResponse, message } = parseMetaError(error)
    const errorData = errorResponse?.data || {}

    await logToAppLogs(
      'ERROR',
      `CAPI Failed: ${eventName}`,
      {
        error: message,
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
        details: errorData.error?.message || message || 'Unknown error'
      },
      { status: errorResponse?.status || 500 }
    )
  }
}

function isMetaContentArray(contents: unknown): contents is MetaContentItem[] {
  return Array.isArray(contents)
}

function parseMetaError(error: unknown): {
  response: MetaErrorResponse | null
  message: string
} {
  const message =
    error instanceof Error ? error.message
    : typeof (error as { message?: unknown }).message === 'string' ?
      (error as { message: string }).message
    : 'Unknown error'

  if (
    !error
    || typeof error !== 'object'
    || !('response' in error)
    || typeof (error as { response?: unknown }).response !== 'object'
    || (error as { response?: unknown }).response === null
  ) {
    return { response: null, message }
  }

  const response = (error as { response?: unknown }).response as Record<
    string,
    unknown
  >

  const data =
    typeof response.data === 'object' && response.data !== null ?
      (response.data as MetaErrorResponseData)
    : undefined

  const status =
    typeof response.status === 'number' ? response.status : undefined

  const responseObj: MetaErrorResponse = {}
  if (data !== undefined) responseObj.data = data
  if (status !== undefined) responseObj.status = status

  return { response: responseObj, message }
}
