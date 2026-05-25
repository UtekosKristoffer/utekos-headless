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

function IconRenderer({ name, className }: { name: IconName; className?: string }) {
  const Icon = iconMap[name]

  return Icon ? <Icon className={cn('size-6 md:size-7', className)} /> : null
}

type TerraceIdea = {
  name: string
  highlight: string
  icon: IconName
  color: string
  bgColor: string
}

export const terraceIdeasData: TerraceIdea[] = [
  {
    name: 'Morgenkaffen ute',
    highlight: 'En lun start på dagen',
    icon: 'coffee',
    color: 'text-maritime-darkest',
    bgColor: 'color-mix(in oklch, var(--cloud-dancer) 90%, transparent)'
  },
  {
    name: 'Lounge-området',
    highlight: 'For sosiale kvelder',
    icon: 'sofa',
    color: 'text-maritime-darkest',
    bgColor: 'color-mix(in oklch, var(--ancient-water) 90%, transparent)'
  },
  {
    name: 'Balkong-oasen',
    highlight: 'Maksimal komfort, minimal plass',
    icon: 'building2',
    color: 'text-maritime-darkest',
    bgColor: 'color-mix(in oklch, var(--bleached-mauve) 90%, transparent)'
  },
  {
    name: 'Lesekroken',
    highlight: 'Fordyp deg i en annen verden',
    icon: 'book-open',
    color: 'text-maritime-darkest',
    bgColor: 'color-mix(in oklch, var(--primary-button) 90%, transparent)'
  }
]

export function TerraceIdeasGrid({ ideas }: { ideas: TerraceIdea[] }) {
  return (
    <section className='bg-maritime-darkest py-24 md:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl md:max-w-4xl text-center'>
          <h2 className=' text-cloud-dancer'>Ideer for din uteplass</h2>
          <p className='mt-4 utekos-section-lead max-w-2xl text-cloud-dancer'>
            Uansett størrelse på uteplassen din, kan den bli en oase for komfort og hygge.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {ideas.map((idea, index) => (
            <AnimatedBlock
              key={idea.name}
              className='will-animate-fade-in-up h-full'
              delay={`${index * 0.1}s`}
            >
              <Card
                style={{ backgroundColor: idea.bgColor }}
                className='group h-full border-cloud-dancer/12 transition-colors duration-300 motion-reduce:transition-none'
              >
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-center gap-2'>
                    <IconRenderer
                      name={idea.icon}
                      className={`${idea.color} shrink-0 transition-colors duration-300 group-hover:text-maritime-darkest/80 motion-reduce:transition-none`}
                    />
                    <h3 className='text-maritime-darkest'>{idea.name} </h3>
                  </div>
                  <p className=' text-maritime-darkest text-paragraph'>{idea.highlight}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
