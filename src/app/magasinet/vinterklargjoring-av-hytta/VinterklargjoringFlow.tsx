'use client'

import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CustomNode from '../balpannen-din-guide-til-den-perfekte-hostkvelden/constants/CustomNode'
import { initialEdges } from './@constants/initialEdges'
import { initialNodes } from './@constants/initialNodes'
export const nodeTypes = {
  custom: CustomNode
}

export default function VinterklargjoringFlow() {
  return (
    <div className='h-[720px] w-full bg-background rounded-lg border border-neutral-800 overflow-hidden'>
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
          fitViewOptions={{ padding: 0.1, minZoom: 0.7, maxZoom: 1 }}
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
