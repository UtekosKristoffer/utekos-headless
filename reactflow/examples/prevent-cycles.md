---
title: Preventing Cycles
description: Check if a new connection would cause a cycle in the graph
---

In the [validation](/examples/interaction/validation) example, we saw how to use
the [`isValidConnection`](/api-reference/react-flow#is-valid-connection)
callback to prevent certain connections from being created. This example shows
how to use the [`getOutgoers`](/api-reference/utils/get-outgoers) util to check
if a new connection would cause a cycle in the flow.

<RemoteCodeViewer
    route="examples/interaction/prevent-cycles"
    framework="react"
/>

## App.jsx

```jsx
import React, { useCallback } from 'react'
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getOutgoers,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { nodes as initialNodes, edges as initialEdges } from './initialElements'

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const { getNodes, getEdges } = useReactFlow()

  const isValidConnection = useCallback(
    connection => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      const nodes = getNodes()
      const edges = getEdges()
      const target = nodes.find(node => node.id === connection.target)
      const hasCycle = (node, visited = new Set()) => {
        if (visited.has(node.id)) return false

        visited.add(node.id)

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true
          if (hasCycle(outgoer, visited)) return true
        }
      }

      if (target.id === connection.source) return false
      return !hasCycle(target)
    },
    [getNodes, getEdges]
  )

  const onConnect = useCallback(params => setEdges(els => addEdge(params, els)))

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      isValidConnection={isValidConnection}
      fitView
    >
      <Background />
    </ReactFlow>
  )
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
)
```

## initialElements.js

```js
export const nodes = [
  {
    id: '1',
    position: { x: 0, y: 9 },
    data: { label: 'A' }
  },
  {
    id: '2',
    position: { x: 125, y: 125 },
    data: { label: 'B' }
  },
  {
    id: '3',
    position: { x: 0, y: 250 },
    data: { label: 'C' }
  },
  {
    id: '4',
    position: { x: -125, y: 125 },
    data: { label: 'C' }
  }
]

export const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  }
]
```

## index.css

```css
@import url('./xy-theme.css');

html,
body {
  margin: 0;
  font-family: sans-serif;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
}
```
