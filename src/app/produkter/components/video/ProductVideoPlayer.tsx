'use client'

import { useRef, useLayoutEffect } from 'react'

interface ProductVideoPlayerProps {
  src: string
  poster: string
}

export function ProductVideoPlayer({ src, poster }: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useLayoutEffect(() => {
    const video = videoRef.current
    return () => {
      if (video) {
        video.pause()
      }
    }
  }, [])

  return (
    <div className='overflow-hidden rounded-[1.25rem]'>
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        loop
        muted
        autoPlay
        playsInline
        preload='metadata'
        poster={poster}
      >
        <source src={src} type='video/mp4' />
        Nettleseren din støtter ikke video-elementet.
      </video>
    </div>
  )
}
