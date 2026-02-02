'use client'

import { ChevronDown } from 'lucide-react'

export function ScrollToButton() {
  const scrollToModel = () => {
    const element = document.getElementById('section-solution')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToModel}
      className='group relative bg-[#E07A5F] hover:bg-[#D06A4F] text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide transition-all active:scale-95 shadow-2xl w-auto flex items-center gap-3'
    >
      Finn din favoritt
      <ChevronDown className='w-5 h-5 group-hover:translate-y-1 transition-transform' />
    </button>
  )
}
