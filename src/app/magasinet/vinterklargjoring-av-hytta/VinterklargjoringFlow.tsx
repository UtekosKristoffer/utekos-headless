'use client'

import {
  Armchair,
  Droplets,
  Plug,
  Rat,
  Refrigerator,
  Shirt,
  ShowerHead,
  UserCheck,
  Building2
} from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { cn } from '@/lib/utils/className'
import { useMediaQuery } from '@/hooks/use-media-query'

// --- Typer og hjelpere ---
const iconMap = {
  'roof': Building2,
  'shower-head': ShowerHead,
  'armchair': Armchair,
  'rat': Rat,
  'refrigerator': Refrigerator,
  'shirt': Shirt,
  'droplets': Droplets,
  'plug': Plug,
  'user-check': UserCheck
}
type IconName = keyof typeof iconMap

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={className} /> : null
}

// --- Node Data ---
const initialNodes = [
  // Kategori-titler
  { id: 'ute', data: { label: 'UTE' }, position: { x: 360, y: 0 } },
  { id: 'inne', data: { label: 'INNE' }, position: { x: 360, y: 250 } },
  { id: 'systemer', data: { label: 'SYSTEMER' }, position: { x: 360, y: 500 } },
  // Ute-noder
  {
    id: 'tak',
    data: {
      icon: 'roof' as IconName,
      label: 'Tak & Takrenner',
      description: 'Rensk for løv og sjekk for skader for å unngå lekkasjer.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    }
  },
  {
    id: 'vannkraner',
    data: {
      icon: 'shower-head' as IconName,
      label: 'Vannkraner & Slanger',
      description: 'Steng utekranen og tøm slanger for å unngå frostspreng.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    }
  },
  {
    id: 'mobler',
    data: {
      icon: 'armchair' as IconName,
      label: 'Møbler & Løsøre',
      description:
        'Sett inn eller dekk til møbler. Sikre alt som kan tas av vinden.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    }
  },
  // Inne-noder
  {
    id: 'mus',
    data: {
      icon: 'rat' as IconName,
      label: 'Mus & Skadedyr',
      description: 'Tett åpninger og fjern mat som kan tiltrekke seg gjester.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    }
  },
  {
    id: 'kjoleskap',
    data: {
      icon: 'refrigerator' as IconName,
      label: 'Kjøleskap & Mat',
      description: 'Tøm, vask ut og la døren stå på gløtt for å unngå mugg.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    }
  },
  {
    id: 'tekstiler',
    data: {
      icon: 'shirt' as IconName,
      label: 'Tekstiler & Verdi',
      description: 'Pakk sengetøy i plastkasser. Ta med verdisaker hjem.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    }
  },
  // Systemer-noder
  {
    id: 'vann',
    data: {
      icon: 'droplets' as IconName,
      label: 'Vann & Avløp',
      description:
        'Alt vann må ut! Steng hovedkranen og tøm alle rør og tanker.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    }
  },
  {
    id: 'strom',
    data: {
      icon: 'plug' as IconName,
      label: 'Strøm & Oppvarming',
      description: 'Skru av alt unødvendig. Sett på lav vedlikeholdsvarme.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    }
  },
  {
    id: 'personlig-komfort',
    data: {
      icon: 'user-check' as IconName,
      label: 'Personlig Komfort',
      description: 'Legg igjen en Utekos for umiddelbar varme ved ankomst.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6'
    }
  }
]

const categories = {
  UTE: ['tak', 'vannkraner', 'mobler'],
  INNE: ['mus', 'kjoleskap', 'tekstiler'],
  SYSTEMER: ['vann', 'strom', 'personlig-komfort']
}

// --- Komponenter for visning ---

function CustomNode({ data }: { data: (typeof initialNodes)[0]['data'] }) {
  if (!data.icon) return null
  return (
    <div className='relative flex h-full w-full flex-col justify-center rounded-xl border border-neutral-800 bg-sidebar-foreground p-5'>
      <div
        className='absolute inset-0 rounded-lg blur-xl opacity-20'
        style={{ background: data.shadowColor }}
      />
      <div className='relative z-10'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
            <IconRenderer
              name={data.icon}
              className={`h-6 w-6 ${data.iconColor}`}
            />
          </div>
          <h3 className='text-base font-semibold'>{data.label}</h3>
        </div>
        <p className='text-sm leading-relaxed text-muted-foreground'>
          {data.description}
        </p>
      </div>
    </div>
  )
}

function MobileFlow() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof categories>('UTE')

  const visibleNodes = useMemo(() => {
    const parentNode = initialNodes.find(
      n => n.id === activeCategory.toLowerCase()
    )
    const childNodeIds = categories[activeCategory]
    const childNodes = initialNodes.filter(n => childNodeIds.includes(n.id))
    return [parentNode, ...childNodes].filter(Boolean)
  }, [activeCategory])

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex justify-center gap-2 p-4 border-b border-neutral-800'>
        {(Object.keys(categories) as Array<keyof typeof categories>).map(
          category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                activeCategory === category ?
                  'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
              )}
            >
              {category}
            </button>
          )
        )}
      </div>
      <div className='flex-grow overflow-y-auto p-4 space-y-4'>
        {visibleNodes.map(node => {
          if (!node) return null // Korrigering: Sjekk for undefined
          return (
            <div key={node.id}>
              {(
                node.id === 'ute'
                || node.id === 'inne'
                || node.id === 'systemer'
              ) ?
                <h3 className='text-lg font-semibold text-center py-2'>
                  {node.data.label}
                </h3>
              : <CustomNode data={node.data} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DesktopFlow() {
  const ROW_GAP = 250
  const CARD_HORIZONTAL_GAP = 40
  const NODE_WIDTH = 280

  const layoutedElements = useMemo(() => {
    const layoutedNodes: any[] = []
    const edges: any[] = []

    Object.keys(categories).forEach((key, rowIndex) => {
      const categoryKey = key.toLowerCase()
      const parent = initialNodes.find(n => n.id === categoryKey)!
      const children = initialNodes.filter(n =>
        categories[key as keyof typeof categories].includes(n.id)
      )

      const rowY = rowIndex * ROW_GAP
      const childrenCount = children.length
      const totalRowWidth =
        childrenCount * NODE_WIDTH + (childrenCount - 1) * CARD_HORIZONTAL_GAP
      const rowStartX = (1200 - totalRowWidth) / 2

      parent.position = { x: (1200 - NODE_WIDTH) / 2, y: rowY - 80 }
      layoutedNodes.push(parent)

      children.forEach((child, childIndex) => {
        child.position = {
          x: rowStartX + childIndex * (NODE_WIDTH + CARD_HORIZONTAL_GAP),
          y: rowY
        }
        layoutedNodes.push(child)
        edges.push({
          id: `e-${parent.id}-${child.id}`,
          source: parent,
          target: child,
          style: {
            stroke: child.data.shadowColor,
            strokeWidth: 2,
            strokeDasharray: '5 5'
          }
        })
      })
    })
    return { nodes: layoutedNodes, edges }
  }, [])

  return (
    <div className='relative w-full h-full dot-pattern'>
      <svg viewBox='0 0 1200 720' className='w-full h-full' aria-hidden='true'>
        {layoutedElements.edges.map(edge => {
          const sourceY = edge.source.position.y + 40
          const sourceX = edge.source.position.x + NODE_WIDTH / 2
          const targetY = edge.target.position.y
          const targetX = edge.target.position.x + NODE_WIDTH / 2
          const pathD = `M ${sourceX},${sourceY} C ${sourceX},${sourceY + 60} ${targetX},${targetY - 60} ${targetX},${targetY}`
          return <path key={edge.id} d={pathD} fill='none' style={edge.style} />
        })}
        {layoutedElements.nodes.map(node => (
          <foreignObject
            key={node.id}
            x={node.position.x}
            y={node.position.y}
            width={NODE_WIDTH}
            height={180}
          >
            {node.id === 'ute' || node.id === 'inne' || node.id === 'systemer' ?
              <div className='flex h-12 items-center justify-center rounded-lg border border-neutral-700 bg-sidebar-foreground text-center font-semibold text-foreground'>
                {node.data.label}
              </div>
            : <CustomNode data={node.data} />}
          </foreignObject>
        ))}
      </svg>
    </div>
  )
}

export default function VinterklargjoringFlow() {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Forhindrer hydration mismatch
  if (!isClient) {
    return (
      <div className='h-[720px] w-full overflow-hidden rounded-lg border border-neutral-800 bg-background' />
    )
  }

  return (
    <div className='h-[720px] w-full overflow-hidden rounded-lg border border-neutral-800 bg-background'>
      {isMobile ?
        <MobileFlow />
      : <DesktopFlow />}
    </div>
  )
}
