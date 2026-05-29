import { Flame, Users, Clock } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const grillFeatureCards = [
  {
    title: 'Ved grillen',
    description: 'Hold varmen mens du steker',
    Icon: Flame,
    iconColor: 'var(--maritime-darkest)',
    borderColor: 'color-mix(in oklch, var(--primary-button) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--primary-button) 78%, var(--cloud-dancer) 22%) 0%, color-mix(in oklch, var(--primary-button) 52%, var(--maritime-darkest) 48%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 32%, color-mix(in oklch, var(--primary-button) 70%, transparent) 100%)'
  },
  {
    title: 'Hele kvelden',
    description: 'La samtalen flyte til langt på natt',
    Icon: Clock,
    iconColor: 'color-mix(in oklch, var(--maritime-darkest) 70%, var(--bleached-mauve))',
    borderColor: 'color-mix(in oklch, var(--bleached-mauve) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--bleached-mauve) 72%, rgba(255, 255, 255, 0.24)) 0%, color-mix(in oklch, var(--bleached-mauve) 40%, rgba(24, 20, 24, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--bleached-mauve) 76%, transparent) 100%)'
  },
  {
    title: 'For gjestene',
    description: 'Alle sitter komfortabelt utendørs',
    Icon: Users,
    iconColor: 'color-mix(in oklch, var(--maritime-darkest) 72%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 44%, rgba(18, 24, 28, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)'
  }
] as const

export function GrillHeroSection() {
  return (
    <section
      aria-labelledby='grillkvelden-hero-title'
      className='relative flex min-h-[70vh] bg-havdyp items-center overflow-hidden'
    >
      <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
        <div
          className='animate-pulse-glow absolute left-1/3 top-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--soft-warm) 72%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='animate-pulse-glow absolute right-1/3 bottom-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 70%, transparent) 0%, transparent 70%)',
            animationDuration: '10s',
            animationDelay: '2s'
          }}
        />
      </div>

      <div
        className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50'
        aria-hidden='true'
      />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-5xl'>
          <header>
            <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
              <InspirationHeroBreadcrumb
                label='Grillkvelden'
                color='var(--havdyp)'
                textColor='var(--cloud-dancer)'
                icon={Flame}
              />
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
              <hgroup>
                <h1 id='grillkvelden-hero-title' className='max-w-4xl text-title text-cloud-dancer'>
                  Grillkvelden som{' '}
                  <span className='bg-[linear-gradient(90deg,color-mix(in_oklab,var(--cloud-dancer)_58%,var(--barely-blue)_42%),var(--ancient-water),color-mix(in_oklab,var(--cloud-dancer)_100%,var(--ancient-water)_60%))] bg-clip-text text-transparent'>
                    aldri tar slutt
                  </span>
                </h1>

                <p className='mt-6 max-w-2xl utekos-section-lead text-cloud-dancer'>
                  Bli verten for de uforglemmelige kveldene, der de gode samtalene og latteren fortsetter
                  lenge etter at den siste pølsen er grillet.
                </p>
              </hgroup>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4' delay='0.4s'>
              <InspirationHeroActions primaryLabel='Bli klar for kvelden' secondaryLabel='Se øyeblikkene' />
            </AnimatedBlock>
          </header>

          <h2 id='grillkvelden-hero-highlights-title' className='sr-only'>
            Høydepunkter for grillkvelden med Utekos
          </h2>

          <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.5s'>
            <ul
              aria-labelledby='grillkvelden-hero-highlights-title'
              className='grid w-full grid-cols-1 gap-5 sm:grid-cols-3'
            >
              {grillFeatureCards.map(
                ({ title, description, Icon, iconColor, borderColor, background, glow }) => (
                  <li key={title}>
                    <Card
                      className='group relative flex aspect-[2/1] w-full flex-col overflow-hidden rounded-xl border py-0 text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
                      style={{
                        borderColor,
                        background,
                        boxShadow: '0 24px 48px -38px rgba(9, 15, 22, 0.42)'
                      }}
                    >
                      <div
                        className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                        style={{ background: glow }}
                        aria-hidden='true'
                      />
                      <div
                        className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.08)_34%,transparent_100%)] opacity-90'
                        aria-hidden='true'
                      />

                      <CardContent className='relative flex h-full flex-col gap-3 p-5'>
                        <div className='flex items-center gap-3'>
                          <div
                            className='flex size-10 shrink-0 items-center justify-center rounded-lg border border-maritime-darkest/12 bg-cloud-dancer/38'
                            aria-hidden='true'
                          >
                            <Icon className='size-5' style={{ color: iconColor }} focusable='false' />
                          </div>

                          <h3 className='inspirational-page-hero-card-heading whitespace-nowrap text-maritime-darkest'>
                            {title}
                          </h3>
                        </div>

                        <p className='inspirational-page-hero-card-description pr-2 text-maritime-darkest/78'>
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  </li>
                )
              )}
            </ul>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
