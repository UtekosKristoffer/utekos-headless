// Path: src/app/api/checkout/capture-identifiers/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import type { CheckoutAttribution, UserData } from '@types'

interface ExtendedUserData extends UserData {
  email_hash?: string
}

interface CaptureBody {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData: UserData
}

function getStorageKey(body: CaptureBody): string | undefined {
  if (body.cartId) {
    const match = body.cartId.match(/Cart\/([a-zA-Z0-9]+)/)
    if (match && match[1]) {
      return match[1]
    }
  }

  if (!body.checkoutUrl) return undefined

  try {
    const url = new URL(body.checkoutUrl)

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
  } catch (e) {
    console.error('Error parsing checkout URL:', e)
  }

  return undefined
}

export async function POST(req: NextRequest) {
  let body: CaptureBody
  try {
    body = (await req.json()) as CaptureBody
  } catch {
    console.error('Invalid JSON received in /capture-identifiers')
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const token = getStorageKey(body)
  if (!token) {
    console.error('Could not parse token from body (cartId or checkoutUrl)')
    return NextResponse.json({ error: 'Missing valid token' }, { status: 400 })
  }

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()
  const userAgent = req.headers.get('user-agent') || undefined
  const cookieFbp = req.cookies.get('_fbp')?.value
  const cookieFbc = req.cookies.get('_fbc')?.value
  const cookieExtId = req.cookies.get('ute_ext_id')?.value
  const cookieUserHash = req.cookies.get('ute_user_hash')?.value

  const userDataToSave: ExtendedUserData = {}

  if (body.userData?.fbp) userDataToSave.fbp = body.userData.fbp
  else if (cookieFbp) userDataToSave.fbp = cookieFbp

  if (body.userData?.fbc) userDataToSave.fbc = body.userData.fbc
  else if (cookieFbc) userDataToSave.fbc = cookieFbc

  if (body.userData?.external_id)
    userDataToSave.external_id = body.userData.external_id
  else if (cookieExtId) userDataToSave.external_id = cookieExtId

  // Lagre e-post hash hvis tilgjengelig (fra proxy.ts)
  if (cookieUserHash) {
    userDataToSave.email_hash = cookieUserHash
  }

  if (body.userData?.client_user_agent)
    userDataToSave.client_user_agent = body.userData.client_user_agent
  else if (userAgent) userDataToSave.client_user_agent = userAgent

  const ipToUse = body.userData?.client_ip_address ?? proxiedIp
  if (ipToUse) userDataToSave.client_ip_address = ipToUse

  const payload: CheckoutAttribution = {
    cartId: body.cartId ?? null,
    checkoutUrl: body.checkoutUrl,
    userData: userDataToSave,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId })
  }

  try {
    const redisKey = `checkout:${token}`

    await redisSet(redisKey, payload, 60 * 60 * 24 * 7)

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Saved attribution for key ${token} (ExtID: ${userDataToSave.external_id}, Hash: ${!!userDataToSave.email_hash})`
      )
    }

    return NextResponse.json({ ok: true })
  } catch (redisError) {
    console.error('Error saving data to Redis:', redisError)
    return NextResponse.json(
      { error: 'Failed to save checkout data' },
      { status: 500 }
    )
  }
}
