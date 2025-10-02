'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Flame, Moon, Users } from 'lucide-react'
import type { UseCase } from '../types'

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
