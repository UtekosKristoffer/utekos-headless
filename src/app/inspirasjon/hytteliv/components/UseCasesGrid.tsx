// Path: src/app/inspirasjon/hytteliv/UseCasesGrid.tsx
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Coffee, HeartHandshake, Moon } from 'lucide-react'
import type { UseCase } from '../types'

export const useCasesData: UseCase[] = [
  {
    icon: Coffee,
    time: 'Morgen',
    title: 'Kaffe på en kald terrasse',
    description: 'Nyt soloppgangen og den første kaffekoppen utendørs, varm og komfortabel.',
    temperature: '2-10°C'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Stjernekikking uten å fryse',
    description: 'Forleng de sosiale kveldene rundt bålpannen eller under en klar stjernehimmel.',
    temperature: '4-12°C'
  },
  {
    icon: HeartHandshake,
    time: 'Ankomst',
    title: 'Velkommen til varmen',
    description: 'God ved ankomst til en kald hytte. Få varmen mens du fyrer i peisen.',
    temperature: 'Alle temperaturer'
  }
]

// Super-premium kort-design basert på paletten
const useCaseCardThemes = [
  {
    // Morgen (Lys, varm aksent)
    surface: 'var(--color-cloud-dancer)',
    border: 'color-mix(in oklch, var(--color-maritime-darkest) 8%, transparent)',
    accent: 'var(--color-iced-apricot)',
    iconSurface: 'var(--color-iced-apricot)',
    icon: 'var(--color-maritime-darkest)'
  },
  {
    // Kveld (Kjølig, nattlig aksent)
    surface: 'var(--color-cloud-dancer)',
    border: 'color-mix(in oklch, var(--color-maritime-darkest) 8%, transparent)',
    accent: 'var(--color-very-peri)',
    iconSurface: 'var(--color-very-peri)',
    icon: 'var(--color-cloud-dancer)'
  },
  {
    // Ankomst / Peiskos (Gyllen, lun aksent)
    surface: 'var(--color-cloud-dancer)',
    border: 'color-mix(in oklch, var(--color-maritime-darkest) 8%, transparent)',
    accent: 'var(--color-chai-tea)',
    iconSurface: 'var(--color-chai-tea)',
    icon: 'var(--color-maritime-darkest)'
  }
] as const

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    // Byttet fra grå/overcast til den lyse, naturlige white-sand.
    <section id='bruksomrader' className='bg-white-sand py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center md:max-w-3xl lg:max-w-4xl'>
          <h2 className='text-4xl font-bold tracking-tight text-maritime-darkest md:text-6xl'>
            Hyttekos fra morgen til kveld
          </h2>
          <p className='mt-4 text-lg leading-relaxed text-maritime-darkest/90'>
            Nyt lun varme akkurat når hyttedagen krever det. Fra morgenkaffen skjenkes til kveldens siste
            vedkubbe.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, useCaseIndex) => {
            const theme = useCaseCardThemes[useCaseIndex % useCaseCardThemes.length] ?? useCaseCardThemes[0]

            return (
              <AnimatedBlock
                key={useCase.title}
                className='will-animate-fade-in-up'
                delay={`${useCaseIndex * 0.1}s`}
                threshold={0.2}
              >
                <Card
                  className='group/card relative isolate h-full overflow-hidden rounded-xl border-none transition-all duration-400 hover:-translate-y-2'
                  style={{
                    backgroundColor: theme.surface,
                    boxShadow:
                      '0 20px 40px -15px color-mix(in oklch, var(--color-maritime-darkest) 15%, transparent)'
                  }}
                >
                  {/* Farget stripe på toppen av kortet som binder kortet til sin tid på døgnet */}
                  <div
                    className='absolute inset-x-0 top-0 h-1.5 transition-opacity duration-300 group-hover/card:opacity-90'
                    style={{ backgroundColor: theme.accent }}
                  />

                  {/* Subtil border som ikke bryter kanten over */}
                  <div
                    className='absolute inset-0 border border-t-0 rounded-b-xl pointer-events-none'
                    style={{ borderColor: theme.border }}
                  />

                  <CardContent className='relative flex h-full flex-col p-7 sm:p-8'>
                    <div className='mb-6 flex items-start justify-between gap-4'>
                      <div
                        className='flex size-12 items-center justify-center rounded-xl shadow-sm'
                        style={{
                          backgroundColor: theme.iconSurface,
                          color: theme.icon
                        }}
                      >
                        <useCase.icon className='size-6' />
                      </div>

                      {/* Temperatur-badgen (Eksklusiv mørk stil) */}
                      <p
                        className='rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow-sm'
                        style={{
                          backgroundColor: 'var(--color-maritime-darkest)',
                          color: 'var(--color-cloud-dancer)'
                        }}
                      >
                        {useCase.temperature}
                      </p>
                    </div>

                    <p
                      className='mb-3 font-google-sans text-xs font-bold uppercase tracking-widest'
                      style={{
                        color:
                          theme.accent === 'var(--color-very-peri)' ?
                            'var(--color-very-peri)'
                          : 'var(--color-maritime-darkest)'
                      }}
                    >
                      {useCase.time}
                    </p>
                    <h3 className='text-2xl font-bold leading-tight text-maritime-darkest mb-3'>
                      {useCase.title}
                    </h3>
                    <p className='text-base leading-relaxed text-maritime-darkest/75'>
                      {useCase.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedBlock>
            )
          })}
        </div>
      </div>
    </section>
  )
}
