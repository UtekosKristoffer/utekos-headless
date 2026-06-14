// Path: src/components/ProductCard/SizeLabel.tsx
'use client'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ExternalLink, Ruler } from 'lucide-react'
import type { SizeLabelProps } from '@types'

export function SizeLabel({ className = '' }: SizeLabelProps) {
  return (
    <HoverCard>
      <HoverCardTrigger
        href='/handlehjelp/storrelsesguide'
        target='_blank'
        rel='noopener noreferrer'
        className={`inline-flex items-center gap-1 text-sm text-foreground uppercase tracking-wide font-utekos-text-medium hover:transition-colors ${className}`}
      >
        STØRRELSE
        <ExternalLink className='size-3 font-utekos-text-medium text-button' />
      </HoverCardTrigger>
      <HoverCardContent className='w-60 bg-foreground border border-background' side='top' align='start'>
        <div className='flex items-start space-x-3'>
          <Ruler className='size-7 text-background mt-1' />
          <div className='space-y-1'>
            <h4 className='text-sm text-background font-semibold'>Usikker på størrelsen?</h4>
            <p className='text-sm text-background'>Klikk for å åpne vår størrelsesguide i en ny fane.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
