'use client'
import { motion } from 'framer-motion'
import {
  Feather,
  Flame,
  Layers,
  Shield,
  Thermometer,
  Weight
} from 'lucide-react'
import { useState } from 'react'
import { ProductLayersVisual } from './ProductLayersVisual'

const iconMap = {
  thermometer: Thermometer,
  feather: Feather,
  weight: Weight,
  shield: Shield,
  layers: Layers,
  flame: Flame
}

type Technology = {
  readonly icon: keyof typeof iconMap
  readonly title: string
  readonly content: string
  readonly products: readonly string[]
}

export function ProductSpecsView({
  technologies
}: {
  technologies: readonly Technology[]
}) {
  const [activeTech, setActiveTech] = useState(technologies?.[0]?.title || '')

  return (
    <div className='mt-24 grid grid-cols-1 gap-16 lg:grid-cols-2'>
      <div className='hidden lg:block'>
        {/* Bytter ut den gamle komponenten med den nye */}
        <ProductLayersVisual activeTech={activeTech} />
      </div>
      <div className='space-y-20'>
        {technologies.map(tech => {
          const IconComponent = iconMap[tech.icon]

          return (
            <motion.div
              key={tech.title}
              onViewportEnter={() => setActiveTech(tech.title)}
              // ENDRING: Justerer viewport for raskere respons
              viewport={{ amount: 0.3, margin: '-20% 0px -20% 0px' }}
              className='relative'
            >
              {/* Innholdet forblir det samme */}
              <div className='flex items-center gap-4'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-sidebar-foreground'>
                  <IconComponent className='h-6 w-6' />
                </div>
                <h2 className='text-xl font-semibold'>{tech.title}</h2>
              </div>
              <div className='prose prose-invert mt-4 max-w-none text-muted-foreground'>
                <p>{tech.content}</p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {tech.products.map(product => (
                    <span
                      key={product}
                      className='text-xs font-medium bg-background text-foreground/70 py-1 px-2.5 rounded-full border border-neutral-800'
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
