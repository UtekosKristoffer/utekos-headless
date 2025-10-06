// Path: src/app/personvern/layout.tsx

import type { ReactNode } from 'react'

type PrivacyPolicyLayoutProps = {
  children: ReactNode
}

export default function PrivacyPolicyLayout({
  children
}: PrivacyPolicyLayoutProps) {
  return <section>{children}</section>
}
