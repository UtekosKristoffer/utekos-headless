// Path: src/app/inspirasjon/terrassen/sections/TerraceIdeasGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Building2, Coffee, Sofa } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

const iconMap = {
  'coffee': Coffee,
  'sofa': Sofa,
  'building2': Building2,
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

  return Icon ? <Icon className={cn('size-5', className)} /> : null
}

type TerraceIdea = {
  name: string
  highlight: string
  icon: IconName
  color: string
}

export const terraceIdeasData: TerraceIdea[] = [
  {
    name: 'Morgenkaffen ute',
    highlight: 'En lun start på dagen',
    icon: 'coffee',
    color: 'text-primary-button'
  },
  {
    name: 'Lounge-området',
    highlight: 'For sosiale kvelder',
    icon: 'sofa',
    color: 'text-bleached-mauve'
  },
  {
    name: 'Balkong-oasen',
    highlight: 'Maksimal komfort, minimal plass',
    icon: 'building2',
    color: 'text-ancient-water'
  },
  {
    name: 'Lesekroken',
    highlight: 'Fordyp deg i en annen verden',
    icon: 'book-open',
    color: 'text-cloud-dancer/88'
  }
]

export function TerraceIdeasGrid({ ideas }: { ideas: TerraceIdea[] }) {
  return (
    <section className='bg-maritime-darkest py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold leading-[0.95] font-utekos-text tracking-tight text-cloud-dancer'>
            Ideer for din uteplass
          </h2>
          <p className='mt-4 text-lg leading-[1.45] font-utekos-text tracking-tight text-cloud-dancer/88'>
            Uansett størrelse på uteplassen din, kan den bli en oase for komfort
            og hygge.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {ideas.map((idea, index) => (
            <AnimatedBlock
              key={idea.name}
              className='will-animate-fade-in-up h-full'
              delay={`${index * 0.1}s`}
            >
              <Card className='group h-full border-cloud-dancer/12 bg-maritime-blue/34 transition-colors duration-300 hover:bg-maritime-blue/46 motion-reduce:transition-none'>
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-start justify-between gap-4'>
                    <h3 className='text-lg font-semibold leading-[1.12] font-utekos-text tracking-tight text-cloud-dancer'>
                      {idea.name}
                    </h3>
                    <IconRenderer
                      name={idea.icon}
                      className={`${idea.color} shrink-0 transition-colors duration-300 group-hover:text-cloud-dancer motion-reduce:transition-none`}
                    />
                  </div>
                  <p className='text-sm leading-[1.45] font-utekos-text tracking-tight text-cloud-dancer/88'>
                    {idea.highlight}
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
