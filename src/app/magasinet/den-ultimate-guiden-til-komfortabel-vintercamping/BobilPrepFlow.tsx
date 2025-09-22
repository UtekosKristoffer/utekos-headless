// Path: src/app/magasinet/den-ultimate-guiden-til-komfortabel-vintercamping/BobilPrepFlow.tsx

'use client'

import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node
} from '@xyflow/react'
import { ALargeSmall, Car, Droplets, Wrench } from 'lucide-react'
import { memo } from 'react'

// Importerer nødvendig CSS for React Flow
import '@xyflow/react/dist/style.css'

// Custom Node for React Flow, nå med farge på ikon
const CustomNode = memo(
  ({
    data
  }: {
    data: { icon: any; label: string; description: string; iconColor: string }
  }) => {
    const Icon = data.icon
    return (
      <div className='bg-background border border-neutral-700 rounded-lg p-4 w-64 shadow-lg'>
        <Handle
          type='target'
          position={Position.Left}
          className='!bg-neutral-600'
        />
        <div className='flex items-center gap-3 mb-2'>
          <Icon className={`h-5 w-5 ${data.iconColor}`} />
          <h4 className='font-bold text-foreground text-base'>{data.label}</h4>
        </div>
        <p className='text-muted-foreground text-sm'>{data.description}</p>
        <Handle
          type='source'
          position={Position.Right}
          className='!bg-neutral-600'
        />
      </div>
    )
  }
)
CustomNode.displayName = 'CustomNode'

const nodeTypes = {
  custom: CustomNode
}

// Oppdatert med farger for ikonene
const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 150 },
    data: { label: 'Bobilen må være klar' },
    type: 'input',
    style: {
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid oklch(var(--border))',
      width: 180,
      textAlign: 'center'
    }
  },
  {
    id: '2',
    position: { x: 350, y: 0 },
    data: {
      icon: ALargeSmall,
      label: 'Isolasjon',
      description:
        'Sjekk tetningslister. Bruk isolasjonsmatter i førerhuset for å minimere varmetap.',
      iconColor: 'text-blue-400'
    },
    type: 'custom'
  },
  {
    id: '3',
    position: { x: 350, y: 110 },
    data: {
      icon: Wrench,
      label: 'Varmesystem',
      description:
        'Test Alde/Truma. Sørg for nok propan-gass og åpne alle luftdyser for sirkulasjon.',
      iconColor: 'text-orange-400'
    },
    type: 'custom'
  },
  {
    id: '4',
    position: { x: 350, y: 220 },
    data: {
      icon: Droplets,
      label: 'Vannsystem',
      description:
        'Sikre at tanker/rør er oppvarmet. Bruk frostvæske i gråvannstanken for å unngå is.',
      iconColor: 'text-cyan-400'
    },
    type: 'custom'
  },
  {
    id: '5',
    position: { x: 350, y: 330 },
    data: {
      icon: Car,
      label: 'Dekk & Kjetting',
      description:
        'Gode vinterdekk er et krav. Ta alltid med kjettinger for sikkerhet på fjellet.',
      iconColor: 'text-green-400'
    },
    type: 'custom'
  }
]

// Oppdatert for å fjerne animasjon og legge til unike farger på linjene
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    style: { stroke: '#60a5fa', strokeWidth: 2 }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    style: { stroke: '#fb923c', strokeWidth: 2 }
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'smoothstep',
    style: { stroke: '#22d3ee', strokeWidth: 2 }
  },
  {
    id: 'e1-5',
    source: '1',
    target: '5',
    type: 'smoothstep',
    style: { stroke: '#4ade80', strokeWidth: 2 }
  }
]

export default function BobilPrepFlow() {
  return (
    <div
      style={{ height: '450px' }}
      className='bg-sidebar-foreground rounded-lg'
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
      >
        <Background gap={16} color='oklch(var(--border) / 0.5)' />
        <Controls
          showInteractive={false}
          className='fill-neutral-600 text-neutral-600'
        />
      </ReactFlow>
    </div>
  )
}
