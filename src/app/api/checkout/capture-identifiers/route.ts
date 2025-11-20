// Path: src/app/api/checkout/capture-identifiers/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import type { CheckoutAttribution, UserData } from '@types'

interface CaptureBody {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData: UserData
}

function parseCheckoutToken(
  checkoutUrl: string | undefined
): string | undefined {
  if (!checkoutUrl) return undefined
  try {
    const url = new URL(checkoutUrl)

    const keyToken = url.searchParams.get('key')
    if (keyToken && /^[a-f0-9]{32}$/i.test(keyToken)) {
      return keyToken
    }

    const parts = url.pathname.split('/').filter(Boolean)
    const checkoutIndex = parts.findIndex(p => p === 'checkouts')
    if (checkoutIndex !== -1) {
      const potentialToken = parts[checkoutIndex + 1]
      if (potentialToken && /^[a-f0-9]{32}$/i.test(potentialToken)) {
        return potentialToken
      }
    }

    const paramToken = url.searchParams.get('token')
    if (paramToken) {
      return paramToken
    }

    return undefined
  } catch (e) {
    console.error('Error parsing checkout URL:', e, 'URL:', checkoutUrl)
    return undefined
  }
}

export async function POST(req: NextRequest) {
  let body: CaptureBody
  try {
    body = (await req.json()) as CaptureBody
    console.log(
      'Received body in /capture-identifiers:',
      JSON.stringify(body, null, 2)
    )
  } catch {
    console.error('Invalid JSON received in /capture-identifiers')
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const token = parseCheckoutToken(body.checkoutUrl)
  if (!token) {
    console.error('Could not parse checkout token from URL:', body.checkoutUrl)
    return NextResponse.json(
      { error: 'Missing or invalid checkout token in checkoutUrl' },
      { status: 400 }
    )
  }

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()

  const userDataToSave: UserData = {}
  if (body.userData?.fbp) userDataToSave.fbp = body.userData.fbp
  if (body.userData?.fbc) userDataToSave.fbc = body.userData.fbc
  if (body.userData?.client_user_agent)
    userDataToSave.client_user_agent = body.userData.client_user_agent
  const ipToUse = body.userData?.client_ip_address ?? proxiedIp 
  if (ipToUse) userDataToSave.client_ip_address = ipToUse
  if (body.userData?.external_id)
    userDataToSave.external_id = body.userData.external_id

  const payload: CheckoutAttribution = {
    cartId: body.cartId ?? null,
    checkoutUrl: body.checkoutUrl,
    userData: userDataToSave,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId })
  }

  try {
    const redisKey = `checkout:${token}`
    await redisSet(redisKey, payload, 60 * 60 * 24 * 7) // 7d TTL
    console.log(`Successfully saved data to Redis key: ${redisKey}`)
    return NextResponse.json({ ok: true })
  } catch (redisError) {
    console.error('Error saving data to Redis:', redisError)
    return NextResponse.json(
      { error: 'Failed to save checkout data' },
      { status: 500 }
    )
  }
}
