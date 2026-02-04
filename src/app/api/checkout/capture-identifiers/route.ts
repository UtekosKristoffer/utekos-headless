// Path: 
import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import { getStorageKey } from '@/lib/utils/getStorageKey'
import { normalize } from '@/lib/tracking/meta/normalization'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import { getClientIp } from '@/lib/tracking/user-data/getClientIp'
import { GA_MEASUREMENT_ID } from '@/api/constants/monitoring'
import { parseGaClientId } from '@/lib/tracking/google/parseGaClientId'
import { parseGaSessionId } from '@/lib/tracking/google/parseGaSessionId'
import { findGaSessionCookie } from '@/lib/tracking/google/findGaSessionCookie'
import type { CaptureBody, CheckoutAttribution, MetaUserData } from '@types'

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
  const cookieStore = req.cookies

  const cookieFbp = cookieStore.get('_fbp')?.value
  const cookieFbc = cookieStore.get('_fbc')?.value
  const cookieExtId = cookieStore.get('ute_ext_id')?.value
  const cookieUserHash = cookieStore.get('ute_user_hash')?.value
  const cookieScid = cookieStore.get('_scid')?.value
  const cookieScCid = cookieStore.get('ute_sc_cid')?.value
  const cookieEpik = cookieStore.get('_epik')?.value

  const gaCookie = cookieStore.get('_ga')?.value
  const gaClientId = parseGaClientId(gaCookie)
  const cookieMap = new Map<string, string>()
  cookieStore.getAll().forEach(c => cookieMap.set(c.name, c.value))
  const gaSessionCookieVal = findGaSessionCookie(cookieMap, GA_MEASUREMENT_ID)
  const gaSessionId = parseGaSessionId(gaSessionCookieVal)

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

  if (cookieScid) {
    ;(userDataToSave as any).scid = cookieScid
  }

  if (cookieScCid) {
    ;(userDataToSave as any).click_id = cookieScCid
  }

  if (cookieEpik) {
    ;(userDataToSave as any).epik = cookieEpik
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
    ga_client_id: gaClientId || undefined,
    ga_session_id: gaSessionId || undefined,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId })
  }

  await logToAppLogs(
    'INFO',
    '📩📩📩📩📩📩📩📩📩📩 Capture Identifiers 📩📩📩📩📩📩📩📩📩📩',
    {
      cartId: body.cartId,
      fbp: userDataToSave.fbp,
      fbc: userDataToSave.fbc,
      scid: (userDataToSave as any).scid,
      click_id: (userDataToSave as any).click_id,
      epik: (userDataToSave as any).epik,
      external_id: userDataToSave.external_id,
      hasEmailHash: !!userDataToSave.email_hash,
      clientIp: userDataToSave.client_ip_address,
      ga_client_id: gaClientId ? 'Captured' : 'Missing',
      ga_session_id: gaSessionId ? 'Captured' : 'Missing'
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
