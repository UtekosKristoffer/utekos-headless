'use client'

type ProductVideoPlayerProps = {
  src: string
  poster: string
}

export function ProductVideoPlayer({ src, poster }: ProductVideoPlayerProps) {
  return (
    <video autoPlay muted loop playsInline poster={poster} preload='metadata'>
      <source src={src} type='video/mp4' />
    </video>
  )
}
