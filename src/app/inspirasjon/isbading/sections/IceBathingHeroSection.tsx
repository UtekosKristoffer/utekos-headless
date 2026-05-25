// Path: src/app/inspirasjon/isbading/sections/IceBathingHeroSection.tsx
'use client'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight, Car, Shirt, Thermometer, Waves } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { useAnalytics } from '@/hooks/useAnalytics'

const iceBathingFeatureCards = [
  {
    title: 'Skift varmt',
    description: 'Trekk armene inn og skift skjermet etter badet',
    Icon: Shirt
  },
  {
    title: 'Varmen tilbake',
    description: 'Tørk huden raskt og hold kulden ute',
    Icon: Thermometer
  },
  {
    title: 'Turen hjem',
    description: 'Behold roen og varmen helt tilbake til bilen',
    Icon: Car
  }
] as const

const heroFeatureCardThemes = [
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 82%, var(--ancient-water))',
    border: 'color-mix(in oklch, var(--ancient-water) 48%, var(--maritime-darkest))',
    marker: 'var(--ancient-water)',
    iconSurface: 'var(--ancient-water)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 80%, var(--dusted-peri))',
    border: 'color-mix(in oklch, var(--dusted-peri) 46%, var(--maritime-darkest))',
    marker: 'var(--dusted-peri)',
    iconSurface: 'var(--dusted-peri)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 84%, var(--overcast))',
    border: 'color-mix(in oklch, var(--overcast) 54%, var(--maritime-darkest))',
    marker: 'var(--overcast)',
    iconSurface: 'var(--overcast)',
    icon: 'var(--maritime-darkest)'
  }
] as const

export function IceBathingHeroSection() {
  const { trackEvent } = useAnalytics()

  return (
    <section
      aria-labelledby='isbading-hero-title'
      className='relative flex min-h-[85vh] flex-col justify-center overflow-hidden'
    >
      <div className='absolute inset-0 select-none' aria-hidden='true'>
        <Image
          src='/comfyrobe/comfy-isbading-1080.png'
          alt=''
          fill
          className='object-cover md:hidden'
          priority
        />

        <Image
          src='/comfyrobe/comfy-isbading-1080-master.png'
          alt=''
          fill
          className='hidden object-cover md:block'
          priority
        />

        <div className='absolute inset-0 bg-maritime-darkest/68' />
      </div>

      <div className='container relative z-10 mx-auto px-4 py-24'>
        <div className='mx-auto max-w-5xl text-center'>
          <header>
            <AnimatedBlock className='will-animate-fade-in-up flex justify-center' delay='0.1s'>
              <InspirationHeroBreadcrumb
                label='Isbading'
                color='var(--ancient-water)'
                textColor='var(--maritime-darkest)'
                icon={Waves}
              />
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
              <hgroup>
                <h1 id='isbading-hero-title' className='mx-auto max-w-4xl text-title text-cloud-dancer drop-shadow-sm'>
                  Det kalde gys -{' '}
                  <span className='block text-ancient-water sm:inline'>den varme belønningen</span>
                </h1>

                <p className='mx-auto mt-6 max-w-2xl utekos-section-lead text-cloud-dancer drop-shadow-sm'>
                  Mestringsfølelsen etter et isbad er unik. Men turen tilbake til bilen trenger ikke være en kamp. Gjør
                  overgangen fra null grader til full komfort umiddelbar.
                </p>
              </hgroup>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up mt-10 flex flex-wrap justify-center gap-4' delay='0.4s'>
              <BrandBadge
                asChild
                backgroundColor='var(--primary-button)'
                textColor='var(--maritime-darkest)'
                className='group min-h-14 min-w-[200px] border border-primary-button/24 px-8 py-4 text-base leading-[1.4] font-bold tracking-normal shadow-2xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105'
              >
                <Link
                  href='#product-spotlight'
                  onClick={e => {
                    e.preventDefault()
                    trackEvent('HeroInteract', {
                      content_name: 'Scroll to Product Spotlight',
                      content_category: 'Hero Section'
                    })

                    const element = document.getElementById('product-spotlight')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className='inline-flex items-center justify-center'
                >
                  Kle deg for kulden
                  <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' aria-hidden />
                </Link>
              </BrandBadge>
            </AnimatedBlock>
          </header>

          <h2 id='isbading-hero-highlights-title' className='sr-only'>
            Høydepunkter for isbading med Utekos
          </h2>

          <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.5s'>
            <ul
              aria-labelledby='isbading-hero-highlights-title'
              className='grid w-full grid-cols-1 gap-5 text-left sm:grid-cols-3'
            >
              {iceBathingFeatureCards.map(({ title, description, Icon }, cardIndex) => {
                const theme =
                  heroFeatureCardThemes[cardIndex % heroFeatureCardThemes.length] ?? heroFeatureCardThemes[0]

                return (
                  <li key={title}>
                    <Card
                      className='group relative flex aspect-[2/1] w-full flex-col overflow-hidden rounded-xl border py-0 text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
                      style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                        boxShadow:
                          '0 22px 44px -34px color-mix(in oklch, var(--maritime-darkest) 52%, transparent)'
                      }}
                    >
                      <div
                        className='absolute inset-x-4 top-0 h-px transition-opacity duration-300 group-hover:opacity-70'
                        style={{ background: theme.marker }}
                        aria-hidden='true'
                      />

                      <CardContent className='relative flex h-full flex-col gap-3 p-5'>
                        <div className='flex items-center gap-3'>
                          <div
                            className='flex size-10 shrink-0 items-center justify-center rounded-lg border'
                            style={{
                              backgroundColor: theme.iconSurface,
                              borderColor: theme.border,
                              color: theme.icon
                            }}
                            aria-hidden='true'
                          >
                            <Icon className='size-5' focusable='false' />
                          </div>

                          <h3 className='inspirational-page-hero-card-heading whitespace-nowrap text-maritime-darkest'>
                            {title}
                          </h3>
                        </div>

                        <p className='inspirational-page-hero-card-description pr-2 text-maritime-darkest/90'>
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  </li>
                )
              })}
            </ul>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
