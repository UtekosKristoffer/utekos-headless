// src/app/magasinet/components/MagazineNewsletterSection.tsx

import { MagazineNewsletterSignup } from '@/components/form/components/MagazineNewsletterSignUp'

export function MagazineNewsletterSection() {
  return (
    <section className=' bg-background px-4 pb-16 text-cloud-dancer sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl pt-16'>
        <MagazineNewsletterSignup />
      </div>
    </section>
  )
}
