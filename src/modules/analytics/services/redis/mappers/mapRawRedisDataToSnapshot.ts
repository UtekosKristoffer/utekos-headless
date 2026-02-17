import { ensureString, ensureNumber } from '@/lib/utils/ensure'
import type { AttributionSnapshot } from '@/modules/analytics/domain/types/attribution/AttributionSnapshot'

export function mapRawRedisDataToSnapshot(
  raw: unknown
): AttributionSnapshot | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }

  const data = raw as Record<string, any>
  const signals = (data.attributionSignals as Record<string, any>) || {}

  const get = (...keys: string[]): string | undefined => {
    for (const k of keys) {
      const val = ensureString(signals[k]) || ensureString(data[k])
      if (val) return val
    }
    return undefined
  }

  const assign = (
    key: keyof AttributionSnapshot['attributionSignals'],
    ...sourceKeys: string[]
  ) => {
    const val = get(...sourceKeys)
    return val ? { [key]: val } : {}
  }

  return {
    cartId: ensureString(data.cartId) || null,
    checkoutUrl: ensureString(data.checkoutUrl) || null,
    capturedAtTimestamp:
      ensureNumber(data.capturedAtTimestamp) || Math.floor(Date.now() / 1000),

    attributionSignals: {
      ...assign('email', 'email'),
      ...assign('phone', 'phone'),
      ...assign('firstName', 'firstName', 'first_name'),
      ...assign('lastName', 'lastName', 'last_name'),
      ...assign('city', 'city'),
      ...assign('state', 'state'),
      ...assign('zip', 'zip'),
      ...assign('country', 'country'),

      ...assign('emailHash', 'emailHash', 'email_hash'),
      ...assign('externalId', 'externalId', 'external_id'),

      ...assign(
        'clientUserAgent',
        'clientUserAgent',
        'client_user_agent',
        'userAgent'
      ),
      ...assign(
        'clientIpAddress',
        'clientIpAddress',
        'client_ip_address',
        'clientIp'
      ),

      ...assign('fbp', 'fbp'),
      ...assign('fbc', 'fbc'),
      ...assign('fbclid', 'fbclid'),

      ...assign('gaClientId', 'gaClientId', 'googleAnalyticsClientId'),
      ...assign('gaSessionId', 'gaSessionId', 'googleAnalyticsSessionId'),
      ...assign('gclid', 'gclid'),

      ...assign('ttclid', 'ttclid'),
      ...assign('ttp', 'ttp'),

      ...assign('epik', 'epik'),

      ...assign('scid', 'scid'),
      ...assign('clickId', 'clickId', 'click_id')
    }
  }
}
