// Path: src/components/ProductCard/ProductCardSoldOut.tsx
'use client'

import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import UtekosLogo from '@public/icon.png'
import Image from 'next/image'

export function ProductCardSoldOut() {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <span className='flex-1 cursor-not-allowed'>
          <Button
            variant='default'
            size='sm'
            disabled={true}
            className='w-full bg-muted text-muted-foreground pointer-events-none'
          >
            Utsolgt
          </Button>
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        className='w-60 bg-sidebar-foreground border border-border'
        side='top'
        align='center'
      >
        <div className='flex items-start space-x-3'>
          <Image
            src={UtekosLogo}
            alt='Utekos logo'
            width={20}
            height={20}
            className='mt-1 border border-neutral-800 rounded-full'
          />
          <div className='space-y-1'>
            <h4 className='text-sm text-muted-foreground font-semibold'>
              Utsolgt for denne kombinasjonen
            </h4>
            <p className='text-sm text-button'>
              Prøv en annen farge eller størrelse.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
