// Path: src/app/produkter/(oversikt)/components/ProductVideoPlayer.tsx

'use client'

import { useEffect, useRef, useState } from 'react'

type ProductVideoPlayerProps = {
  src: string
  poster: string
  captionsSrc?: string
  captionsLabel?: string
}

export function ProductVideoPlayer({ src, poster }: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [playbackFailed, setPlaybackFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const observer = new IntersectionObserver(
      entries => {
        const isVisible = entries.some(entry => entry.isIntersecting)

        if (isVisible) {
          setShouldLoadVideo(true)
          return
        }

        video.pause()
      },
      {
        threshold: 0.35
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoadVideo) return

    video.load()

    const playPromise = video.play()

    if (playPromise) {
      playPromise.catch(() => {
        setPlaybackFailed(true)
      })
    }
  }, [shouldLoadVideo])

  return (
    <div className='relative'>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster={poster}
        preload='none'
        className='block size-full object-cover'
        aria-label='Produktvideo som viser Utekos i bruk'
      >
        {shouldLoadVideo && <source src={src} type='video/mp4' />}
      </video>

      {playbackFailed && (
        <div className='pointer-events-none absolute inset-x-4 bottom-4 rounded-md bg-background/80 px-3 py-2 text-center text-xs font-medium text-foreground backdrop-blur-sm'>
          Videoen er pauset av nettleseren. Trykk på videoen for å spille av.
        </div>
      )}
    </div>
  )
}
