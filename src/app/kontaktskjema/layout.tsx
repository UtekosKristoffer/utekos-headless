import { ContactPageJsonLd } from './ContactPageJsonLd'
import type { ReactNode } from 'react'

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ContactPageJsonLd />

      {children}
    </>
  )
}
