import { TechJsonLd } from './TechJsonLd'
import type { ReactNode } from 'react'

export default function TechMaterialsLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <TechJsonLd />
      {children}
    </>
  )
}
