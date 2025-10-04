'use client'

import { Background, Controls, ReactFlow } from '@xyflow/react'
import { nodeTypes } from '../@constants/CustomNode'
import { vintercampEdges } from '../@constants/vintercampEdges'
import { vintercampNodes } from '../@constants/vintercampNodes'
export function VintercampFlow() {
  return (
    <div
      style={{ height: '420px' }}
      className='bg-sidebar-foreground rounded-lg'
    >
      <ReactFlow
        nodes={vintercampNodes}
        edges={vintercampEdges}
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
