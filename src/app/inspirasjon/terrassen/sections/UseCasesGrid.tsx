// Path: src/app/inspirasjon/terrassen/sections/UseCasesGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Coffee, Moon } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

const iconMap = {
  'coffee': Coffee,
  'moon': Moon,
  'book-open': BookOpen
}

const useCaseSurfaces = {
  morning: {
    borderColor: 'color-mix(in oklch, var(--primary-button) 28%, transparent)',
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--maritime-darkest) 84%, var(--primary-button) 16%) 0%, color-mix(in oklch, var(--maritime-blue) 76%, var(--maritime-darkest) 24%) 100%)',
    iconBackground: 'color-mix(in oklch, var(--primary-button) 18%, var(--maritime-darkest) 82%)',
    iconBorder: 'color-mix(in oklch, var(--primary-button) 34%, transparent)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 34%, color-mix(in oklch, var(--primary-button) 40%, transparent) 100%)'
  },
  evening: {
    borderColor: 'color-mix(in oklch, var(--dusted-peri) 34%, transparent)',
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--maritime-darkest) 82%, var(--dusted-peri) 18%) 0%, color-mix(in oklch, var(--maritime-blue) 78%, var(--maritime-darkest) 22%) 100%)',
    iconBackground: 'color-mix(in oklch, var(--dusted-peri) 18%, var(--maritime-darkest) 82%)',
    iconBorder: 'color-mix(in oklch, var(--dusted-peri) 36%, transparent)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 34%, color-mix(in oklch, var(--dusted-peri) 42%, transparent) 100%)'
  },
  afternoon: {
    borderColor: 'color-mix(in oklch, var(--ancient-water) 34%, transparent)',
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--maritime-darkest) 82%, var(--ancient-water) 18%) 0%, color-mix(in oklch, var(--mountain-view) 32%, var(--maritime-darkest) 68%) 100%)',
    iconBackground: 'color-mix(in oklch, var(--ancient-water) 16%, var(--maritime-darkest) 84%)',
    iconBorder: 'color-mix(in oklch, var(--ancient-water) 34%, transparent)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 34%, color-mix(in oklch, var(--ancient-water) 38%, transparent) 100%)'
  }
} as const

type IconName = keyof typeof iconMap
type UseCaseSurface = keyof typeof useCaseSurfaces

function IconRenderer({ name, className }: { name: IconName; className?: string }) {
  const Icon = iconMap[name]

  return Icon ? <Icon className={cn('size-6', className)} /> : null
}

type UseCase = {
  icon: IconName
  time: string
  title: string
  description: string
  iconColor: string
  surface: UseCaseSurface
}

export const useCasesData: UseCase[] = [
  {
    icon: 'coffee',
    time: 'Morgen',
    title: 'Den første vårkaffen',
    description: 'Start dagen i frisk luft uten å fryse. Nyt roen før resten av verden våkner.',
    iconColor: 'text-primary-button',
    surface: 'morning'
  },
  {
    icon: 'moon',
    time: 'Kveld',
    title: 'Sene sommerkvelder',
    description: 'Ikke la duggfallet jage deg inn. Forleng de gode samtalene under stjernene.',
    iconColor: 'text-dusted-peri',
    surface: 'evening'
  },
  {
    icon: 'book-open',
    time: 'Ettermiddag',
    title: 'En rolig lesestund',
    description: 'Finn roen med en god bok og en kopp te på en kjølig høstdag, pakket inn i varme.',
    iconColor: 'text-ancient-water',
    surface: 'afternoon'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-maritime-blue py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl lg:max-w-4xl text-center'>
          <h2 className='text-cloud-dancer'>Hjemmekos, bare ute</h2>
          <p className='mt-4 mx-auto utekos-section-lead max-w-2xl text-cloud-dancer'>
            Fra en stille stund for deg selv, til sosiale lag som varer lenger.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, index) => {
            const surface = useCaseSurfaces[useCase.surface]

            return (
              <AnimatedBlock
                key={useCase.title}
                className='will-animate-fade-in-up h-full'
                delay={`${index * 0.1}s`}
              >
                <Card
                  className='@container group relative h-full overflow-hidden border shadow-[0_24px_60px_-44px_color-mix(in_oklch,var(--maritime-darkest)_88%,transparent)]'
                  style={{
                    borderColor: surface.borderColor,
                    background: surface.background
                  }}
                >
                  <div
                    className='pointer-events-none absolute -inset-x-8 -top-24 h-56 opacity-24 blur-3xl transition-opacity duration-300 group-hover:opacity-34'
                    style={{ background: surface.glow }}
                  />

                  <CardContent className='relative p-8'>
                    <div className='mb-6 flex items-center gap-4'>
                      <div
                        className='flex size-12 items-center justify-center rounded-full border'
                        style={{
                          borderColor: surface.iconBorder,
                          background: surface.iconBackground
                        }}
                      >
                        <IconRenderer name={useCase.icon} className={useCase.iconColor} />
                      </div>
                      <p className='font-medium leading-[1.35] font-utekos-text tracking-tight text-cloud-dancer/78'>
                        {useCase.time}
                      </p>
                    </div>
                    <h3 className='mb-2 text-xl font-semibold leading-[1.1] font-utekos-text tracking-tight text-cloud-dancer'>
                      {useCase.title}
                    </h3>
                    <p className='leading-[1.45] font-utekos-text tracking-tight text-cloud-dancer/88'>
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
