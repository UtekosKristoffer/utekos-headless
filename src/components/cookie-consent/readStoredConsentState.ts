import Cookies from 'js-cookie'
import { COOKIE_CONSENT_COOKIE_NAME, LEGACY_COOKIE_CONSENT_LOCAL_STORAGE_KEY } from './consentStorageKeys'
import { parseConsentState } from './parseConsentState'
import type { ConsentState } from './CookieConsentProvider'

export function readStoredConsentState(): ConsentState | null {
  const cookieConsent = parseConsentState(Cookies.get(COOKIE_CONSENT_COOKIE_NAME))

  if (cookieConsent) {
    return cookieConsent
  }

  if (typeof window === 'undefined') {
    return null
  }

  return parseConsentState(window.localStorage.getItem(LEGACY_COOKIE_CONSENT_LOCAL_STORAGE_KEY))
}
