import { NextRequest, NextResponse } from 'next/server'
import { redisPush, redisTrim } from '@/lib/redis'
import crypto from 'crypto'

const bizSdk = require('facebook-nodejs-business-sdk')
const {
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content,
  FacebookAdsApi
} = bizSdk

// Definisjon av typer for input body
type ContentItem = { id: string; quantity: number; item_price?: number }
type CustomDataInput = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
  search_string?: string
}
type UserDataInput = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ge?: string[]
  db?: string[]
  ct?: string[]
  st?: string[]
  zp?: string[]
  country?: string[]
  client_ip_address?: string | null
  client_user_agent?: string | null
  fbc?: string | null
  fbp?: string | null
  external_id?: string | undefined
}
type Body = {
  eventName: string
  eventData?: CustomDataInput
  userData?: UserDataInput
  eventId?: string
  eventSourceUrl?: string
  eventTime?: number
  action_source?: string
}

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Meta CAPI environment variables not set')
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  // Init SDK
  FacebookAdsApi.init(ACCESS_TOKEN)

  const userAgent = req.headers.get('user-agent')
  const xForwardedFor = req.headers.get('x-forwarded-for')
  const ip =
    xForwardedFor ? (xForwardedFor.split(',')[0]?.trim() ?? null) : null

  const cookieFbp = req.cookies.get('_fbp')?.value
  const cookieFbc = req.cookies.get('_fbc')?.value
  const cookieExtId = req.cookies.get('ute_ext_id')?.value

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.eventName || !body.eventId || !body.eventSourceUrl) {
    return NextResponse.json(
      {
        error:
          'Missing required event fields: eventName, eventId, eventSourceUrl'
      },
      { status: 400 }
    )
  }

  // --- 1. Bygg UserData via SDK ---
  const userData = new UserData()

  // IP og Agent
  const finalIp = body.userData?.client_ip_address || ip
  if (finalIp) userData.setClientIpAddress(finalIp)

  const finalAgent = body.userData?.client_user_agent || userAgent
  if (finalAgent) userData.setClientUserAgent(finalAgent)

  // Cookies
  const fbp = body.userData?.fbp || cookieFbp
  if (fbp) userData.setFbp(fbp)

  const fbc = body.userData?.fbc || cookieFbc
  if (fbc) userData.setFbc(fbc)

  const externalId = body.userData?.external_id || cookieExtId
  if (externalId) userData.setExternalIds([externalId])

  if (body.userData?.em) userData.setEmails(body.userData.em)
  if (body.userData?.ph) userData.setPhones(body.userData.ph)
  if (body.userData?.fn) userData.setFirstNames(body.userData.fn)
  if (body.userData?.ln) userData.setLastNames(body.userData.ln)
  if (body.userData?.ct) userData.setCities(body.userData.ct)
  if (body.userData?.st) userData.setStates(body.userData.st)
  if (body.userData?.zp) userData.setZips(body.userData.zp)
  if (body.userData?.country) userData.setCountries(body.userData.country)
  if (body.userData?.ge) userData.setGenders(body.userData.ge)
  if (body.userData?.db) userData.setDateOfBirths(body.userData.db)

  const customData = new CustomData()

  if (body.eventData) {
    if (body.eventData.value !== undefined)
      customData.setValue(body.eventData.value)
    if (body.eventData.currency) customData.setCurrency(body.eventData.currency)
    if (body.eventData.content_type)
      customData.setContentType(body.eventData.content_type)
    if (body.eventData.content_ids)
      customData.setContentIds(body.eventData.content_ids)
    if (body.eventData.search_string)
      customData.setSearchString(body.eventData.search_string)
    if (body.eventData.num_items)
      customData.setNumItems(body.eventData.num_items)
    if (body.eventData.order_id) customData.setOrderId(body.eventData.order_id)

    if (body.eventData.contents && Array.isArray(body.eventData.contents)) {
      const contentList: (typeof Content)[] = body.eventData.contents.map(c => {
        const contentObj = new Content().setId(c.id).setQuantity(c.quantity)
        if (c.item_price !== undefined) contentObj.setItemPrice(c.item_price)
        return contentObj
      })
      customData.setContents(contentList)
    }
  }

  // --- 3. Bygg ServerEvent ---
  const serverEvent = new ServerEvent()
    .setEventName(body.eventName)
    .setEventTime(body.eventTime ?? Math.floor(Date.now() / 1000))
    .setEventId(body.eventId)
    .setEventSourceUrl(body.eventSourceUrl)
    .setActionSource('website') // Påkrevd felt
    .setUserData(userData)
    .setCustomData(customData)

  // --- 4. Logging til Redis ---
  try {
    const logEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level: 'INFO',
      event: `CAPI: ${body.eventName}`,
      identity: {
        ip: finalIp,
        fbp: fbp,
        fbc: fbc,
        externalId: externalId,
        userAgent: finalAgent
      },
      context: {
        path: body.eventSourceUrl,
        eventId: body.eventId
      },
      data: body.eventData
    }

    await redisPush('app_logs', logEntry)
    redisTrim('app_logs', 0, 999).catch(() => {})
  } catch (e) {
    console.error('Logging setup failed', e)
  }

  // --- 5. Send til Meta via SDK ---
  try {
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      serverEvent
    ])

    // SJEKKER OM TEST-KODE ER SATT I ENV
    if (process.env.META_TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(process.env.META_TEST_EVENT_CODE)
      console.log(
        `[CAPI] Sending with Test Code: ${process.env.META_TEST_EVENT_CODE}`
      )
    }

    const response = await eventRequest.execute()

    return NextResponse.json({
      success: true,
      id: response.events_received,
      fb_trace_id: response.fbtrace_id
    })
  } catch (err: any) {
    // Hent detaljer fra SDK error response
    const errorData = err.response?.data || err.response || err.message

    console.error(
      `Meta CAPI request failed for ${body.eventName} (${body.eventId})`,
      JSON.stringify(errorData, null, 2)
    )

    return NextResponse.json(
      {
        error: 'Failed to send event to Meta CAPI',
        details: errorData
      },
      { status: err.response?.status || 500 }
    )
  }
}
