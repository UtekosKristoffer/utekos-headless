'use client'
import type { Route } from 'next'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, Droplets, Feather, Layers } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils/className'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const models = [
  {
    title: 'Utekos Dun™',
    handle: 'utekos-dun',
    description: 'Kvalitetsdun og innovative løsninger for funksjonell varme.',
    icon: Feather,
    color: 'text-violet-400',
    bgHover: 'group-hover:bg-violet-500/10',
    borderHover: 'group-hover:border-violet-500/30',
    glowColor: 'group-hover:shadow-[0_0_30px_-10px_rgba(167,139,250,0.3)]'
  },
  {
    title: 'Utekos TechDown™',
    handle: 'utekos-techdown',
    description: 'Vår varmeste og mest allsidige modell. Tåler alt vær.',
    icon: Droplets,
    color: 'text-cyan-400',
    bgHover: 'group-hover:bg-cyan-500/10',
    borderHover: 'group-hover:border-cyan-500/30',
    glowColor: 'group-hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)]'
  },
  {
    title: 'Utekos Mikrofiber™',
    handle: 'utekos-mikrofiber',
    description:
      'Det letteste medlemmet i Utekos-serien. Bygget for maksimal bevegelse.',
    icon: Layers,
    color: 'text-emerald-400',
    bgHover: 'group-hover:bg-emerald-500/10',
    borderHover: 'group-hover:border-emerald-500/30',
    glowColor: 'group-hover:shadow-[0_0_30px_-10px_rgba(52,211,153,0.3)]'
  }
]

export function ComparisonTeaser() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-container',
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }
      )
      tl.fromTo(
        '.gsap-text',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )

      tl.to(
        '.gsap-underline',
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.2'
      )
      tl.to(
        '.gsap-highlight',
        { scaleX: 1, duration: 0.6, ease: 'circ.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-card',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        },
        '-=0.4'
      )

      tl.fromTo(
        '.gsap-btn',
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.2'
      )
    },
    { scope: container }
  )

  return (
    <section ref={container} className='mb-24 px-4'>
      <div className='gsap-container opacity-0 container mx-auto overflow-hidden rounded-3xl border border-white/5 bg-neutral-950/50 shadow-2xl'>
        <div className='absolute inset-0 -z-10 opacity-20'>
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]' />
        </div>

        <div className='p-8 text-center md:p-16'>
          <h2 className='gsap-text opacity-0 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl'>
            Usikker på hvilken Utekos du skal velge?
          </h2>

          <p className='gsap-text opacity-0 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400'>
            Våre tre Utekos-modeller gir deg{' '}
            <span className='relative inline-block text-white font-medium'>
              kompromissløs komfort
              <span className='gsap-underline absolute left-0 bottom-0 h-[2px] w-full bg-white/30 origin-left scale-x-0' />
            </span>
            , men har{' '}
            <span className='relative inline-block px-1'>
              <span className='gsap-highlight absolute inset-0 -skew-x-6 rounded bg-sky-500/20 origin-left scale-x-0' />
              <span className='relative z-10 text-sky-200'>unike styrker.</span>
            </span>{' '}
            Få en rask oversikt her, eller dykk ned i detaljene i vår komplette
            guide.
          </p>

          <div className='mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-3'>
            {models.map(model => (
              <Link
                key={model.handle}
                href={`/produkter/${model.handle}` as Route}
                data-track='ComparisonTeaserModelClick'
                className={cn(
                  'gsap-card group relative flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 opacity-0 transition-all duration-300',
                  'hover:-translate-y-1 hover:bg-white/[0.04]',
                  model.borderHover,
                  model.glowColor
                )}
              >
                <div className='mb-4 flex items-center gap-4'>
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300',
                      model.bgHover
                    )}
                  >
                    <model.icon
                      className={cn(
                        'h-6 w-6 transition-transform duration-300 group-hover:scale-110',
                        model.color
                      )}
                    />
                  </div>
                  <h3 className='text-lg font-bold text-white group-hover:text-white transition-colors'>
                    {model.title}
                  </h3>
                </div>

                <p className='mb-6 text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300'>
                  {model.description}
                </p>

                <div className='mt-auto flex items-center text-sm font-medium text-white/60 transition-colors group-hover:text-white'>
                  <span>Les mer</span>
                  <ArrowRightIcon className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                </div>
              </Link>
            ))}
          </div>

          <div className='gsap-btn opacity-0 mt-12'>
            <Button
              asChild
              size='lg'
              className='h-12 rounded-full bg-white px-8 text-neutral-950 hover:bg-sky-50 transition-all'
            >
              <Link
                href={'/handlehjelp/sammenlign-modeller' as Route}
                data-track='ComparisonTeaserSeeFullComparisonClick'
              >
                Se full sammenligning
                <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
