'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ChevronDownSection() {
  return (
    <Link
      href='/skreddersy-varmen'
      className='group cursor-pointer inline-block py-4'
      aria-label='Gå til skreddersy varmen'
    >
      {/* Endret fra flex-col til flex-row (default) for å ha pilen ved siden av teksten */}
      <div className='flex items-center justify-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground'>
        <span className='text-xs uppercase tracking-wider font-medium'>
          Les mer
        </span>
        {/* Byttet til ArrowRight og endret animasjon fra bounce til en horisontal nudge */}
        <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
      </div>
    </Link>
  )
}
