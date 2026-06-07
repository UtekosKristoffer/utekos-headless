// Path: src/components/ProductCard/ProductCardSoldOut.tsx
'use client'

import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import UtekosLogo from '@public/icon.png'
import Image from 'next/image'

export function ProductCardSoldOut() {
  return (
    <HoverCard>
      <HoverCardTrigger delay={200} closeDelay={100} className='size-full min-h-12 cursor-not-allowed'>
        <BrandBadge
          backgroundColor='var(--overcast)'
          textColor='var(--havdyp)'
          className='size-full min-h-12 cursor-not-allowed border border-cloud-dancer/10 text-base font-medium opacity-90'
        >
          Utsolgt
        </BrandBadge>
      </HoverCardTrigger>
      <HoverCardContent
        className='w-64 border border-chocolate-plum/20 bg-cloud-dancer text-havdyp shadow-xl'
        side='top'
        align='center'
      >
        <div className='flex items-start space-x-3'>
          <Image
            src={UtekosLogo}
            alt='Utekos logo'
            width={20}
            height={20}
            className='mt-1 rounded-full border border-chocolate-plum/20'
          />
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold text-havdyp'>Utsolgt for denne kombinasjonen</h4>
            <p className='text-sm text-havdyp/75'>Prøv en annen farge eller størrelse.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
