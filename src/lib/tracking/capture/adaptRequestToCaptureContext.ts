// Path: src/lib/tracking/capture/adaptRequestToCaptureContext.ts

import { type NextRequest } from 'next/server'
import { getClientIp } from '@/lib/tracking/user-data/getClientIp'
import { parseGaClientId } from '@/lib/tracking/google/parseGaClientId'
import { parseGaSessionId } from '@/lib/tracking/google/parseGaSessionId'
import { findGaSessionCookie } from '@/lib/tracking/google/findGaSessionCookie'
import { GA_MEASUREMENT_ID } from '@/api/constants/monitoring'
import type { CaptureContext } from 'types/tracking/capture/CaptureContext'

export function adaptRequestToCaptureContext(req: NextRequest): CaptureContext {
  const cookieStore = req.cookies
  const gaCookie = cookieStore.get('_ga')?.value
  const gaClientId = parseGaClientId(gaCookie)
  const cookieMap = new Map<string, string>()
  cookieStore.getAll().forEach(c => cookieMap.set(c.name, c.value))

  const gaSessionCookieVal = findGaSessionCookie(cookieMap, GA_MEASUREMENT_ID)
  const gaSessionId = parseGaSessionId(gaSessionCookieVal)

  return {
    cookies: {
      fbp: cookieStore.get('_fbp')?.value,
      fbc: cookieStore.get('_fbc')?.value,
      externalId: cookieStore.get('ute_ext_id')?.value,
      userHash: cookieStore.get('ute_user_hash')?.value,
      scid: cookieStore.get('_scid')?.value,
      click_id: cookieStore.get('ute_sc_cid')?.value, // Mapper ute_sc_cid -> click_id
      epik: cookieStore.get('_epik')?.value,
      gaClientId: gaClientId || undefined,
      gaSessionId: gaSessionId || undefined
    },

    clientIp: getClientIp(req) ?? '',
    userAgent: req.headers.get('user-agent') ?? ''
  }
}
