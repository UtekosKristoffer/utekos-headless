import type { ConsentState } from './CookieConsentProvider'

export const defaultConsentState: ConsentState = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
  profile_marketing: false
}
