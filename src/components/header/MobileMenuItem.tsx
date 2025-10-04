'use client'

import Link from 'next/link'
import { normalizeShopifyUrl } from '@/lib/helpers/normalizers/normalizeShopifyUrl'
import type { MenuItem } from '@types'
import type { Route } from 'next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

function SubMenuItem({ item }: { item: MenuItem }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={normalizeShopifyUrl(item.url) as Route}
      className='relative block py-3 px-4 text-foreground/70 transition-colors hover:text-foreground overflow-hidden rounded-lg group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle hover glow */}
      <div
        className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.05) 50%, transparent 100%)'
        }}
      />

      <div className='relative flex items-center gap-2'>
        <ChevronRight
          className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
        />
        <span>{item.title}</span>
      </div>
    </Link>
  )
}

export function MobileMenuItem({ item }: { item: MenuItem }) {
  const hasSubMenu = item.items && item.items.length > 0
  const [isHovered, setIsHovered] = useState(false)

  if (!hasSubMenu) {
    return (
      <Link
        href={normalizeShopifyUrl(item.url) as Route}
        className='relative block py-4 px-4 text-foreground transition-all hover:text-foreground rounded-lg overflow-hidden group'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Aurora glow on hover */}
        <div
          className='absolute -inset-x-2 -inset-y-4 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20'
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
          }}
        />

        <div className='relative flex items-center justify-between'>
          <span className='font-medium'>{item.title}</span>
          <ChevronRight
            className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
          />
        </div>
      </Link>
    )
  }

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value={item.title} className='border-none'>
        <AccordionTrigger className='relative py-4 px-4 text-foreground hover:text-foreground rounded-lg overflow-hidden group hover:no-underline transition-all'>
          {/* Aurora glow on hover */}
          <div
            className='absolute -inset-x-2 -inset-y-4 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20'
            style={{
              background:
                'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
            }}
          />

          <span className='relative font-medium'>{item.title}</span>
        </AccordionTrigger>

        <AccordionContent className='pb-2'>
          <div className='pl-2 space-y-1 border-l-2 border-neutral-800 ml-4'>
            {item.items!.map(subItem => (
              <SubMenuItem key={subItem.title} item={subItem} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
