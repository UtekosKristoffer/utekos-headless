'use client'

import {
  Cloud,
  Feather,
  Flame,
  Gem,
  Layers,
  Shield,
  Thermometer,
  Weight,
  Droplet, // Ny
  Sun, // Ny
  Zap, // Ny
  Maximize2, // Ny
  Wind, // Ny
  Shirt // Ny
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { ProductLayersVisual } from './ProductLayersVisual'
import type {
  Technology,
  TechnologyGroup
} from '@/app/handlehjelp/teknologi-materialer/config'

// Definerer iconMap med alle nødvendige ikoner fra config.ts
const iconMap: { [key: string]: React.ElementType } = {
  'thermometer': Thermometer,
  'feather': Feather,
  'weight': Weight,
  'gem': Gem,
  'shield': Shield,
  'layers': Layers,
  'flame': Flame,
  'cloud': Cloud,
  'droplet': Droplet,
  'sun': Sun,
  'zap': Zap,
  'wind': Wind,
  'maximize-2': Maximize2, // Matcher strengen i config
  'shirt': Shirt
}

// Liten, ren sub-komponent for hver teknologi-blokk
export const TechnologyBlock = ({ tech }: { tech: Technology }) => {
  const IconComponent = iconMap[tech.icon]

  // Fallback hvis ikonet ikke finnes (valgfritt: kan returnere null eller et default ikon)
  if (!IconComponent) return null

  return (
    <div className='relative'>
      <div className='flex items-center gap-4'>
        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-sidebar-foreground'>
          <IconComponent className={`h-6 w-6 ${tech.iconColor}`} />
        </div>
        <h3 className='text-xl font-semibold'>{tech.title}</h3>
      </div>
      <div className='prose prose-invert mt-4 max-w-none text-article-white'>
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
  )
}

export function ProductSpecsView({
  technologyGroups
}: {
  technologyGroups: readonly TechnologyGroup[]
}) {
  // Henter første tittel fra den nye, grupperte datastrukturen for initial state
  const [activeTech, setActiveTech] = useState(
    technologyGroups?.[0]?.technologies?.[0]?.title || ''
  )
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
  }, [technologyGroups])

  return (
    <div className='mt-24 grid grid-cols-1 gap-16 lg:grid-cols-2'>
      <div className='hidden lg:block'>
        <div className='sticky top-24'>
          {/* Visual komponenten mottar nå activeTech, som oppdateres når man scroller */}
          <ProductLayersVisual activeTech={activeTech} />
        </div>
      </div>
      <div className='space-y-16'>
        {technologyGroups.map(group => (
          <section key={group.groupTitle}>
            <h2 className='mb-8 border-b border-neutral-800 pb-2 text-2xl font-bold'>
              {group.groupTitle}
            </h2>
            <div className='space-y-12'>
              {group.technologies.map(tech => (
                <div
                  key={tech.title}
                  ref={node => {
                    const map = targetRefs.current
                    if (node) {
                      map.set(node, tech.title)
                    } else {
                      // Cleanup logic for Map keys
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
                  <TechnologyBlock tech={tech} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
