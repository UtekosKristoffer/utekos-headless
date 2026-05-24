import { Truck, Smile, ShieldCheck } from 'lucide-react'
import { SocialProofCard } from './SocialProofCard'
import { PaymentIcons } from './PaymentIcons'

export function SocialProof() {
  return (
    <section
      className='mx-auto mt-6 max-w-5xl sm:mt-10'
      aria-label='Fordeler med å handle hos oss'
    >
      <div className='grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5'>
        <SocialProofCard
          title='Rask levering'
          Icon={Truck}
          cardClass='border-maritime-blue/12 bg-ancient-water text-maritime-blue transition-colors hover:bg-[var(--country-air)]'
          titleClass='text-maritime-blue'
          shineClass='via-cloud-dancer/40'
          hoverBorderClass='hover:border-maritime-blue/30'
          iconWrapperClass='bg-cloud-dancer/65 shadow-[0_0_18px_color-mix(in_oklch,var(--maritime-blue)_15%,transparent)]'
          iconColorClass='text-maritime-blue'
        >
          <p className='mt-1 text-sm font-medium leading-[1.45] tracking-[-0.01em] text-maritime-blue/78'>
            2-5 dager
          </p>
        </SocialProofCard>

        <SocialProofCard
          title='3000+'
          Icon={Smile}
          cardClass='border-demitasse/20 bg-overcast text-maritime-darkest transition-colors hover:bg-cloud-dancer'
          titleClass='text-maritime-darkest'
          shineClass='via-cloud-dancer/40'
          hoverBorderClass='hover:border-maritime-darkest/70'
          iconWrapperClass='bg-cloud-dancer/60 shadow-[0_0_18px_color-mix(in_oklch,var(--demitasse)_15%,transparent)]'
          iconColorClass='text-demitasse'
        >
          <p className='mt-1 text-sm font-medium leading-[1.45] tracking-tight text-maritime-darkest'>
            Fornøyde kunder
          </p>
        </SocialProofCard>

        <SocialProofCard
          title='Trygg handel'
          Icon={ShieldCheck}
          cardClass='border-cloud-dancer/14 bg-mountain-view text-cloud-dancer transition-colors hover:bg-deep-forest'
          titleClass='text-cloud-dancer'
          hoverBorderClass='hover:border-cloud-dancer/30'
          iconWrapperClass='bg-cloud-dancer/10 shadow-[0_0_18px_color-mix(in_oklch,var(--cloud-dancer)_15%,transparent)]'
          iconColorClass='text-cloud-dancer'
        >
          <PaymentIcons />
        </SocialProofCard>
      </div>
    </section>
  )
}
