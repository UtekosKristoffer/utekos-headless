import { HyttelivJsonLd } from './HyttelivJsonLd'
import type { ReactNode } from 'react'

export default function HyttelivLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HyttelivJsonLd />
      {children}
    </>
  )
}
