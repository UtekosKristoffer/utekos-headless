import type { NextRequest } from 'next/server'
import { COOKIE_CONSENT_COOKIE_NAME } from '@/components/cookie-consent/consentStorageKeys'
import { parseConsentState } from '@/components/cookie-consent/parseConsentState'

export function hasRequestMarketingConsent(request: NextRequest): boolean {
  const storedConsent = request.cookies.get(COOKIE_CONSENT_COOKIE_NAME)?.value

  return parseConsentState(storedConsent)?.marketing === true
}
