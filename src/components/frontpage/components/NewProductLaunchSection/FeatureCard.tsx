'use client'

import { cn } from '@/lib/utils/className'
import { useRef, useState } from 'react'
import { CloudRain, Feather, Gift, ShieldCheck } from 'lucide-react'

const iconMap = {
  'cloud-rain': CloudRain,
  'feather': Feather,
  'shield-check': ShieldCheck,
  'gift': Gift
}

export interface Feature {
  icon: keyof typeof iconMap
  title: string
  description: string
  glowColor: string
}

interface FeatureCardProps {
  feature: Feature
  delay: number
}

export function FeatureCard({ feature, delay }: FeatureCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const IconComponent = iconMap[feature.icon] || CloudRain

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setOpacity(1)
  }

  const handleBlur = () => {
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/40 p-5 transition-all duration-300',
        'after:absolute after:inset-0 after:rounded-xl after:border after:border-white/5 after:opacity-100 md:after:opacity-0',
        'hover:border-white/20'
      )}
    >
      {/* Spotlight Gradient (Follows mouse) */}
      <div
        className='pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${feature.glowColor}15, transparent 40%)`
        }}
      />

      {/* Content */}
      <div className='relative z-10 flex items-start gap-5'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:border-white/20'>
          <IconComponent
            className='h-5 w-5 text-sky-100'
            style={{ color: feature.glowColor }}
          />
        </div>
        <div className='flex-1'>
          <h4 className='mb-2 text-base font-semibold tracking-tight text-white group-hover:text-sky-50 transition-colors'>
            {feature.title}
          </h4>
          <p className='text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors'>
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  )
}
