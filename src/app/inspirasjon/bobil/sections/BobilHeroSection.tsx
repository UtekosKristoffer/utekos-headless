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
    surface:
      'color-mix(in oklch, var(--cloud-dancer) 84%, var(--bleached-mauve))',
    border:
      'color-mix(in oklch, var(--bleached-mauve) 48%, var(--maritime-darkest))',
    marker: 'var(--bleached-mauve)',
    iconSurface: 'var(--bleached-mauve)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 80%, var(--overcast))',
    border: 'color-mix(in oklch, var(--overcast) 54%, var(--maritime-darkest))',
    marker: 'var(--overcast)',
    iconSurface: 'var(--overcast)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface:
      'color-mix(in oklch, var(--cloud-dancer) 82%, var(--ancient-water))',
    border:
      'color-mix(in oklch, var(--ancient-water) 46%, var(--maritime-darkest))',
    marker: 'var(--ancient-water)',
    iconSurface: 'var(--ancient-water)',
    icon: 'var(--maritime-darkest)'
  }
] as const

export function BobilHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      <div className='absolute inset-0 -z-10 opacity-25'>
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
              'radial-gradient(circle, color-mix(in oklch, var(--maritime-blue) 72%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-maritime-darkest/10 via-transparent to-maritime-blue/20' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
            <InspirationHeroBreadcrumb
              label='Bobil og camping'
              color='var(--color-bleached-mauve)'
              textColor='var(--color-maritime-darkest)'
              icon={MapPin}
            />
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='font-brand-sans text-4xl font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer sm:text-5xl lg:text-6xl'>
              Bobilliv uten{' '}
              <span className='text-bleached-mauve'>kompromisser</span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl font-utekos-text text-xl leading-[1.45] tracking-[-0.02em] text-cloud-dancer'>
              Fra den første morgenkaffen til de sene kveldene rundt bordet. Ta
              med Utekos og gjør hvert stopp til et øyeblikk du vil huske.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <InspirationHeroActions
              primaryLabel='Se produktene'
              secondaryLabel='Utforsk mulighetene'
            />
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            {motorhomeFeatureCards.map(({ title, description, Icon }, cardIndex) => {
              const theme =
                heroFeatureCardThemes[cardIndex % heroFeatureCardThemes.length]
                ?? heroFeatureCardThemes[0]

              return (
                <Card
                  key={title}
                  className='group relative overflow-hidden rounded-xl border py-0 text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
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
                  />
                  <CardContent className='relative p-4'>
                    <div className='mb-3 flex items-center gap-3'>
                      <div
                        className='flex size-10 shrink-0 items-center justify-center rounded-lg border'
                        style={{
                          backgroundColor: theme.iconSurface,
                          borderColor: theme.border,
                          color: theme.icon
                        }}
                      >
                        <Icon className='size-5' aria-hidden />
                      </div>
                      <h3 className='font-brand-sans text-base font-semibold leading-[0.95] tracking-tight text-maritime-darkest'>
                        {title}
                      </h3>
                    </div>
                    <p className='font-utekos-text text-sm leading-[1.45] tracking-tight text-maritime-darkest/90'>
                      {description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
