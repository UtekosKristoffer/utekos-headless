// Path: src/components/header/MobileMenu/MobileMenuPanel.tsx

'use client'

import { MobileMenuItem } from '@/components/header/MobileMenu/MobileMenuItem'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import type { MenuItem } from '@types'
import { HeaderLogo } from '../HeaderLogo'
import { Accordion } from '@/components/ui/accordion'
import { useLayoutEffect, useRef } from 'react'

function nextFrame() {
  return new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
}

export function MobileMenuPanel({
  menu = [],
  isOpen,
  onOpenChange
}: {
  menu?: MenuItem[]
  isOpen: boolean
  onOpenChange: (_open: boolean) => void
}) {
  const subtitleRef = useRef<HTMLSpanElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<{ kill: () => void } | null>(null)
  const runIdRef = useRef(0)

  useLayoutEffect(() => {
    runIdRef.current += 1
    const runId = runIdRef.current

    if (!isOpen) {
      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
      }

      return
    }

    const run = async () => {
      await nextFrame()
      if (runId !== runIdRef.current) return

      const subtitle = subtitleRef.current
      const list = listRef.current
      if (!subtitle || !list) return

      const items = Array.from(list.querySelectorAll<HTMLElement>('[data-mm-item="true"]'))

      if (!items.length) return

      if (tlRef.current) tlRef.current.kill()

      let gsap: (typeof import('gsap'))['default']

      try {
        const gsapModule = await import('gsap')
        gsap = gsapModule.default
      } catch {
        subtitle.style.opacity = '1'
        items.forEach(item => {
          item.style.opacity = '1'
        })

        return
      }

      if (runId !== runIdRef.current) return

      gsap.set(subtitle, { opacity: 0, y: 10, filter: 'blur(6px)' })
      gsap.set(items, { opacity: 0, x: -18, filter: 'blur(8px)' })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        delay: 0.08
      }).to(
        items,
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.055
        },
        '-=0.32'
      )

      tlRef.current = tl
    }

    void run()

    return () => {
      runIdRef.current += 1
      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
      }
    }
  }, [isOpen, menu.length])

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger className='hidden'>Åpne mobilmeny</SheetTrigger>

      <SheetContent
        side='left'
        className='w-full max-w-sm border-cloud-dancer/12 bg-background p-0 text-foreground backdrop-blur-xl lg:hidden'
      >
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--havdyp)_36%,var(--background))_0%,var(--background)_54%,color-mix(in_oklab,var(--demitasse)_22%,var(--background))_100%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(105%_78%_at_20%_0%,color-mix(in_oklab,var(--dusted-peri)_18%,transparent)_0%,transparent_64%),radial-gradient(95%_72%_at_88%_34%,color-mix(in_oklab,var(--ancient-water)_12%,transparent)_0%,transparent_66%)]' />
          <div className='absolute inset-0 bg-linear-to-b from-transparent via-background/8 to-background/48' />
        </div>

        <SheetHeader className='relative border-b border-cloud-dancer/10 p-6'>
          <div className='absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-cloud-dancer/24 to-transparent' />

          <div className='mb-2 flex items-center gap-2'>
            <HeaderLogo />
            <SheetTitle className='ml-2 text-xl leading-[0.95] font-bold tracking-[-0.01em] text-foreground'>
              Meny
            </SheetTitle>
          </div>

          <SheetDescription className='text-sm leading-text-paragraph tracking-[-0.01em] text-foreground/66'>
            <span className='block overflow-hidden'>
              <span ref={subtitleRef} className={isOpen ? 'block opacity-0' : 'block'}>
                Utforsk vår kolleksjon
              </span>
            </span>
          </SheetDescription>
        </SheetHeader>

        <nav className='relative grow overflow-y-auto px-4 pb-6 pt-4'>
          <div ref={listRef}>
            <Accordion className='flex flex-col gap-2'>
              {menu.map(item => (
                <div key={item.title} data-mm-item='true' className={isOpen ? 'opacity-0' : undefined}>
                  <MobileMenuItem item={item} />
                </div>
              ))}
            </Accordion>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
