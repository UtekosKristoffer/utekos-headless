import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useInStoreNoticeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoBoxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const logoBox = logoBoxRef.current
      const content = contentRef.current
      const smokeParticles = gsap.utils.toArray('.smoke-particle')
      const sparkParticles = gsap.utils.toArray('.spark-particle')

      if (!logoBox || !content) return

      // Nullstill verdier (Reset)
      gsap.set(logoBox, {
        xPercent: -500,
        rotation: -15,
        scaleX: 1.2,
        autoAlpha: 1
      })
      gsap.set(smokeParticles, { scale: 0, opacity: 0 })
      gsap.set(sparkParticles, { scale: 0, opacity: 0 })
      gsap.set(content, { y: 30, autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // 1. Logo flyr inn
      tl.to(logoBox, {
        xPercent: 30,
        rotation: 5,
        duration: 0.8,
        ease: 'power4.in'
      })

      tl.addLabel('brake')

      // 2. Bremseeffekt (Tilt bakover)
      tl.to(
        logoBox,
        {
          xPercent: 15,
          rotation: -25,
          scaleX: 0.9,
          duration: 0.3,
          ease: 'power3.out'
        },
        'brake'
      )

      // 3. Riste-effekt på container
      tl.add(() => {
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            { x: -4 },
            { x: 4, duration: 0.04, repeat: 5, yoyo: true, ease: 'sine.inOut' }
          )
        }
      }, 'brake')

      // 4. Partikkel-eksplosjon (Starter ved brake)
      tl.to(
        smokeParticles,
        {
          scale: 'random(2.5, 4)',
          x: 'random(-100, -20)',
          y: 'random(-50, 0)',
          opacity: 'random(0.4, 0.8)',
          duration: 0.2,
          stagger: { amount: 0.1, from: 'center' },
          ease: 'expo.out'
        },
        'brake'
      )

      tl.to(
        sparkParticles,
        {
          scale: 'random(0.5, 1)',
          x: 'random(20, 100)',
          y: 'random(10, 50)',
          opacity: 1,
          duration: 0.3,
          stagger: { amount: 0.1, from: 'random' },
          ease: 'power3.out'
        },
        'brake'
      )

      // 5. Fade ut partikler (Skjer i bakgrunnen)
      tl.to(
        smokeParticles,
        {
          opacity: 0,
          scale: '+=1',
          duration: 'random(1.5, 2.5)',
          ease: 'power1.out'
        },
        'brake+=0.2'
      )

      tl.to(sparkParticles, { opacity: 0, duration: 0.2 }, 'brake+=0.3')

      // 6. TEKST VISES (Flyttet frem!)
      // Starter 0.2 sekunder etter brems, mens logoen fortsatt henger litt.
      tl.to(
        content,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        'brake+=0.2'
      )

      // 7. LOGO LANDER (Flyttet frem!)
      // Starter 0.4 sekunder etter brems. Dette kutter ventetiden drastisk.
      // Før ventet denne på at all røyk var borte (ca 2.5sek).
      tl.to(
        logoBox,
        {
          xPercent: 0,
          rotation: 0,
          scaleX: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)'
        },
        'brake+=0.4'
      )
    },
    { scope: containerRef }
  )

  return { containerRef, logoBoxRef, contentRef }
}
