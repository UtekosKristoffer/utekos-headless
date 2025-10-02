'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import type { UseCase } from '../types'
import { MoonIcon } from '@heroicons/react/24/outline'
import { Sunrise, Wind } from 'lucide-react'

export const useCasesData = [
  {
    icon: Sunrise,
    time: 'Morgen',
    title: 'Den kjølige morgenkaffen',
    description:
      'Start dagen med kaffe utenfor bobilen, innhyllet i varme mens naturen våkner.',
    temperature: '5-12°C',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: MoonIcon,
    time: 'Kveld',
    title: 'Sosiale kvelder under stjernene',
    description:
      'Forleng kvelden med venner og familie uten å la kulden drive dere inn.',
    temperature: '8-15°C',
    color: 'from-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    icon: Wind,
    time: 'Overgang',
    title: 'Vår og høst-camping',
    description: 'Utvid sesongen og opplev Norge når det er på sitt vakreste.',
    temperature: '3-10°C',
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
            Utekos gjennom bobil-døgnet
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Fra soloppgang til solnedgang - se hvordan Utekos blir din trofaste
            følgesvenn
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
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        {useCase.time}
                      </p>
                      <p className='text-sm font-medium text-primary'>
                        {useCase.temperature}
                      </p>
                    </div>
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
