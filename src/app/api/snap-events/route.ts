// src/app/api/snap-events/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import type { ContentItem } from '@types' // Gjenbruker Meta-typen

/* ----------------------------- Typer for Snap CAPI ----------------------------- */

type SnapUserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ct?: string
  st?: string
  zp?: string
  country?: string
  client_ip_address?: string | null
  user_agent?: string | null
  sc_click_id?: string | null
  sc_cookie1?: string | null // _scid cookie
  ge?: string[]
  madid?: string
}

type SnapCustomData = {
  value?: string
  currency?: string
  content_ids?: string[]
  content_category?: string[]
  number_items?: string[]
  order_id?: string
  event_id?: string
}

type ClientEventData = {
  value?: number // Kommer som number fra klient
  currency?: string
  content_ids?: string[]
  contents?: ContentItem[] // Gjenbruker Meta-typen
  num_items?: number // Kommer som number fra klient
  order_id?: string
}

type ClientUserData = {
  em?: string
  ph?: string
  fn?: string
  ln?: string
  ge?: string
  db?: string
  ct?: string
  st?: string
  zp?: string
  country?: string
}

type Body = {
  eventName:
    | 'VIEW_CONTENT'
    | 'ADD_CART'
    | 'START_CHECKOUT'
    | 'PAGE_VIEW'
    | string
  eventData?: ClientEventData
  userData?: ClientUserData
  eventId: string
  eventSourceUrl: string
  eventTime: number
}

/* ----------------------------- Hjelpefunksjoner (Hashing) ----------------------------- */

function hash(input: string): string {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex')
}

function normalizeAndHash(
  input: string | undefined | null
): string | undefined {
  if (!input) return undefined
  const normalized = input.trim().toLowerCase()
  return normalized ? hash(normalized) : undefined
}

function normalizePhone(input: string | undefined | null): string | undefined {
  if (!input) return undefined
  const normalized = input.replace(/[^0-9]/g, '')
  return normalized ? hash(normalized) : undefined
}

/* ----------------------------- Hoved-rute ----------------------------- */

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
  const ACCESS_TOKEN = process.env.SNAP_ACCESS_TOKEN

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Snap CAPI environment variables not set')
    return NextResponse.json(
      { error: 'Missing Snap Pixel configuration' },
      { status: 500 }
    )
  }

  // 1. Hent IP, UA og Cookies
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
  const scid = cookies._scid || null // Snapchats cookie

  // 2. Parse body
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

  // 3. Bygg Snap UserData (med hashing)
  const user_data: SnapUserData = {
    client_ip_address: ip,
    user_agent: ua,
    sc_cookie1: scid
  }

  if (body.userData) {
    const { em, ph, fn, ln, ct, st, zp, country, ge } = body.userData
    const hashedEmail = normalizeAndHash(em)
    const hashedPhone = normalizePhone(ph)
    const hashedFn = normalizeAndHash(fn)
    const hashedLn = normalizeAndHash(ln)
    const hashedCity = normalizeAndHash(ct)
    const hashedState = normalizeAndHash(st)
    const hashedZip = normalizeAndHash(zp)
    const hashedCountry = normalizeAndHash(country)
    const hashedGender = normalizeAndHash(ge)

    if (hashedEmail) user_data.em = [hashedEmail]
    if (hashedPhone) user_data.ph = [hashedPhone]
    if (hashedFn) user_data.fn = [hashedFn]
    if (hashedLn) user_data.ln = [hashedLn]
    if (hashedCity) user_data.ct = hashedCity
    if (hashedState) user_data.st = hashedState
    if (hashedZip) user_data.zp = hashedZip
    if (hashedCountry) user_data.country = hashedCountry
    if (hashedGender) user_data.ge = [hashedGender]
  }

  // 4. Bygg Snap CustomData (transformer fra klient-format)
  const custom_data: SnapCustomData = {
    event_id: body.eventId
  }

  if (body.eventData) {
    const { value, currency, content_ids, contents, num_items, order_id } =
      body.eventData

    if (value !== undefined) custom_data.value = value.toString()
    if (currency) custom_data.currency = currency
    if (order_id) custom_data.order_id = order_id

    // Transformer 'contents' eller 'content_ids'
    if (content_ids) {
      custom_data.content_ids = content_ids
    } else if (contents) {
      custom_data.content_ids = contents.map(c => c.id)
    }
    if (custom_data.content_ids) {
      custom_data.content_category = ['product']
    }

    // Transformer 'num_items' eller 'contents'
    if (num_items !== undefined) {
      custom_data.number_items = [num_items.toString()]
    } else if (contents) {
      custom_data.number_items = contents.map(
        c => c.quantity?.toString() ?? '1'
      )
    }
  }

  // 5. Bygg Snap Payload
  const payload = {
    data: [
      {
        event_name: event_name,
        event_time: event_time,
        action_source: 'website',
        event_source_url: body.eventSourceUrl,
        user_data: user_data,
        custom_data: custom_data
      }
    ]
  }

  // 6. Send til Snap CAPI
  try {
    const snapApiUrl = `https://tr.snapchat.com/v3/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`

    const res = await fetch(snapApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const json = await res.json()
    console.log(
      `Snap CAPI Response for ${event_name} (${body.eventId}):`,
      JSON.stringify(json, null, 2)
    )
    if (!res.ok) {
      console.error(
        `Snap CAPI request failed for ${event_name} (${body.eventId}): Status ${res.status}`,
        json
      )
      return NextResponse.json(
        { error: 'Failed to send event to Snap CAPI', details: json },
        { status: res.status }
      )
    }
    return NextResponse.json({ success: true, snapResponse: json })
  } catch (fetchError) {
    console.error(
      `Snap CAPI fetch error for ${event_name} (${body.eventId}):`,
      fetchError
    )
    return NextResponse.json(
      {
        error: 'Failed to connect to Snap CAPI',
        details: (fetchError as Error).message ?? 'Unknown fetch error'
      },
      { status: 503 }
    )
  }
}
