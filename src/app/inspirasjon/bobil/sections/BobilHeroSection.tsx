import { MapPin, Mountain, Sunrise } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const motorhomeFeatureCards = [
  {
    title: 'Morgenkaffe',
    description: 'Start dagen i varme utenfor bobilen',
    Icon: Sunrise,
    iconClassName: 'text-bleached-mauve',
    borderClassName: 'border-bleached-mauve/20',
    bgClassName: 'bg-maritime-blue/10 backdrop-blur-md',
    glowClassName: 'bg-bleached-mauve/20'
  },
  {
    title: 'Alle stopp',
    description: 'Nyt utsikten i komfort, hvor som helst',
    Icon: Mountain,
    iconClassName: 'text-overcast',
    borderClassName: 'border-overcast/20',
    bgClassName: 'bg-maritime-blue/10 backdrop-blur-md',
    glowClassName: 'bg-overcast/20'
  },
  {
    title: 'Lengre turer',
    description: 'Reis tidligere på året og senere på høsten',
    Icon: MapPin,
    iconClassName: 'text-bleached-mauve',
    borderClassName: 'border-bleached-mauve/20',
    bgClassName: 'bg-maritime-blue/10 backdrop-blur-md',
    glowClassName: 'bg-bleached-mauve/20'
  }
] as const

export function BobilHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div className='absolute left-1/3 top-1/4 size-[600px] blur-[100px] rounded-full bg-bleached-mauve/30' />
        <div className='absolute right-1/3 bottom-1/4 size-[600px] blur-[100px] rounded-full bg-maritime-blue/30' />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

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
            <h1 className='font-brand-sans text-4xl font-bold tracking-[-0.01em] text-cloud-dancer leading-[0.95] sm:text-5xl lg:text-6xl'>
              Bobilliv uten{' '}
              <span className='bg-gradient-to-r from-bleached-mauve via-[var(--raindrops-on-roses)] to-bleached-mauve bg-clip-text text-transparent'>
                kompromisser
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='font-utekos-text mt-6 max-w-2xl text-xl leading-[1.45] tracking-[-0.02em] text-cloud-dancer'>
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
                iconClassName,
                borderClassName,
                bgClassName,
                glowClassName
              }) => (
                <div
                  key={title}
                  className={`group relative overflow-hidden rounded-[1.35rem] border p-4 transition-all duration-300 hover:-translate-y-0.5 shadow-xl shadow-maritime-darkest/10 ${bgClassName} ${borderClassName}`}
                >
                  <div
                    className={`pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20 ${glowClassName}`}
                  />
                  <div className='pointer-events-none absolute inset-0 opacity-90 bg-gradient-to-b from-cloud-dancer/10 to-transparent' />
                  <div className='relative'>
                    <div className='mb-2 flex items-center gap-3'>
                      <Icon className={`size-8 shrink-0 ${iconClassName}`} />
                      <h3 className='font-brand-sans font-semibold tracking-[-0.01em] text-cloud-dancer'>
                        {title}
                      </h3>
                    </div>
                    <p className='font-utekos-text text-sm tracking-[-0.02em] text-cloud-dancer/80'>
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
