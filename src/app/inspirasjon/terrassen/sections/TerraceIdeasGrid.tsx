'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { BookOpen, Building2, Coffee, Sofa } from 'lucide-react'
import type { TerraceIdea } from '../types'

export const terraceIdeasData: TerraceIdea[] = [
  {
    name: 'Morgenkaffe-kroken',
    highlight: 'En lun start på dagen',
    icon: Coffee,
    color: 'text-amber-400'
  },
  {
    name: 'Lounge-området',
    highlight: 'For sosiale kvelder',
    icon: Sofa,
    color: 'text-rose-500'
  },
  {
    name: 'Balkong-oasen',
    highlight: 'Maksimal komfort, minimal plass',
    icon: Building2,
    color: 'text-cyan-400'
  },
  {
    name: 'Lesekroken',
    highlight: 'Fordyp deg i en annen verden',
    icon: BookOpen,
    color: 'text-emerald-500'
  }
]

export function TerraceIdeasGrid({ ideas }: { ideas: TerraceIdea[] }) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Ideer for din uteplass
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Uansett størrelse på uteplassen din, kan den bli en oase for komfort
            og hygge.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='group border-neutral-800 bg-sidebar-foreground transition-colors hover:bg-sidebar-foreground/80'>
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-start justify-between'>
                    <h3 className='text-lg font-semibold'>{idea.name}</h3>
                    <idea.icon
                      className={`size-5 ${idea.color} transition-colors group-hover:text-primary`}
                    />
                  </div>
                  <p className='text-sm text-foreground/80'>{idea.highlight}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
