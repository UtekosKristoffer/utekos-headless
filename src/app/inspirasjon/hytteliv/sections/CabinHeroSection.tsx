import { Coffee, Mountain, Star } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const heroFeatureCards = [
  {
    title: 'Morgenstund',
    description: 'Nyt morgenkaffen ute i frisk fjellluft',
    Icon: Coffee
  },
  {
    title: 'Utsikten',
    description: 'Nyt panoramaet i komfort, hele dagen',
    Icon: Mountain
  },
  {
    title: 'Stjerneklar kveld',
    description: 'Forleng kveldene under natthimmelen',
    Icon: Star
  }
] as const

const heroFeatureCardThemes = [
  {
    surface:
      'color-mix(in oklch, var(--cloud-dancer) 84%, var(--ancient-water))',
    border:
      'color-mix(in oklch, var(--ancient-water) 46%, var(--maritime-darkest))',
    marker: 'var(--ancient-water)',
    iconSurface: 'var(--ancient-water)',
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
      'color-mix(in oklch, var(--cloud-dancer) 82%, var(--bleached-mauve))',
    border:
      'color-mix(in oklch, var(--bleached-mauve) 48%, var(--maritime-darkest))',
    marker: 'var(--bleached-mauve)',
    iconSurface: 'var(--bleached-mauve)',
    icon: 'var(--maritime-darkest)'
  }
] as const

export function CabinHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      <div className='absolute inset-0 -z-10 opacity-25'>
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
              'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 68%, transparent) 0%, transparent 70%)',
            animationDuration: '11s',
            animationDelay: '3s'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-maritime-darkest/10 via-transparent to-maritime-blue/20' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
            <InspirationHeroBreadcrumb
              label='Hytteliv'
              color='var(--ancient-water)'
              textColor='var(--maritime-darkest)'
              icon={Mountain}
            />
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl leading-[0.95] font-bold tracking-tight font-google-sans sm:text-5xl lg:text-6xl'>
              Hyttekos,{' '}
              <span className='bg-[linear-gradient(90deg,var(--ancient-water),var(--country-air),var(--ancient-water))] bg-clip-text text-transparent'>
                perfeksjonert
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-[1.45] tracking-tight font-utekos-text! text-cloud-dancer'>
              Fra morgenkaffen på terrassen til kveldene under stjernene. Gjør
              hytten til et varmt fristed, uansett årstid.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <InspirationHeroActions
              primaryLabel='Finn din Utekos'
              secondaryLabel='Se bruksområdene'
            />
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            {heroFeatureCards.map(({ title, description, Icon }, cardIndex) => {
              const theme =
                heroFeatureCardThemes[cardIndex % heroFeatureCardThemes.length]
                ?? heroFeatureCardThemes[0]

              return (
                <Card
                  key={title}
                  className='group relative overflow-hidden rounded-xl border py-0 text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5'
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
                        <Icon className='size-5' />
                      </div>
                      <h3 className='text-base leading-[0.95] font-semibold tracking-tight font-google-sans text-maritime-darkest'>
                        {title}
                      </h3>
                    </div>
                    <p className='text-sm leading-[1.45] tracking-tight font-utekos-text text-maritime-darkest/90'>
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
