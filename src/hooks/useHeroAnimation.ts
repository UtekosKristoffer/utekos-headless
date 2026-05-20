import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = containerRef.current

      if (!root) return

      const badgeContainers = gsap.utils.toArray<HTMLElement>(
        '.gsap-badge-container',
        root
      )
      const badgeBackgrounds = gsap.utils.toArray<HTMLElement>(
        '.gsap-badge-bg',
        root
      )
      const badgeContents = gsap.utils.toArray<HTMLElement>(
        '.gsap-badge-content',
        root
      )
      const heroCharacters = gsap.utils.toArray<HTMLElement>('.gsap-char', root)
      const subtitles = gsap.utils.toArray<HTMLElement>('.gsap-subtitle', root)
      const descriptions = gsap.utils.toArray<HTMLElement>('.gsap-desc', root)
      const highlights = gsap.utils.toArray<HTMLElement>(
        '.gsap-highlight',
        root
      )
      const chevrons = gsap.utils.toArray<HTMLElement>('.gsap-chevron', root)

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' }
      })

      if (badgeContainers.length > 0) {
        if (badgeBackgrounds.length > 0 || badgeContents.length > 0) {
          tl.set(badgeContainers, { autoAlpha: 1 })

          if (badgeBackgrounds.length > 0) {
            tl.fromTo(
              badgeBackgrounds,
              { width: 0, autoAlpha: 0 },
              {
                width: '100%',
                autoAlpha: 1,
                duration: 1.2,
                ease: 'power3.inOut'
              }
            )
          }

          if (badgeContents.length > 0) {
            tl.fromTo(
              badgeContents,
              { autoAlpha: 0, x: -10 },
              { autoAlpha: 1, x: 0, duration: 0.8 },
              '-=0.4'
            )
          }
        } else {
          tl.fromTo(
            badgeContainers,
            { autoAlpha: 0, y: -8 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          )
        }
      }

      if (heroCharacters.length > 0) {
        tl.fromTo(
          heroCharacters,
          {
            yPercent: 120,
            rotationX: -50,
            opacity: 0
          },
          {
            yPercent: 0,
            rotationX: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.05,
            ease: 'power4.out'
          },
          '-=1.0'
        )
      }

      if (subtitles.length > 0) {
        tl.fromTo(
          subtitles,
          { yPercent: 100, filter: 'blur(10px)', autoAlpha: 0 },
          {
            yPercent: 0,
            filter: 'blur(0px)',
            autoAlpha: 1,
            duration: 1.4
          },
          '-=1.2'
        )
      }

      if (descriptions.length > 0) {
        tl.fromTo(
          descriptions,
          { y: 20, autoAlpha: 0, filter: 'blur(5px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out'
          },
          '-=1.0'
        )
      }

      if (highlights.length > 0) {
        tl.fromTo(
          highlights,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            transformOrigin: 'left center'
          },
          '-=0.8'
        )
      }

      if (chevrons.length > 0) {
        tl.fromTo(
          chevrons,
          { autoAlpha: 0, y: -20 },
          { autoAlpha: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
          '-=0.6'
        )
      }
    },
    { scope: containerRef }
  )

  return containerRef
}
