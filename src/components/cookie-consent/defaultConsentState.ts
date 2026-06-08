import type { ConsentState } from './CookieConsentProvider'

export const defaultConsentState: ConsentState = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
  services: {},
  source: 'usercentrics'
}
