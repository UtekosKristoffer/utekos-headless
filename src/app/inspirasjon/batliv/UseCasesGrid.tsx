// Path: src/app/inspirasjon/batliv/UseCasesGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Moon, Sunrise, Wind, type LucideIcon } from 'lucide-react'

interface UseCase {
  icon: LucideIcon
  time: string
  title: string
  description: string
  temperature: string
  color: string
  iconColor: string
}

export const useCasesData: UseCase[] = [
  {
    icon: Sunrise,
    time: 'Morgen',
    title: 'Kaffe i havgapet',
    description: 'Nyt en stille morgen for anker med kaffekoppen, uansett hvor frisk brisen er.',
    temperature: '8-15°C',
    color: 'from-primary/20',
    iconColor: 'text-primary'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Bryggekos som varer',
    description: 'Bli samlingspunktet i gjestehavna. Forleng de sosiale kveldene uten å fryse.',
    temperature: '10-18°C',
    color: 'from-dusted-peri/20',
    iconColor: 'text-dusted-peri'
  },
  {
    icon: Wind,
    time: 'Underveis',
    title: 'Når vinden biter',
    description: 'Perfekt for å holde varmen i cockpiten når du seiler eller på flybridgen i motvind.',
    temperature: 'Alle temperaturer',
    color: 'from-ancient-water/20',
    iconColor: 'text-ancient-water'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='py-24 bg-overcast'>
      <div className='container mx-auto px-4'>
        <div className='mb-16 text-center'>
          <h2 className='mx-auto text-maritime-darkest max-w-3xl'>Utekos gjennom båtdøgnet</h2>
          <p className='mx-auto mt-4 max-w-2xl utekos-section-lead text-maritime-darkest'>
            Fra soloppgang i uthavn til sene kvelder ved brygga – Utekos holder deg varm.
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
              <Card className='group relative text-cloud-dancer h-full overflow-hidden border-cloud-dancer/12 bg-havdyp'>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
                />
                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-cloud-dancer/18 bg-havdyp/24'>
                      <useCase.icon className={`h-6 w-6 ${useCase.iconColor}`} />
                    </div>
                    <div>
                      <p className='text-sm text-cloud-dancer'>{useCase.time}</p>
                      <p className='text-sm font-medium text-cloud-dancer'>{useCase.temperature}</p>
                    </div>
                  </div>
                  <h3 className='mb-2 text-xl font-semibold'>{useCase.title}</h3>
                  <p className='text-cloud-dancer'>{useCase.description}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
