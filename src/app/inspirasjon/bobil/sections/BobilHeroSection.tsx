import { MapPin, Mountain, Sunrise } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const motorhomeFeatureCards = [
  {
    title: 'Morgenkaffe',
    description: 'Start dagen i varme utenfor bobilen',
    Icon: Sunrise,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 70%, var(--bleached-mauve))',
    borderColor: 'color-mix(in oklch, var(--bleached-mauve) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--bleached-mauve) 72%, var(--cloud-dancer) 28%) 0%, color-mix(in oklch, var(--bleached-mauve) 40%, var(--maritime-darkest) 60%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--bleached-mauve) 76%, transparent) 100%)'
  },
  {
    title: 'Alle stopp',
    description: 'Nyt utsikten i komfort, hvor som helst',
    Icon: Mountain,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 72%, var(--ancient-water))',
    borderColor: 'color-mix(in oklch, var(--ancient-water) 40%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 74%, var(--cloud-dancer) 26%) 0%, color-mix(in oklch, var(--ancient-water) 42%, var(--maritime-darkest) 58%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--ancient-water) 78%, transparent) 100%)'
  },
  {
    title: 'Lengre turer',
    description: 'Reis tidligere på året og senere på høsten',
    Icon: MapPin,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 74%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, var(--cloud-dancer) 22%) 0%, color-mix(in oklch, var(--overcast) 46%, var(--maritime-darkest) 54%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)'
  }
] as const

export function BobilHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='absolute left-1/3 top-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 72%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/3 bottom-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 70%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
            <InspirationHeroBreadcrumb
              label='Bobil og camping'
              color='var(--bleached-mauve)'
              textColor='var(--maritime-darkest)'
              icon={MapPin}
            />
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl leading-[0.95] font-bold tracking-normal sm:text-5xl lg:text-6xl'>
              Bobilliv uten{' '}
              <span className='bg-[linear-gradient(90deg,var(--bleached-mauve),var(--raindrops-on-roses),var(--bleached-mauve))] bg-clip-text text-transparent'>
                kompromisser
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-[1.45] tracking-normal text-cloud-dancer'>
              Fra den første morgenkaffen til de sene kveldene rundt bordet.
              Oppdag hvordan Utekos forvandler hver stopp til en destinasjon
              verdt å huske.
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

          {/* Feature highlights */}
          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            {motorhomeFeatureCards.map(
              ({
                title,
                description,
                Icon,
                iconColor,
                borderColor,
                background,
                glow
              }) => (
                <div
                  key={title}
                  className='group relative overflow-hidden rounded-[1.35rem] border p-4 transition-all duration-300 hover:-translate-y-0.5'
                  style={{
                    borderColor,
                    background,
                    boxShadow:
                      '0 24px 48px -38px color-mix(in oklch, var(--maritime-darkest) 72%, transparent)'
                  }}
                >
                  <div
                    className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                    style={{ background: glow }}
                  />
                  <div
                    className='pointer-events-none absolute inset-0 opacity-90'
                    style={{
                      background:
                        'linear-gradient(180deg, color-mix(in oklch, var(--cloud-dancer) 26%, transparent) 0%, color-mix(in oklch, var(--cloud-dancer) 8%, transparent) 34%, transparent 100%)'
                    }}
                  />
                  <div className='relative'>
                    <div className='mb-2 flex items-center gap-3'>
                      <Icon
                        className='size-8 shrink-0'
                        style={{ color: iconColor }}
                      />
                      <p className='font-semibold text-maritime-darkest'>
                        {title}
                      </p>
                    </div>
                    <p className='text-sm text-maritime-darkest/78'>
                      {description}
                    </p>
                  </div>
                </div>
              )
            )}
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
