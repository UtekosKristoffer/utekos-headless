// app/api/meta/capi/purchase/route.ts
import { NextRequest, NextResponse } from 'next/server'
import type {
  PurchaseInput,
  MetaEventsRequest,
  MetaEventsSuccess,
  MetaGraphError,
  MetaEvent,
  UserData,
  PurchaseCustomData
} from '@types'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Meta CAPI config' },
      { status: 500 }
    )
  }
  const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

  let body: PurchaseInput
  try {
    body = (await req.json()) as PurchaseInput
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  if (typeof body.value !== 'number' || !body.currency) {
    return NextResponse.json(
      { error: 'Missing required fields: value/currency' },
      { status: 400 }
    )
  }

  // 2) Bygg user_data selektivt (unngå undefined i optional)
  const user_data: UserData = {}
  if (body.userData.fbp) user_data.fbp = body.userData.fbp
  if (body.userData.fbc) user_data.fbc = body.userData.fbc
  if (body.userData.client_user_agent)
    user_data.client_user_agent = body.userData.client_user_agent
  if (body.userData.client_ip_address)
    user_data.client_ip_address = body.userData.client_ip_address
  if (body.userData.external_id)
    user_data.external_id = body.userData.external_id
  if (body.userData.em?.length) user_data.em = body.userData.em
  if (body.userData.ph?.length) user_data.ph = body.userData.ph

  // 3) Bygg custom_data selektivt
  const custom_data: PurchaseCustomData = {
    value: body.value,
    currency: body.currency
  }
  if (body.contents && body.contents.length)
    custom_data.contents = body.contents
  if (body.content_ids && body.content_ids.length)
    custom_data.content_ids = body.content_ids
  if (body.content_type) custom_data.content_type = body.content_type
  if (body.orderId) custom_data.order_id = body.orderId

  const event_time = Math.floor((body.occuredAt ?? Date.now()) / 1000)
  const event: MetaEvent = {
    event_name: 'Purchase',
    event_time,
    action_source: 'website',
    user_data,
    custom_data
  }
  if (body.eventId) event.event_id = body.eventId
  if (body.sourceUrl) event.event_source_url = body.sourceUrl

  const payload: MetaEventsRequest =
    TEST_EVENT_CODE ?
      { data: [event], test_event_code: TEST_EVENT_CODE }
    : { data: [event] }

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )
  const result = (await res.json()) as MetaEventsSuccess | MetaGraphError

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Meta CAPI error', details: result },
      { status: 400 }
    )
  }
  return NextResponse.json({ ok: true, result })
}
