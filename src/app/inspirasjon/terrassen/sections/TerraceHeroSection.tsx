// Path: src/app/inspirasjon/terrassen/sections/TerraceHeroSection.tsx

import { Coffee, Leaf, Sparkles } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'
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
    <section
      aria-labelledby='terrassen-hero-title'
      className='relative isolate flex min-h-[70vh] items-center overflow-hidden bg-maritime-darkest'
    >
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-24' aria-hidden='true'>
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

      <div
        className='absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--maritime-darkest)_92%,transparent)_100%)]'
        aria-hidden='true'
      />

      <div className='container relative mx-auto px-4 py-16 sm:py-24'>
        <div className='max-w-5xl'>
          <header>
            <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
              <InspirationHeroBreadcrumb
                label='Terrassen'
                color='var(--mountain-view)'
                textColor='var(--cloud-dancer)'
                icon={Sparkles}
              />
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
              <hgroup>
                <h1 id='terrassen-hero-title' className='max-w-3xl text-title text-cloud-dancer'>
                  Din terrasse, <span className='text-primary-button'>hele året</span>
                </h1>

                <p className='mt-6 max-w-2xl utekos-section-lead text-cloud-dancer'>
                  Gjør uteplassen til husets beste rom. Fra den første kaffen i vårsolen til de sene sommerkveldene,
                  nyt øyeblikkene lenger.
                </p>
              </hgroup>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4' delay='0.4s'>
              <InspirationHeroActions primaryLabel='Oppdag din Utekos' secondaryLabel='Se bruksområdene' />
            </AnimatedBlock>
          </header>

          <h2 id='terrassen-hero-highlights-title' className='sr-only'>
            Høydepunkter for terrasseliv med Utekos
          </h2>

          <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.5s'>
            <ul
              aria-labelledby='terrassen-hero-highlights-title'
              className='grid w-full grid-cols-1 gap-5 sm:grid-cols-3'
            >
              {terraceFeatureCards.map(({ title, description, Icon, iconColor, borderColor, background, glow }) => (
                <li key={title}>
                  <Card
                    className='group relative flex aspect-[2/1] w-full flex-col overflow-hidden rounded-xl border py-0 text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
                    style={{
                      borderColor,
                      background,
                      boxShadow: '0 24px 48px -38px color-mix(in oklch, var(--maritime-darkest) 72%, transparent)'
                    }}
                  >
                    <div
                      className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-24'
                      style={{ background: glow }}
                      aria-hidden='true'
                    />
                    <div
                      className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--cloud-dancer)_24%,transparent)_0%,color-mix(in_oklch,var(--cloud-dancer)_8%,transparent)_34%,transparent_100%)]'
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

                      <p className='inspirational-page-hero-card-description pr-2 text-maritime-darkest/88'>
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
