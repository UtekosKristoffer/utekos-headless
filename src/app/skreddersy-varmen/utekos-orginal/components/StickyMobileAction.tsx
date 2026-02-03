'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils/className'
import { ArrowDown } from 'lucide-react'
import TechDownThumb from '@public/fiberdun/techdawn-front.png'

export function StickyMobileAction() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 800
      const purchaseSection = document.getElementById('purchase-section')
      if (purchaseSection) {
        const rect = purchaseSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(false)
          return
        }
      }

      setIsVisible(show)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToPurchase = () => {
    const element = document.getElementById('purchase-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 right-4 z-50 transition-all duration-500 transform lg:hidden',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'
      )}
    >
      <div className='bg-[#2C2420] text-[#F4F1EA] rounded-full shadow-2xl p-2 pr-6 flex items-center justify-between border border-[#E07A5F]/30 backdrop-blur-md bg-opacity-95'>
        <div className='flex items-center gap-3'>
          <div className='relative w-12 h-12 bg-white/10 rounded-full overflow-hidden border border-white/10'>
            <Image
              src={TechDownThumb}
              alt='Utekos TechDown'
              fill
              className='object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold uppercase tracking-wider text-[#E07A5F]'>
              Utekos TechDown™
            </span>
            <span className='text-sm font-medium opacity-90'> Fra 190,-</span>
          </div>
        </div>

        <button
          onClick={scrollToPurchase}
          className='bg-[#E07A5F] hover:bg-[#d0694e] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors flex items-center gap-2 shadow-lg'
        >
          Til bestilling
          <ArrowDown size={16} />
        </button>
      </div>
    </div>
  )
}
