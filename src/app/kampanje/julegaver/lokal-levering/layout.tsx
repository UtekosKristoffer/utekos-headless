//Path: src/app/kampanje/julegaver/lokal-levering/layout.tsx
import { BergenDeliveryJsonLd } from './BergenDeliveryJsonLd'
import type { ReactNode } from 'react'
export default function ChristmasCampaignLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <BergenDeliveryJsonLd />

      {children}
    </>
  )
}
