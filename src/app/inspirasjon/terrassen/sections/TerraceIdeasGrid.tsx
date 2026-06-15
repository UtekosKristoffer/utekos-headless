// Path: src/app/inspirasjon/terrassen/sections/TerraceIdeasGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Building2, Coffee, Sofa } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

type TerraceIdea = {
  name: string
  highlight: string
  icon: LucideIcon
}

export const terraceIdeasData: TerraceIdea[] = [
  {
    name: 'Morgenkaffen ute',
    highlight: 'En lun start på dagen',
    icon: Coffee
  },
  {
    name: 'Lounge-området',
    highlight: 'For sosiale kvelder',
    icon: Sofa
  },
  {
    name: 'Balkong-oasen',
    highlight: 'Maksimal komfort, minimal plass',
    icon: Building2
  },
  {
    name: 'Lesekroken',
    highlight: 'Fordyp deg i en annen verden',
    icon: BookOpen
  }
]

export function TerraceIdeasGrid({ ideas }: { ideas: TerraceIdea[] }) {
  return (
    <section className='bg-havdyp py-24 md:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl md:max-w-4xl text-center'>
          <h2 className='text-cloud-dancer'>Ideer for din uteplass</h2>
          <p className='mt-4 utekos-section-lead mx-auto max-w-2xl text-foreground'>
            Uansett størrelse på uteplassen din, kan den bli en oase for komfort og hygge.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {ideas.map((idea, index) => {
            const Icon = idea.icon

            return (
              <AnimatedBlock
                key={idea.name}
                className='will-animate-fade-in-up h-full'
                delay={`${index * 0.1}s`}
              >
                <Card className='group h-full border-brandied-apricot bg-peach-fuzz transition-colors duration-300 motion-reduce:transition-none'>
                  <CardContent className='p-6'>
                    <div className='mb-3 flex items-center gap-3'>
                      <div className='flex size-10 shrink-0 items-center justify-center rounded-full border border-background/16 bg-cloud-dancer text-background'>
                        <Icon className='size-5' aria-hidden='true' />
                      </div>
                      <h3 className='text-background'>{idea.name}</h3>
                    </div>
                    <p className='text-paragraph text-background'>{idea.highlight}</p>
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
