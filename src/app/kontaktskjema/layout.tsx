import { ContactPageJsonLd } from './components/ContactPageJsonLd'
import type { ReactNode } from 'react'

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ContactPageJsonLd />

      {children}
    </>
  )
}
