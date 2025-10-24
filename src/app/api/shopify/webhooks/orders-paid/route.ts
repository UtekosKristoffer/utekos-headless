// Path: src/app/api/shopify/webhooks/orders-paid/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { redisGet, redisDel } from '@/lib/redis'

export const runtime = 'nodejs'

function verifyHmac(req: NextRequest, raw: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET ?? ''
  if (!secret) return false
  const hmac = req.headers.get('x-shopify-hmac-sha256') ?? ''
  const digest = crypto
    .createHmac('sha256', secret)
    .update(raw, 'utf8')
    .digest('base64')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmac))
}

type MoneySet = { shop_money: { amount: string; currency_code: string } }
type LineItem = {
  quantity: number
  price_set: MoneySet
  variant_id: number | null
  product_id: number | null
}
type OrderPaid = {
  admin_graphql_api_id: string
  token: string | null
  currency: string
  total_price_set?: MoneySet
  current_total_price_set?: MoneySet
  created_at: string
  processed_at?: string | null
  line_items: LineItem[]
}

type CheckoutAttribution = {
  checkoutUrl: string
  userData: {
    fbp?: string
    fbc?: string
    client_user_agent?: string
    client_ip_address?: string
  }
  eventId?: string
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!verifyHmac(req, raw))
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })

  const order = JSON.parse(raw) as OrderPaid

  const token = order.token ?? undefined
  const attrib =
    token ? await redisGet<CheckoutAttribution>(`checkout:${token}`) : null

  const priceSet = order.total_price_set ?? order.current_total_price_set
  const value = priceSet ? Number(priceSet.shop_money.amount) : 0
  const currency = priceSet?.shop_money.currency_code ?? order.currency

  const contents = order.line_items.map(li => ({
    id: (li.variant_id ?? li.product_id)?.toString() ?? 'unknown',
    quantity: li.quantity,
    item_price: Number(li.price_set.shop_money.amount)
  }))

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(
          new Date(order.processed_at ?? order.created_at).getTime() / 1000
        ),
        event_id: order.admin_graphql_api_id,
        action_source: 'website',
        event_source_url: attrib?.checkoutUrl,
        user_data: {
          fbp: attrib?.userData?.fbp,
          fbc: attrib?.userData?.fbc,
          client_user_agent: attrib?.userData?.client_user_agent,
          client_ip_address: attrib?.userData?.client_ip_address
        },
        custom_data: {
          value,
          currency,
          contents,
          content_type: 'product',
          order_id: order.admin_graphql_api_id
        }
      }
    ]
  } as const

  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN)
    return NextResponse.json({ error: 'Missing CAPI config' }, { status: 500 })

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )
  const json = await res.json()

  if (token) await redisDel(`checkout:${token}`)
  if (!res.ok)
    return NextResponse.json(
      { error: 'Meta CAPI error', details: json },
      { status: 400 }
    )
  return NextResponse.json({ ok: true })
}
