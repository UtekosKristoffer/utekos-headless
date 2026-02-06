// Path: src/lib/tracking/google/sendGA4Events.ts
import 'server-only'

const GA_MEASUREMENT_ID =
  process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GA_API_SECRET = process.env.GA_API_SECRET

export type GA4ValidationMessage = {
  fieldPath?: string
  description?: string
  validationCode?: string
}

export type GA4SendResult =
  | { ok: true; status: number }
  | {
      ok: false
      status?: number
      error: string
      validationMessages?: GA4ValidationMessage[]
    }

export type SendGA4Options = {
  session_id?: string | number
  userAgent?: string
  ip_override?: string
  timestamp_micros?: number
  debug?: boolean
}

export type GA4EventInput = {
  name: string
  client_id: string
  params: Record<string, any>
}

export async function sendGA4Event(
  event: GA4EventInput,
  opts: SendGA4Options = {}
): Promise<GA4SendResult> {
  if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
    return {
      ok: false,
      error: 'Missing GA4 credentials (GA_MEASUREMENT_ID / GA_API_SECRET)'
    }
  }

  const base = 'https://region1.google-analytics.com'
  const path = opts.debug ? '/debug/mp/collect' : '/mp/collect'
  const url = `${base}${path}?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`

  const sessionIdNum =
    (
      opts.session_id !== undefined
      && opts.session_id !== null
      && opts.session_id !== ''
    ) ?
      Number(opts.session_id)
    : undefined

  const payload: any = {
    client_id: event.client_id,
    ...(opts.timestamp_micros !== undefined ?
      { timestamp_micros: opts.timestamp_micros }
    : {}),
    ...(opts.ip_override ? { ip_override: opts.ip_override } : {}),
    events: [
      {
        name: event.name,
        params: {
          ...event.params,
          ...(sessionIdNum !== undefined ? { session_id: sessionIdNum } : {}),
          engagement_time_msec: 1,
          ...(opts.debug ? { debug_mode: 1 } : {})
        }
      }
    ]
  }

  if (opts.debug) {
    payload.validation_behavior = 'ENFORCE_RECOMMENDATIONS'
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(opts.userAgent ? { 'user-agent': opts.userAgent } : {})
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!opts.debug) {
      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          error: await res.text()
        }
      }
      return { ok: true, status: res.status }
    }

    const data = await res.json().catch(() => ({}))
    const msgs: GA4ValidationMessage[] = data?.validationMessages || []

    if (msgs.length) {
      return {
        ok: false,
        status: res.status,
        error: 'GA4 validation failed',
        validationMessages: msgs
      }
    }

    return { ok: true, status: res.status }
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) }
  }
}
