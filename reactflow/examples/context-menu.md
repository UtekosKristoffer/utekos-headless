---
title: Context Menu
description: Right-click a node to display custom actions
---

The [`onNodeContextMenu`](/api-reference/react-flow#event-onnodecontextmenu?)
event can be used to show a custom menu when right-clicking a node.  
This example shows a simple menu with buttons to duplicate or delete the clicked
node.

<RemoteCodeViewer route="examples/interaction/context-menu" framework="react" />

---

### `App.jsx`

```jsx
import React, { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { initialNodes, initialEdges } from './initialElements'
import ContextMenu from './ContextMenu'

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [menu, setMenu] = useState(null)
  const ref = useRef(null)

  const onConnect = useCallback(
    params => setEdges(els => addEdge(params, els)),
    [setEdges]
  )

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault()
      const pane = ref.current.getBoundingClientRect()
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY
      })
    },
    [setMenu]
  )

  const onPaneClick = useCallback(() => setMenu(null), [setMenu])

  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onNodeContextMenu={onNodeContextMenu}
      fitView
    >
      <Background />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
    </ReactFlow>
  )
}

export default Flow
```

---

### `ContextMenu.jsx`

```jsx
import React, { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow()
  const duplicateNode = useCallback(() => {
    const node = getNode(id)
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50
    }

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position
    })
  }, [id, getNode, addNodes])

  const deleteNode = useCallback(() => {
    setNodes(nodes => nodes.filter(node => node.id !== id))
    setEdges(edges => edges.filter(edge => edge.source !== id))
  }, [id, setNodes, setEdges])

  return (
    <div
      style={{ top, left, right, bottom }}
      className='context-menu'
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>node: {id}</small>
      </p>
      <button onClick={duplicateNode}>duplicate</button>
      <button onClick={deleteNode}>delete</button>
    </div>
  )
}
```

---

### `initialElements.js`

```js
export const initialNodes = [
  { id: '1', position: { x: 175, y: 0 }, data: { label: 'a' } },
  { id: '2', position: { x: 0, y: 250 }, data: { label: 'b' } },
  { id: '3', position: { x: 175, y: 250 }, data: { label: 'c' } },
  { id: '4', position: { x: 350, y: 250 }, data: { label: 'd' } }
]

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' }
]

export default { initialNodes, initialEdges }
```

---

### `index.css`

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

.context-menu {
  background: white;
  border-style: solid;
  box-shadow: 10px 19px 20px rgba(0, 0, 0, 10%);
  position: absolute;
  z-index: 10;
}

.context-menu button {
  border: none;
  display: block;
  padding: 0.5em;
  text-align: left;
  width: 100%;
}

.context-menu button:hover {
  background: white;
}
```
