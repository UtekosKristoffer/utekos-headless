'use client'

import { cn } from '@/lib/utils/className'
import { Droplet, Thermometer, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { useMemo } from 'react'

// Definerer lagene
type LayerType = 'outer' | 'insulation' | 'inner' | 'function'

// Felles logikk for farger og tema
const LAYER_THEMES = {
  cyan: {
    border: 'border-cyan-500/50',
    bg: 'bg-cyan-950/80',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-900/40',
    gradient: 'from-cyan-500/20'
  },
  orange: {
    border: 'border-orange-500/50',
    bg: 'bg-orange-950/80',
    text: 'text-orange-400',
    glow: 'shadow-orange-900/40',
    gradient: 'from-orange-500/20'
  },
  violet: {
    border: 'border-violet-500/50',
    bg: 'bg-violet-950/80',
    text: 'text-violet-400',
    glow: 'shadow-violet-900/40',
    gradient: 'from-violet-500/20'
  }
}

const getLayerType = (title: string): LayerType => {
  const t = title.toLowerCase()
  if (t.includes('3-i-1') || t.includes('zip') || t.includes('konstruksjon'))
    return 'function'
  if (
    t.includes('innerfôr')
    || t.includes('taffeta')
    || t.includes('sherpa')
    || t.includes('lining')
  )
    return 'inner'
  if (
    t.includes('insulation')
    || t.includes('dun')
    || t.includes('fiber')
    || t.includes('fillpower')
    || t.includes('cloudweave')
  )
    return 'insulation'
  return 'outer'
}

// --- DESKTOP KOMPONENT (STACK) ---
export function ProductLayersVisual({ activeTech }: { activeTech: string }) {
  const activeLayer = useMemo(() => getLayerType(activeTech), [activeTech])

  return (
    <div className='relative flex h-[60vh] w-full items-center justify-center p-8'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]' />

      <div className='relative flex w-full max-w-sm flex-col gap-4 perspective-[1000px]'>
        <MaterialCard
          isActive={activeLayer === 'outer'}
          title='Protective Shell'
          subtitle='Værbarriere og slitestyrke'
          icon={ShieldCheck}
          color='cyan'
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className='absolute right-4 top-4 animate-pulse text-cyan-400 opacity-50'>
            <Droplet className='h-5 w-5' />
          </div>
        </MaterialCard>

        <MaterialCard
          isActive={activeLayer === 'insulation'}
          title='Thermal Core'
          subtitle='Varme og loft'
          icon={Thermometer}
          color='orange'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent' />
        </MaterialCard>

        <MaterialCard
          isActive={activeLayer === 'inner'}
          title='Comfort Lining'
          subtitle='Pustende og myk'
          icon={Sparkles}
          color='violet'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent skew-x-12' />
        </MaterialCard>

        <div
          className={cn(
            'absolute -right-12 top-1/2 -translate-y-1/2 transition-all duration-700',
            activeLayer === 'function' ?
              'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8 pointer-events-none'
          )}
        >
          <div className='flex flex-col items-center gap-2 rounded-xl border border-sky-500/30 bg-neutral-900/90 p-4 shadow-2xl backdrop-blur-md'>
            <div className='rounded-full bg-sky-500/20 p-2 text-sky-400'>
              <Zap className='h-6 w-6' />
            </div>
            <div className='text-xs font-bold uppercase tracking-wider text-sky-500'>
              System
            </div>
            <div className='h-16 w-0.5 bg-gradient-to-b from-sky-500/50 to-transparent' />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- MOBIL KOMPONENT (FLOATING HUD) ---
export function MobileProductLayersVisual({
  activeTech
}: {
  activeTech: string
}) {
  const activeLayer = useMemo(() => getLayerType(activeTech), [activeTech])

  // Data mapping for mobilvisningen
  const layerData = {
    outer: {
      title: 'Outer Shell',
      icon: ShieldCheck,
      color: 'cyan' as const,
      index: 0
    },
    insulation: {
      title: 'Thermal Core',
      icon: Thermometer,
      color: 'orange' as const,
      index: 1
    },
    inner: {
      title: 'Comfort Lining',
      icon: Sparkles,
      color: 'violet' as const,
      index: 2
    },
    function: {
      title: 'System Tech',
      icon: Zap,
      color: 'cyan' as const,
      index: 3
    }
  }

  const current = layerData[activeLayer]
  const theme = LAYER_THEMES[current.color]

  return (
    <div className='fixed bottom-6 left-4 right-4 z-50 animate-slide-in-up'>
      <div
        className={cn(
          'relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-500',
          theme.border,
          theme.bg,
          theme.glow
        )}
      >
        {/* Bakgrunns-gradient som pulserer */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r opacity-20',
            theme.gradient,
            'to-transparent'
          )}
        />

        {/* Ikon Boks */}
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-black/40 backdrop-blur-md transition-colors',
            theme.border,
            theme.text
          )}
        >
          <current.icon className='h-6 w-6' />
        </div>

        {/* Tekst */}
        <div className='flex-1 min-w-0'>
          <div
            className={cn(
              'text-[10px] font-bold uppercase tracking-widest',
              theme.text
            )}
          >
            Active Layer
          </div>
          <div className='truncate text-lg font-bold text-white'>
            {current.title}
          </div>
        </div>

        {/* Mini Stack Indicator (Viser posisjon i lagene) */}
        <div className='flex flex-col gap-1 opacity-50'>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-all duration-300',
                current.index === i ? 'bg-white scale-125' : 'bg-white/20'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// --- HJELPEKOMPONENT (DESKTOP CARD) ---
function MaterialCard({
  isActive,
  title,
  subtitle,
  icon: Icon,
  color,
  children
}: {
  isActive: boolean
  title: string
  subtitle: string
  icon: any
  color: 'cyan' | 'orange' | 'violet'
  children?: React.ReactNode
}) {
  const theme = LAYER_THEMES[color]

  return (
    <div
      className={cn(
        'relative flex items-center gap-6 overflow-hidden rounded-2xl border p-6 transition-all duration-500 ease-out',
        'border-white/5 bg-neutral-900/80 backdrop-blur-sm',
        isActive ?
          `scale-105 ${theme.border} bg-neutral-900 shadow-2xl ${theme.glow} z-10 opacity-100 translate-y-0`
        : 'scale-95 opacity-40 hover:opacity-60 z-0 grayscale-[0.5]'
      )}
    >
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1 transition-all duration-500',
          isActive ? theme.text.replace('text', 'bg') : 'bg-transparent'
        )}
      />

      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300',
          isActive ?
            `${theme.border} bg-white/5 ${theme.text}`
          : 'border-white/10 bg-neutral-800 text-neutral-500'
        )}
      >
        <Icon className='h-6 w-6' />
      </div>

      <div className='flex flex-col'>
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-widest transition-colors',
            isActive ? theme.text : 'text-neutral-500'
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'text-lg font-semibold transition-colors',
            isActive ? 'text-white' : 'text-neutral-400'
          )}
        >
          {subtitle}
        </span>
      </div>
      {children}
    </div>
  )
}
