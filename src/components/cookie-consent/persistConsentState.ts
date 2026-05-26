import Cookies from 'js-cookie'
import {
  COOKIE_CONSENT_COOKIE_NAME,
  COOKIE_CONSENT_EXPIRY_DAYS,
  LEGACY_COOKIE_CONSENT_LOCAL_STORAGE_KEY
} from './consentStorageKeys'
import type { ConsentState } from './CookieConsentProvider'

export function persistConsentState(consentState: ConsentState): void {
  const serializedConsentState = JSON.stringify({
    ...consentState,
    necessary: true
  })

  Cookies.set(COOKIE_CONSENT_COOKIE_NAME, serializedConsentState, {
    expires: COOKIE_CONSENT_EXPIRY_DAYS,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LEGACY_COOKIE_CONSENT_LOCAL_STORAGE_KEY, serializedConsentState)
  }
}
