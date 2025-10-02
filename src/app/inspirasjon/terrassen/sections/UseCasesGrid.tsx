'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { BookOpen, Coffee, Moon } from 'lucide-react'
import type { UseCase } from '../types'
export const useCasesData: UseCase[] = [
  {
    icon: Coffee,
    time: 'Morgen',
    title: 'Den første vårkaffen',
    description:
      'Start dagen i frisk luft uten å fryse. Nyt roen før resten av verden våkner.',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Sene sommerkvelder',
    description:
      'Ikke la duggfallet jage deg inn. Forleng de gode samtalene under stjernene.',
    color: 'from-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  {
    icon: BookOpen,
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
    <section id='bruksomrader' className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Hjemmekos, bare ute
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Fra en stille stund for deg selv, til sosiale lag som varer lenger.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
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
                    <p className='font-medium text-muted-foreground'>
                      {useCase.time}
                    </p>
                  </div>
                  <h3 className='mb-2 text-xl font-semibold'>
                    {useCase.title}
                  </h3>
                  <p className='text-muted-foreground'>{useCase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
