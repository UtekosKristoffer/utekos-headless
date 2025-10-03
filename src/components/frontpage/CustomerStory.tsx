'use client'

import {
  Background,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Moon, Sun } from 'lucide-react'
import { memo, useState } from 'react'

// --- En dedikert node-komponent kun for denne historien ---
interface StoryNodeProps {
  data: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    description: string
    iconColor: string
    glowColor: string
  }
}

const StoryNode = memo(({ data }: StoryNodeProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = data.icon

  return (
    <div
      className='relative w-full rounded-xl bg-sidebar-foreground border border-neutral-800 overflow-hidden transition-all duration-300'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: isHovered ? '#525252' : '#262626'
      }}
    >
      {/* Aurora gradient effect */}
      <div
        className='absolute -inset-x-2 -inset-y-16 blur-2xl transition-opacity duration-300'
        style={{
          opacity: isHovered ? 0.4 : 0.3,
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${data.glowColor} 100%)`,
          animation: 'aurora 8s ease-in-out infinite'
        }}
      />

      <Handle
        type='source'
        position={Position.Bottom}
        className='!bg-transparent !border-none'
      />
      <Handle
        type='target'
        position={Position.Top}
        className='!bg-transparent !border-none'
      />

      <div className='relative z-10 p-6'>
        <div className='flex items-start gap-4'>
          <div
            className='flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300'
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              borderColor: isHovered ? '#525252' : '#404040'
            }}
          >
            <Icon className={`h-7 w-7 ${data.iconColor}`} />
          </div>
          <div className='flex-1'>
            <p className='text-lg font-semibold text-foreground mb-2'>
              {data.label}
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div
        className='absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none'
        style={{
          opacity: isHovered ? 1 : 0
        }}
      >
        <div
          className='absolute inset-0 rounded-xl blur-sm opacity-20'
          style={{ background: data.glowColor }}
        />
      </div>

      <style jsx>{`
        @keyframes aurora {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
      `}</style>
    </div>
  )
})
StoryNode.displayName = 'StoryNode'

const nodeTypes = {
  story: StoryNode
}

// --- Definisjon av noder og ledning ---
const initialNodes = [
  {
    id: 'for',
    type: 'story',
    position: { x: 0, y: 0 },
    data: {
      icon: Moon,
      label: 'Før Utekos:',
      description: 'Kveldene ble alltid for korte.',
      iconColor: 'text-red-400',
      glowColor: '#f87171'
    }
  },
  {
    id: 'etter',
    type: 'story',
    position: { x: 0, y: 180 },
    data: {
      icon: Sun,
      label: 'Etter Utekos:',
      description: 'Nå bestemmer vi når kvelden er over.',
      iconColor: 'text-blue-400',
      glowColor: '#60a5fa'
    }
  }
]

const initialEdges = [
  {
    id: 'e-for-etter',
    source: 'for',
    target: 'etter',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: 'url(#gradient)',
      strokeWidth: 3,
      strokeDasharray: '5 5'
    }
  }
]

// --- Hovedkomponenten ---
export function CustomerStory() {
  return (
    <div className='relative h-full w-full min-h-[400px]'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #f87171 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute left-1/2 bottom-0 h-[300px] w-[300px] -translate-x-1/2 opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'
          }}
        />
      </div>

      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          fitView
          preventScrolling={false}
          fitViewOptions={{ padding: 0.5 }}
          proOptions={{ hideAttribution: true }}
        >
          {/* Definerer fargegradienten for ledningen */}
          <svg>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='#f87171' stopOpacity='0.8' />
                <stop offset='50%' stopColor='#c084fc' stopOpacity='0.6' />
                <stop offset='100%' stopColor='#60a5fa' stopOpacity='0.8' />
              </linearGradient>
            </defs>
          </svg>
          <Background gap={24} size={1} color='oklch(var(--border) / 0.15)' />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
