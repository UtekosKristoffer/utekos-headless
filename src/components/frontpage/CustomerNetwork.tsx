'use client'

import {
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Check, Feather, Heart, Moon, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { memo } from 'react'
import UtekosLogo from '../../../public/icon.png'

// Type-definisjon for benefit nodes
interface BenefitNodeData {
  icon: LucideIcon
  text: string
  color: string
  iconColor: string
}

// Custom node for benefits
const BenefitNode = memo(({ data, id }: NodeProps) => {
  const nodeData = data as unknown as BenefitNodeData
  const Icon = nodeData.icon

  // Bestem handle-posisjon basert på node ID
  const isTopNode = id === 'benefit-1' || id === 'benefit-2'
  const handlePosition = isTopNode ? Position.Bottom : Position.Top

  return (
    <div className='relative rounded-lg bg-sidebar-foreground border border-neutral-800 p-3 shadow-lg'>
      <Handle
        type='target'
        position={handlePosition}
        className='!bg-transparent !border-none !w-3 !h-3'
        style={{
          background: nodeData.color.replace('text-', '#').replace('-400', ''),
          filter: 'blur(6px)',
          opacity: 0.6,
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
      <div className='flex items-center gap-2'>
        <Icon className={`h-4 w-4 ${nodeData.iconColor}`} />
        <span className='text-sm font-medium'>{nodeData.text}</span>
      </div>
    </div>
  )
})
BenefitNode.displayName = 'BenefitNode'

// Custom center node med multiple handles
const CenterNode = memo(() => {
  const handleStyle = {
    background: 'linear-gradient(45deg, #60a5fa, #f472b6)',
    filter: 'blur(8px)',
    opacity: 0.5,
    width: '8px',
    height: '8px'
  }

  return (
    <div className='relative'>
      {/* Handles for each direction */}
      <Handle
        type='source'
        position={Position.Top}
        id='top-left'
        className='!bg-transparent !border-none'
        style={{ ...handleStyle, left: '30%', top: '10%' }}
      />
      <Handle
        type='source'
        position={Position.Top}
        id='top-right'
        className='!bg-transparent !border-none'
        style={{ ...handleStyle, right: '30%', top: '10%' }}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='bottom-left'
        className='!bg-transparent !border-none'
        style={{ ...handleStyle, left: '30%', bottom: '10%' }}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='bottom-right'
        className='!bg-transparent !border-none'
        style={{ ...handleStyle, right: '30%', bottom: '10%' }}
      />

      <div className='flex h-24 w-24 items-center justify-center rounded-full bg-background border-2 border-neutral-700 shadow-2xl'>
        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-transparent'>
          <Image src={UtekosLogo} alt='Utekos Logo' className='h-12 w-12' />
        </div>
      </div>

      {/* Glød-effekt */}
      <div className='absolute inset-0 rounded-full bg-primary/20 blur-xl' />
    </div>
  )
})
CenterNode.displayName = 'CenterNode'

// Custom Edge med S-kurve
const CustomEdge = memo(
  ({ sourceX, sourceY, targetX, targetY, data }: EdgeProps) => {
    const edgeData = data as { color: string } | undefined
    const color = edgeData?.color ?? '#60a5fa'

    // Beregn kontrollpunkter for S-kurve
    const midX = (sourceX + targetX) / 2
    const midY = (sourceY + targetY) / 2

    // Lager en pen S-kurve
    const path = `
    M ${sourceX},${sourceY}
    Q ${sourceX},${midY} ${midX},${midY}
    T ${targetX},${targetY}
  `

    return (
      <>
        <path
          d={path}
          style={{
            stroke: color,
            strokeWidth: 2,
            fill: 'none',
            strokeDasharray: '5 5'
          }}
          className='animate-pulse'
        />
        {/* Skygge ved endepunktet */}
        <circle
          cx={targetX}
          cy={targetY}
          r='6'
          fill={color}
          opacity='0.3'
          filter='blur(4px)'
        />
      </>
    )
  }
)
CustomEdge.displayName = 'CustomEdge'

const nodeTypes = {
  benefit: BenefitNode,
  center: CenterNode
}

const edgeTypes = {
  custom: CustomEdge
}

// Definisjon av noder - perfekt symmetrisk layout
const layoutSize = 250 // Avstand fra senter til hjørner
const centerX = 225
const centerY = 225

const initialNodes: Node[] = [
  {
    id: 'center',
    type: 'center',
    position: { x: centerX - 48, y: centerY - 48 }, // -48 fordi noden er 96px bred (24 * 4 i tailwind)
    data: {}
  },
  {
    id: 'benefit-1',
    type: 'benefit',
    position: { x: centerX - layoutSize, y: centerY - layoutSize },
    data: {
      icon: Moon,
      text: 'Forlenget kveldene',
      color: '#60a5fa',
      iconColor: 'text-blue-400'
    }
  },
  {
    id: 'benefit-2',
    type: 'benefit',
    position: { x: centerX + layoutSize - 150, y: centerY - layoutSize }, // -150 for node-bredden
    data: {
      icon: Feather,
      text: 'Overraskende lett',
      color: '#f472b6',
      iconColor: 'text-pink-400'
    }
  },
  {
    id: 'benefit-3',
    type: 'benefit',
    position: { x: centerX - layoutSize, y: centerY + layoutSize - 40 }, // -40 for node-høyden
    data: {
      icon: Heart,
      text: 'Gjennomført kvalitet',
      color: '#4ade80',
      iconColor: 'text-green-400'
    }
  },
  {
    id: 'benefit-4',
    type: 'benefit',
    position: { x: centerX + layoutSize - 150, y: centerY + layoutSize - 40 }, // -150,-40 for dimensjoner
    data: {
      icon: Check,
      text: 'Verdt hver krone',
      color: '#fb923c',
      iconColor: 'text-orange-400'
    }
  }
]

// Edges med custom type for S-kurver
const initialEdges: Edge[] = [
  {
    id: 'e-center-1',
    source: 'center',
    sourceHandle: 'top-left',
    target: 'benefit-1',
    type: 'custom',
    data: { color: '#60a5fa' }
  },
  {
    id: 'e-center-2',
    source: 'center',
    sourceHandle: 'top-right',
    target: 'benefit-2',
    type: 'custom',
    data: { color: '#f472b6' }
  },
  {
    id: 'e-center-3',
    source: 'center',
    sourceHandle: 'bottom-left',
    target: 'benefit-3',
    type: 'custom',
    data: { color: '#4ade80' }
  },
  {
    id: 'e-center-4',
    source: 'center',
    sourceHandle: 'bottom-right',
    target: 'benefit-4',
    type: 'custom',
    data: { color: '#fb923c' }
  }
]

export function CustomerNetwork() {
  return (
    <div className='h-full w-full min-h-[450px]'>
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          fitView
          fitViewOptions={{
            padding: 0.1,
            minZoom: 0.75,
            maxZoom: 0.85
          }}
          defaultViewport={{ x: 50, y: 50, zoom: 0.8 }}
          proOptions={{ hideAttribution: true }}
        />
      </ReactFlowProvider>
    </div>
  )
}
