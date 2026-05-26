'use client'

import Script from 'next/script'
import { useState } from 'react'

type GoogleTagManagerLoaderProps = {
  fallbackOrigin?: string
  gtmId: string
  scriptOrigin: string
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, '')
}

function buildGoogleTagManagerScriptUrl(origin: string, gtmId: string): string {
  const normalizedOrigin = trimTrailingSlash(origin)
  return `${normalizedOrigin}/gtm.js?id=${encodeURIComponent(gtmId)}`
}

function createGoogleTagManagerConsentScript(): string {
  return `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  `
}

export function GoogleTagManagerLoader({
  fallbackOrigin = 'https://www.googletagmanager.com',
  gtmId,
  scriptOrigin
}: GoogleTagManagerLoaderProps) {
  const primaryOrigin = trimTrailingSlash(scriptOrigin)
  const secondaryOrigin = trimTrailingSlash(fallbackOrigin)
  const [activeOrigin, setActiveOrigin] = useState(primaryOrigin)
  const [hasFallenBack, setHasFallenBack] = useState(false)
  const scriptUrl = buildGoogleTagManagerScriptUrl(activeOrigin, gtmId)

  const handlePrimaryScriptError = () => {
    if (hasFallenBack || activeOrigin === secondaryOrigin) {
      return
    }

    setHasFallenBack(true)
    setActiveOrigin(secondaryOrigin)
  }

  return (
    <>
      <Script id='gtm-consent-default' strategy='afterInteractive'>
        {createGoogleTagManagerConsentScript()}
      </Script>
      <Script
        key={scriptUrl}
        id={hasFallenBack ? 'gtm-loader-fallback' : 'gtm-loader-primary'}
        src={scriptUrl}
        strategy='afterInteractive'
        onError={handlePrimaryScriptError}
      />
    </>
  )
}
