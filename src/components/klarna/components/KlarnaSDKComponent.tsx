// Path: src/components/klarna/components/KlarnaSDKComponent.tsx

/* TODO: Add type.
 See @/components/klarna/types/index.ts and
 "global.d.ts".
*/

'use client'

import Script from 'next/script'

export function KlarnaSDKComponent() {
  return (
    <Script
      id='klarna-sdk'
      src='https://cdn.klarna.com/1.0/sdk.js'
      strategy='afterInteractive'
      onError={(error: Error) => {
        console.error('Klarna SDK script failed to load', error)
      }}
    />
  )
}
