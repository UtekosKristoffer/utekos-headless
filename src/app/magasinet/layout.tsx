// Path: src/app/magasinet/layout.tsx

import type { ReactNode } from 'react'
import { MagazineNewsletterSignup } from '@/components/form/components/MagazineNewsletterSignUp' // Importer den nye komponenten

export default function MagazineLayout({ children }: { children: ReactNode }) {
  return (
    <article className='container mx-auto w-full px-4'>
      {children}
      <MagazineNewsletterSignup />
    </article>
  )
}
