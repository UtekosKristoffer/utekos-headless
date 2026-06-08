import { readStoredConsentState } from '@/components/cookie-consent/readStoredConsentState'
import type { ConsentCategory } from '@/components/cookie-consent/CookieConsentProvider'

export function hasCategoryConsent(category: ConsentCategory): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return readStoredConsentState()?.[category] === true
}
