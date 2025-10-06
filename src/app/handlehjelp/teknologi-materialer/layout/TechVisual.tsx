'use client'
import {
  Feather,
  Flame,
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

// Liten, gjenbrukbar wrapper for å detektere synlighet
function ScrollSpyBlock({
  children,
  onInView,
  viewportOptions
}: {
  children: React.ReactNode
  onInView: () => void
  viewportOptions: IntersectionObserverInit
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Korrigering: Legger til en sjekk for å sikre at 'entry' eksisterer
      if (entry && entry.isIntersecting) {
        onInView()
      }
    }, viewportOptions)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [onInView, viewportOptions])

  return <div ref={ref}>{children}</div>
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
        <ProductLayersVisual activeTech={activeTech} />
      </div>
      <div className='space-y-20'>
        {technologies.map(tech => {
          const IconComponent = iconMap[tech.icon]

          return (
            <ScrollSpyBlock
              key={tech.title}
              onInView={() => setActiveTech(tech.title)}
              viewportOptions={{
                rootMargin: '-20% 0px -20% 0px',
                threshold: 0.3
              }}
            >
              <div className='relative'>
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
                        className='rounded-full border border-neutral-800 bg-background px-2.5 py-1 text-xs font-medium text-foreground/70'
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollSpyBlock>
          )
        })}
      </div>
    </div>
  )
}
