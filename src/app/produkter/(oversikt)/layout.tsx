import { ProductListJsonLd } from './ProductListJsonLd' // Juster stien om nødvendig
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
