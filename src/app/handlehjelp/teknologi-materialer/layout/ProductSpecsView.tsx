// Path: src/app/handlehjelp/teknologi-materialer/layout/ProductSpecsView.tsx
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
  Droplet,
  Sun,
  Zap,
  Maximize2,
  Wind,
  Shirt
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { ProductLayersVisual, MobileProductLayersVisual  } from './ProductLayersVisual'
import { cn } from '@/lib/utils/className' // Sørg for at du har denne eller tilsvarende
import type {
  Technology,
  TechnologyGroup
} from '@/app/handlehjelp/teknologi-materialer/config'

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
  'maximize-2': Maximize2,
  'shirt': Shirt
}

// Sub-komponent som nå tar imot 'isActive'
export const TechnologyBlock = ({
  tech,
  isActive
}: {
  tech: Technology
  isActive: boolean
}) => {
  const IconComponent = iconMap[tech.icon]
  if (!IconComponent) return null

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-transparent p-6 transition-all duration-500',
        isActive ?
          'bg-neutral-900/50 opacity-100 ring-1 ring-white/10 backdrop-blur-sm'
        : 'opacity-30 hover:opacity-60'
      )}
    >
      <div className='flex items-center gap-4'>
        <div
          className={cn(
            'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border transition-colors',
            isActive ?
              'border-sky-500/30 bg-sky-500/10 text-sky-400'
            : 'border-neutral-800 bg-neutral-900 text-neutral-500'
          )}
        >
          <IconComponent className='h-6 w-6' />
        </div>
        <h3
          className={cn(
            'text-xl font-bold transition-colors',
            isActive ? 'text-white' : 'text-neutral-400'
          )}
        >
          {tech.title}
        </h3>
      </div>
      <div className='prose prose-invert mt-4 max-w-none'>
        <p className='text-neutral-400 leading-relaxed'>{tech.content}</p>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tech.products.map(product => (
            <span
              key={product}
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                isActive ?
                  'border-white/10 bg-white/5 text-white'
                : 'border-neutral-800 bg-transparent text-neutral-600'
              )}
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
  const [activeTech, setActiveTech] = useState(
    technologyGroups?.[0]?.technologies?.[0]?.title || ''
  )

  const observerRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map())
  const [visibleTechs, setVisibleTechs] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const title = entry.target.getAttribute('data-tech-title')
        if (!title) return

        if (entry.isIntersecting) {
          setActiveTech(title)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-45% 0px -45% 0px', // Trigger nøyaktig i midten av skjermen
      threshold: 0
    })

    const elements = document.querySelectorAll('[data-tech-title]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [technologyGroups])

  return (
    <div className='mt-24 grid grid-cols-1 gap-16 lg:grid-cols-2'>
      
      {/* MOBIL VISUAL (Floating HUD) - Vises kun på mobil */}
      <div className='lg:hidden'>
        <MobileProductLayersVisual activeTech={activeTech} />
      </div>

      {/* DESKTOP VISUAL (Sticky Stack) - Vises kun på desktop */}
      <div className='hidden lg:block'>
        <div className='sticky top-32'>
          <ProductLayersVisual activeTech={activeTech} />
        </div>
      </div>

      {/* Scrollable List */}
      <div className='space-y-24 pb-24'>
        {technologyGroups.map(group => (
          <section key={group.groupTitle}>
            <h2 className='mb-8 border-b border-white/10 pb-4 text-sm font-bold uppercase tracking-widest text-neutral-500'>
              {group.groupTitle}
            </h2>
            <div className='space-y-8'>
              {group.technologies.map(tech => (
                <div
                  key={tech.title}
                  data-tech-title={tech.title} // Brukes av observeren
                >
                  <TechnologyBlock
                    tech={tech}
                    isActive={activeTech === tech.title}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
