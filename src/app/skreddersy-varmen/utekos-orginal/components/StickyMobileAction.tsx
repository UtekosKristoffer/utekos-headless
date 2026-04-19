// Path: src/app/skreddersy-varmen/utekos-orginal/components/StickyMobileAction.tsx
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, X } from 'lucide-react'

const LOGO_URL = '/logo.svg'

const DISMISS_KEY = 'utekos:sticky-mobile-dismissed'

export function StickyMobileAction() {
  const reduced = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') {
        setIsDismissed(true)
      }
    } catch {
      // SSR / privacy mode — silently ignore
    }
  }, [])

  const compute = useCallback(() => {
    if (isDismissed) {
      setIsVisible(false)
      return
    }
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
  }, [isDismissed])

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        compute()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [compute])

  const scrollToPurchase = () => {
    const element = document.getElementById('purchase-section')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Ignore storage failures
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role='region'
          aria-label='Snarvei til bestilling'
          initial={reduced ? { opacity: 0 } : { y: '120%', opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: '120%', opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className='fixed inset-x-3 bottom-3 z-50 lg:hidden'
        >
          <div className='flex items-center gap-1.5 rounded-full border border-[#E07A5F]/30 bg-[#2C2420]/95 p-1.5 text-[#F4F1EA] shadow-2xl backdrop-blur-md sm:gap-2 sm:p-2'>
            <button
              type='button'
              onClick={handleDismiss}
              data-track='SkreddersyVarmenStickyClose'
              aria-label='Lukk'
              className='flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F4F1EA]/70 transition-colors hover:bg-white/10 hover:text-[#F4F1EA] sm:size-10'
            >
              <X size={14} aria-hidden className='sm:hidden' />
              <X size={16} aria-hidden className='hidden sm:block' />
            </button>

            <button
              type='button'
              onClick={scrollToPurchase}
              data-track='SkreddersyVarmenStickyCta'
              className='group flex min-w-0 flex-1 items-center gap-2 rounded-full pl-0.5 pr-1 text-left transition-opacity hover:opacity-90 active:scale-[0.99] sm:gap-3 sm:pl-1 sm:pr-2'
            >
              <div
                aria-hidden
                className='relative size-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white sm:size-10'
              >
                <Image
                  src={LOGO_URL}
                  alt=''
                  fill
                  sizes='40px'
                  className='object-cover'
                />
              </div>
              <div className='flex min-w-0 flex-col leading-tight'>
                <span className='truncate text-[9px] font-bold uppercase tracking-wider text-[#E07A5F] sm:text-[10px] sm:tracking-widest'>
                  Utekos TechDown™
                </span>
                <span className='truncate text-[13px] font-medium text-[#F4F1EA]/90 sm:text-sm'>
                  Fra 1790,-
                </span>
              </div>
            </button>

            <button
              type='button'
              onClick={scrollToPurchase}
              data-track='SkreddersyVarmenTilBestilling'
              className='group inline-flex shrink-0 items-center gap-1 rounded-full bg-[#E07A5F] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-[#D06A4F] [@media(min-width:400px)]:gap-1.5 [@media(min-width:400px)]:px-3.5 [@media(min-width:400px)]:py-2.5 [@media(min-width:400px)]:text-xs [@media(min-width:400px)]:tracking-wider sm:gap-2 sm:px-5 sm:text-sm sm:tracking-normal sm:normal-case sm:font-bold'
            >
              <span className='whitespace-nowrap [@media(min-width:400px)]:hidden'>
                Bestill
              </span>
              <span className='hidden whitespace-nowrap [@media(min-width:400px)]:inline'>
                Til bestilling
              </span>
              <ArrowDown
                size={12}
                className='shrink-0 transition-transform group-hover:translate-y-0.5 sm:size-3.5'
                aria-hidden
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
