import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { Mountain } from 'lucide-react'
import { heroFeatureCards } from '../utils/heroFeatureCards'
import { heroFeatureCardThemes } from '../utils/heroFeatureCardThemes'

export function CabinHeroSection() {
  return (
    <section
      aria-labelledby='hytteliv-hero-title'
      className='relative flex min-h-[70vh] items-center overflow-hidden bg-havdyp'
    >
      <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
        <div
          className='animate-pulse-glow absolute left-1/3 top-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 72%, transparent) 0%, transparent 70%)',
            animationDuration: '9s'
          }}
        />
        <div
          className='animate-pulse-glow absolute right-1/3 bottom-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 68%, transparent) 0%, transparent 70%)',
            animationDuration: '11s',
            animationDelay: '3s'
          }}
        />
      </div>

      <div
        className='absolute inset-0 bg-gradient-to-b from-maritime-darkest/10 via-transparent to-havdyp/20'
        aria-hidden='true'
      />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-5xl'>
          <header>
            <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
              <InspirationHeroBreadcrumb
                label='Hytteliv'
                color='var(--ancient-water)'
                textColor='var(--maritime-darkest)'
                icon={Mountain}
              />
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
              <hgroup>
                <h1 id='hytteliv-hero-title' className='text-title text-cloud-dancer'>
                  Hyttekos, <span className='text-ancient-water'>perfeksjonert</span>
                </h1>

                <p className='mt-6 max-w-2xl utekos-section-lead text-cloud-dancer'>
                  Fra morgenkaffen på terrassen til kveldene under stjernene. Gjør hytten til et varmt
                  fristed, uansett årstid.
                </p>
              </hgroup>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4' delay='0.4s'>
              <InspirationHeroActions primaryLabel='Finn din Utekos' secondaryLabel='Se bruksområdene' />
            </AnimatedBlock>
          </header>

          <h2 id='hytteliv-hero-highlights-title' className='sr-only'>
            Høydepunkter for hytteliv med Utekos
          </h2>

          <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.5s'>
            <ul
              aria-labelledby='hytteliv-hero-highlights-title'
              className='grid w-full grid-cols-1 gap-5 sm:grid-cols-3'
            >
              {heroFeatureCards.map(({ title, description, Icon }, cardIndex) => {
                const theme =
                  heroFeatureCardThemes[cardIndex % heroFeatureCardThemes.length] ?? heroFeatureCardThemes[0]

                return (
                  <li key={title}>
                    <Card
                      className='group relative flex aspect-[2/1] w-full flex-col overflow-hidden rounded-xl border py-0 text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5'
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
