// Path: src/app/api/tracking-events/route.ts

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
import { hashSnapData } from '@/lib/snapchat/hashSnapData'
import { getClientIp } from '@/lib/tracking/user-data/getClientIp'

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE
const PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN
const PINTEREST_AD_ACCOUNT_ID = process.env.PINTEREST_AD_ACCOUNT_ID
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

if (!ACCESS_TOKEN || !PIXEL_ID) {
  console.error(
    '[Meta CAPI] Critical: Mangler META_ACCESS_TOKEN eller NEXT_PUBLIC_META_PIXEL_ID env variabler.'
  )
} else {
  FacebookAdsApi.init(ACCESS_TOKEN)
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
      userData = {},
      eventData
    } = body

    const cookieFbp = request.cookies.get('_fbp')?.value
    const cookieFbc = request.cookies.get('_fbc')?.value
    const cookieExtId = request.cookies.get('ute_ext_id')?.value
    const cookieUserHash = request.cookies.get('ute_user_hash')?.value
    const cookieScCid = request.cookies.get('ute_sc_cid')?.value
    const cookieEpik = request.cookies.get('_epik')?.value
    const cookieTtclid = request.cookies.get('ute_ttclid')?.value
    const cookieTtp = request.cookies.get('_ttp')?.value

    const fbp = userData.fbp || cookieFbp
    const fbc = userData.fbc || cookieFbc
    const externalId = userData.external_id || cookieExtId
    const emailHash = userData.email_hash || cookieUserHash
    let sourceEmoji = '🤷'
    let sourceName = 'Direct/Unknown'

    if (cookieTtclid) {
      sourceEmoji = '🎵'
      sourceName = 'TikTok'
    } else if (cookieEpik) {
      sourceEmoji = '📌'
      sourceName = 'Pinterest'
    } else if (cookieScCid) {
      sourceEmoji = '👻'
      sourceName = 'Snapchat'
    } else if (fbc) {
      sourceEmoji = '💙'
      sourceName = 'Meta'
    }

    const effectiveUserData = {
      ...userData,
      fbp,
      fbc,
      external_id: externalId,
      email_hash: emailHash
    }

    const user = new UserData()
    const finalIp = effectiveUserData.client_ip_address || getClientIp(request)
    const finalAgent =
      effectiveUserData.client_user_agent || request.headers.get('user-agent')

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

    const sendPinterestEvent = async () => {
      if (!PINTEREST_TOKEN || !PINTEREST_AD_ACCOUNT_ID) return

      let pinEventName = eventName.toLowerCase()
      if (eventName === 'AddToCart') pinEventName = 'add_to_cart'
      if (eventName === 'InitiateCheckout') pinEventName = 'checkout'
      if (eventName === 'ViewCategory') pinEventName = 'view_category'
      if (eventName === 'ViewContent') pinEventName = 'page_visit'

      try {
        const pinPayload = {
          event_name: pinEventName,
          action_source: 'web',
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url:
            eventSourceUrl
            || request.headers.get('referer')
            || 'https://utekos.no',
          user_data: {
            em:
              effectiveUserData.email ?
                [hashSnapData(effectiveUserData.email)].filter(Boolean)
              : emailHash ? [emailHash]
              : undefined,
            client_ip_address: finalIp,
            client_user_agent: finalAgent,
            click_id: cookieEpik || undefined,
            external_id:
              externalId ?
                [hashSnapData(externalId)].filter(Boolean)
              : undefined
          },
          custom_data: {
            currency: eventData?.currency || 'NOK',
            value: eventData?.value ? String(eventData.value) : undefined,
            content_ids: eventData?.content_ids,
            num_items: eventData?.num_items,
            contents: eventData?.contents?.map((c: any) => ({
              id: c.id,
              quantity: c.quantity,
              item_price: String(c.item_price || '0')
            }))
          }
        }

        const res = await fetch(
          `https://api.pinterest.com/v5/ad_accounts/${PINTEREST_AD_ACCOUNT_ID}/events`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${PINTEREST_TOKEN}`
            },
            body: JSON.stringify({ data: [pinPayload] })
          }
        )

        if (!res.ok) {
          console.error('[Pinterest CAPI] Failed:', await res.text())
        }
      } catch (e) {
        console.error('[Pinterest CAPI] Exception:', e)
      }
    }

    const sendTikTokEvent = async () => {
      if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) return

      try {
        const payload = {
          event_source: 'web',
          event_source_id: TIKTOK_PIXEL_ID,
          data: [
            {
              event: eventName,
              event_id: eventId,
              event_time: Math.floor(Date.now() / 1000),
              user: {
                ttclid: cookieTtclid,
                ttp: cookieTtp,
                ip: finalIp,
                user_agent: finalAgent,
                email:
                  effectiveUserData.email ?
                    hashSnapData(effectiveUserData.email)
                  : emailHash,
                phone:
                  effectiveUserData.phone ?
                    hashSnapData(effectiveUserData.phone)
                  : undefined,
                external_id: externalId ? hashSnapData(externalId) : undefined
              },
              properties: {
                currency: eventData?.currency || 'NOK',
                value: eventData?.value ? Number(eventData.value) : undefined,
                content_id: eventData?.content_ids?.[0],
                content_type: eventData?.content_type,
                contents: eventData?.contents?.map((c: any) => ({
                  content_id: c.id,
                  price: Number(c.item_price || 0),
                  quantity: Number(c.quantity || 1)
                }))
              },
              page: {
                url:
                  eventSourceUrl
                  || request.headers.get('referer')
                  || 'https://utekos.no'
              }
            }
          ]
        }

        const res = await fetch(
          'https://business-api.tiktok.com/open_api/v1.3/event/track/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Token': TIKTOK_ACCESS_TOKEN
            },
            body: JSON.stringify(payload)
          }
        )

        const data = await res.json()
        if (data.code !== 0) {
          console.error('[TikTok CAPI] Error:', JSON.stringify(data))
        }
      } catch (e) {
        console.error('[TikTok CAPI] Exception:', e)
      }
    }

    const pinPromise = sendPinterestEvent()
    const tiktokPromise = sendTikTokEvent()

    const custom = new CustomData()
    if (eventData) {
      if (eventData.value !== undefined) custom.setValue(eventData.value)
      if (eventData.currency) custom.setCurrency(eventData.currency)
      if (eventData.content_name) custom.setContentName(eventData.content_name)
      if (eventData.content_type) custom.setContentType(eventData.content_type)
      if (eventData.content_category)
        custom.setContentCategory(eventData.content_category)
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

    await Promise.all([pinPromise, tiktokPromise])

    await logToAppLogs(
      'INFO',
      `${sourceEmoji} ${sourceName} | CAPI: ${eventName}`,
      {
        eventId,
        events_received: response.events_received,
        fbtrace_id: response.fbtrace_id
      },
      {
        actionSource,
        source: sourceName,
        scCid: cookieScCid ? '***Found***' : 'Missing',
        epik: cookieEpik ? '***Found***' : 'Missing',
        ttclid: cookieTtclid ? '***Found***' : 'Missing',
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
