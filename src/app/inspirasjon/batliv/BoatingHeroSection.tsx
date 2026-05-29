// BoatingHeroSection.tsx (Server Component - ingen 'use client' nødvendig!)
import { Anchor, Waves, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { InspirationHeroActions } from '../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../layout/InspirationHeroBreadcrumb'

const boatingFeatureCards = [
  {
    title: 'Soloppgang',
    description: 'Nyt morgenkaffeen i cockpiten',
    Icon: Sun,
    iconColor: 'color-mix(in oklch, var(--bleached-mauve) 70%, var(--bleached-mauve',
    borderColor: 'color-mix(in oklch, var(--bleached-mauve) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--bleached-mauve) 10%, rgba(207, 160, 157, 1) 10%, color-mix(in oklch, var(--bleached-mauve) 42%, rgba(20, 24, 28, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--bleached-mauve) 78%, transparent) 100%)'
  },
  {
    title: 'Hele kvelden',
    description: 'Forleng tiden på dekk etter solnedgang',
    Icon: Waves,
    iconColor: 'color-mix(in oklch, var(--maritime-darkest) 72%, var(--ancient-water))',
    borderColor: 'color-mix(in oklch, var(--ancient-water) 40%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 74%, rgba(255, 255, 255, 0.26)) 0%, color-mix(in oklch, var(--ancient-water) 42%, rgba(16, 24, 30, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--ancient-water) 78%, transparent) 100%)'
  },
  {
    title: 'Lengre sesong',
    description: 'Nyt båten fra tidlig vår til sen høst',
    Icon: Anchor,
    iconColor: 'color-mix(in oklch, var(--maritime-darkest) 74%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 46%, rgba(18, 24, 29, 0.14)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)'
  }
] as const

export function BoatingHeroSection() {
  return (
    <section
      aria-labelledby='batliv-hero-title'
      className='relative flex min-h-[70vh] bg-havdyp items-center overflow-hidden'
    >
      <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
        <div
          className='boat-hero-glow-1 absolute left-1/3 top-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 72%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='boat-hero-glow-2 absolute right-1/3 bottom-1/4 size-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--overcast) 72%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div
        className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50'
        aria-hidden='true'
      />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='boat-hero-content max-w-5xl'>
          <header>
            <div className='boat-hero-breadcrumb'>
              <InspirationHeroBreadcrumb
                label='Båtliv'
                color='var(--dusted-peri)'
                textColor='var(--maritime-darkest)'
                icon={Anchor}
              />
            </div>

            <hgroup>
              <h1 id='batliv-hero-title' className='boat-hero-title max-w-3xl text-title text-cloud-dancer'>
                Båtliv uten{' '}
                <span className='bg-[linear-gradient(90deg,var(--dusted-peri),var(--sweet-lavender),var(--dusted-peri))] bg-clip-text text-transparent'>
                  å fryse
                </span>
              </h1>

              <p className='boat-hero-text mt-6 max-w-2xl utekos-section-lead text-cloud-dancer'>
                Fra den første kaffen i soloppgang til ankerdrammen under stjernene. Opplev en lengre og mer
                komfortabel båtsesong med varme som varer.
              </p>
            </hgroup>

            <div className='boat-hero-buttons mt-8 flex flex-wrap gap-4'>
              <InspirationHeroActions
                primaryLabel='Se produkter for båtfolket'
                secondaryLabel='Utforsk mulighetene'
              />
            </div>
          </header>

          <h2 id='batliv-hero-highlights-title' className='sr-only'>
            Høydepunkter for båtliv med Utekos
          </h2>

          <ul
            aria-labelledby='batliv-hero-highlights-title'
            className='boat-hero-features mt-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-3'
          >
            {boatingFeatureCards.map(
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
                      className='boat-hero-feature-glow absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                      style={{ background: glow }}
                      aria-hidden='true'
                    />
                    <div
                      className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_34%,transparent_100%)] opacity-90'
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
        </div>
      </div>
    </section>
  )
}
