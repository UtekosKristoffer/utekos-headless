import { ContactPageJsonLd } from './ContactPageJsonLd'
import type { ReactNode } from 'react'
import { KlaviyoObject } from '@/components/analytics/Klaviyo/ActiveOnSite'

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ContactPageJsonLd />

      {children}

      <KlaviyoObject />
    </>
  )
}
