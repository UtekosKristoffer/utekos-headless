'use client'

import { useRef, useState } from 'react'
import { Cloud, Droplet, ShieldCheck, Settings2 } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Feature {
  icon: any
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Cloud,
    title: 'CloudWeave™',
    description:
      'Isolasjon med dunlignende letthet for bekymringsfri ytelse. Varmer selv når det blir fuktig.'
  },
  {
    icon: Droplet,
    title: 'Luméa™',
    description:
      'Elegant, matt finish som tåler norsk kystklima. Vannavvisende og slitesterkt.'
  },
  {
    icon: Settings2,
    title: '3-i-1 Funksjon',
    description:
      'Fra parkas til varmepose på sekunder. Tilpass komforten etter behov.'
  },
  {
    icon: ShieldCheck,
    title: 'Varig kvalitet',
    description:
      'Beholder formen og varmen år etter år. En investering i langvarig komfort.'
  }
]

export function TechDownFeatures() {
  const containerRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-header',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }
      )

      tl.fromTo(
        '.gsap-card',
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        },
        '-=0.4'
      )
    },
    { scope: containerRef }
  )

  return (
    <>
      <div className='container mx-auto px-4'>
        <div className='relative pb-10 sm:pb-24'>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='w-[85%] mx-auto border-t border-neutral-800' />
          </div>
        </div>
      </div>

      <section
        ref={containerRef}
        className='max-w-6xl mx-auto px-6 pt-8 pb-20'
        onMouseMove={handleMouseMove}
      >
        <div className='gsap-header opacity-0 text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-light mb-4 text-white'>
            Hemmeligheten bak komforten
          </h2>
          <p className='text-gray-400 max-w-2xl mx-auto text-lg font-light'>
            Etter måneder med testing har vi utviklet en teknologi som vi er
            stolte av.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='gsap-card opacity-0 group relative overflow-hidden bg-neutral-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors duration-500'
            >
              <div
                className='pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.06), transparent 40%)`
                }}
              />

              <div className='relative z-10'>
                <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 group-hover:text-sky-300 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(14,165,233,0.3)]'>
                  <feature.icon className='h-6 w-6' />
                </div>

                <h3 className='text-xl font-semibold mb-3 text-white group-hover:text-sky-100 transition-colors'>
                  {feature.title}
                </h3>

                <p className='text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
