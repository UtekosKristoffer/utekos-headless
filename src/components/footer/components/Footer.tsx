import { CopyrightNotice } from '@/components/footer/components/CopyrightNotice'
import { FooterNavigation } from '@/components/footer/components/FooterNavigation'
import { PaymentMethods } from '@/components/footer/components/PaymentMethods'
import { ConditionalNewsLetter } from '@/components/footer/components/ConditionalNewsletter'
import { Activity } from 'react'
import { FooterLogo } from '@/components/footer/components/FooterLogo' // Importer den nye komponenten

export default function Footer() {
  return (
    <footer className='mt-auto border-t border-white/10 bg-sidebar-foreground py-12'>
      <div className='container mx-auto px-4 sm:px-8'>
        <Activity>
          <FooterNavigation />
        </Activity>
        <Activity>
          <ConditionalNewsLetter />
        </Activity>
        <Activity>
          <PaymentMethods />
        </Activity>
        <Activity>
          <CopyrightNotice />
        </Activity>
      </div>
    </footer>
  )
}
