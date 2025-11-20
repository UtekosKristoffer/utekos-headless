// Path: app/api/meta-events/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { Body, UserData } from './types'
export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  const PAGE_ID = process.env.ViewContent
  const IG_ACCOUNT_ID = process.env.META_IG_ACCOUNT_ID

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Meta CAPI environment variables not set')
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  const ua = req.headers.get('user-agent')
  const xForwardedFor = req.headers.get('x-forwarded-for')
  const ip =
    xForwardedFor ? (xForwardedFor.split(',')[0]?.trim() ?? null) : null

  const fbp = req.cookies.get('_fbp')?.value ?? null
  const fbc = req.cookies.get('_fbc')?.value ?? null
  const externalId = req.cookies.get('ute_ext_id')?.value ?? null

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.eventName || !body.eventId) {
    return NextResponse.json(
      { error: 'Missing required fields: eventName or eventId' },
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
    ...(externalId && { external_id: externalId }),
    ...(PAGE_ID && { page_id: PAGE_ID }),
    ...(IG_ACCOUNT_ID && { ig_account_id: IG_ACCOUNT_ID }),

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
    ]
    // test_event_code kan legges her midlertidig ved behov
    // test_event_code: 'TEST63736'
  }

  try {
    const metaApiUrl = `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`

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
        JSON.stringify(json, null, 2)
      )
      return NextResponse.json(
        { error: 'Failed to send event to Meta CAPI', details: json },
        { status: res.status }
      )
    }
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
