import { getGoogleConsentFields } from './getGoogleConsentFields'
import type { ConsentState } from './CookieConsentProvider'

export function broadcastConsentState(consentState: ConsentState): void {
  if (typeof window === 'undefined') {
    return
  }

  const googleConsent = getGoogleConsentFields(consentState)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'consent_update',
    consent: googleConsent
  })

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', googleConsent)
  }

  window.dispatchEvent(
    new CustomEvent('cookie_consent_saved', {
      detail: { consent: consentState }
    })
  )
}
