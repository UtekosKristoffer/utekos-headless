'use client'

import { Truck, Smile, ShieldCheck } from 'lucide-react'
import { SocialProofCard } from './SocialProofCard'
import { useSocialProofAnimations } from '@/hooks/useSocialProofAnimations'
import { PaymentIcons } from './PaymentIcons'

export function SocialProof() {
  const containerRef = useSocialProofAnimations()

  return (
    <div ref={containerRef} className='mx-auto max-w-4xl px-4 md:px-0'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6'>
        <SocialProofCard
          title='Rask levering'
          Icon={Truck}
          hoverBorderClass='hover:border-sky-500/20'
          iconWrapperClass='bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.15)]'
          iconColorClass='text-sky-400'
        >
          <p className='mt-1 text-sm font-medium text-sky-200/60'>2-5 dager</p>
        </SocialProofCard>

        <SocialProofCard
          title='2000+'
          Icon={Smile}
          hoverBorderClass='hover:border-emerald-500/20'
          iconWrapperClass='bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
          iconColorClass='text-emerald-400'
        >
          <p className='mt-1 text-sm font-medium text-emerald-200/60'>
            Fornøyde kunder
          </p>
        </SocialProofCard>
        <SocialProofCard
          title='Trygg handel'
          Icon={ShieldCheck}
          hoverBorderClass='hover:border-violet-500/20'
          iconWrapperClass='bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
          iconColorClass='text-violet-400'
        >
          <PaymentIcons />
        </SocialProofCard>
      </div>
    </div>
  )
}
