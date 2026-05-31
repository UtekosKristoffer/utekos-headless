'use client'

import Script from 'next/script'

const KLARNA_ON_SITE_MESSAGING_SCRIPT_ID = 'klarna-on-site-messaging-websdk'

const KLARNA_ON_SITE_MESSAGING_SCRIPT_URL = 'https://js.klarna.com/web-sdk/v1/klarna.js'

const KLARNA_CLIENT_ID = process.env.NEXT_PUBLIC_KLARNA_CLIENT_ID

const KLARNA_ENVIRONMENT = process.env.NEXT_PUBLIC_KLARNA_ENVIRONMENT ?? 'production'

export function KlarnaOnSiteMessagingScript() {
  if (!KLARNA_CLIENT_ID) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Missing NEXT_PUBLIC_KLARNA_CLIENT_ID. Klarna On-site Messaging will not load.')
    }

    return null
  }

  return (
    <Script
      id={KLARNA_ON_SITE_MESSAGING_SCRIPT_ID}
      src={KLARNA_ON_SITE_MESSAGING_SCRIPT_URL}
      strategy='afterInteractive'
      data-locale='no-NO'
      data-client-id={KLARNA_CLIENT_ID}
      data-environment={KLARNA_ENVIRONMENT}
      onError={(error: Error) => {
        console.error('Klarna On-site Messaging WebSDK failed to load', error)
      }}
    />
  )
}
