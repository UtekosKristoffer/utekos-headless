import { Truck, Smile, ShieldCheck } from 'lucide-react'
import { SocialProofCard } from './SocialProofCard'
import { PaymentIcons } from './PaymentIcons'

export function SocialProof() {
  return (
    <details className='mx-auto mt-6 max-w-5xl sm:mt-10' aria-label='Fordeler med å handle hos oss'>
      <summary className='grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5'>
        <SocialProofCard
          title='Rask levering'
          Icon={Truck}
          cardClass='border-havdyp/12 bg-ancient-water text-havdyp transition-colors hover:bg-[var(--country-air)]'
          titleClass='text-havdyp'
          shineClass='via-cloud-dancer/40'
          hoverBorderClass='hover:border-havdyp/30'
          iconWrapperClass='bg-cloud-dancer/65 shadow-[0_0_18px_color-mix(in_oklch,var(--havdyp)_15%,transparent)]'
          iconColorClass='text-havdyp'
        >
          <p className='mt-1 text-sm font-medium leading-[1.45] tracking-[-0.01em] text-havdyp/78'>
            2-5 dager
          </p>
        </SocialProofCard>

        <SocialProofCard
          title='3000+'
          Icon={Smile}
          cardClass='border-demitasse/20 bg-overcast text-background transition-colors hover:bg-cloud-dancer'
          titleClass='text-background'
          shineClass='via-cloud-dancer/40'
          hoverBorderClass='hover:border-background/70'
          iconWrapperClass='bg-cloud-dancer/60 shadow-[0_0_18px_color-mix(in_oklch,var(--demitasse)_15%,transparent)]'
          iconColorClass='text-demitasse'
        >
          <p className='mt-1 text-sm font-medium leading-[1.45]   text-background'>Fornøyde kunder</p>
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
      </summary>
    </details>
  )
}
