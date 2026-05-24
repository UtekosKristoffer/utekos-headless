// Path: src/app/api/analytics/web-vitals/route.ts

import { NextResponse } from 'next/server'

const ALLOWED_METRICS = new Set([
  'CLS',
  'FCP',
  'FID',
  'INP',
  'LCP',
  'TTFB',
  'Next.js-hydration',
  'Next.js-route-change-to-render',
  'Next.js-render'
])

export async function POST(request: Request) {
  try {
    const metric = await request.json()

    if (!metric || typeof metric !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    if (typeof metric.name !== 'string' || !ALLOWED_METRICS.has(metric.name)) {
      return NextResponse.json({ error: 'Invalid metric' }, { status: 400 })
    }

    // Midlertidig: logg strukturert i Vercel logs.
    // Neste steg: send videre til PostHog, GA4, Axiom, Vercel Analytics,
    // Supabase, eller eget observability-lager.
    console.info('[web-vitals]', {
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      pathname: metric.pathname,
      navigationType: metric.navigationType,
      id: metric.id,
      timestamp: metric.timestamp,
      attribution: metric.attribution,
      entries: metric.entries
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to record web vital' },
      { status: 500 }
    )
  }
}
