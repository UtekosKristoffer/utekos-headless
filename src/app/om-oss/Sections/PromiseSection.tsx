'use client'

import dagre from '@dagrejs/dagre'
import {
  applyEdgeChanges,
  applyNodeChanges,
  EdgeLabelRenderer,
  Handle,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnNodesChange
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Handshake } from 'lucide-react'
import { memo, useCallback, useState } from 'react'

type PromiseTitleData = { label: string }
type PromiseTextData = { text: string; color: string }
type JunctionData = Record<string, never>
type CustomEdgeData = { color: string }
type NodeData = PromiseTitleData | PromiseTextData | JunctionData

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const getLayoutedElements = (
  nodes: Node<NodeData>[],
  edges: Edge<CustomEdgeData>[]
): { nodes: Node<NodeData>[]; edges: Edge<CustomEdgeData>[] } => {
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 120, ranksep: 160 })

  nodes.forEach(node => {
    const width =
      node.type === 'promiseTitle' ? 280
      : node.type === 'promiseText' ? 300
      : 1
    const height =
      node.type === 'promiseTitle' ? 180
      : node.type === 'promiseText' ? 180
      : 1
    dagreGraph.setNode(node.id, { width, height })
  })
  edges.forEach(edge => dagreGraph.setEdge(edge.source, edge.target))

  dagre.layout(dagreGraph)

  // Finn midtpunktet av tekstboksene
  const textNodes = nodes.filter(n => n.type === 'promiseText')
  let minX = Infinity
  let maxX = -Infinity

  textNodes.forEach(node => {
    const nodeData = dagreGraph.node(node.id)
    minX = Math.min(minX, nodeData.x)
    maxX = Math.max(maxX, nodeData.x)
  })

  const graphCenterX = (minX + maxX) / 2

  nodes.forEach(node => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.position = {
      x: nodeWithPosition.x - dagreGraph.node(node.id).width / 2,
      y: nodeWithPosition.y - dagreGraph.node(node.id).height / 2
    }

    if (node.type === 'promiseTitle') {
      node.position.x = graphCenterX - 140 + 50
    }

    return node
  })

  return { nodes, edges }
}

const initialNodesData: Node<NodeData>[] = [
  {
    id: '1',
    type: 'promiseTitle',
    data: { label: 'Vårt løfte' },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    type: 'promiseText',
    data: {
      text: 'Vårt løfte er en dypere form for komfort. Nøye utvalgte materialer gir en umiddelbar følelse av varme og velvære, slik at du kan nyte øyeblikket lenger.',
      color: '#60a5fa'
    },
    position: { x: 0, y: 0 }
  },
  {
    id: '3',
    type: 'promiseText',
    data: {
      text: 'Se på det som en varig investering i din egen hygge.',
      color: '#f472b6'
    },
    position: { x: 0, y: 0 }
  }
]

const initialEdgesData: Edge<CustomEdgeData>[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'customEdge',
    data: { color: '#60a5fa' }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'customEdge',
    data: { color: '#f472b6' }
  }
]

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodesData,
  initialEdgesData
)

const TitleNodeComponent = memo(({ data }: any) => (
  <div className='flex flex-col items-center gap-4 text-center'>
    <h2 className='text-4xl font-bold tracking-tight text-foreground'>
      {data.label}
    </h2>
    <div className='relative'>
      {/* Ambient glow */}
      <div
        className='absolute inset-0 rounded-full opacity-40 blur-xl'
        style={{ background: '#f59e0b' }}
      />
      <div className='relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/40 bg-amber-400/10 text-amber-400 transition-all duration-300 hover:scale-110 hover:border-amber-400/60'>
        <Handshake className='h-10 w-10' />
      </div>
    </div>
    <Handle
      type='source'
      position={Position.Bottom}
      className='!bg-transparent !border-none !w-0 !h-0'
      style={{ bottom: '20px' }}
    />
  </div>
))
TitleNodeComponent.displayName = 'PromiseTitleNode'

const TextNodeComponent = memo(({ data }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const glowColor = data.color || '#60a5fa'

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative w-[300px] rounded-xl border border-neutral-800 bg-sidebar-foreground p-6 text-center shadow-lg transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 overflow-hidden'
    >
      {/* Aurora gradient effect */}
      <div
        className='absolute -inset-x-2 -inset-y-12 blur-2xl transition-opacity duration-300'
        style={{
          opacity: isHovered ? 0.25 : 0.15,
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
        }}
      />

      <Handle
        type='target'
        position={Position.Top}
        className='!bg-transparent !border-none !w-0 !h-0'
      />
      <p className='relative z-10 text-base leading-relaxed text-muted-foreground'>
        {data.text}
      </p>

      {/* Subtle border glow on hover */}
      <div
        className='absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none'
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div
          className='absolute inset-0 rounded-xl blur-sm opacity-20'
          style={{ background: glowColor }}
        />
      </div>
    </div>
  )
})
TextNodeComponent.displayName = 'PromiseTextNode'

const CustomEdgeComponent = memo(
  ({ id, sourceX, sourceY, targetX, targetY, data }: any) => {
    const color = data?.color ?? '#60a5fa'

    const midY = sourceY + (targetY - sourceY) * 0.5

    const edgePath = `M ${sourceX},${sourceY} 
                    Q ${sourceX},${midY} ${(sourceX + targetX) / 2},${midY}
                    T ${targetX},${targetY}`

    return (
      <>
        <path
          id={id}
          d={edgePath}
          style={{
            stroke: color,
            strokeWidth: 2,
            fill: 'none',
            opacity: 0.6
          }}
          markerEnd=''
        />
        <EdgeLabelRenderer>
          {/* Glow at endpoint */}
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${targetX}px,${targetY}px)`,
              background: color,
              pointerEvents: 'none'
            }}
            className='nodrag nopan h-3 w-3 rounded-full opacity-60 blur-md'
          />
        </EdgeLabelRenderer>
      </>
    )
  }
)
CustomEdgeComponent.displayName = 'CustomEdge'

const nodeTypes = {
  promiseTitle: TitleNodeComponent,
  promiseText: TextNodeComponent
} as any

const edgeTypes = {
  customEdge: CustomEdgeComponent
} as any

export function PromiseSection() {
  const [nodes, setNodes] = useNodesState<Node<NodeData>>(layoutedNodes)
  const [edges, setEdges] = useEdgesState<Edge<CustomEdgeData>>(layoutedEdges)

  const onNodesChange: OnNodesChange<Node<NodeData>> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  )

  const onEdgesChange: OnEdgesChange<Edge<CustomEdgeData>> = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  )

  return (
    <section className='relative py-24 sm:py-32 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/3 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/3 bottom-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-7xl px-4'>
        <div className='relative h-[700px] w-full rounded-2xl border border-neutral-800 bg-[hsl(0,0%,4%,1)] shadow-2xl overflow-hidden'>
          {/* Subtle top gradient accent */}
          <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent' />

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            fitViewOptions={{ padding: 0.3, minZoom: 0.9, maxZoom: 1 }}
            proOptions={{ hideAttribution: true }}
            zoomOnScroll={false}
            panOnDrag={false}
            preventScrolling={false}
            nodesDraggable={false}
          />
        </div>
      </div>
    </section>
  )
}
