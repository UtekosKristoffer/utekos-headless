import type { ConsentState } from './CookieConsentProvider'

export function broadcastConsentState(consentState: ConsentState): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'utekos_consent_update',
    consent: consentState
  })

  window.dispatchEvent(
    new CustomEvent('cookie_consent_saved', {
      detail: { consent: consentState }
    })
  )
}
