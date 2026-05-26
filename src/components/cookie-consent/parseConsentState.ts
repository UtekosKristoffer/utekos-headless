import { normalizeConsentState } from './normalizeConsentState'
import type { ConsentState } from './CookieConsentProvider'

export function parseConsentState(value: string | undefined | null): ConsentState | null {
  if (!value) {
    return null
  }

  try {
    return normalizeConsentState(JSON.parse(value))
  } catch {
    return null
  }
}
