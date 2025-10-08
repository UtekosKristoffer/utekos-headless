'use client'
import { ChevronDown } from 'lucide-react'

export function ChevronDownSection() {
  return (
    <button
      onClick={() => {
        const section = document.getElementById('featured-product')
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      className='group cursor-pointer'
      aria-label='Scroll til produkter'
    >
      <div className='flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground'>
        <span className='text-xs uppercase tracking-wider'>Se mer</span>
        <ChevronDown className='animate-bounce-slow h-5 w-5' />
      </div>
    </button>
  )
}
