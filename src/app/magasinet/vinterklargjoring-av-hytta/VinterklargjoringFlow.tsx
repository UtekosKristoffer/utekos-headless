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
import { useState, useEffect } from 'react'
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
  { id: 'ute', data: { label: 'UTE' }, position: { x: 360, y: 0 } },
  { id: 'inne', data: { label: 'INNE' }, position: { x: 360, y: 250 } },
  { id: 'systemer', data: { label: 'SYSTEMER' }, position: { x: 360, y: 500 } },
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

// --- Funksjon for å kalkulere desktop layout (kjøres kun én gang) ---
function calculateDesktopLayout() {
  const layoutedNodes: any[] = []
  const edges: any[] = []
  const ROW_GAP = 250
  const CARD_HORIZONTAL_GAP = 40
  const NODE_WIDTH = 280

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

    layoutedNodes.push({
      ...parent,
      position: { x: (1200 - NODE_WIDTH) / 2, y: rowY - 80 }
    })

    children.forEach((child, childIndex) => {
      layoutedNodes.push({
        ...child,
        position: {
          x: rowStartX + childIndex * (NODE_WIDTH + CARD_HORIZONTAL_GAP),
          y: rowY
        }
      })
      edges.push({
        id: `e-${parent.id}-${child.id}`,
        sourceId: parent.id,
        targetId: child.id,
        style: {
          stroke: child.data.shadowColor,
          strokeWidth: 2,
          strokeDasharray: '5 5'
        }
      })
    })
  })
  return { nodes: layoutedNodes, edges }
}

const desktopLayout = calculateDesktopLayout()

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

  const parentNode = initialNodes.find(
    n => n.id === activeCategory.toLowerCase()
  )
  const childNodeIds = categories[activeCategory]
  const childNodes = initialNodes.filter(n => childNodeIds.includes(n.id))
  const visibleNodes = [parentNode, ...childNodes].filter(Boolean)

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex justify-center gap-2 border-b border-neutral-800 p-4'>
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
      <div className='flex-grow space-y-4 overflow-y-auto p-4'>
        {visibleNodes.map(node => {
          if (!node) return null
          return (
            <div key={node.id}>
              {(
                node.id === 'ute'
                || node.id === 'inne'
                || node.id === 'systemer'
              ) ?
                <h3 className='py-2 text-center text-lg font-semibold'>
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
  const NODE_WIDTH = 280
  return (
    <div className='dot-pattern relative h-full w-full'>
      <svg viewBox='0 0 1200 720' className='h-full w-full' aria-hidden='true'>
        {desktopLayout.edges.map(edge => {
          const source = desktopLayout.nodes.find(n => n.id === edge.sourceId)!
          const target = desktopLayout.nodes.find(n => n.id === edge.targetId)!
          const sourceY = source.position.y + 40
          const sourceX = source.position.x + NODE_WIDTH / 2
          const targetY = target.position.y
          const targetX = target.position.x + NODE_WIDTH / 2
          const pathD = `M ${sourceX},${sourceY} C ${sourceX},${sourceY + 60} ${targetX},${targetY - 60} ${targetX},${targetY}`
          return <path key={edge.id} d={pathD} fill='none' style={edge.style} />
        })}
        {desktopLayout.nodes.map(node => (
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
