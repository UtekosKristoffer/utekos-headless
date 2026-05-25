// Path: src/app/inspirasjon/terrassen/sections/TerraceHeroSection.tsx

import { Coffee, Leaf, Sparkles } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'

const terraceFeatureCards = [
  {
    title: 'Tidlig vår',
    description: 'Nyt morgenkaffen uker tidligere',
    Icon: Coffee,
    iconColor: 'color-mix(in oklch, var(--maritime-darkest) 78%, var(--ancient-water))',
    borderColor: 'color-mix(in oklch, var(--ancient-water) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 82%, var(--cloud-dancer) 18%) 0%, color-mix(in oklch, var(--ancient-water) 58%, var(--maritime-darkest) 42%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 32%, color-mix(in oklch, var(--ancient-water) 74%, transparent) 100%)'
  },
  {
    title: 'Sen høst',
    description: 'Forleng sesongen',
    Icon: Leaf,
    iconColor: 'color-mix(in oklch, var(--mountain-view) 68%, var(--maritime-darkest) 32%)',
    borderColor: 'color-mix(in oklch, var(--mountain-view) 38%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 86%, var(--cloud-dancer) 14%) 0%, color-mix(in oklch, var(--mountain-view) 28%, var(--overcast) 72%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 34%, color-mix(in oklch, var(--mountain-view) 54%, transparent) 100%)'
  },
  {
    title: 'Hver kveld',
    description: 'Nyt uteplassen når det kjølner',
    Icon: Sparkles,
    iconColor: 'color-mix(in oklch, var(--maritime-darkest) 78%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 86%, var(--cloud-dancer) 14%) 0%, color-mix(in oklch, var(--overcast) 52%, var(--maritime-darkest) 48%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 32%, color-mix(in oklch, var(--overcast) 78%, transparent) 100%)'
  }
] as const

export function TerraceHeroSection() {
  return (
    <section className='relative isolate flex min-h-[70vh] items-center overflow-hidden bg-maritime-darkest'>
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-24'>
        <div
          className='absolute left-[8%] top-[12%] size-[38rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 58%, transparent) 0%, transparent 68%)'
          }}
        />
        <div
          className='absolute bottom-[8%] right-[6%] size-[34rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--primary-button) 34%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--maritime-darkest)_92%,transparent)_100%)]' />

      <div className='container relative mx-auto px-4 py-16 sm:py-24'>
        <div className='max-w-3xl'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
            <InspirationHeroBreadcrumb
              label='Terrassen'
              color='var(--mountain-view)'
              textColor='var(--cloud-dancer)'
              icon={Sparkles}
            />
          </AnimatedBlock>

          <hgroup>
            <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
              <h1 className='max-w-2xl text-cloud-dancer'>
                Din terrasse, <span className='text-primary-button'>hele året</span>
              </h1>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
              <p className='mt-6 max-w-2xl text-cloud-dancer'>
                Gjør uteplassen til husets beste rom. Fra den første kaffen i vårsolen til de sene sommerkveldene – nyt
                øyeblikkene lenger.
              </p>
            </AnimatedBlock>
          </hgroup>

          <AnimatedBlock className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4' delay='0.4s'>
            <InspirationHeroActions primaryLabel='Oppdag din Utekos' secondaryLabel='Se bruksområdene' />
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6'
            delay='0.5s'
          >
            {terraceFeatureCards.map(({ title, description, Icon, iconColor, borderColor, background, glow }) => (
              <div
                key={title}
                className='group relative overflow-hidden rounded-[1.35rem] border p-4 transition-transform duration-300 hover:-translate-y-0.5'
                style={{
                  borderColor,
                  background,
                  boxShadow: '0 24px 48px -38px color-mix(in oklch, var(--maritime-darkest) 72%, transparent)'
                }}
              >
                <div
                  className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-24'
                  style={{ background: glow }}
                />
                <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--cloud-dancer)_24%,transparent)_0%,color-mix(in_oklch,var(--cloud-dancer)_8%,transparent)_34%,transparent_100%)]' />
                <div className='relative'>
                  <div className='mb-2 flex items-center gap-3'>
                    <Icon className='size-8 shrink-0' style={{ color: iconColor }} aria-hidden='true' />
                    <p className='font-semibold leading-[1.25] font-google-sans tracking-tight text-maritime-darkest'>
                      {title}
                    </p>
                  </div>
                  <p className='text-sm leading-[1.45] font-utekos-text tracking-tight text-maritime-darkest/88'>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
