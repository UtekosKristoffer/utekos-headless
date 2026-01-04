'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Route } from 'next'
export function ChevronDownSection() {
  return (
    <Link
      href={'/skreddersy-varmen' as Route}
      className='group cursor-pointer inline-block py-4'
      aria-label='Gå til skreddersy varmen'
    >
      <div className='flex items-center justify-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground'>
        <span className='text-xs uppercase tracking-wider font-medium'>
          Les mer
        </span>
        <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
      </div>
    </Link>
  )
}
