// Path: src/modules/analytics/services/captureAttributionSignals.ts
import { NextRequest } from 'next/server'
import { redisSet } from '@/lib/redis/redisSet'
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import { removeUndefined } from './utils/removeUndefined'
import { parseGoogleAnalyticsClientId } from './utils/parseGoogleAnalyticsClientId'
import { CaptureIdentifiersSchema } from './CaptureIdentifiersSchema'
import type { AttributionSnapshot } from '@/modules/analytics/domain/types/attribution/AttributionSnapshot'

/**
 * ATTRIBUTION SERVICE
 * Ansvar: Ekstrahere signaler fra request (cookies/headers) og lagre state i Redis.
 * Dette muliggjør "Enrichment" av Webhook-events senere.
 */
export async function captureAttributionSignals(
  req: NextRequest
): Promise<{ success: boolean; error?: string }> {
  // 1. Validate Input (Zod)
  const bodyResult = CaptureIdentifiersSchema.safeParse(
    await req.json().catch(() => ({}))
  )

  if (!bodyResult.success) {
    return { success: false, error: 'Invalid payload structure' }
  }

  const { cartId, checkoutUrl } = bodyResult.data
  const cookies = req.cookies
  const headers = req.headers
  const gaCookie = cookies.get('_ga')?.value
  const gaClientId =
    gaCookie ? parseGoogleAnalyticsClientId(gaCookie) : undefined
  const gaSessionId = cookies.get('_ga_MEASUREMENT_ID')?.value
  const signals: {
    [K in keyof AttributionSnapshot['attributionSignals']]: string | undefined
  } = {
    fbp: cookies.get('_fbp')?.value,
    fbc: cookies.get('_fbc')?.value,
    fbclid: cookies.get('_fbclid')?.value,
    ttclid: cookies.get('_ttclid')?.value,
    ttp: cookies.get('_ttp')?.value,
    epik: cookies.get('_epik')?.value,
    gclid: cookies.get('gclid')?.value,
    externalId: cookies.get('ute_ext_id')?.value,
    emailHash: cookies.get('ute_user_hash')?.value,
    clickId: cookies.get('ute_sc_cid')?.value,
    gaClientId: gaClientId,
    gaSessionId: gaSessionId,
    clientIpAddress:
      headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1',
    clientUserAgent: headers.get('user-agent') || undefined
  }
  const snapshot: AttributionSnapshot = {
    cartId,
    checkoutUrl,
    capturedAtTimestamp: Date.now(),
    attributionSignals: removeUndefined(signals)
  }

  const redisKey = `checkout:${cartId}`

  try {
    await redisSet(redisKey, JSON.stringify(snapshot), 60 * 60 * 24 * 7)

    await logToAppLogs('INFO', '💾 Attribution Signals Captured', {
      cartId,
      signals: Object.keys(snapshot.attributionSignals) // Logg kun hvilke nøkler vi fant
    })

    return { success: true }
  } catch (error) {
    console.error('Redis Capture Failed', error)
    return { success: false, error: 'Persistence failed' }
  }
}
