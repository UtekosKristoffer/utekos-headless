//Path: src/app/kampanje/julegaver/lokal-levering/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

import { BergenDeliveryJsonLd } from './BergenDeliveryJsonLd'
import type { ReactNode } from 'react'
import { GoogleAdsConversion } from './GoogleAdsConversion'
import { sendGTMEvent } from '@next/third-parties/google'

export default function BergenDeliveryLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <BergenDeliveryJsonLd />
      <GoogleAnalytics gaId='AW-17819485818' />
      {children}
      <GoogleAdsConversion />
    </>
  )
}
