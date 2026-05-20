import { Flame, Users, Clock } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const grillFeatureCards = [
  {
    title: 'Ved grillen',
    description: 'Hold varmen mens du steker',
    Icon: Flame,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 68%, var(--soft-warm))',
    borderColor: 'color-mix(in oklch, var(--soft-warm) 44%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--soft-warm) 72%, rgba(255, 255, 255, 0.24)) 0%, color-mix(in oklch, var(--soft-warm) 42%, rgba(25, 20, 18, 0.18)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--soft-warm) 78%, transparent) 100%)'
  },
  {
    title: 'Hele kvelden',
    description: 'La samtalen flyte til langt på natt',
    Icon: Clock,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 70%, var(--bleached-mauve))',
    borderColor: 'color-mix(in oklch, var(--bleached-mauve) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--bleached-mauve) 72%, rgba(255, 255, 255, 0.24)) 0%, color-mix(in oklch, var(--bleached-mauve) 40%, rgba(24, 20, 24, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--bleached-mauve) 76%, transparent) 100%)'
  },
  {
    title: 'For gjestene',
    description: 'Alle sitter komfortabelt utendørs',
    Icon: Users,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 72%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 44%, rgba(18, 24, 28, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)'
  }
] as const

export function GrillHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow with CSS animation */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='animate-pulse-glow absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--soft-warm) 72%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='animate-pulse-glow absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 70%, transparent) 0%, transparent 70%)',
            animationDuration: '10s',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
            <InspirationHeroBreadcrumb
              label='Grillkvelden'
              color='var(--maritime-blue)'
              textColor='var(--cloud-dancer)'
              icon={Flame}
            />
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl'>
              Grillkvelden som{' '}
              <span className='bg-[linear-gradient(90deg,color-mix(in_oklab,var(--maritime-blue)_58%,var(--cloud-dancer)_42%),var(--skipper-blue),color-mix(in_oklab,var(--maritime-blue)_58%,var(--cloud-dancer)_42%))] bg-clip-text text-transparent'>
                aldri tar slutt
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-[1.45] tracking-normal text-overcast'>
              Bli verten for de uforglemmelige kveldene, der de gode samtalene
              og latteren fortsetter lenge etter at den siste pølsen er grillet.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <InspirationHeroActions
              primaryLabel='Bli klar for kvelden'
              secondaryLabel='Se øyeblikkene'
            />
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            {grillFeatureCards.map(
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
                    boxShadow: '0 24px 48px -38px rgba(9, 15, 22, 0.42)'
                  }}
                >
                  <div
                    className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                    style={{ background: glow }}
                  />
                  <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.08)_34%,transparent_100%)] opacity-90' />
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
