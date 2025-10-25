// app/api/checkout/capture-identifiers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis' // se helper under hvis du ikke allerede har denne
import type { CheckoutAttribution, Body } from '@types'
export const runtime = 'nodejs'

// Hjelper: trekk ut Shopify checkout-token fra checkoutUrl
function parseCheckoutToken(checkoutUrl: string): string | undefined {
  try {
    const url = new URL(checkoutUrl)
    const parts = url.pathname.split('/').filter(Boolean)
    const i = parts.findIndex(p => p === 'checkouts')
    if (i >= 0 && parts[i + 1]) return parts[i + 1]
    return url.searchParams.get('token') ?? undefined
  } catch {
    return undefined
  }
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const token = parseCheckoutToken(body.checkoutUrl)
  if (!token)
    return NextResponse.json(
      { error: 'Missing checkout token' },
      { status: 400 }
    )

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()

  const userData: CheckoutAttribution['userData'] = {}
  if (body.userData.fbp) userData.fbp = body.userData.fbp
  if (body.userData.fbc) userData.fbc = body.userData.fbc
  if (body.userData.client_user_agent)
    userData.client_user_agent = body.userData.client_user_agent
  const ipToUse = body.userData.client_ip_address ?? proxiedIp
  if (ipToUse) userData.client_ip_address = ipToUse
  if (body.userData.external_id)
    userData.external_id = body.userData.external_id

  let payload: CheckoutAttribution = {
    cartId: body.cartId,
    checkoutUrl: body.checkoutUrl,
    userData,
    ts: Date.now()
  }
  if (body.eventId) {
    payload = { ...payload, eventId: body.eventId }
  }

  await redisSet(`checkout:${token}`, payload, 60 * 60 * 24 * 7) // 7d TTL
  return NextResponse.json({ ok: true })
}
