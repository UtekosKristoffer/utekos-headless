// Path: app/api/meta/capi/purchase/route.ts
import { NextRequest, NextResponse } from 'next/server'

type ServerContent = { id: string; quantity: number; item_price?: number }
type Body = {
  event_id: string
  event_source_url: string
  value: number
  currency: string
  contents: ServerContent[]
  order_id?: string
}

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN)
    return NextResponse.json({ error: 'Missing config' }, { status: 500 })

  const ua = req.headers.get('user-agent') ?? ''
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')?.at(0)?.trim() || undefined
  const fbp = req.cookies.get('_fbp')?.value
  const fbc = req.cookies.get('_fbc')?.value

  const body: Body = await req.json()

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        event_source_url: body.event_source_url,
        action_source: 'website',
        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {})
        },
        custom_data: {
          value: body.value,
          currency: body.currency,
          contents: body.contents,
          content_type: 'product',
          ...(body.order_id ? { order_id: body.order_id } : {})
        }
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
  return NextResponse.json(json, { status: res.ok ? 200 : 400 })
}
