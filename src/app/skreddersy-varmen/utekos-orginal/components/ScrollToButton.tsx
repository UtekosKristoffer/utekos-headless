'use client'

import { ChevronDown } from 'lucide-react'
import { scrollToElement } from '@/lib/gsap/scrollToElement'

export function ScrollToButton() {
  const scrollToModel = () => {
    void scrollToElement('section-solution', { offsetY: 80 })
  }

  return (
    <button
      onClick={scrollToModel}
      data-track='HeroSectionScrollToModelClick'
      className='group relative bg-[#E07A5F] hover:bg-[#D06A4F] text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide transition-all active:scale-95 shadow-2xl w-auto flex items-center gap-3'
    >
      Finn din favoritt
      <ChevronDown className='w-5 h-5 group-hover:translate-y-1 transition-transform' />
    </button>
  )
}
