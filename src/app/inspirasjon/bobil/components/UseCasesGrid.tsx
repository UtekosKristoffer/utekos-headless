import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import type { UseCase } from '../types'
import { MoonIcon } from '@heroicons/react/24/outline'
import { Sunrise, Wind } from 'lucide-react'

export const useCasesData: UseCase[] = [
  {
    icon: Sunrise,
    time: 'Morgen',
    title: 'Den kjølige morgenkaffen',
    description: 'Start dagen med kaffe utenfor bobilen, innhyllet i varme mens naturen våkner.',
    temperature: '5-12°C',
    color: 'from-primary/20',
    iconColor: 'text-primary'
  },
  {
    icon: MoonIcon,
    time: 'Kveld',
    title: 'Sosiale kvelder under stjernene',
    description: 'Forleng kvelden med venner og familie uten å la kulden drive dere inn.',
    temperature: '8-15°C',
    color: 'from-ancient-water/20',
    iconColor: 'text-ancient-water'
  },
  {
    icon: Wind,
    time: 'Overgang',
    title: 'Vår og høst-camping',
    description: 'Utvid sesongen og opplev Norge når det er på sitt vakreste.',
    temperature: '3-10°C',
    color: 'from-bleached-mauve/20',
    iconColor: 'text-bleached-mauve'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-overcast py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-4xl text-center'>
          <h2 className='inline-flex flex-nowrap items-baseline justify-center gap-x-[0.18em] whitespace-nowrap font-google-sans text-fluid-display font-bold leading-[0.95] tracking-[-0.01em] text-maritime-darkest'>
            <UtekosWordmark
              className='h-[0.9em] w-auto shrink-0 translate-y-[0.07em]'
              style={{ color: 'var(--maritime-darkest)' }}
            />
            <span>gjennom bobildøgnet</span>
          </h2>

          <p className='mx-auto mt-4 max-w-2xl utekos-section-lead text-maritime-darkest'>
            Fra soloppgang til solnedgang får du varme når turen ber om det.
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
              <Card className='@container relative h-full overflow-hidden border-cloud-dancer/12 bg-havdyp group'>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
                />
                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div className='flex size-12 items-center justify-center rounded-lg border border-cloud-dancer/18 bg-havdyp/24'>
                      <useCase.icon className={`size-6 ${useCase.iconColor}`} />
                    </div>
                    <div>
                      <p className='  text-sm tracking-[-0.02em] text-cloud-dancer'>{useCase.time}</p>
                      <p className='  text-sm font-medium tracking-[-0.02em] text-cloud-dancer/90'>
                        {useCase.temperature}
                      </p>
                    </div>
                  </div>

                  <h3 className='font-google-sans mb-2 text-xl font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer'>
                    {useCase.title}
                  </h3>
                  <p className='  leading-[1.45] tracking-[-0.02em] text-cloud-dancer/90'>
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
