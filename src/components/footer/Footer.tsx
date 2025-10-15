import { CopyrightNotice } from '@/components/footer/CopyrightNotice'
import { FooterNavigation } from '@/components/footer/FooterNavigation'
import { PaymentMethods } from '@/components/footer/PaymentMethods'
import { ConditionalNewsLetter } from '@/components/footer/ConditionalNewsletter'

export default function Footer() {
  return (
    <footer className='mt-auto border-t border-white/10 bg-sidebar-foreground py-12'>
      <div className='container mx-auto px-4 sm:px-8'>
        <FooterNavigation />
        <ConditionalNewsLetter />

        <PaymentMethods />
        <CopyrightNotice />
      </div>
    </footer>
  )
}
