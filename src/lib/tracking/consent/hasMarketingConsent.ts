import { readStoredConsentState } from '@/components/cookie-consent/readStoredConsentState'

export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return readStoredConsentState()?.marketing === true
}
