import { createUsercentricsConsentState } from './createUsercentricsConsentState'
import {
  parseUsercentricsAllowedDps,
  parseUsercentricsAllowedDpsValue
} from './parseUsercentricsAllowedDps'
import type { ConsentState } from './CookieConsentProvider'

export function readStoredConsentState(): ConsentState | null {
  if (typeof window === 'undefined') {
    return null
  }

  const allowedDps =
    typeof window.ucConsentAllowedDpsString === 'string' ?
      parseUsercentricsAllowedDpsValue(window.ucConsentAllowedDpsString)
    : parseUsercentricsAllowedDps(document.cookie)

  return allowedDps ? createUsercentricsConsentState(allowedDps) : null
}
