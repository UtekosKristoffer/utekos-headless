import { Coffee, Leaf, Sparkles } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const terraceFeatureCards = [
  {
    title: 'Tidlig vår',
    description: 'Nyt morgenkafffen uker tidligere',
    Icon: Coffee,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 72%, var(--ancient-water))',
    borderColor: 'color-mix(in oklch, var(--ancient-water) 40%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 74%, rgba(255, 255, 255, 0.26)) 0%, color-mix(in oklch, var(--ancient-water) 42%, rgba(16, 24, 30, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--ancient-water) 78%, transparent) 100%)'
  },
  {
    title: 'Sen høst',
    description: 'Forleng sesongen utover september',
    Icon: Leaf,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 70%, var(--soft-warm))',
    borderColor: 'color-mix(in oklch, var(--soft-warm) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--soft-warm) 72%, rgba(255, 255, 255, 0.24)) 0%, color-mix(in oklch, var(--soft-warm) 42%, rgba(20, 24, 28, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--soft-warm) 76%, transparent) 100%)'
  },
  {
    title: 'Hver kveld',
    description: 'Nyt uteplassen når det kjølner',
    Icon: Sparkles,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 74%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 46%, rgba(18, 24, 29, 0.14)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)'
  }
] as const

export function TerraceHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 70%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--soft-warm) 70%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
            <InspirationHeroBreadcrumb
              label='Terrassen'
              color='var(--mountain-view)'
              textColor='var(--cloud-dancer)'
              icon={Sparkles}
            />
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl'>
              Din terrasse,{' '}
              <span className='bg-[linear-gradient(90deg,color-mix(in_oklab,var(--mountain-view)_74%,var(--cloud-dancer)_26%),var(--camping-green),color-mix(in_oklab,var(--mountain-view)_74%,var(--cloud-dancer)_26%))] bg-clip-text text-transparent'>
                hele året
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-[1.45] tracking-normal text-overcast'>
              Gjør uteplassen til husets beste rom. Fra den første kaffen i
              vårsolen til de sene sommerkveldene – nyt øyeblikkene lenger.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <InspirationHeroActions
              primaryLabel='Oppdag din Utekos'
              secondaryLabel='Se bruksområdene'
            />
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            {terraceFeatureCards.map(
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
                  <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_34%,transparent_100%)] opacity-90' />
                  <div className='relative'>
                    <div className='mb-2 flex items-center gap-3'>
                      <Icon
                        className='h-8 w-8 shrink-0'
                        style={{ color: iconColor }}
                      />
                      <p
                        className={
                          title === 'Sen høst' ?
                            'font-semibold text-cloud-dancer'
                          : 'font-semibold text-maritime-darkest'
                        }
                      >
                        {title}
                      </p>
                    </div>
                    <p
                      className={
                        title === 'Sen høst' ?
                          'text-sm text-cloud-dancer/88'
                        : 'text-sm text-maritime-darkest/78'
                      }
                    >
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
