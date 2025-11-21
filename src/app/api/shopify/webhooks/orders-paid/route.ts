// Path: src/app/api/shopify/webhooks/orders-paid/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { redisGet, redisDel, redisPush, redisTrim } from '@/lib/redis'
import { verifyHmac } from '@/lib/route-logic/veridyHmac'
import { buildUserData } from '@/lib/meta/buildUserData'
import { getCheckoutKey } from '@/lib/utils/getCheckoutKey'
import { getKeyFromUrl } from '@/lib/utils/getKeyFromUrl'
import { toNumberSafe } from '@/lib/utils/toNumberSafe'
import type {
  OrderPaid,
  CheckoutAttribution,
  MetaEvent,
  MetaContentItem,
  MetaPurchaseCustomData,
  MetaEventsRequest,
  MetaGraphError,
  MetaEventsSuccess
} from '@types'

export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!verifyHmac(req, raw)) {
    console.error('[Webhook orders/paid] Invalid HMAC')
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
  }

  let order: OrderPaid
  try {
    order = JSON.parse(raw) as OrderPaid
    if (!order || typeof order !== 'object' || !order.id) {
      throw new Error('Invalid order data received in webhook')
    }
  } catch (e) {
    console.error(
      '[Webhook orders/paid] Failed to parse Shopify webhook body:',
      e
    )
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const orderStatusUrl = (order as OrderPaid & { order_status_url?: string })
    .order_status_url
  const urlKey = getKeyFromUrl(orderStatusUrl)
  console.log(
    `[Webhook orders/paid] Token Debug: ID=${order.id}, cart_token=${order.cart_token}, token=${order.token}, URL_key=${urlKey}`
  )
  const token = getCheckoutKey(order)
  const redisKey = token ? `checkout:${token}` : undefined

  let attrib: CheckoutAttribution | null = null
  try {
    if (redisKey) {
      attrib = await redisGet<CheckoutAttribution>(redisKey)
    }

    if (attrib) {
      console.log(
        `[Webhook orders/paid] Found attribution data in Redis for key: ${redisKey}`
      )
    } else {
      console.warn(
        `[Webhook orders/paid] No attribution data found in Redis for key: ${redisKey}. (Used token source: ${
          token === order.cart_token ? 'cart_token'
          : token === order.token ? 'token'
          : 'url'
        })`
      )
    }
  } catch (redisError) {
    console.error(
      `[Webhook orders/paid] Error fetching attribution data from Redis for key ${redisKey}:`,
      redisError
    )
  }

  const priceSet = order.total_price_set ?? order.current_total_price_set
  const value =
    toNumberSafe(priceSet?.shop_money.amount ?? order.total_price) ?? 0
  const currency = priceSet?.shop_money.currency_code ?? order.currency ?? 'NOK'
  const contents: MetaContentItem[] = (order.line_items || [])
    .map((li: any) => {
      const id =
        (li.variant_id ?? li.product_id ?? li.id)?.toString() ?? 'unknown'
      const item: MetaContentItem = { id }
      if (li.quantity != null) item.quantity = li.quantity
      const itemPrice = toNumberSafe(
        li.price_set?.shop_money.amount ?? li.price
      )
      if (typeof itemPrice === 'number') item.item_price = itemPrice
      return item
    })
    .filter(item => item.id !== 'unknown')

  const custom_data: MetaPurchaseCustomData = { value, currency }
  if (contents.length > 0) {
    custom_data.contents = contents
    custom_data.content_ids = contents.map(c => c.id)
    custom_data.content_type = 'product'
  }
  custom_data.order_id =
    order.admin_graphql_api_id ?? order.name ?? order.id?.toString()

  const user_data = buildUserData(order, attrib)

  const event_time = Math.floor(
    new Date(order.processed_at ?? order.created_at ?? Date.now()).getTime()
      / 1000
  )
  const webhookGid =
    order.admin_graphql_api_id
    ?? (order.id != null ? `gid://shopify/Order/${order.id}` : undefined)
  const eventId = webhookGid ? `shopify_order_${webhookGid}` : attrib?.eventId

  const event: MetaEvent = {
    event_name: 'Purchase',
    event_time,
    action_source: 'website',
    user_data,
    custom_data,
    ...(eventId && { event_id: eventId })
  }

  if (attrib?.checkoutUrl) {
    event.event_source_url = attrib.checkoutUrl
  } else if (order.order_status_url) {
    event.event_source_url = order.order_status_url
  }

  const payload: MetaEventsRequest & { test_event_code?: string } = {
    data: [event]
  }

  try {
    const logEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level: 'INFO',
      event: 'CAPI: Purchase (Webhook)',
      identity: {
        ip: user_data.client_ip_address,
        fbp: user_data.fbp,
        fbc: user_data.fbc,
        externalId: user_data.external_id,
        userAgent: user_data.client_user_agent
      },
      context: {
        path: event.event_source_url,
        eventId: event.event_id,
        orderId: custom_data.order_id,
        redisKey: redisKey
      },
      data: custom_data
    }

    await redisPush('app_logs', logEntry)
    redisTrim('app_logs', 0, 999).catch(() => {})
  } catch (e) {
    console.error('[Webhook orders/paid] Logging to dashboard failed', e)
  }

  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    if (redisKey) {
      try {
        await redisDel(redisKey)
      } catch (e) {}
    }
    console.error(
      '[Webhook orders/paid] Purchase CAPI Error: Missing CAPI config'
    )
    return NextResponse.json(
      { ok: false, error: 'Internal Server Error - Missing CAPI config' },
      { status: 200 }
    )
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '[Webhook orders/paid] Sending CAPI Payload:',
      JSON.stringify(payload, null, 2)
    )
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )

    const result = (await res.json()) as MetaEventsSuccess | MetaGraphError

    if (redisKey) {
      try {
        await redisDel(redisKey)
        console.log(`[Webhook orders/paid] Deleted Redis key: ${redisKey}`)
      } catch (delError) {
        console.error(
          `[Webhook orders/paid] Error deleting Redis key ${redisKey}:`,
          delError
        )
      }
    }

    if (!res.ok) {
      console.error(
        `[Webhook orders/paid] Meta CAPI Error Response (Status ${res.status}):`,
        JSON.stringify(result, null, 2)
      )
      return NextResponse.json(
        { ok: false, errorDetails: result },
        { status: 200 }
      )
    }

    console.log(
      '[Webhook orders/paid] Meta CAPI Success:',
      JSON.stringify(result, null, 2)
    )
    return NextResponse.json({ ok: true, result })
  } catch (fetchError) {
    console.error('[Webhook orders/paid] Meta CAPI Fetch Error:', fetchError)
    if (redisKey) {
      try {
        await redisDel(redisKey)
      } catch (e) {}
    }
    return NextResponse.json(
      { ok: false, error: 'Failed to connect to Meta CAPI' },
      { status: 200 }
    )
  }
}
