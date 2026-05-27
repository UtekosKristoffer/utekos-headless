// src/app/magasinet/components/MagazineNewsletterSection.tsx

import { MagazineNewsletterSignup } from '@/components/form/components/MagazineNewsletterSignUp'

export function MagazineNewsletterSection() {
  return (
    <section className='border-t border-cloud-dancer/60 bg-maritime-darkest px-4 py-16 text-cloud-dancer sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <MagazineNewsletterSignup />
      </div>
    </section>
  )
}
