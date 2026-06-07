// Path: src/app/skreddersy-varmen/utekos-orginal/components/StickyMobileAction.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, X } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { scrollToElement } from '@/lib/gsap/scrollToElement'

const DISMISS_KEY = 'utekos:sticky-mobile-dismissed'

// Oppdatert fokus-ring til Very Peri for et premium preg ved tastaturnavigering
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-very-peri focus-visible:ring-2 focus-visible:ring-cloud-dancer/20'

export function StickyMobileAction() {
  const reduced = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false

    queueMicrotask(() => {
      try {
        if (!cancelled && sessionStorage.getItem(DISMISS_KEY) === '1') {
          setIsDismissed(true)
        }
      } catch {
        // SSR / privacy mode — silently ignore
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const compute = () => {
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
    }

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
  }, [isDismissed])

  const scrollToPurchase = () => {
    void scrollToElement('purchase-section', {
      offsetY: 72,
      reducedMotion: reduced
    })
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
          {/* Glasspanel-baren: Bruker maritime-darkest/95 for å gi en solid kontrast, uansett hvilken farge seksjonen bak har */}
          <div className='flex items-center gap-2 rounded-full border border-cloud-dancer/15 bg-maritime-darkest/95 p-2 text-cloud-dancer shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-md'>
            <button
              type='button'
              onClick={handleDismiss}
              data-track='SkreddersyVarmenStickyClose'
              aria-label='Lukk'
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-full border border-cloud-dancer/10 bg-cloud-dancer/5 text-cloud-dancer/60 transition-colors hover:bg-cloud-dancer/10 hover:text-cloud-dancer sm:size-10',
                focusRing
              )}
            >
              <X size={14} aria-hidden className='sm:hidden' />
              <X size={16} aria-hidden className='hidden sm:block' />
            </button>

            <button
              type='button'
              onClick={scrollToPurchase}
              data-track='SkreddersyVarmenStickyCta'
              className={cn(
                'group flex min-w-0 flex-1 flex-col justify-center rounded-3xl px-1.5 py-1 text-left transition-[opacity,transform] hover:opacity-90 active:scale-[0.99]',
                focusRing
              )}
            >
              <span className='sr-only'>Utekos TechDown™</span>
              <span aria-hidden className='flex min-w-0 items-baseline gap-1.5 leading-none'>
                <UtekosWordmark
                  className='h-[0.58em] w-auto translate-y-[0.04em]'
                  style={{ color: 'var(--color-cloud-dancer)' }}
                />
                <span className='truncate text-[11px] font-semibold tracking-normal text-cloud-dancer sm:text-xs'>
                  TechDown™
                </span>
              </span>
              <span className='mt-0.5 truncate text-[13px] font-medium leading-tight text-cloud-dancer/75 sm:text-sm'>
                Fra 1790,-
              </span>
            </button>

            <BrandBadge
              asChild
              // Hovedknapp for mobil: Iced Apricot! Den "snakker" direkte med den store handlekurv-knappen.
              backgroundColor='var(--color-iced-apricot)'
              textColor='var(--color-maritime-darkest)'
              className={cn(
                'h-11 shrink-0 gap-1.5 px-3.5 py-0 text-xs font-bold tracking-normal shadow-[0_4px_15px_rgba(255,180,120,0.15)] transition-[filter,transform,box-shadow] hover:brightness-105 active:scale-[0.985] sm:px-5 sm:text-sm',
                focusRing
              )}
            >
              <button type='button' onClick={scrollToPurchase} data-track='SkreddersyVarmenTilBestilling'>
                <span className='whitespace-nowrap'>Til bestilling</span>
                <ArrowDown
                  className='size-3.5 shrink-0 transition-transform group-hover:translate-y-0.5'
                  aria-hidden
                />
              </button>
            </BrandBadge>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
