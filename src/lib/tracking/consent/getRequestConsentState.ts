import { defaultConsentState } from '@/components/cookie-consent/defaultConsentState'
import { createUsercentricsConsentState } from '@/components/cookie-consent/createUsercentricsConsentState'
import { parseUsercentricsAllowedDps } from '@/components/cookie-consent/parseUsercentricsAllowedDps'
import type { ConsentState } from '@/components/cookie-consent/CookieConsentProvider'
import type { NextRequest } from 'next/server'

export function getRequestConsentState(request: NextRequest): ConsentState {
  const allowedDps = parseUsercentricsAllowedDps(request.headers.get('cookie'))

  return allowedDps ? createUsercentricsConsentState(allowedDps) : defaultConsentState
}
