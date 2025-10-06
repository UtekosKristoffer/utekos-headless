import { Check, Feather, Heart, Moon, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import UtekosLogo from '@public/icon.png'

// --- Icon Renderer ---
const iconMap = {
  moon: Moon,
  feather: Feather,
  heart: Heart,
  check: Check
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
const layoutSize = 220
const centerX = 225
const centerY = 225
const nodeWidth = 150
const nodeHeight = 52
const centerNodeSize = 96

const nodes = [
  {
    id: 'center',
    type: 'center',
    position: {
      x: centerX - centerNodeSize / 2,
      y: centerY - centerNodeSize / 2
    },
    width: centerNodeSize,
    height: centerNodeSize
  },
  {
    id: 'benefit-1',
    type: 'benefit',
    position: { x: centerX - layoutSize, y: centerY - layoutSize },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'moon' as IconName,
      text: 'Forlenget kveldene',
      color: '#60a5fa',
      iconColor: 'text-blue-400'
    }
  },
  {
    id: 'benefit-2',
    type: 'benefit',
    position: { x: centerX + layoutSize - nodeWidth, y: centerY - layoutSize },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'feather' as IconName,
      text: 'Overraskende lett',
      color: '#f472b6',
      iconColor: 'text-pink-400'
    }
  },
  {
    id: 'benefit-3',
    type: 'benefit',
    position: { x: centerX - layoutSize, y: centerY + layoutSize - nodeHeight },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'heart' as IconName,
      text: 'Gjennomført kvalitet',
      color: '#4ade80',
      iconColor: 'text-green-400'
    }
  },
  {
    id: 'benefit-4',
    type: 'benefit',
    position: {
      x: centerX + layoutSize - nodeWidth,
      y: centerY + layoutSize - nodeHeight
    },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'check' as IconName,
      text: 'Verdt hver krone',
      color: '#fb923c',
      iconColor: 'text-orange-400'
    }
  }
]

// --- Edge Data ---
const edges = [
  {
    id: 'e-center-1',
    sourceId: 'center',
    targetId: 'benefit-1',
    data: { color: '#60a5fa' }
  },
  {
    id: 'e-center-2',
    sourceId: 'center',
    targetId: 'benefit-2',
    data: { color: '#f472b6' }
  },
  {
    id: 'e-center-3',
    sourceId: 'center',
    targetId: 'benefit-3',
    data: { color: '#4ade80' }
  },
  {
    id: 'e-center-4',
    sourceId: 'center',
    targetId: 'benefit-4',
    data: { color: '#fb923c' }
  }
]

// --- Hovedkomponenten ---
export function CustomerNetwork() {
  return (
    <div className='relative mx-auto h-[450px] w-[450px]'>
      {/* SVG-lerret for linjene */}
      <svg
        width='100%'
        height='100%'
        className='absolute inset-0'
        aria-hidden='true'
      >
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.sourceId)!
          const targetNode = nodes.find(n => n.id === edge.targetId)!

          const sourceX = sourceNode.position.x + sourceNode.width / 2
          const sourceY = sourceNode.position.y + sourceNode.height / 2
          const targetX = targetNode.position.x + targetNode.width / 2
          const targetY = targetNode.position.y + targetNode.height / 2

          const midX = (sourceX + targetX) / 2
          const midY = (sourceY + targetY) / 2

          const pathD = `M ${sourceX},${sourceY} Q ${sourceX},${midY} ${midX},${midY} T ${targetX},${targetY}`

          return (
            <g key={edge.id}>
              <path
                d={pathD}
                stroke={edge.data.color}
                strokeWidth={2}
                fill='none'
                strokeDasharray='5 5'
                className='animate-pulse'
              />
              <circle
                cx={targetX}
                cy={targetY}
                r='6'
                fill={edge.data.color}
                opacity='0.3'
                filter='blur(4px)'
              />
            </g>
          )
        })}
      </svg>

      {/* Noder rendret som div-elementer */}
      {nodes.map(node => (
        <div
          key={node.id}
          className='absolute'
          style={{
            left: `${node.position.x}px`,
            top: `${node.position.y}px`,
            width: `${node.width}px`,
            height: `${node.height}px`
          }}
        >
          {node.type === 'center' && (
            <div className='relative'>
              <div className='flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-700 bg-background shadow-2xl'>
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-transparent'>
                  <Image
                    src={UtekosLogo}
                    alt='Utekos Logo'
                    className='h-12 w-12'
                  />
                </div>
              </div>
              <div className='absolute inset-0 rounded-full bg-primary/20 blur-xl' />
            </div>
          )}
          {node.type === 'benefit' && node.data && (
            <div className='relative rounded-lg border border-neutral-800 bg-sidebar-foreground p-3 shadow-lg'>
              <div className='flex items-center gap-2'>
                <IconRenderer
                  name={node.data.icon}
                  className={`h-4 w-4 ${node.data.iconColor}`}
                />
                <span className='whitespace-nowrap text-xs font-medium'>
                  {node.data.text}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
