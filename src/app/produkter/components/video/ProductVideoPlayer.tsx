import Script from 'next/script'

type ProductVideoPlayerProps = {
  src: string
  poster: string
}

export function ProductVideoPlayer({ src, poster }: ProductVideoPlayerProps) {
  return (
    <>
      <video
        data-utekos-video
        data-src={src}
        muted
        loop
        playsInline
        poster={poster}
        preload='none'
      />
      <Script id='utekos-product-video-player' strategy='afterInteractive'>{`
(() => {
  const prefersReducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const allowAutoplay = () => {
    if (prefersReducedMotion()) return false
    const nav = navigator
    const c = nav && 'connection' in nav ? nav.connection : undefined
    if (c && c.saveData === true) return false
    if (c && (c.effectiveType === '2g' || c.effectiveType === 'slow-2g')) return false
    return true
  }

  const ensureSource = (v) => {
    if (v.dataset.utekosInit === '1') return
    v.dataset.utekosInit = '1'
    const src = v.getAttribute('data-src')
    if (!src) return
    const s = document.createElement('source')
    s.src = src
    s.type = 'video/mp4'
    v.appendChild(s)
    v.load()
  }

  const tryPlay = (v) => {
    if (!allowAutoplay()) return
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }

  const init = (v) => {
    if (!('IntersectionObserver' in window)) {
      ensureSource(v)
      tryPlay(v)
      return
    }
    const io = new IntersectionObserver((entries) => {
      const e = entries[0]
      if (e && e.isIntersecting) {
        io.disconnect()
        ensureSource(v)
        tryPlay(v)
      }
    }, { rootMargin: '200px 0px' })
    io.observe(v)
  }

  const videos = document.querySelectorAll('video[data-utekos-video]')
  for (let i = 0; i < videos.length; i += 1) init(videos[i])
})()
      `}</Script>
    </>
  )
}
