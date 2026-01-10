import { VIDEO_THUMBNAIL_URL, VIDEO_URL } from '@/app/FrontPageJsonLd'

export default function TensorPixVideoPage() {
  return (
    <main>
      <video controls playsInline preload='none' poster={VIDEO_THUMBNAIL_URL}>
        <source src={VIDEO_URL} type='video/mp4' />
      </video>
    </main>
  )
}
