import { readStoredConsentState } from '@/components/cookie-consent/readStoredConsentState'

export function hasServiceConsent(serviceName: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return readStoredConsentState()?.services[serviceName] === true
}
