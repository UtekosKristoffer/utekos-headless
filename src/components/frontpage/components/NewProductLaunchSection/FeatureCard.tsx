'use client'

import { cn } from '@/lib/utils/className'
import { useEffect, useRef, useState } from 'react'
import { CloudRain, Feather, Gift, ShieldCheck } from 'lucide-react' // Importer Gift

// Mapper streng-identifikator til den faktiske komponenten
const iconMap = {
  'cloud-rain': CloudRain,
  'feather': Feather,
  'shield-check': ShieldCheck,
  'gift': Gift // Legg til det nye ikonet her
}

export interface Feature {
  icon: keyof typeof iconMap // Typen er nå en av nøklene i iconMap
  title: string
  description: string
  glowColor: string
}

interface FeatureCardProps {
  feature: Feature
  delay: number
}

export function FeatureCard({ feature, delay }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  const IconComponent = iconMap[feature.icon] || CloudRain

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.35 }
    )

    const currentRef = cardRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        'will-animate-fade-in-left group relative overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground p-4 transition-all duration-300 hover:translate-x-1',
        isInView && 'is-in-view'
      )}
      style={{ '--transition-delay': `${delay}s` } as React.CSSProperties}
    >
      <div
        className='absolute -inset-x-2 -inset-y-8 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${feature.glowColor} 100%)`
        }}
      />
      <div className='relative z-10 flex items-start gap-4'>
        <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-600'>
          <IconComponent className='h-6 w-6 text-sky-800' />
        </div>
        <div className='flex-1'>
          <h4 className='mb-1 font-semibold text-foreground'>
            {feature.title}
          </h4>
          <p className='text-sm leading-relaxed text-access/60'>
            {feature.description}
          </p>
        </div>
      </div>
      <div className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-lg blur-sm opacity-20'
          style={{ background: feature.glowColor }}
        />
      </div>
    </div>
  )
}
