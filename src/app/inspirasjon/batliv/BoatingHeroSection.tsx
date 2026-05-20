// BoatingHeroSection.tsx (Server Component - ingen 'use client' nødvendig!)
import { Anchor, Waves, Sun } from 'lucide-react'
import { InspirationHeroActions } from '../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../layout/InspirationHeroBreadcrumb'

const boatingFeatureCards = [
  {
    title: 'Soloppgang',
    description: 'Nyt morgenkaffeen i cockpiten',
    Icon: Sun,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 70%, var(--soft-warm))',
    borderColor: 'color-mix(in oklch, var(--soft-warm) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--soft-warm) 72%, rgba(255, 255, 255, 0.24)) 0%, color-mix(in oklch, var(--soft-warm) 42%, rgba(20, 24, 28, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--soft-warm) 78%, transparent) 100%)'
  },
  {
    title: 'Hele kvelden',
    description: 'Forleng tiden på dekk etter solnedgang',
    Icon: Waves,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 72%, var(--ancient-water))',
    borderColor: 'color-mix(in oklch, var(--ancient-water) 40%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 74%, rgba(255, 255, 255, 0.26)) 0%, color-mix(in oklch, var(--ancient-water) 42%, rgba(16, 24, 30, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--ancient-water) 78%, transparent) 100%)'
  },
  {
    title: 'Lengre sesong',
    description: 'Nyt båten fra tidlig vår til sen høst',
    Icon: Anchor,
    iconColor:
      'color-mix(in oklch, var(--maritime-darkest) 74%, var(--overcast))',
    borderColor: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    background:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 46%, rgba(18, 24, 29, 0.14)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)'
  }
] as const

export function BoatingHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow with subtle animation */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='boat-hero-glow-1 absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 72%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='boat-hero-glow-2 absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--overcast) 72%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='boat-hero-content max-w-3xl'>
          <div className='boat-hero-breadcrumb'>
            <InspirationHeroBreadcrumb
              label='Båtliv'
              color='var(--dusted-peri)'
              textColor='var(--maritime-darkest)'
              icon={Anchor}
            />
          </div>

          <h1 className='boat-hero-title text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl'>
            Båtliv uten{' '}
            <span className='bg-[linear-gradient(90deg,var(--dusted-peri),var(--sweet-lavender),var(--dusted-peri))] bg-clip-text text-transparent'>
              å fryse
            </span>
          </h1>

          <p className='boat-hero-text mt-6 max-w-2xl text-xl leading-[1.45] tracking-normal text-overcast'>
            Fra den første kaffen i soloppgang til ankerdrammen under stjernene.
            Opplev en lengre og mer komfortabel båtsesong med varme som varer.
          </p>

          <div className='boat-hero-buttons mt-8 flex flex-wrap gap-4'>
            <InspirationHeroActions
              primaryLabel='Se produkter for båtfolket'
              secondaryLabel='Utforsk mulighetene'
            />
          </div>

          {/* Feature highlights */}
          <div className='boat-hero-features mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'>
            {boatingFeatureCards.map(
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
                    className='boat-hero-feature-glow absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
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
          </div>
        </div>
      </div>
    </section>
  )
}
