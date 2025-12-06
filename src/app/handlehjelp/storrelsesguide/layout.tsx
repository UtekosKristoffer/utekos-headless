import { SizeGuideJsonLd } from './SizeGuideJsonLd'
import type { ReactNode } from 'react'

export default function SizeGuideLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SizeGuideJsonLd />
      {children}
    </>
  )
}
