import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Flame, Moon, Users, type LucideIcon } from 'lucide-react'
export interface UseCase {
  icon: LucideIcon
  time: string
  title: string
  description: string
  color: string
  iconColor: string
}

export const useCasesData: UseCase[] = [
  {
    icon: Flame,
    time: 'Før maten',
    title: 'Mens grillen blir varm',
    description:
      'Hold gjestene varme og komfortable mens de venter på den perfekte gløden.',
    color: 'from-orange-500/20',
    iconColor: 'text-orange-400'
  },
  {
    icon: Users,
    time: 'Etter maten',
    title: 'Rundt bordet',
    description:
      'Det er nå de gode samtalene starter. Ikke la kulden sette en stopper for hyggen.',
    color: 'from-rose-500/20',
    iconColor: 'text-rose-400'
  },
  {
    icon: Moon,
    time: 'Sent på kvelden',
    title: 'Når stjernene titter frem',
    description:
      'For de som blir igjen. Den ultimate komforten for de siste, rolige timene.',
    color: 'from-indigo-500/20',
    iconColor: 'text-indigo-400'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Gjennom hele kvelden
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Fra de første gjestene ankommer til de siste drar – Utekos sikrer
            komforten.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, caseIndex) => (
            <AnimatedBlock
              key={useCase.title}
              className='will-animate-fade-in-up'
              delay={`${caseIndex * 0.1}s`}
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
                    <p className='font-medium text-primary-foreground'>
                      {useCase.time}
                    </p>
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
