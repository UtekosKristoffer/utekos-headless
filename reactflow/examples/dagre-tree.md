---
title: Dagre Tree
description: Integrate dagre js with React Flow to create simple tree layouts
---

This example shows how you can integrate
[dagre.js](https://github.com/dagrejs/dagre) with React Flow to create simple
tree layouts. Good alternatives to dagre are
[d3-hierarchy](https://github.com/d3/d3-hierarchy) or
[elkjs](https://github.com/kieler/elkjs) if you are looking for a more advanced
layouting library.

<RemoteCodeViewer route="examples/layout/dagre" framework="react" />

This example is a demonstration of _static_ layouting. If the nodes or edges in
the graph change, the layout _won't_ recalculate! It is possible to do dynamic
layouting with dagre (and other libraries), though: see the
[auto layout](/examples/layout/auto-layout) pro example for an example of this.

```tsx
import React, { useCallback } from 'react'
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState
} from '@xyflow/react'
import dagre from '@dagrejs/dagre'

import '@xyflow/react/dist/style.css'

import { initialNodes, initialEdges } from './initialElements'

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      }
    }

    return newNode
  })

  return { nodes: newNodes, edges }
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
)

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges)

  const onConnect = useCallback(
    params =>
      setEdges(eds =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  )
  const onLayout = useCallback(
    direction => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction)

      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    },
    [nodes, edges]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <Panel position='top-right'>
        <button className='xy-theme__button' onClick={() => onLayout('TB')}>
          vertical layout
        </button>
        <button className='xy-theme__button' onClick={() => onLayout('LR')}>
          horizontal layout
        </button>
      </Panel>
      <Background />
    </ReactFlow>
  )
}

export function App() {
  return <Flow />
}
```

---

#### `index.tsx`

```tsx
import React from 'react'

import { App } from './App'
import { createRoot } from 'react-dom/client'

import './index.css'

const container = document.querySelector('#app')
const root = createRoot(container)

root.render(<App />)
```

---

#### `initialElements.js`

```js
const position = { x: 0, y: 0 }
const edgeType = 'smoothstep'

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
    position
  },
  { id: '7', type: 'output', data: { label: 'output' }, position }
]

export const initialEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
  { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
  { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
  { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
  { id: 'e45', source: '4', target: '5', type: edgeType, animated: true },
  { id: 'e56', source: '5', target: '6', type: edgeType, animated: true },
  { id: 'e57', source: '5', target: '7', type: edgeType, animated: true }
]
```
