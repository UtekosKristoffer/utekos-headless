import { MapPin, Mountain, Sunrise } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const motorhomeFeatureCards = [
  {
    title: 'Morgenkaffe',
    description: 'Start dagen i varme utenfor bobilen',
    Icon: Sunrise
  },
  {
    title: 'Alle stopp',
    description: 'Nyt utsikten i komfort, hvor som helst',
    Icon: Mountain
  },
  {
    title: 'Lengre turer',
    description: 'Reis tidligere på året og senere på høsten',
    Icon: MapPin
  }
] as const

const heroFeatureCardThemes = [
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 10%, var(--overcast))',
    border: 'color-mix(in oklch, var(--havdyp) 48%, var(--maritime-darkest))',
    marker: 'var(--overcast)',
    iconSurface: 'var(--overcast)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface: 'color-mix(in oklch, var(--bleached-mauve-light) 10%, var(--bleached-mauve))',
    border: 'color-mix(in oklch, var(--havdyp) 54%, var(--maritime-darkest))',
    marker: 'var(--bleached-mauve)',
    iconSurface: 'var(--bleached-mauve)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 10%, var(--dusted-peri))',
    border: 'color-mix(in oklch, var(--havdyp) 48%, var(--maritime-darkest))',
    marker: 'var(--dusted-peri)',
    iconSurface: 'var(--ancient-water)',
    icon: 'var(--maritime-darkest)'
  }
] as const

export function BobilHeroSection() {
  return (
    <section
      aria-labelledby='bobil-hero-title'
      className='relative flex min-h-[70vh] items-center overflow-hidden bg-havdyp text-cloud-dancer'
    >
      <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
        <div
          className='absolute left-1/3 top-1/4 size-[600px] rounded-full blur-[100px]'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 68%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute bottom-1/4 right-1/3 size-[600px] rounded-full blur-[100px]'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--havdyp) 72%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-havdyp' aria-hidden='true' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-5xl'>
          <header>
            <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
              <InspirationHeroBreadcrumb
                label='Bobil og camping'
                color='var(--color-bleached-mauve)'
                textColor='var(--color-maritime-darkest)'
                icon={MapPin}
              />
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
              <hgroup>
                <h1 id='bobil-hero-title' className='max-w-3xl text-title text-cloud-dancer'>
                  Bobilliv uten <span className='text-bleached-mauve'>kompromisser</span>
                </h1>

                <p className='mt-6 max-w-2xl utekos-section-lead text-cloud-dancer'>
                  Fra den første morgenkaffen til de sene kveldene rundt bordet. Ta med Utekos og gjør hvert
                  stopp til et øyeblikk du vil huske.
                </p>
              </hgroup>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4' delay='0.4s'>
              <InspirationHeroActions primaryLabel='Se produktene' secondaryLabel='Utforsk mulighetene' />
            </AnimatedBlock>
          </header>

          <h2 id='bobil-hero-highlights-title' className='sr-only'>
            Høydepunkter for bobil og camping med Utekos
          </h2>

          <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.5s'>
            <ul
              aria-labelledby='bobil-hero-highlights-title'
              className='grid w-full grid-cols-1 gap-5 sm:grid-cols-3'
            >
              {motorhomeFeatureCards.map(({ title, description, Icon }, cardIndex) => {
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
