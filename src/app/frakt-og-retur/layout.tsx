import { ShippingAndReturnsPageJsonLd } from './ShippingAndReturnsPageJsonLd'
import { ShippingReturnsBreadcrumbs } from './components/ShippingReturnsBreadcrumbs'
import type { ReactNode } from 'react'

export default function ShippingAndReturnsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ShippingAndReturnsPageJsonLd />
      <ShippingReturnsBreadcrumbs />

      {children}
    </>
  )
}
