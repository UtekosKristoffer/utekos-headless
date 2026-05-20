import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Coffee, Moon } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

// --- Typer og hjelpere ---
const iconMap = {
  coffee: Coffee,
  moon: Moon,
  'book-open': BookOpen
}
type IconName = keyof typeof iconMap

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={cn('size-6', className)} /> : null
}

type UseCase = {
  icon: IconName
  time: string
  title: string
  description: string
  color: string
  iconColor: string
}

export const useCasesData: UseCase[] = [
  {
    icon: 'coffee',
    time: 'Morgen',
    title: 'Den første vårkaffen',
    description:
      'Start dagen i frisk luft uten å fryse. Nyt roen før resten av verden våkner.',
    color: 'from-primary-button/20',
    iconColor: 'text-primary-button'
  },
  {
    icon: 'moon',
    time: 'Kveld',
    title: 'Sene sommerkvelder',
    description:
      'Ikke la duggfallet jage deg inn. Forleng de gode samtalene under stjernene.',
    color: 'from-dusted-peri/20',
    iconColor: 'text-dusted-peri'
  },
  {
    icon: 'book-open',
    time: 'Ettermiddag',
    title: 'En rolig lesestund',
    description:
      'Finn roen med en god bok og en kopp te på en kjølig høstdag, pakket inn i varme.',
    color: 'from-emerald-500/20',
    iconColor: 'text-emerald-500'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-maritime-blue/24 py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-normal'>
            Hjemmekos, bare ute
          </h2>
          <p className='mt-4 text-lg text-overcast'>
            Fra en stille stund for deg selv, til sosiale lag som varer lenger.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, index) => (
            <AnimatedBlock
              key={useCase.title}
              className='will-animate-fade-in-up h-full'
              delay={`${index * 0.1}s`}
            >
              <Card className='@container group relative h-full overflow-hidden border-cloud-dancer/12 bg-maritime-darkest'>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
                />
                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div className='flex size-12 items-center justify-center rounded-lg border border-cloud-dancer/18 bg-maritime-blue/24'>
                      <IconRenderer
                        name={useCase.icon}
                        className={useCase.iconColor}
                      />
                    </div>
                    <p className='font-medium text-overcast'>
                      {useCase.time}
                    </p>
                  </div>
                  <h3 className='mb-2 text-xl font-semibold'>
                    {useCase.title}
                  </h3>
                  <p className='text-overcast'>{useCase.description}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}