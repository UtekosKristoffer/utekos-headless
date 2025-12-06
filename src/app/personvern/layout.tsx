import { PrivacyPolicyJsonLd } from './PrivacyPolicyJsonLd'
import type { ReactNode } from 'react'

export default function PrivacyPolicyLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <PrivacyPolicyJsonLd />

      {children}
    </>
  )
}
