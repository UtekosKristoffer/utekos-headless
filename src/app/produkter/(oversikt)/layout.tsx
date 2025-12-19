import { ProductListJsonLd } from '../ProductListJsonLd'
import type { ReactNode } from 'react'
import { KlaviyoObject } from '@/components/analytics/Klaviyo/ActiveOnSite'
export default function ProductListLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <ProductListJsonLd />

      {children}
      <KlaviyoObject />
    </>
  )
}
