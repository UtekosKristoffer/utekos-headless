// Path: src/components/sections/FindInStoreSection.tsx
'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import IntersportLogo from '@public/logo/Intersport_logo.svg'
import { INTERSPORT_LAKSEVAG_MAPS_URL } from '@/constants/maps'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function IntersportSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const logoCardRef = useRef<HTMLDivElement>(null)

  // State for 3D Tilt
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoCardRef.current) return

    const card = logoCardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Beregn rotasjon (maks 10 grader)
    const rotateY = ((x - rect.width / 2) / rect.width) * 10
    const rotateX = ((y - rect.height / 2) / rect.height) * -10

    // Beregn glare posisjon
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setRotation({ x: rotateX, y: rotateY })
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setGlarePosition({ x: 50, y: 50 })
  }

  useGSAP(
    () => {
      // 0. Sikre start-tilstander umiddelbart (hindrer "flash of content")
      gsap.set(cardRef.current, { y: 100, autoAlpha: 0, scale: 0.95 })
      gsap.set('.gsap-logo-card', { x: -50, autoAlpha: 0, rotationY: -15 })
      gsap.set('.gsap-content', { x: 50, autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', // Starter når toppen av seksjonen er 70% ned på skjermen
          end: 'bottom 20%',
          toggleActions: 'play none none reverse' // Spiller av nedover, reverserer når man scroller opp igjen
        }
      })

      // 1. Reveal av hele kortet (løftes opp)
      tl.to(cardRef.current, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      })

      // 2. Logo card pop-in (kommer inn fra venstre)
      tl.to(
        '.gsap-logo-card',
        {
          x: 0,
          autoAlpha: 1,
          rotationY: 0,
          duration: 1,
          ease: 'back.out(1.5)'
        },
        '-=0.6'
      )

      // 3. Tekst staggered (kommer inn fra høyre)
      tl.to(
        '.gsap-content',
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.8'
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className='relative isolate w-full overflow-hidden bg-maritime-darkest px-4 py-24 sm:py-32'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--dusted-peri)_22%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute bottom-12 right-[10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_14%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto max-w-7xl'>
        <div
          ref={cardRef}
          className='relative overflow-hidden rounded-[1.75rem] border border-cloud-dancer/10 bg-[color-mix(in_oklab,var(--cloud-dancer)_8%,transparent)] p-8 opacity-0 shadow-2xl shadow-black/35 backdrop-blur-sm md:p-12'
        >
          <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--cloud-dancer)_14%,transparent)_1px,transparent_0)] bg-[size:24px_24px] opacity-30' />

          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
            <div
              className='gsap-logo-card perspective-1000 flex w-full justify-center opacity-0'
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={logoCardRef}
                className='relative flex h-64 w-full max-w-md items-center justify-center rounded-[1.5rem] border border-cloud-dancer/70 bg-cloud-dancer shadow-2xl shadow-black/20 transition-transform duration-100 ease-out will-change-transform'
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className='pointer-events-none absolute inset-0 z-10 rounded-[1.5rem] mix-blend-soft-light'
                  style={{
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, transparent 100%)`,
                    opacity: 0.4
                  }}
                />

                <div className='relative z-0 translate-z-10 transform'>
                  <Image
                    src={IntersportLogo}
                    alt='Intersport logo'
                    width={1024}
                    height={112}
                    className='max-w-[240px] md:max-w-[280px]'
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </div>

                <div className='absolute left-4 top-4 h-2 w-2 rounded-full bg-maritime-blue/18' />
                <div className='absolute right-4 top-4 h-2 w-2 rounded-full bg-maritime-blue/18' />
                <div className='absolute bottom-4 left-4 h-2 w-2 rounded-full bg-maritime-blue/18' />
                <div className='absolute bottom-4 right-4 h-2 w-2 rounded-full bg-maritime-blue/18' />
              </div>
            </div>

            <div className='flex flex-col items-start text-left'>
              <BrandBadge
                backgroundColor='var(--dusted-peri)'
                textColor='var(--maritime-darkest)'
                className='gsap-content mb-8 gap-3 opacity-0 shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--dusted-peri)_80%,transparent)]'
              >
                <span className='relative flex h-3 w-3'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-maritime-darkest opacity-35'></span>
                  <span className='relative inline-flex h-3 w-3 rounded-full bg-maritime-darkest'></span>
                </span>
                <span>Fysisk butikk i Bergen</span>
              </BrandBadge>

              <h2 className='gsap-content mb-6 text-balance text-3xl font-serif font-medium leading-tight text-cloud-dancer opacity-0 md:text-5xl'>
                Opplev Utekos hos <br />
                <span className='text-overcast'>Intersport Laksevåg</span>
              </h2>

              <p className='gsap-content mb-10 max-w-lg text-lg font-light leading-relaxed text-overcast/82 opacity-0'>
                Lyst til å kjenne på kvaliteten og finne den perfekte
                passformen? Som eneste fysiske forhandler i Bergen finner du et
                utvalg av våre produkter hos våre venner på Laksevåg Senter.
              </p>

              <div className='gsap-content opacity-0'>
                <Button
                  asChild
                  size='lg'
                  className='group h-14 rounded-full border-0 bg-primary-button px-8 text-base text-maritime-darkest shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--primary-button)_90%,transparent)] transition-all duration-300 hover:bg-primary-button/88 hover:shadow-[0_18px_54px_-24px_color-mix(in_oklab,var(--primary-button)_90%,transparent)]'
                >
                  <Link
                    href={INTERSPORT_LAKSEVAG_MAPS_URL}
                    target='_blank'
                    className='flex items-center gap-2'
                  >
                    Få veibeskrivelse
                    <MapPin className='h-5 w-5 transition-transform group-hover:scale-110' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
