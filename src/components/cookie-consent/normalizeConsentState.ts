import { defaultConsentState } from './defaultConsentState'
import type { ConsentState } from './CookieConsentProvider'

export function normalizeConsentState(input: unknown): ConsentState | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const source = input as Partial<Record<keyof ConsentState, unknown>>
  const marketing = source.marketing === true

  return {
    necessary: true,
    analytics: source.analytics === true,
    functional: typeof source.functional === 'boolean' ? source.functional : defaultConsentState.functional,
    marketing,
    profile_marketing:
      typeof source.profile_marketing === 'boolean' ?
        source.profile_marketing
      : defaultConsentState.profile_marketing
  }
}
