import type { ConsentState } from './CookieConsentProvider'

export function getGoogleConsentFields(consentState: ConsentState) {
  return {
    ad_storage: consentState.marketing ? 'granted' : 'denied',
    ad_user_data: consentState.marketing ? 'granted' : 'denied',
    ad_personalization: consentState.marketing ? 'granted' : 'denied',
    analytics_storage: consentState.analytics ? 'granted' : 'denied'
  }
}
