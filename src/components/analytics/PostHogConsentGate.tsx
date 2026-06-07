'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from '@posthog/next'
import { useConsent } from '@/components/cookie-consent/useConsent'

export function PostHogConsentGate() {
  const { consent } = useConsent()
  const postHog = usePostHog()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!postHog) return

    if (consent.analytics) {
      postHog.opt_in_capturing({ captureEventName: false })
      postHog.capture('$pageview', {
        $current_url: window.location.href
      })
      return
    }

    postHog.opt_out_capturing()
  }, [consent.analytics, pathname, postHog, searchParams])

  return null
}
