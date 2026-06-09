'use client'

import { GoogleTagManagerLoader } from '@/components/analytics/GoogleTagManagerLoader'
import { useConsentForService } from '@/components/cookie-consent/useConsent'
import {
  USERCENTRICS_GOOGLE_ADS_SERVICE_NAME,
  USERCENTRICS_GOOGLE_ANALYTICS_SERVICE_NAME
} from '@/components/cookie-consent/usercentricsConfig'

const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GOOGLE_GTM_ID || 'GTM-5TWMJQFP'

const GTM_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL
  || `https://cloud.server.utekos.no/gtm.js?id=${encodeURIComponent(GOOGLE_TAG_MANAGER_ID)}`

const SHOULD_LOAD_GOOGLE_TAG_MANAGER =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview'

export function GoogleTagManagerConsentGate() {
  const hasGoogleAnalyticsConsent = useConsentForService(
    USERCENTRICS_GOOGLE_ANALYTICS_SERVICE_NAME
  )
  const hasGoogleAdsConsent = useConsentForService(USERCENTRICS_GOOGLE_ADS_SERVICE_NAME)

  if (!SHOULD_LOAD_GOOGLE_TAG_MANAGER || (!hasGoogleAnalyticsConsent && !hasGoogleAdsConsent)) {
    return null
  }

  return <GoogleTagManagerLoader gtmId={GOOGLE_TAG_MANAGER_ID} scriptUrl={GTM_SCRIPT_URL} />
}
