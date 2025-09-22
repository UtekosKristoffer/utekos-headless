'use client'

import { nodeTypes } from '@/app/magasinet/bobil-i-hostferien/@constants/nodeTypes'
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { initialEdges } from './@constants/initialEdges'
import { initialNodes } from './@constants/initialNodes'

export default function BobilHostruterFlow() {
  return (
    <div className='h-[500px] w-full bg-background rounded-lg border border-neutral-800 overflow-hidden'>
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
          fitViewOptions={{ padding: 0.2, minZoom: 0.8, maxZoom: 1.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={16} color='oklch(var(--border) / 0.3)' />
          <Controls
            showInteractive={false}
            className='!bg-sidebar-foreground !border-neutral-800 [&>button]:!bg-sidebar-foreground [&>button]:!border-neutral-800 [&>button]:!text-muted-foreground [&>button:hover]:!bg-background'
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
