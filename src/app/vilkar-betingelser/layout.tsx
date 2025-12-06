import { TermsPageJsonLd } from './TermsPageJsonLd'
import type { ReactNode } from 'react'

export default function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TermsPageJsonLd />
      {children}
    </>
  )
}
