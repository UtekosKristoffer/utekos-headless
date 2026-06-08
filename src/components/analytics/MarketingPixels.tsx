'use client'

/**
 * Consent-gated marketing pixel root.
 *
 * Mounts Meta behind the `marketing`
 * consent category from CookieConsentProvider. This is the equivalent
 * pattern to MicrosoftUetTag.tsx (which gates on the same `marketing`
 * key), and removes four ungated `'use client'` islands from the initial
 * hydration tree.
 *
 * Env gating remains in each child (NEXT_PUBLIC_*_PIXEL_ID); the
 * consent check is the outer gate.
 */

import { useConsentForService } from '@/components/cookie-consent/useConsent'
import { MetaPixelEvents } from '@/components/analytics/Meta/MetaPixelEvents'
import { USERCENTRICS_META_SERVICE_NAME } from '@/components/cookie-consent/usercentricsConfig'

const SHOULD_LOAD_META_PIXEL =
  !!process.env.NEXT_PUBLIC_META_PIXEL_ID
  && (process.env.NODE_ENV === 'production' || !!process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE)

export function MarketingPixels() {
  const hasMarketingConsent = useConsentForService(USERCENTRICS_META_SERVICE_NAME)

  if (!hasMarketingConsent) {
    return null
  }

  return (
    <>
      {SHOULD_LOAD_META_PIXEL && <MetaPixelEvents />}
    </>
  )
}
