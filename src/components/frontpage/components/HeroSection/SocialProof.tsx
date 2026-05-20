'use client'

import { Truck, Smile, ShieldCheck } from 'lucide-react'
import { SocialProofCard } from './SocialProofCard'
import { useSocialProofAnimations } from '@/hooks/useSocialProofAnimations'
import { PaymentIcons } from './PaymentIcons'

export function SocialProof() {
  const containerRef = useSocialProofAnimations()

  return (
    <section
      ref={containerRef}
      className='mx-auto mt-8 sm:mt-16 max-w-4xl px-4 md:px-0'
      aria-label='Fordeler med å handle hos oss'
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6'>
        <SocialProofCard
          title='Rask levering'
          Icon={Truck}
          cardClass='border-[color-mix(in_oklch,var(--maritime-blue)_10%,transparent)] bg-[var(--ancient-water)] hover:bg-[color-mix(in_oklch,var(--ancient-water)_90%,transparent)] transition-colors'
          titleClass='text-[var(--maritime-blue)]'
          shineClass='via-[color-mix(in_oklch,var(--cloud-dancer)_40%,transparent)]'
          hoverBorderClass='hover:border-[color-mix(in_oklch,var(--maritime-blue)_30%,transparent)]'
          iconWrapperClass='bg-[var(--barely-blue)] shadow-[0_0_18px_color-mix(in_oklch,var(--maritime-blue)_15%,transparent)]'
          iconColorClass='text-[var(--maritime-blue)]'
        >
          <p className='mt-1 text-sm font-medium text-[color-mix(in_oklch,var(--maritime-blue)_80%,transparent)]'>
            2-5 dager
          </p>
        </SocialProofCard>

        <SocialProofCard
          title='3000+'
          Icon={Smile}
          cardClass='border-[color-mix(in_oklch,var(--chocolate-plum)_10%,transparent)] bg-[var(--overcast)] hover:bg-[color-mix(in_oklch,var(--overcast)_90%,transparent)] transition-colors'
          titleClass='text-[var(--chocolate-plum)]'
          shineClass='via-[color-mix(in_oklch,var(--cloud-dancer)_40%,transparent)]'
          hoverBorderClass='hover:border-[color-mix(in_oklch,var(--chocolate-plum)_30%,transparent)]'
          iconWrapperClass='bg-[color-mix(in_oklch,var(--cloud-dancer)_50%,transparent)] shadow-[0_0_18px_color-mix(in_oklch,var(--chocolate-plum)_15%,transparent)]'
          iconColorClass='text-[var(--chocolate-plum)]'
        >
          <p className='mt-1 text-sm font-medium text-[color-mix(in_oklch,var(--chocolate-plum)_80%,transparent)]'>
            Fornøyde kunder
          </p>
        </SocialProofCard>

        <SocialProofCard
          title='Trygg handel'
          Icon={ShieldCheck}
          cardClass='border-[var(--mountain-view)] bg-[var(--mountain-view)] transition-colors'
          titleClass='text-[var(--cloud-dancer)]'
          hoverBorderClass='hover:border-[color-mix(in_oklch,var(--cloud-dancer)_30%,transparent)]'
          iconWrapperClass='bg-[color-mix(in_oklch,var(--cloud-dancer)_10%,transparent)] shadow-[0_0_18px_color-mix(in_oklch,var(--cloud-dancer)_15%,transparent)]'
          iconColorClass='text-[var(--cloud-dancer)]'
        >
          <PaymentIcons />
        </SocialProofCard>
      </div>
    </section>
  )
}
