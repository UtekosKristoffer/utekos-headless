import { getCookie } from '@/lib/tracking/utils/getCookie'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import { ensureString } from '@/lib/utils/ensure'

/**
 * Extracts identity signals from browser cookies and maps them strictly
 * to the UnifiedAnalyticsEvent User structure.
 */
export function getBrowserUserData(): UnifiedAnalyticsEvent['user'] {
  const fbp = getCookie('_fbp')
  const fbc = getCookie('_fbc')
  const externalId = getCookie('ute_ext_id')
  const emailHash = getCookie('ute_user_hash')
  const ttclid = getCookie('ttclid')
  const epik = getCookie('epik')
  const scid = getCookie('_scid')
  const clickId = getCookie('sc_click_id')

  return {
    ...(ensureString(fbp) && { fbp: ensureString(fbp) }),
    ...(ensureString(fbc) && { fbc: ensureString(fbc) }),
    ...(ensureString(externalId) && { externalId: ensureString(externalId) }),
    ...(ensureString(emailHash) && { emailHash: ensureString(emailHash) }),

    ...(ensureString(ttclid) && { ttclid: ensureString(ttclid) }),
    ...(ensureString(epik) && { epik: ensureString(epik) }),
    ...(ensureString(scid) && { scid: ensureString(scid) }),
    ...(ensureString(clickId) && { clickId: ensureString(clickId) }),

    clientIp: undefined, // IP settes av server (API Route)
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent : undefined
  }
}
