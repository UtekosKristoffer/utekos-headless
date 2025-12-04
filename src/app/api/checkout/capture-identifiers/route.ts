// Path: src/app/api/checkout/capture-identifiers/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import { getStorageKey } from '@/lib/utils/getStorageKey'
import { normalize } from '@/lib/meta/normalization' // Importerer normalisering
import type { CaptureBody, CheckoutAttribution, MetaUserData } from '@types'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'

function getClientIp(req: NextRequest): string | null {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]
    return firstIp ? firstIp.trim() : null
  }
  return null
}

export async function POST(req: NextRequest) {
  let body: CaptureBody
  try {
    body = (await req.json()) as CaptureBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const token = getStorageKey(body)
  if (!token) {
    return NextResponse.json({ error: 'Missing valid token' }, { status: 400 })
  }

  const requestIp = getClientIp(req)
  const userAgent = req.headers.get('user-agent') || undefined
  const cookieFbp = req.cookies.get('_fbp')?.value
  const cookieFbc = req.cookies.get('_fbc')?.value
  const cookieExtId = req.cookies.get('ute_ext_id')?.value
  const cookieUserHash = req.cookies.get('ute_user_hash')?.value
  const userDataToSave: MetaUserData = {}

  if (body.userData?.fbp) userDataToSave.fbp = body.userData.fbp
  else if (cookieFbp) userDataToSave.fbp = cookieFbp

  if (body.userData?.fbc) userDataToSave.fbc = body.userData.fbc
  else if (cookieFbc) userDataToSave.fbc = cookieFbc

  if (body.userData?.external_id) {
    userDataToSave.external_id = body.userData.external_id
  } else if (cookieExtId) {
    userDataToSave.external_id = cookieExtId
  }

  if (cookieUserHash) {
    userDataToSave.email_hash = cookieUserHash
  }
  if (body.userData?.client_user_agent) {
    userDataToSave.client_user_agent = body.userData.client_user_agent
  } else if (userAgent) {
    userDataToSave.client_user_agent = userAgent
  }

  const ipToUse = body.userData?.client_ip_address ?? requestIp
  if (ipToUse) {
    userDataToSave.client_ip_address = ipToUse
  }

  if (userDataToSave.email)
    userDataToSave.email = normalize.email(userDataToSave.email)
  if (userDataToSave.phone)
    userDataToSave.phone = normalize.phone(userDataToSave.phone)
  if (userDataToSave.first_name)
    userDataToSave.first_name = normalize.name(userDataToSave.first_name)
  if (userDataToSave.last_name)
    userDataToSave.last_name = normalize.name(userDataToSave.last_name)
  if (userDataToSave.city)
    userDataToSave.city = normalize.city(userDataToSave.city)
  if (userDataToSave.state)
    userDataToSave.state = normalize.state(userDataToSave.state)
  if (userDataToSave.zip) userDataToSave.zip = normalize.zip(userDataToSave.zip)
  if (userDataToSave.country)
    userDataToSave.country = normalize.country(userDataToSave.country)

  const payload: CheckoutAttribution = {
    cartId: body.cartId ?? null,
    checkoutUrl: body.checkoutUrl,
    userData: userDataToSave,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId })
  }

  await logToAppLogs(
    'INFO',
    'Capture Identifiers',
    {
      cartId: body.cartId,
      fbp: userDataToSave.fbp,
      fbc: userDataToSave.fbc,
      external_id: userDataToSave.external_id,
      hasEmailHash: !!userDataToSave.email_hash,
      clientIp: userDataToSave.client_ip_address
    },
    {
      token,
      checkoutUrl: body.checkoutUrl
    }
  )

  try {
    await redisSet(`checkout:${token}`, payload, 60 * 60 * 24 * 7)
    return NextResponse.json({ ok: true })
  } catch (redisError) {
    console.error('[Capture API] Redis save failed:', redisError)
    return NextResponse.json(
      { error: 'Failed to save checkout data' },
      { status: 500 }
    )
  }
}
