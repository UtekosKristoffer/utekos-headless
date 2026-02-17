'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function AmbientBackgroundGlow() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Organisk bevegelse for den blå/cyan gløden
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
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={container}
      className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'
    >
      <div
        className='ambient-blob-1 absolute left-0 top-0 h-[800px] w-[800px] opacity-[0.08] blur-[120px]'
        style={{
          background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
        }}
      />
      <div
        className='ambient-blob-2 absolute right-0 bottom-0 h-[800px] w-[800px] opacity-[0.08] blur-[120px]'
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
        }}
      />
    </div>
  )
}
