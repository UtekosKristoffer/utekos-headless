'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Route } from 'next'

export function ChevronDownSection() {
  return (
    <Link
      href={'/skreddersy-varmen' as Route}
      className='gsap-cta group relative inline-flex items-center justify-center py-4'
      aria-label='Gå til skreddersy varmen'
    >
      <div className='flex items-center gap-3 text-white/60 transition-colors duration-300 group-hover:text-white'>
        <span className='gsap-cta-text text-xs font-medium uppercase tracking-[0.2em]'>
          Les mer
        </span>
        <ArrowRight className='gsap-cta-icon h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1' />
      </div>

      {/* Animert understrek (Luxury feel) */}
      <span className='absolute bottom-3 left-0 h-[1px] w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100' />
    </Link>
  )
}
