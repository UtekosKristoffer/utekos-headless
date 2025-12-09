import { CopyrightNotice } from '@/components/footer/CopyrightNotice'
import { FooterNavigation } from '@/components/footer/FooterNavigation'
import { PaymentMethods } from '@/components/footer/PaymentMethods'
import { ConditionalNewsLetter } from '@/components/footer/ConditionalNewsletter'
import { Activity } from 'react'
import { FooterLogo } from '@/components/footer/FooterLogo' // Importer den nye komponenten

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
