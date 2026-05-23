'use client'

import { useEffect, useRef } from 'react'

type GsapContext = {
  revert: () => void
}

export function AmbientBackgroundGlow() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const containerElement = container.current
    if (!containerElement) return

    let ctx: GsapContext | null = null
    let cancelled = false

    const run = async () => {
      let gsap: (typeof import('gsap'))['default']

      try {
        const gsapModule = await import('gsap')
        gsap = gsapModule.default
      } catch {
        return
      }

      if (cancelled) return

      ctx = gsap.context(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.set('.ambient-blob-1, .ambient-blob-2', {
            x: 0,
            y: 0,
            clearProps: 'transform'
          })

          return
        }

        gsap.to('.ambient-blob-1', {
          x: '30%',
          y: '20%',
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })

        gsap.to('.ambient-blob-2', {
          x: '-20%',
          y: '-30%',
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2
        })
      }, containerElement)
    }

    void run()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <div
      ref={container}
      className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
    >
      <div
        className='ambient-blob-1 absolute left-[-30%] top-[-18%] size-[520px] opacity-[0.08] blur-[96px] sm:size-[680px] sm:blur-[120px] lg:size-[800px]'
        style={{
          background:
            'radial-gradient(circle, var(--ancient-water) 0%, transparent 70%)'
        }}
      />
      <div
        className='ambient-blob-2 absolute right-[-35%] bottom-[-20%] size-[520px] opacity-[0.08] blur-[96px] sm:size-[680px] sm:blur-[120px] lg:size-[800px]'
        style={{
          background:
            'radial-gradient(circle, var(--primary-button) 0%, transparent 70%)'
        }}
      />
    </div>
  )
}
