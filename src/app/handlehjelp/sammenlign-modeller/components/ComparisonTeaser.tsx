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
    description: '(UTSOLGT) - Alternativet for deg som ønsker dun.',
    icon: Feather,
    cardClass: 'border-ancient-water bg-ancient-water hover:bg-ancient-water/90',
    iconShellClass: 'border-havdyp/20 bg-havdyp',
    iconClass: 'text-cloud-dancer',
    textClass: 'text-havdyp',
    descriptionClass: 'text-havdyp/75',
    lesmerClass: 'text-havdyp/70 group-hover:text-havdyp'
  },
  {
    title: 'Utekos TechDown™',
    handle: 'utekos-techdown',
    description: 'Vår nyeste, varmeste og mest allsidige modell.',
    icon: Droplets,
    cardClass: 'border-dusted-peri bg-dusted-peri hover:bg-dusted-peri/90',
    iconShellClass: 'border-cloud-dancer/60 bg-cloud-dancer/85',
    iconClass: 'text-dusted-peri',
    textClass: 'text-havdyp',
    descriptionClass: 'text-havdyp/75',
    lesmerClass: 'text-havdyp/70 group-hover:text-havdyp'
  },
  {
    title: 'Utekos Mikrofiber™',
    handle: 'utekos-mikrofiber',
    description: 'For for bruk i aktivitet eller varmere temperaturer.',
    icon: Layers,
    cardClass: 'border-havdyp bg-havdyp hover:bg-maritime-darkest',
    iconShellClass: 'border-cloud-dancer/30 bg-cloud-dancer',
    iconClass: 'text-havdyp',
    textClass: 'text-cloud-dancer',
    descriptionClass: 'text-cloud-dancer/75',
    lesmerClass: 'text-cloud-dancer/90 group-hover:text-cloud-dancer'
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

      tl.to('.gsap-underline', { scaleX: 1, duration: 0.8, ease: 'expo.out' }, '-=0.2')
      tl.to('.gsap-highlight', { scaleX: 1, duration: 0.6, ease: 'circ.out' }, '-=0.6')

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
    <article ref={container} className='mb-24 py-12 md:py-16 px-4'>
      <div className='gsap-container container mx-auto overflow-hidden rounded-3xl border border-white/5 bg-overcast shadow-2xl'>
        <div className='absolute inset-0 -z-10 opacity-20'>
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]' />
        </div>

        <div className='p-6 max-sm:text-left text-center md:p-16'>
          <h2 className='gsap-text text-4xl font-bold tracking-tight font-google-sans text-havdyp sm:text-5xl md:text-6xl'>
            Usikker på hvilken Utekos du skal velge?
          </h2>

          <p className='gsap-text mx-auto mt-6 max-w-4xl utekos-section-lead text-[1.2rem] font-utekos-text leading-relaxed text-havdyp'>
            Alle Utekos-modellene har justerbar passform og ventilasjon, men har ellers ulike egenskaper og
            styrker. Se vår sammenligningsguide for å finne modellen som passer best til dine behov.
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
                  <h3 className={cn('text-lg font-bold font-google-sans transition-colors', model.textClass)}>
                    {model.title}
                  </h3>
                </div>

                <p className={cn('mb-6 text-[1rem]! font-utekos-text!', model.descriptionClass)}>
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
              className='h-12 font-utekos-text rounded-full bg-havdyp px-8 text-cloud-dancer hover:bg-maritime-darkest transition-all'
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
    </article>
  )
}
