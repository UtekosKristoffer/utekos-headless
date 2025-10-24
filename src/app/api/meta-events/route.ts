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
  // SHA-256 hashed lists for PII (if present)
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
  client_ip_address?: string | undefined
  client_user_agent?: string | undefined
  fbc?: string | undefined
  fbp?: string | undefined
  external_id?: string | undefined
}
type Body = {
  eventName:
    | 'ViewContent'
    | 'AddToCart'
    | 'InitiateCheckout'
    | 'Purchase'
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
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  const ua = req.headers.get('user-agent') ?? ''
  // Prefer forwarded-for (may be a CSV); fall back to req.ip
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? (req as any).ip
    ?? ''
  const cookies = req.headers.get('cookie') ?? ''
  const fbp = /(?:^|;)\s*_fbp=([^;]+)/.exec(cookies)?.[1]
  const fbc = /(?:^|;)\s*_fbc=([^;]+)/.exec(cookies)?.[1]

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Basic guardrails: only allow known standard events unless you intend custom.
  const event_name = body.eventName
  const event_time =
    Number.isFinite(body.eventTime) ?
      body.eventTime!
    : Math.floor(Date.now() / 1000)

  // Build user_data per CAPI spec (ensure required keys for website events)
  const user_data: UserData = {
    ...(ip || body.userData?.client_ip_address ?
      { client_ip_address: ip || body.userData?.client_ip_address }
    : {}),
    ...(ua || body.userData?.client_user_agent ?
      { client_user_agent: ua || body.userData?.client_user_agent }
    : {}),
    ...((body.userData?.fbp ?? fbp) ? { fbp: body.userData?.fbp ?? fbp } : {}),
    ...((body.userData?.fbc ?? fbc) ? { fbc: body.userData?.fbc ?? fbc } : {}),
    ...(body.userData?.external_id ?
      { external_id: body.userData.external_id }
    : {}),
    ...(body.userData?.em ? { em: body.userData.em } : {}),
    ...(body.userData?.ph ? { ph: body.userData.ph } : {}),
    ...(body.userData?.fn ? { fn: body.userData.fn } : {}),
    ...(body.userData?.ln ? { ln: body.userData.ln } : {}),
    ...(body.userData?.ge ? { ge: body.userData.ge } : {}),
    ...(body.userData?.db ? { db: body.userData.db } : {}),
    ...(body.userData?.ct ? { ct: body.userData.ct } : {}),
    ...(body.userData?.st ? { st: body.userData.st } : {}),
    ...(body.userData?.zp ? { zp: body.userData.zp } : {}),
    ...(body.userData?.country ? { country: body.userData.country } : {})
  }

  const payload = {
    data: [
      {
        event_name,
        event_time,
        event_id: body.eventId,
        action_source: 'website',
        event_source_url: body.eventSourceUrl,
        user_data,
        custom_data: body.eventData,
        ...(body.testEventCode ? { test_event_code: body.testEventCode } : {})
      }
    ]
  } as const

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  const json = await res.json()
  if (!res.ok) {
    // Bubble up Graph errors for debugging (remove sensitive data if logging)
    return NextResponse.json(
      { error: 'Meta CAPI error', details: json },
      { status: 400 }
    )
  }
  return NextResponse.json({ ok: true, result: json })
}
