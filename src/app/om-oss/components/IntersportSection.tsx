// Path: src/components/sections/FindInStoreSection.tsx
'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
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
  const articleRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const logoCardRef = useRef<HTMLDivElement>(null)

  // State for the interactive card tilt.
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoCardRef.current) return

    const card = logoCardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation with a 10 degree cap.
    const rotateY = ((x - rect.width / 2) / rect.width) * 10
    const rotateX = ((y - rect.height / 2) / rect.height) * -10

    // Calculate glare position.
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
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(cardRef.current, { y: 0, autoAlpha: 1, scale: 1 })
        gsap.set('.gsap-logo-card', { x: 0, autoAlpha: 1, rotationY: 0 })
        gsap.set('.gsap-content', { x: 0, autoAlpha: 1 })
        return
      }

      // Set initial states immediately to prevent a content flash.
      gsap.set(cardRef.current, { y: 100, autoAlpha: 0, scale: 0.95 })
      gsap.set('.gsap-logo-card', { x: -50, autoAlpha: 0, rotationY: -15 })
      gsap.set('.gsap-content', { x: 50, autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: articleRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      })

      // Reveal the whole card with a soft lift.
      tl.to(cardRef.current, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      })

      // Bring the logo card in from the left.
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

      // Bring copy in from the right with a stagger.
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
    { scope: articleRef }
  )

  return (
    <article
      ref={articleRef}
      className='relative isolate w-full overflow-hidden bg-background px-4 py-24 sm:py-32'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-16 size-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_22%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute bottom-12 right-[10%] size-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_14%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto max-w-7xl'>
        <div
          ref={cardRef}
          className='relative overflow-hidden rounded-[1.75rem] border border-cloud-dancer/10 bg-[color-mix(in_oklab,var(--cloud-dancer)_8%,transparent)] p-8 shadow-2xl shadow-black/35 backdrop-blur-sm md:p-12'
        >
          <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--cloud-dancer)_14%,transparent)_1px,transparent_0)] bg-size-[24px_24px] opacity-30' />

          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
            <div
              className='gsap-logo-card perspective-1000 flex w-full justify-center'
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={logoCardRef}
                className='relative flex h-64 w-full max-w-md items-center justify-center rounded-3xl border border-cloud-dancer/70 bg-cloud-dancer shadow-2xl shadow-black/20 transition-transform duration-100 ease-out will-change-transform'
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className='pointer-events-none absolute inset-0 z-10 rounded-3xl mix-blend-soft-light'
                  style={{
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, color-mix(in oklch, var(--cloud-dancer) 80%, transparent) 0%, transparent 100%)`,
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

                <div className='absolute left-4 top-4 size-2 rounded-full bg-havdyp/18' />
                <div className='absolute right-4 top-4 size-2 rounded-full bg-havdyp/18' />
                <div className='absolute bottom-4 left-4 size-2 rounded-full bg-havdyp/18' />
                <div className='absolute bottom-4 right-4 size-2 rounded-full bg-havdyp/18' />
              </div>
            </div>

            <div className='flex flex-col items-start text-left'>
              <BrandBadge
                backgroundColor='var(--very-peri)'
                textColor='var(--background)'
                className='gsap-content mb-8 gap-3 shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--very-peri)_80%,transparent)]'
              >
                <span className='relative flex size-3'>
                  <span className='absolute inline-flex size-full animate-ping rounded-full bg-background opacity-35'></span>
                  <span className='relative inline-flex size-3 rounded-full bg-background'></span>
                </span>
                <span className='  text-base font-medium   text-background'>Fysisk butikk i Bergen</span>
              </BrandBadge>

              <h2 className='gsap-content mb-6 flex flex-col text-balance text-3xl leading-[0.95] font-bold tracking-[-0.01em] text-foreground md:text-5xl'>
                <span className='inline-flex flex-wrap items-baseline gap-x-[0.18em]'>
                  <span>Opplev</span>
                  <UtekosWordmark className='h-[0.78em] w-auto translate-y-[0.06em]' />
                  <span>hos</span>
                </span>
                <span className='text-overcast'>Intersport Laksevåg</span>
              </h2>

              <p className='gsap-content mb-10 max-w-lg text-lg text-foreground'>
                Lyst til å kjenne på kvaliteten og finne den perfekte passformen? Som eneste fysiske
                forhandler i Bergen finner du et utvalg av våre produkter hos våre venner på Laksevåg Senter.
              </p>

              <div className='gsap-content'>
                <Button
                  asChild
                  size='lg'
                  className='group h-14 rounded-full border-0 bg-primary px-8 text-base text-background shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--primary)_90%,transparent)] transition-all duration-300 hover:bg-primary/88 hover:shadow-[0_18px_54px_-24px_color-mix(in_oklab,var(--primary)_90%,transparent)]'
                >
                  <Link
                    href={INTERSPORT_LAKSEVAG_MAPS_URL}
                    target='_blank'
                    className='flex items-center gap-2'
                  >
                    Få veibeskrivelse
                    <MapPin className='size-5 transition-transform group-hover:scale-110' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
