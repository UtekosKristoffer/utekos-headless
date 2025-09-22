// Path: src/app/magasinet/slik-skaper-du-den-perfekte-stemningen-pa-hytten/HyttekosElementsGrid.tsx

'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { iconMap } from './@constants/iconMap'
import type { HyttekosElement } from './types'
export function HyttekosElementsGrid({
  elements
}: {
  elements: HyttekosElement[]
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {elements.map((element, index) => {
        // KORRIGERT: Henter riktig ikon-komponent fra ordboken
        const IconComponent = iconMap[element.icon]
        if (!IconComponent) return null // Sikkerhetssjekk

        return (
          <motion.div
            key={element.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className='relative overflow-hidden border-neutral-800 bg-sidebar-foreground h-full group'>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${element.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
              />
              <CardContent className='relative p-8'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-background border border-neutral-700'>
                    <IconComponent className={`h-6 w-6 ${element.iconColor}`} />
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{element.title}</h3>
                <p className='text-muted-foreground'>{element.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
