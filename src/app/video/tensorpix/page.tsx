import { VIDEO_POSTER_URL, VIDEO_URL } from '@/api/constants'

export default function TensorPixVideoPage() {
  return (
    <main>
      <video controls playsInline preload='none' poster={VIDEO_POSTER_URL}>
        <source src={VIDEO_URL} type='video/mp4' />
      </video>
    </main>
  )
}
