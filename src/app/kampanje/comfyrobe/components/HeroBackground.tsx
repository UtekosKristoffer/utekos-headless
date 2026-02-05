import React from 'react'
import Image from 'next/image'

interface HeroBackgroundProps {
  src?: string | undefined
}

export function HeroBackground({ src }: HeroBackgroundProps) {
  if (!src) return null

  return (
    <div className='absolute inset-0 z-0 select-none pointer-events-none'>
      <Image
        src={src}
        alt=''
        fill
        priority
        className='object-cover opacity-30 grayscale hue-rotate-180'
        sizes='100vw'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]' />
    </div>
  )
}
