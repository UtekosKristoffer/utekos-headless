// Path: src/components/frontpage/PreFooterNavigation.tsx
'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import { NavLinks } from './NavLinks'

export function PreFooterNavigation() {
  return (
    <section className='bg-[#1F2421] text-[#F4F1EA] py-16 md:py-24 border-t border-white/5'>
      <div className='max-w-5xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-serif mb-4'>
            Utforsk mer av Utekos
          </h2>
          <div className='h-1 w-20 bg-[#E07A5F] mx-auto rounded-full' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {NavLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group flex items-center justify-between p-6',
                'bg-[#2C2420]/50 border border-white/5 rounded-sm',
                'hover:bg-[#2C2420] hover:border-[#E07A5F]/50 transition-all duration-300',
                index === 0 ?
                  'md:col-span-2 lg:col-span-1 bg-[#2C2420] border-white/10'
                : ''
              )}
            >
              <div className='flex items-center gap-4'>
                <div
                  className={cn(
                    'p-3 rounded-full bg-white/5 text-[#E07A5F] group-hover:bg-[#E07A5F] group-hover:text-white transition-colors duration-300',
                    index === 0 ? 'bg-[#E07A5F]/10' : ''
                  )}
                >
                  {link.icon}
                </div>

                <div className='flex flex-col'>
                  <span className='text-xs text-[#F4F1EA]/50 uppercase tracking-widest font-medium mb-0.5 group-hover:text-[#E07A5F] transition-colors'>
                    {link.description}
                  </span>
                  <span className='text-lg font-serif font-medium text-[#F4F1EA] group-hover:translate-x-1 transition-transform'>
                    {link.label}
                  </span>
                </div>
              </div>
              <ArrowRight className='w-5 h-5 text-[#F4F1EA]/20 group-hover:text-[#E07A5F] group-hover:translate-x-2 transition-all duration-300' />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
