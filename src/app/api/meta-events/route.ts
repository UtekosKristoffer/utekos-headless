// Path: app/api/meta-events/route.ts
import { NextRequest, NextResponse } from 'next/server'

type ContentItem = { id: string; quantity: number; item_price?: number }
type CustomData = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
}
type UserData = {
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
  eventName:
    | 'ViewContent'
    | 'AddToCart'
    | 'InitiateCheckout'
    | 'Purchase'
    | 'PageView'
    | string
  eventData?: CustomData
  userData?: UserData
  eventId?: string
  eventSourceUrl?: string
  testEventCode?: string
  eventTime?: number
}

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Meta CAPI environment variables not set')
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  // --- Hent Server-side Info ---
  const ua = req.headers.get('user-agent')
  const xForwardedFor = req.headers.get('x-forwarded-for')
  const ip =
    xForwardedFor ? (xForwardedFor.split(',')[0]?.trim() ?? null) : null

  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = cookieHeader.split('; ').reduce(
    (acc, current) => {
      const [name, ...value] = current.split('=')
      if (name) acc[name.trim()] = value.join('=')
      return acc
    },
    {} as Record<string, string>
  )
  const fbp = cookies['_fbp'] || null // Sett til null hvis undefined
  const fbc = cookies['_fbc'] || null // Sett til null hvis undefined

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

  const event_name = body.eventName
  const event_time = body.eventTime ?? Math.floor(Date.now() / 1000)

  // --- Bygg UserData ---
  const user_data: UserData = {
    client_ip_address: ip,
    client_user_agent: ua,
    fbp: fbp,
    fbc: fbc,

    // Legg til klient-sendt PII hvis det finnes
    ...(body.userData?.em && { em: body.userData.em }),
    ...(body.userData?.ph && { ph: body.userData.ph }),
    ...(body.userData?.fn && { fn: body.userData.fn }),
    ...(body.userData?.ln && { ln: body.userData.ln }),
    ...(body.userData?.ge && { ge: body.userData.ge }),
    ...(body.userData?.db && { db: body.userData.db }),
    ...(body.userData?.ct && { ct: body.userData.ct }),
    ...(body.userData?.st && { st: body.userData.st }),
    ...(body.userData?.zp && { zp: body.userData.zp }),
    ...(body.userData?.country && { country: body.userData.country }),
    ...(body.userData?.external_id && {
      external_id: body.userData.external_id
    })
  }

  // --- Bygg Payload for Meta ---
  const payload: Record<string, any> = {
    data: [
      {
        event_name: event_name,
        event_time: event_time,
        event_id: body.eventId,
        action_source: 'website',
        event_source_url: body.eventSourceUrl,
        user_data: user_data,
        custom_data: body.eventData ?? {}
      }
    ],
    ...(TEST_EVENT_CODE && { test_event_code: TEST_EVENT_CODE })
  }

  // --- Send til Meta ---
  try {
    const metaApiUrl = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`
    const res = await fetch(metaApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const json = await res.json()
    console.log(
      `Meta CAPI Response for ${event_name} (${body.eventId}):`,
      JSON.stringify(json, null, 2)
    )

    if (!res.ok) {
      console.error(
        `Meta CAPI request failed for ${event_name} (${body.eventId}): Status ${res.status}`,
        json
      )
      return NextResponse.json(
        { error: 'Failed to send event to Meta CAPI', details: json },
        { status: res.status }
      )
    }

    console.log(`Meta CAPI Success: Sent ${event_name} with ID ${body.eventId}`)
    return NextResponse.json({ success: true, metaResponse: json })
  } catch (fetchError) {
    console.error(
      `Meta CAPI fetch error for ${event_name} (${body.eventId}):`,
      fetchError
    )
    return NextResponse.json(
      {
        error: 'Failed to connect to Meta CAPI',
        details: (fetchError as Error).message ?? 'Unknown fetch error'
      },
      { status: 503 }
    )
  }
}
