// Path: src/app/inspirasjon/isbading/sections/UseCasesGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Car, Coffee, Users } from 'lucide-react'
import type { UseCase } from '../types'

export const useCasesData: UseCase[] = [
  {
    icon: Users,
    time: 'Før/Etter dykket',
    title: 'Skiftesonen',
    description:
      'Trekk armene inn i varmen og skift av deg vått badetøy uten å bli eksponert for vær og vind.',
    temperature: '-15 til 5°C',
    color: 'from-cyan-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    icon: Car,
    time: 'Transport',
    title: 'Turen hjem',
    description:
      'Sett deg rett i bilen med Utekos på. Beskytt bilsetet mot fukt og behold varmen hele veien hjem.',
    temperature: 'Kald vind',
    color: 'from-blue-600/20',
    iconColor: 'text-blue-500'
  },
  {
    icon: Coffee,
    time: 'Debrief',
    title: 'Kaffen etterpå',
    description:
      'Nyt den sosiale stunden med badeklubben etter badet, mens kroppen jobber seg tilbake til varmen.',
    temperature: 'Alle forhold',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Fra forberedelse til varmen
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Isbading handler om ritualer. Utekos gjør hvert steg i prosessen mer
            behagelig.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, useCaseIndex) => (
            <AnimatedBlock
              key={useCase.title}
              className='will-animate-fade-in-up'
              delay={`${useCaseIndex * 0.1}s`}
              threshold={0.2}
            >
              <Card className='@container relative h-full overflow-hidden border-neutral-800 bg-background group'>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
                />
                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div className='flex size-12 items-center justify-center rounded-lg border border-neutral-700 bg-sidebar-foreground'>
                      <useCase.icon className={`size-6 ${useCase.iconColor}`} />
                    </div>
                    <div>
                      <p className='text-sm text-primary-foreground'>
                        {useCase.time}
                      </p>
                      <p className='text-sm font-medium text-muted-foreground'>
                        {useCase.temperature}
                      </p>
                    </div>
                  </div>
                  <h3 className='mb-2 text-xl font-semibold'>
                    {useCase.title}
                  </h3>
                  <p className='text-muted-foreground'>{useCase.description}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
