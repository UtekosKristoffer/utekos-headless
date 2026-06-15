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

const useCaseTokens = [
  'var(--amber-light)', // Morgen
  'var(--woodrose)', // Kveld
  'var(--coral-haze)' // Ankomst
] as const

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-overcast py-24' aria-labelledby='use-cases-heading'>
      <div className='container mx-auto px-4'>
        <header className='mx-auto text-center mb-16 max-w-4xl'>
          <h2
            id='use-cases-heading'
            className='text-subtitle pb-6 md:text-6xl xl:text-7xl tracking-tighter font-bold text-foreground'
          >
            Hyttekos fra morgen til kveld
          </h2>
          <p className='mt-4 text-lg leading-relaxed tracking-tight font-utekos-text-medium text-foreground'>
            Nyt lun varme akkurat når hyttedagen krever det. Fra morgenkaffen skjenkes til kveldens siste
            vedkubbe.
          </p>
        </header>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, index) => {
            const cardTheme = {
              '--card-surface': 'var(--havdyp)',
              '--card-accent': 'var(--fair-orchid)',
              '--card-text-primary': 'var(--foreground)',
              '--card-text-secondary': 'var(--ancient-water)'
            } as React.CSSProperties

            return (
              <AnimatedBlock
                key={useCase.title}
                className='will-animate-fade-in-up group'
                delay={`${index * 0.1}s`}
                threshold={0.2}
              >
                <Card
                  className='relative isolate h-full overflow-hidden rounded-xl bg-(--card-surface) transition-transform duration-300 hover:-translate-y-2'
                  style={cardTheme}
                >
                  <CardContent className='relative flex h-full flex-col p-7 sm:p-8'>
                    <header className='mb-6 flex items-start justify-between gap-4'>
                      <div
                        className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-(--card-accent) shadow-sm'
                        aria-hidden='true'
                      >
                        <useCase.icon className='size-6 text-background' />
                      </div>

                      <span
                        className='rounded-full bg-comfrey px-3 py-1 text-xs font-semibold tracking-wide text-background shadow-sm'
                        aria-label={`Ideell temperatur: ${useCase.temperature}`}
                      >
                        {useCase.temperature}
                      </span>
                    </header>

                    <div className='flex flex-col grow'>
                      <p className='mb-3 font-google-sans text-xs font-bold uppercase tracking-widest text-foreground'>
                        {useCase.time}
                      </p>
                      <h3 className='mb-3 text-2xl font-bold leading-tight text-foreground'>
                        {useCase.title}
                      </h3>
                      <p className='text-base leading-relaxed text-foreground'>{useCase.description}</p>
                    </div>
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
