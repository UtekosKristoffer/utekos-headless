// Path: src/components/analytics/ConditionalTracking.tsx
'use client'

import { useConsent } from '@/components/cookie-consent/useConsent'
import { GoogleTagManager } from '@next/third-parties/google'
import type { TrackingProps } from 'types/tracking/props/TrackingProps'

export function ConditionalTracking({ googleTagManagerId }: TrackingProps) {
  const { consent } = useConsent()

  return consent.analytics && googleTagManagerId ?
      <GoogleTagManager gtmId={googleTagManagerId} />
    : null
}
