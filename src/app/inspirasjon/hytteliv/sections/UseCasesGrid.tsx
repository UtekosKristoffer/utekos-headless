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

const useCaseCardThemes = [
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 78%, var(--ancient-water))',
    border: 'color-mix(in oklch, var(--ancient-water) 44%, var(--maritime-darkest))',
    accent: 'var(--ancient-water)',
    iconSurface: 'var(--ancient-water)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 78%, var(--bleached-mauve))',
    border: 'color-mix(in oklch, var(--bleached-mauve) 44%, var(--maritime-darkest))',
    accent: 'var(--bleached-mauve)',
    iconSurface: 'var(--bleached-mauve)',
    icon: 'var(--maritime-darkest)'
  },
  {
    surface: 'color-mix(in oklch, var(--cloud-dancer) 76%, var(--mountain-view))',
    border: 'color-mix(in oklch, var(--mountain-view) 46%, var(--maritime-darkest))',
    accent: 'var(--mountain-view)',
    iconSurface: 'var(--mountain-view)',
    icon: 'var(--cloud-dancer)'
  }
] as const

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-overcast py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl md:max-w-3xl lg:max-w-4xl text-center'>
          <h2 className='text-maritime-darkest text-shadow-background'>Hyttekos fra morgen til kveld</h2>
          <p className='mt-4 utekos-section-lead text-maritime-darkest'>
            Fra første kaffekopp til siste vedkubbe får du varme når hyttedagen ber om det.
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
                  className='group/card relative isolate h-full overflow-hidden rounded-xl border py-0 text-maritime-darkest transition-transform duration-300 hover:-translate-y-1'
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    boxShadow: '0 24px 56px -42px color-mix(in oklch, var(--maritime-darkest) 58%, transparent)'
                  }}
                >
                  <div
                    className='absolute inset-x-0 top-0 h-1 transition-opacity duration-300 group-hover/card:opacity-80'
                    style={{ backgroundColor: theme.accent }}
                  />
                  <CardContent className='relative flex h-full flex-col p-7 sm:p-8'>
                    <div className='mb-6 flex items-start justify-between gap-4'>
                      <div
                        className='flex size-12 items-center justify-center rounded-lg border'
                        style={{
                          backgroundColor: theme.iconSurface,
                          borderColor: theme.border,
                          color: theme.icon
                        }}
                      >
                        <useCase.icon className='size-6' />
                      </div>
                      <p
                        className='rounded-full border px-3 py-1 text-sm leading-[1] font-medium tracking-[-0.01em]'
                        style={{
                          backgroundColor: 'color-mix(in oklch, var(--cloud-dancer) 72%, var(--overcast))',
                          borderColor: theme.border,
                          color: 'var(--maritime-darkest)'
                        }}
                      >
                        {useCase.temperature}
                      </p>
                    </div>
                    <p
                      className='mb-3 font-brand-sans text-sm leading-[1] tracking-[-0.01em]'
                      style={{ color: 'var(--maritime-darkest)' }}
                    >
                      {useCase.time}
                    </p>
                    <h3 className='text-maritime-darkest'>{useCase.title}</h3>
                    <p className='mt-4 text-base leading-[1.45] tracking-[-0.01em] text-maritime-darkest/78'>
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
