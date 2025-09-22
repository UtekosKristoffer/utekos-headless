'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { MountainSnow, Trees } from 'lucide-react'

// "Ordbok" for å mappe tekst til ikon-komponenter
const iconMap = {
  mountainSnow: MountainSnow,
  trees: Trees
}

interface RouteElement {
  icon: keyof typeof iconMap
  title: string
  description: string
  color: string
  iconColor: string
}

export function RouteDetailsGrid({ elements }: { elements: RouteElement[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {elements.map((element, index) => {
        const IconComponent = iconMap[element.icon]
        if (!IconComponent) return null

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
                <h2 className='text-xl font-semibold mb-2 !mt-0'>
                  {element.title}
                </h2>
                <p className='text-muted-foreground'>{element.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
