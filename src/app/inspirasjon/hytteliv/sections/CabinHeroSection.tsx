import { Coffee, Mountain, Star } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const heroFeatureCards = [
  {
    title: 'Morgenstund',
    description: 'Nyt morgenkaffeen ute i frisk fjellluft',
    Icon: Coffee,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 72%, var(--ancient-water))',
    borderColor: 'color-mix(in oklch, var(--ancient-water) 38%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 74%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--ancient-water) 42%, rgba(19, 27, 33, 0.18)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--ancient-water) 78%, transparent) 100%)'
  },
  {
    title: 'Utsikten',
    description: 'Nyt panoramaet i komfort, hele dagen',
    Icon: Mountain,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 74%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 46%, rgba(18, 24, 29, 0.14)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)'
  },
  {
    title: 'Stjerneklar kveld',
    description: 'Forleng kveldene under natthimmelen',
    Icon: Star,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 72%, var(--bleached-mauve))',
    borderColor: 'color-mix(in oklch, var(--bleached-mauve) 38%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--bleached-mauve) 72%, rgba(255, 255, 255, 0.24)) 0%, color-mix(in oklch, var(--bleached-mauve) 40%, rgba(18, 23, 29, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--bleached-mauve) 78%, transparent) 100%)'
  }
] as const

export function CabinHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='animate-pulse-glow absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 72%, transparent) 0%, transparent 70%)',
            animationDuration: '9s'
          }}
        />
        <div
          className='animate-pulse-glow absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 68%, transparent) 0%, transparent 70%)',
            animationDuration: '11s',
            animationDelay: '3s'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

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
            <h1 className='text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl'>
              Hyttekos -{' '}
              <span className='bg-[linear-gradient(90deg,var(--ancient-water),var(--country-air),var(--ancient-water))] bg-clip-text text-transparent'>
                perfeksjonert
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-[1.45] tracking-normal text-cloud-dancer'>
              Fra den krystallklare morgenluften på terrassen, til de magiske
              kveldene under stjernene. Gjør hytten til et fristed for komfort,
              uansett årstid.
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
            {heroFeatureCards.map(
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
                    boxShadow: '0 24px 48px -38px rgba(9, 15, 22, 0.45)'
                  }}
                >
                  <div
                    className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                    style={{ background: glow }}
                  />
                  <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_34%,transparent_100%)] opacity-90' />
                  <div className='relative'>
                    <div className='mb-2 flex items-center gap-3'>
                      <Icon
                        className='h-8 w-8 shrink-0'
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
