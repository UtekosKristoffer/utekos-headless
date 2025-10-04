// Path: src/app/magasinet/slik-skaper-du-den-perfekte-stemningen-pa-hytten/client-code/HyttekosFlow.tsx

'use client'

import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react'
import { initialEdges } from '../@constants/initialEdges'
import { initialNodes } from '../@constants/initialNodes'
import { nodeTypes } from '../@constants/nodeTypes'

export default function HyttekosFlow() {
  return (
    <div className='h-[480px] w-full bg-background rounded-lg border border-neutral-800 overflow-hidden'>
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
          fitViewOptions={{
            padding: 0.1,
            includeHiddenNodes: false,
            minZoom: 0.8,
            maxZoom: 1
          }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
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
