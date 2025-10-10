'use client'

import {
  Feather,
  Flame,
  Gem, // <--- 1. Importer det nye ikonet
  Layers,
  Shield,
  Thermometer,
  Weight
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { ProductLayersVisual } from './ProductLayersVisual'

const iconMap = {
  thermometer: Thermometer,
  feather: Feather,
  weight: Weight,
  gem: Gem, // <--- 2. Legg til det nye ikonet i map'en
  shield: Shield,
  layers: Layers,
  flame: Flame
}

type Technology = {
  readonly icon: keyof typeof iconMap
  readonly title: string
  readonly content: string
  readonly products: readonly string[]
  readonly iconColor: string
}

export function ProductSpecsView({
  technologies
}: {
  technologies: readonly Technology[]
}) {
  const [activeTech, setActiveTech] = useState(technologies?.[0]?.title || '')
  const targetRefs = useRef(new Map<HTMLDivElement, string>())

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const title = targetRefs.current.get(entry.target as HTMLDivElement)
          if (title) {
            setActiveTech(title)
          }
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.5
    })

    const targets = Array.from(targetRefs.current.keys())
    targets.forEach(target => observer.observe(target))

    return () => observer.disconnect()
  }, [technologies])

  return (
    <div className='mt-24 grid grid-cols-1 gap-16 lg:grid-cols-2'>
      <div className='hidden lg:block'>
        <ProductLayersVisual activeTech={activeTech} />
      </div>
      <div className='space-y-20'>
        {technologies.map(tech => {
          const IconComponent = iconMap[tech.icon]

          return (
            <div
              key={tech.title}
              ref={node => {
                const map = targetRefs.current
                if (node) {
                  map.set(node, tech.title)
                } else {
                  // On unmount, find the key by value and delete.
                  let keyToDelete: HTMLDivElement | null = null
                  for (const [key, value] of map.entries()) {
                    if (value === tech.title) {
                      keyToDelete = key
                      break
                    }
                  }
                  if (keyToDelete) {
                    map.delete(keyToDelete)
                  }
                }
              }}
            >
              <div className='relative'>
                <div className='flex items-center gap-4'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-sidebar-foreground'>
                    <IconComponent className={`h-6 w-6 ${tech.iconColor}`} />
                  </div>
                  <h2 className='text-xl font-semibold'>{tech.title}</h2>
                </div>
                <div className='prose prose-invert mt-4 max-w-none text-muted-foreground'>
                  <p>{tech.content}</p>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {tech.products.map(product => (
                      <span
                        key={product}
                        className='rounded-full border border-neutral-800 bg-background px-2.5 py-1 text-xs font-medium text-foreground/70'
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
