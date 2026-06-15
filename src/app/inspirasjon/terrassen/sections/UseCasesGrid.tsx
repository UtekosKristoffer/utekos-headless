// Path: src/app/inspirasjon/terrassen/sections/UseCasesGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Coffee, Moon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

type UseCase = {
  icon: LucideIcon
  time: string
  title: string
  description: string
}

export const useCasesData: UseCase[] = [
  {
    icon: Coffee,
    time: 'Morgen',
    title: 'Den første vårkaffen',
    description: 'Start dagen i frisk luft uten å fryse. Nyt roen før resten av verden våkner.'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Sene sommerkvelder',
    description: 'Ikke la duggfallet jage deg inn. Forleng de gode samtalene under stjernene.'
  },
  {
    icon: BookOpen,
    time: 'Ettermiddag',
    title: 'En rolig lesestund',
    description: 'Finn roen med en god bok og en kopp te på en kjølig høstdag, pakket inn i varme.'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-havdyp py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl text-center lg:max-w-4xl'>
          <h2 className='text-cloud-dancer'>Hjemmekos, bare ute</h2>
          <p className='mx-auto mt-4 max-w-2xl utekos-section-lead text-foreground'>
            Fra en stille stund for deg selv, til sosiale lag som varer lenger.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon

            return (
              <AnimatedBlock
                key={useCase.title}
                className='will-animate-fade-in-up h-full'
                delay={`${index * 0.1}s`}
              >
                <Card className='@container group h-full overflow-hidden border border-brandied-apricot bg-peach-fuzz shadow-[0_24px_60px_-44px_color-mix(in_oklch,var(--background)_88%,transparent)]'>
                  <CardContent className='relative p-8'>
                    <div className='mb-6 flex items-center gap-4'>
                      <div className='flex size-12 items-center justify-center rounded-full border border-background/16 bg-cloud-dancer text-background'>
                        <Icon className='size-6' aria-hidden='true' />
                      </div>
                      <p className='font-medium leading-[1.35] text-background'>{useCase.time}</p>
                    </div>
                    <h3 className='mb-2 text-xl font-semibold leading-[1.1] text-background'>
                      {useCase.title}
                    </h3>
                    <p className='leading-text-paragraph text-background'>{useCase.description}</p>
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
