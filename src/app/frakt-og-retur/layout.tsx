import { ShippingAndReturnsPageJsonLd } from './ShippingAndReturnsPageJsonLd'
import type { ReactNode } from 'react'

export default function ShippingAndReturnsLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <ShippingAndReturnsPageJsonLd />
      {children}
    </>
  )
}
