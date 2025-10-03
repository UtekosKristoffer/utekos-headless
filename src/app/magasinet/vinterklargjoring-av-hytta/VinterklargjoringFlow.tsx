'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect, useState } from 'react' // Importer useEffect
import CustomNode from '../balpannen-din-guide-til-den-perfekte-hostkvelden/constants/CustomNode'
import { initialEdges, initialNodes } from './initialElements'

const nodeTypes = {
  custom: CustomNode
}

const categories = {
  UTE: ['ute', 'tak', 'vannkraner', 'mobler'],
  INNE: ['inne', 'mus', 'kjoleskap', 'tekstiler'],
  SYSTEMER: ['systemer', 'vann', 'strom', 'personlig-komfort']
}

// ------------------------------------------------------------------
// 1. MOBIL-KOMPONENT: Korrigert for å unngå dobbelttrykk
// ------------------------------------------------------------------
function MobileFlow() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof categories>('UTE')
  const { fitView } = useReactFlow()

  const handleTabClick = (category: keyof typeof categories) => {
    setActiveCategory(category)
  }

  useEffect(() => {
    // Gir React Flow et øyeblikk for å unngå race conditions ved første load
    const timer = setTimeout(() => {
      const nodeIds = categories[activeCategory]
      fitView({
        nodes: nodeIds.map(id => ({ id })),
        duration: 600,
        padding: 0.2
      })
    }, 50)
    return () => clearTimeout(timer)
  }, [activeCategory, fitView])

  return (
    <div className='h-full w-full'>
      <div className='flex justify-center gap-2 p-2'>
        {(Object.keys(categories) as Array<keyof typeof categories>).map(
          category => (
            <button
              key={category}
              onClick={() => handleTabClick(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category ?
                  'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag={false}
        preventScrolling={false}
        zoomOnScroll={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} color='oklch(var(--border) / 0.3)' />
      </ReactFlow>
    </div>
  )
}

// ------------------------------------------------------------------
// 2. DESKTOP-KOMPONENT
// ------------------------------------------------------------------
function DesktopFlow() {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      preventScrolling={false}
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
  )
}

// ------------------------------------------------------------------
// 3. HOVEDKOMPONENT
// ------------------------------------------------------------------
export default function VinterklargjoringFlow() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className='h-[720px] w-full overflow-hidden rounded-lg border border-neutral-800 bg-background'>
      <ReactFlowProvider>
        {isMobile ?
          <MobileFlow />
        : <DesktopFlow />}
      </ReactFlowProvider>
    </div>
  )
}
