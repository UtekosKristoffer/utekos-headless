import { ProductListJsonLd } from '../ProductListJsonLd'
import type { ReactNode } from 'react'
export default function ProductListLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <ProductListJsonLd />

      {children}
    </>
  )
}
