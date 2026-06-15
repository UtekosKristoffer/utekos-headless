import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { Flame, Moon, Users } from 'lucide-react'
import type { UseCase } from '../types'

export const useCasesData: UseCase[] = [
  {
    icon: Flame,
    time: 'Før maten',
    title: 'Mens grillen blir varm',
    description: 'Hold gjestene komfortable mens de venter på den perfekte gløden.',
    color: 'bg-demitasse',
    iconColor: 'text-almost-mauve',
    iconBackground: 'bg-amphora'
  },
  {
    icon: Users,
    time: 'Etter maten',
    title: 'Rundt bordet',
    description: 'La de gode samtalene fortsette når temperaturen faller.',
    color: 'bg-demitasse',
    iconColor: 'text-almost-mauve',
    iconBackground: 'bg-amphora'
  },
  {
    icon: Moon,
    time: 'Sent på kvelden',
    title: 'Når stjernene titter frem',
    description: 'For de som blir igjen — komfort som varer til den siste samtalen.',
    color: 'bg-demitasse',
    iconColor: 'text-almost-mauve',
    iconBackground: 'bg-amphora'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-overcast py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-4xl text-center'>
          <h2 className='inline-flex flex-wrap items-baseline justify-center gap-x-[0.18em] text-fluid-display-bold text-background'>
            Utekos gjennom hele kvelden
          </h2>
          <p className='mx-auto mt-4 max-w-2xl utekos-section-lead text-background/82'>
            Fra første gjest ankommer til de siste drar — komfort som holder stemningen oppe.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, caseIndex) => (
            <AnimatedBlock
              key={useCase.title}
              className='will-animate-fade-in-up h-full'
              delay={`${caseIndex * 0.1}s`}
              threshold={0.2}
            >
              <Card
                className={`@container group relative h-full overflow-hidden border-cloud-dancer/12 ${useCase.color}`}
              >
                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-full border border-cloud-dancer/18 ${useCase.iconBackground}`}
                    >
                      <useCase.icon className={`size-6 ${useCase.iconColor}`} aria-hidden />
                    </div>
                    <p className='  text-sm font-medium tracking-[-0.02em] text-ancient-water'>
                      {useCase.time}
                    </p>
                  </div>

                  <h3 className='mb-2 text-xl font-semibold leading-[1.1] tracking-[-0.01em] text-cloud-dancer'>
                    {useCase.title}
                  </h3>
                  <p className='  text-sm leading-text-paragraph tracking-[-0.02em] text-ancient-water'>
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
