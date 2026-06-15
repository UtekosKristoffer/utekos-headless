'use client'

import dynamic from 'next/dynamic'

export const LazyComfyrobeImageCarousel = dynamic(
  () => import('./ComfyrobeImageCarousel').then(module => module.ComfyrobeImageCarousel),
  {
    ssr: false,
    loading: () => (
      <div
        className='mx-auto aspect-square size-full rounded-[1.35rem] bg-background/45'
        aria-hidden='true'
      />
    )
  }
)
