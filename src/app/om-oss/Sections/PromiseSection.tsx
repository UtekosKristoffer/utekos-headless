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
import { memo, useCallback } from 'react'

// === Type-definisjoner ===
type PromiseTitleData = { label: string }
type PromiseTextData = { text: string }
type JunctionData = Record<string, never>
type CustomEdgeData = { color: string }
type NodeData = PromiseTitleData | PromiseTextData | JunctionData

// === Dagre Layout ===
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const getLayoutedElements = (
  nodes: Node<NodeData>[],
  edges: Edge<CustomEdgeData>[]
): { nodes: Node<NodeData>[]; edges: Edge<CustomEdgeData>[] } => {
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 100, ranksep: 80 })

  nodes.forEach(node => {
    const width =
      node.type === 'promiseTitle' ? 256
      : node.type === 'promiseText' ? 256
      : 1
    const height =
      node.type === 'promiseTitle' ? 160
      : node.type === 'promiseText' ? 150
      : 1
    dagreGraph.setNode(node.id, { width, height })
  })
  edges.forEach(edge => dagreGraph.setEdge(edge.source, edge.target))

  dagre.layout(dagreGraph)

  nodes.forEach(node => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.position = {
      x: nodeWithPosition.x - dagreGraph.node(node.id).width / 2,
      y: nodeWithPosition.y - dagreGraph.node(node.id).height / 2
    }
    return node
  })

  return { nodes, edges }
}

// === Initiell data ===
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
      text: 'Vårt løfte er en dypere form for komfort. Nøye utvalgte materialer gir en umiddelbar følelse av varme og velvære, slik at du kan nyte øyeblikket lenger.'
    },
    position: { x: 0, y: 0 }
  },
  {
    id: '3',
    type: 'promiseText',
    data: { text: 'Se på det som en varig investering i din egen hygge.' },
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

// === Node komponenter ===
const TitleNodeComponent = memo(({ data }: any) => (
  <div className='flex flex-col items-center gap-4 text-center'>
    <h2 className='text-3xl font-bold tracking-tight'>{data.label}</h2>
    <div className='relative flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400'>
      <Handshake className='h-8 w-8' />
      {/* Skygge-effekt under ikonet ved handle-posisjonen */}
      <div className='absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-400/30 blur-md' />
    </div>
    <Handle
      type='source'
      position={Position.Bottom}
      className='!bg-transparent !border-none !w-0 !h-0'
      style={{ bottom: '30px' }}
    />
  </div>
))
TitleNodeComponent.displayName = 'PromiseTitleNode'

const TextNodeComponent = memo(({ data }: any) => (
  <div className='w-64 rounded-lg bg-sidebar-foreground p-6 text-center text-muted-foreground shadow-lg'>
    <Handle
      type='target'
      position={Position.Top}
      className='!bg-transparent !border-none !w-0 !h-0'
    />
    <p className='text-lg leading-8'>{data.text}</p>
  </div>
))
TextNodeComponent.displayName = 'PromiseTextNode'

// === Custom Edge komponent med bølgeeffekt ===
const CustomEdgeComponent = memo(
  ({ id, sourceX, sourceY, targetX, targetY, data }: any) => {
    const color = data?.color ?? '#b1b1b7'

    // Beregn kontrollpunkter for kurven
    const midY = sourceY + (targetY - sourceY) * 0.5

    // Lager en glatt S-kurve med SVG path - alltid bølgeformet
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
            strokeWidth: 1.5,
            fill: 'none'
          }}
          markerEnd=''
        />
        <EdgeLabelRenderer>
          {/* Skygge-effekt ved endepunktet */}
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${targetX}px,${targetY}px)`,
              background: color,
              pointerEvents: 'none'
            }}
            className='nodrag nopan h-3 w-3 rounded-full opacity-50 blur-md'
          />
        </EdgeLabelRenderer>
      </>
    )
  }
)
CustomEdgeComponent.displayName = 'CustomEdge'

// === Type-objekter ===
const nodeTypes = {
  promiseTitle: TitleNodeComponent,
  promiseText: TextNodeComponent
} as any

const edgeTypes = {
  customEdge: CustomEdgeComponent
} as any

// === Hovedkomponent ===
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
    <section className='py-24 sm:py-32'>
      <div className='h-[600px] w-full rounded-lg border border-neutral-800 bg-[hsl(0,0%,4%,1)]'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          zoomOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
          nodesDraggable={false}
        />
      </div>
    </section>
  )
}
