'use client'

import {
  Background,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  type NodeProps
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Moon, Sun, type LucideIcon } from 'lucide-react'
import { memo } from 'react'

// Type-definisjon for node data
interface StoryNodeData {
  icon: LucideIcon
  label: string
  description: string
  color: string
}

// --- En dedikert node-komponent kun for denne historien ---
const StoryNode = memo(({ data }: NodeProps) => {
  // Type-cast data til vår spesifikke type
  const nodeData = data as unknown as StoryNodeData
  const Icon = nodeData.icon

  return (
    <div className='w-full rounded-lg bg-sidebar-foreground p-4 shadow-lg border border-neutral-800'>
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
      <div className='flex items-center gap-3 text-sm'>
        <Icon className={`h-4 w-4 ${nodeData.color}`} />
        <p className='font-semibold'>{nodeData.label}</p>
        <p className='text-muted-foreground'>{nodeData.description}</p>
      </div>
    </div>
  )
})
StoryNode.displayName = 'StoryNode'

const nodeTypes = {
  story: StoryNode
}

// --- Definisjon av noder og ledning ---
const initialNodes: Node[] = [
  {
    id: 'for',
    type: 'story',
    position: { x: 0, y: 0 },
    data: {
      icon: Moon,
      label: 'Før Utekos:',
      description: 'Kveldene ble alltid for korte.',
      color: 'text-red-400'
    }
  },
  {
    id: 'etter',
    type: 'story',
    position: { x: 0, y: 150 },
    data: {
      icon: Sun,
      label: 'Etter Utekos:',
      description: 'Nå bestemmer vi når kvelden er over.',
      color: 'text-blue-400'
    }
  }
]

const initialEdges: Edge[] = [
  {
    id: 'e-for-etter',
    source: 'for',
    target: 'etter',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: 'url(#gradient)',
      strokeWidth: 2,
      strokeDasharray: '5 5'
    }
  }
]

// --- Hovedkomponenten ---
export function CustomerStory() {
  return (
    <div className='h-full w-full min-h-[300px]'>
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
          fitViewOptions={{ padding: 0.4 }}
          proOptions={{ hideAttribution: true }}
        >
          {/* Definerer fargegradienten for ledningen */}
          <svg>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='#f87171' />
                <stop offset='100%' stopColor='#60a5fa' />
              </linearGradient>
            </defs>
          </svg>
          <Background gap={24} size={1} color='oklch(var(--border) / 0.2)' />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
