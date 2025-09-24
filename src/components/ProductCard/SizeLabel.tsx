// Path: src/components/ProductCard/SizeLabel.tsx
'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { ExternalLink, Ruler } from 'lucide-react'
import Link from 'next/link'

interface SizeLabelProps {
  className?: string
}

export function SizeLabel({ className = '' }: SizeLabelProps) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href='/handlehjelp/storrelsesguide'
          target='_blank'
          rel='noopener noreferrer'
          className={`inline-flex items-center gap-1 text-sm uppercase tracking-wide font-medium text-white hover:text-button transition-colors ${className}`}
        >
          STØRRELSE
          <ExternalLink className='h-3 w-3 text-button' />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className='w-60 bg-sidebar-foreground border border-neutral-800'
        side='top'
        align='start'
      >
        <div className='flex items-start space-x-3'>
          <Ruler className='size-7 text-white mt-1' />
          <div className='space-y-1'>
            <h4 className='text-sm text-white font-semibold'>
              Usikker på størrelsen?
            </h4>
            <p className='text-sm text-muted-foreground'>
              Klikk for å åpne vår størrelsesguide i en ny fane.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
