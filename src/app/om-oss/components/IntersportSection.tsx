// Path: src/components/sections/FindInStoreSection.tsx
'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
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
  const sectionRef = useRef<HTMLDivElement>(null)
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
      className='w-full bg-neutral-950 py-24 px-4 sm:py-32'
    >
      <div className='container mx-auto max-w-7xl'>
        {/* Main Card Container */}
        <div
          ref={cardRef}
          className='relative overflow-hidden rounded-3xl border border-white/5 bg-[#1a1a1a] p-8 md:p-12 shadow-2xl opacity-0' // opacity-0 som fallback
        >
          {/* Ambient Background Glow */}
          <div className='absolute right-0 top-0 -z-10 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 opacity-10 blur-[120px] bg-red-600' />
          <div className='absolute left-0 bottom-0 -z-10 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 opacity-10 blur-[120px] bg-blue-600' />

          {/* Dot Grid Texture */}
          <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20' />

          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
            {/* INTERACTIVE LOGO CARD (Left Column) */}
            <div
              className='gsap-logo-card perspective-1000 w-full flex justify-center opacity-0'
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={logoCardRef}
                className='relative flex h-64 w-full max-w-md items-center justify-center rounded-2xl bg-white shadow-2xl transition-transform duration-100 ease-out will-change-transform'
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Glare Effect */}
                <div
                  className='absolute inset-0 rounded-2xl pointer-events-none z-10 mix-blend-soft-light'
                  style={{
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, transparent 100%)`,
                    opacity: 0.4
                  }}
                />

                {/* Logo */}
                <div className='relative z-0 transform translate-z-10'>
                  <Image
                    src={IntersportLogo}
                    alt='Intersport logo'
                    width={280}
                    height={80}
                    className='h-auto w-full max-w-[240px] md:max-w-[280px]'
                    priority
                  />
                </div>

                {/* Decorative Elements on the card */}
                <div className='absolute top-4 left-4 h-2 w-2 rounded-full bg-neutral-200' />
                <div className='absolute top-4 right-4 h-2 w-2 rounded-full bg-neutral-200' />
                <div className='absolute bottom-4 left-4 h-2 w-2 rounded-full bg-neutral-200' />
                <div className='absolute bottom-4 right-4 h-2 w-2 rounded-full bg-neutral-200' />
              </div>
            </div>

            {/* TEXT CONTENT (Right Column) */}
            <div className='flex flex-col items-start text-left'>
              {/* Badge: Fysisk butikk */}
              <div className='gsap-content opacity-0 mb-8 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 backdrop-blur-md'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
                </span>
                <span className='text-xs font-bold uppercase tracking-widest text-red-400'>
                  Fysisk butikk i Bergen
                </span>
              </div>

              <h2 className='gsap-content opacity-0 text-balance text-3xl md:text-5xl font-bold text-white mb-6 leading-tight'>
                Opplev Utekos hos <br />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500'>
                  Intersport Laksevåg
                </span>
              </h2>

              <p className='gsap-content opacity-0 max-w-lg text-lg leading-relaxed text-neutral-400 mb-10'>
                Lyst til å kjenne på kvaliteten og finne den perfekte
                passformen? Som eneste fysiske forhandler i Bergen finner du et
                utvalg av våre produkter hos våre venner på Laksevåg Senter.
              </p>

              <div className='gsap-content opacity-0'>
                <Button
                  asChild
                  size='lg'
                  className='group h-14 bg-red-600 hover:bg-red-500 text-white border-0 rounded-full px-8 text-base shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300'
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
