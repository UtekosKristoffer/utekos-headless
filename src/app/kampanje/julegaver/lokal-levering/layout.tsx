//Path: src/app/kampanje/julegaver/lokal-levering/layout.tsx
import { BergenDeliveryJsonLd } from './BergenDeliveryJsonLd'
import type { ReactNode } from 'react'
import { KlaviyoObject } from '@/components/analytics/Klaviyo/ActiveOnSite'
export default function BergenDeliveryLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <BergenDeliveryJsonLd />
      {children}
      <KlaviyoObject />
    </>
  )
}
