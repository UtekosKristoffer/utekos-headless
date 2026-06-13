import { cacheLife, cacheTag } from 'next/cache'
import { VIDEO_URL, VIDEO_POSTER_URL } from '@/api/constants'
import { ProductVideoPlayer } from './ProductVideoPlayer'

type TensorPixVideoCacheWrapperProps = {
  variant?: 'section' | 'embed'
}

export async function TensorPixVideoCacheWrapper({ variant = 'section' }: TensorPixVideoCacheWrapperProps) {
  'use cache'

  cacheTag('tensorpix-video', 'media')
  cacheLife('marketing')

  if (variant === 'embed') {
    return (
      <video controls playsInline preload='none' poster={VIDEO_POSTER_URL}>
        <source src={VIDEO_URL} type='video/mp4' />
      </video>
    )
  }

  return <ProductVideoPlayer src={VIDEO_URL} poster={VIDEO_POSTER_URL} />
}
