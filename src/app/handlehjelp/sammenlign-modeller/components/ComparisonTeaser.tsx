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
    cardClass:
      'border-ancient-water bg-ancient-water hover:bg-ancient-water/90',
    iconShellClass: 'border-maritime-blue/20 bg-maritime-blue',
    iconClass: 'text-cloud-dancer',
    textClass: 'text-maritime-blue',
    descriptionClass: 'text-maritime-blue/75',
    lesmerClass: 'text-maritime-blue/70 group-hover:text-maritime-blue'
  },
  {
    title: 'Utekos TechDown™',
    handle: 'utekos-techdown',
    description: 'Vår varmeste og mest allsidige modell. Tåler alt vær.',
    icon: Droplets,
    cardClass: 'border-dusted-peri bg-dusted-peri hover:bg-dusted-peri/90',
    iconShellClass: 'border-cloud-dancer/60 bg-cloud-dancer/85',
    iconClass: 'text-dusted-peri',
    textClass: 'text-maritime-blue',
    descriptionClass: 'text-maritime-blue/75',
    lesmerClass: 'text-maritime-blue/70 group-hover:text-maritime-blue'
  },
  {
    title: 'Utekos Mikrofiber™',
    handle: 'utekos-mikrofiber',
    description:
      'Det letteste medlemmet i Utekos-serien. Bygget for maksimal bevegelse.',
    icon: Layers,
    cardClass:
      'border-maritime-blue bg-maritime-blue hover:bg-maritime-darkest',
    iconShellClass: 'border-cloud-dancer/30 bg-cloud-dancer',
    iconClass: 'text-maritime-blue',
    textClass: 'text-cloud-dancer',
    descriptionClass: 'text-cloud-dancer/75',
    lesmerClass: 'text-cloud-dancer/70 group-hover:text-cloud-dancer'
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
      <div className='gsap-container container mx-auto overflow-hidden rounded-3xl border border-white/5 bg-overcast shadow-2xl'>
        <div className='absolute inset-0 -z-10 opacity-20'>
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]' />
        </div>

        <div className='p-8 text-center md:p-16'>
          <h2 className='gsap-text text-4xl font-bold tracking-tight font-google-sans text-maritime-blue sm:text-5xl md:text-6xl'>
            Usikker på hvilken Utekos du skal velge?
          </h2>

          <p className='gsap-text mx-auto mt-6 max-w-2xl tracking-tight text-lg font-utekos-text leading-relaxed text-maritime-blue'>
            Våre tre Utekos-modeller gir deg{' '}
            <span className='relative inline-block text-maritime-blue-darkest tracking-tight font-utekos-text'>
              kompromissløs komfort
              <span className='gsap-underline absolute left-0 bottom-0 h-[2px] w-full bg-maritime-blue origin-left scale-x-0' />
            </span>
            , men har{' '}
            <span className='relative inline-block px-1'>
              <span className='gsap-highlight absolute inset-0 -skew-x-6 rounded bg-ancient-water/40 origin-left scale-x-0' />
              <span className='relative z-10 text-maritime-blue font-semibold'>
                unike styrker.
              </span>
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
                  'gsap-card group relative flex flex-col rounded-2xl border p-6 transition-all duration-300',
                  'hover:-translate-y-1',
                  model.cardClass
                )}
              >
                <div className='mb-4 flex items-center gap-4'>
                  <div
                    className={cn(
                      'flex size-12 items-center justify-center rounded-xl border transition-colors duration-300',
                      model.iconShellClass
                    )}
                  >
                    <model.icon
                      className={cn(
                        'size-6 transition-transform duration-300 group-hover:scale-110',
                        model.iconClass
                      )}
                    />
                  </div>
                  <h3
                    className={cn(
                      'text-lg font-bold transition-colors',
                      model.textClass
                    )}
                  >
                    {model.title}
                  </h3>
                </div>

                <p
                  className={cn(
                    'mb-6 text-sm leading-relaxed',
                    model.descriptionClass
                  )}
                >
                  {model.description}
                </p>

                <div
                  className={cn(
                    'mt-auto flex items-center text-sm font-medium transition-colors',
                    model.lesmerClass
                  )}
                >
                  <span>Les mer</span>
                  <ArrowRightIcon className='ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1' />
                </div>
              </Link>
            ))}
          </div>

          <div className='gsap-btn mt-12'>
            <Button
              asChild
              size='lg'
              className='h-12 rounded-full bg-maritime-blue px-8 text-cloud-dancer hover:bg-maritime-darkest transition-all'
            >
              <Link
                href={'/handlehjelp/sammenlign-modeller' as Route}
                data-track='ComparisonTeaserSeeFullComparisonClick'
              >
                Se full sammenligning
                <ArrowRightIcon className='ml-2 size-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
