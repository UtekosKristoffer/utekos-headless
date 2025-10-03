---
title: Floating Edges
description: |
  Instead of having the handle at a fixed point, let it move with the connected edge.
---

# Floating Edges Example

This is an example implementation for **floating edges**. The source and target
position of the edges are calculated dynamically.  
You can find the implementation details in the `utils.js` file.

---

## App.jsx

```jsx
import React, { useCallback } from 'react'
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import FloatingEdge from './FloatingEdge'
import FloatingConnectionLine from './FloatingConnectionLine'
import { initialElements } from './initialElements'

const { nodes: initialNodes, edges: initialEdges } = initialElements()

const edgeTypes = {
  floating: FloatingEdge
}

const NodeAsHandleFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = useCallback(
    params =>
      setEdges(eds =>
        addEdge(
          {
            ...params,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow }
          },
          eds
        )
      ),
    [setEdges]
  )

  return (
    <div className='floating-edges'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
      >
        <Background />
      </ReactFlow>
    </div>
  )
}

export default NodeAsHandleFlow
```

---

## FloatingConnectionLine.jsx

```jsx
import React from 'react'
import { getBezierPath } from '@xyflow/react'

import { getEdgeParams } from './initialElements.js'

function FloatingConnectionLine({
  toX,
  toY,
  fromPosition,
  toPosition,
  fromNode
}) {
  if (!fromNode) {
    return null
  }

  // Create a mock target node at the cursor position
  const targetNode = {
    id: 'connection-target',
    measured: {
      width: 1,
      height: 1
    },
    internals: {
      positionAbsolute: { x: toX, y: toY }
    }
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    fromNode,
    targetNode
  )

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos || fromPosition,
    targetPosition: targetPos || toPosition,
    targetX: tx || toX,
    targetY: ty || toY
  })

  return (
    <g>
      <path
        fill='none'
        stroke='#222'
        strokeWidth={1.5}
        className='animated'
        d={edgePath}
      />
      <circle
        cx={tx || toX}
        cy={ty || toY}
        fill='#fff'
        r={3}
        stroke='#222'
        strokeWidth={1.5}
      />
    </g>
  )
}

export default FloatingConnectionLine
```

---

## FloatingEdge.jsx

```jsx
import { getBezierPath, useInternalNode } from '@xyflow/react'

import { getEdgeParams } from './initialElements.js'

function FloatingEdge({ id, source, target, markerEnd, style }) {
  const sourceNode = useInternalNode(source)
  const targetNode = useInternalNode(target)

  if (!sourceNode || !targetNode) {
    return null
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  )

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
  })

  return (
    <path
      id={id}
      className='react-flow__edge-path'
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  )
}

export default FloatingEdge
```

---

## xy-theme.css

```css
/* xyflow theme files. Delete these to start from our base */

.react-flow {
  --xy-background-color: #f7f9fb;
  /* Custom Variables */
  --xy-theme-selected: #f57dbd;
  --xy-theme-hover: #c5c5c5;
  --xy-theme-edge-hover: black;
  --xy-theme-color-focus: #e8e8e8;

  /* Built-in Variables see https://reactflow.dev/learn/customization/theming */
  --xy-node-border-default: 1px solid #ededed;

  --xy-node-boxshadow-default:
    0px 3.54px 4.55px 0px #00000005, 0px 3.54px 4.55px 0px #0000000d,
    0px 0.51px 1.01px 0px #0000001a;

  --xy-node-border-radius-default: 8px;

  --xy-handle-background-color-default: #ffffff;
  --xy-handle-border-color-default: #aaaaaa;

  --xy-edge-label-color-default: #505050;
}

.react-flow.dark {
  --xy-node-boxshadow-default:
    0px 3.54px 4.55px 0px rgba(255, 255, 255, 0.05),
    /* light shadow */ 0px 3.54px 4.55px 0px rgba(255, 255, 255, 0.13),
    /* medium shadow */ 0px 0.51px 1.01px 0px rgba(255, 255, 255, 0.2); /* smallest shadow */
  --xy-theme-color-focus: #535353;
}

/* Customizing Default Theming */

.react-flow__node {
  box-shadow: var(--xy-node-boxshadow-default);
  border-radius: var(--xy-node-border-radius-default);
  background-color: var(--xy-node-background-color-default);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  font-size: 12px;
  flex-direction: column;
  border: var(--xy-node-border-default);
  color: var(--xy-node-color, var(--xy-node-color-default));
}

.react-flow__node.selectable:focus {
  box-shadow: 0px 0px 0px 4px var(--xy-theme-color-focus);
  border-color: #d9d9d9;
}

.react-flow__node.selectable:focus:active {
  box-shadow: var(--xy-node-boxshadow-default);
}

.react-flow__node.selectable:hover,
.react-flow__node.draggable:hover {
  border-color: var(--xy-theme-hover);
}

.react-flow__node.selectable.selected {
  border-color: var(--xy-theme-selected);
  box-shadow: var(--xy-node-boxshadow-default);
}

.react-flow__node-group {
  background-color: rgba(207, 182, 255, 0.4);
  border-color: #9e86ed;
}

.react-flow__edge.selectable:hover .react-flow__edge-path,
.react-flow__edge.selectable.selected .react-flow__edge-path {
  stroke: var(--xy-theme-edge-hover);
}

.react-flow__handle {
  background-color: var(--xy-handle-background-color-default);
}

.react-flow__handle.connectionindicator:hover {
  pointer-events: all;
  border-color: var(--xy-theme-edge-hover);
  background-color: white;
}

.react-flow__handle.connectionindicator:focus,
.react-flow__handle.connectingfrom,
.react-flow__handle.connectingto {
  border-color: var(--xy-theme-edge-hover);
}

.react-flow__node-resizer {
  border-radius: 0;
  border: none;
}

.react-flow__resize-control.handle {
  background-color: #ffffff;
  border-color: #9e86ed;
  border-radius: 0;
  width: 5px;
  height: 5px;
}

/* 
    Custom Example CSS  - This CSS is to improve the example experience.
    You can remove it if you want to use the default styles.

    New Theme Classes:
        .xy-theme__button   - Styles for buttons.
        .xy-theme__input    - Styles for text inputs.
        .xy-theme__checkbox - Styles for checkboxes.
        .xy-theme__select   - Styles for dropdown selects.
        .xy-theme__label    - Styles for labels.
    
    Use these classes to apply consistent theming across your components.
*/

:root {
  --color-primary: #ff0073;
  --color-background: #fefefe;
  --color-hover-bg: #f6f6f6;
  --color-disabled: #76797e;
}

.xy-theme__button-group {
  display: flex;
  align-items: center;

  .xy-theme__button:first-child {
    border-radius: 100px 0 0 100px;
  }

  .xy-theme__button:last-child {
    border-radius: 0 100px 100px 0;
    margin: 0;
  }
}

/* Custom Button Styling */
.xy-theme__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 100px;
  border: 1px solid var(--color-primary);
  background-color: var(--color-background);
  color: var(--color-primary);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  box-shadow: var(--xy-node-boxshadow-default);
  cursor: pointer;
}

.xy-theme__button.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.xy-theme__button.active:hover,
.xy-theme__button.active:active {
  background-color: var(--color-primary);
  opacity: 0.9;
}

.xy-theme__button:hover {
  background-color: var(--xy-controls-button-background-color-hover-default);
}

.xy-theme__button:active {
  background-color: var(--color-hover-bg);
}

.xy-theme__button:disabled {
  color: var(--color-disabled);
  opacity: 0.8;
  cursor: not-allowed;
  border: 1px solid var(--color-disabled);
}

.xy-theme__button > span {
  margin-right: 0.2rem;
}

/* Add gap between adjacent buttons */
.xy-theme__button + .xy-theme__button {
  margin-left: 0.3rem;
}

/* Example Input Styling */
.xy-theme__input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-primary);
  border-radius: 7px;
  background-color: var(--color-background);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  font-size: 1rem;
  color: inherit;
}

.xy-theme__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(255, 0, 115, 0.3);
}

/* Specific Checkbox Styling */
.xy-theme__checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 7px;
  border: 2px solid var(--color-primary);
  background-color: var(--color-background);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
}

.xy-theme__checkbox:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.xy-theme__checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 0, 115, 0.3);
}

/* Dropdown Styling */
.xy-theme__select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-primary);
  border-radius: 50px;
  background-color: var(--color-background);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  font-size: 1rem;
  color: inherit;
  margin-right: 0.5rem;
  box-shadow: var(--xy-node-boxshadow-default);
}

.xy-theme__select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(255, 0, 115, 0.3);
}

.xy-theme__label {
  margin-top: 10px;
  margin-bottom: 3px;
  display: inline-block;
}
```

---

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

.floating-edges {
  flex-direction: column;
  display: flex;
  flex-grow: 1;
  height: 100%;
}

.floating-edges .react-flow__handle {
  opacity: 0;
}
```

---

## initialElements.js

```js
import { Position, MarkerType } from '@xyflow/react'

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
    intersectionNode.measured
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute
  const targetPosition = targetNode.internals.positionAbsolute

  const w = intersectionNodeWidth / 2
  const h = intersectionNodeHeight / 2

  const x2 = intersectionNodePosition.x + w
  const y2 = intersectionNodePosition.y + h
  const x1 = targetPosition.x + targetNode.measured.width / 2
  const y1 = targetPosition.y + targetNode.measured.height / 2

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h)
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h)
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1))
  const xx3 = a * xx1
  const yy3 = a * yy1
  const x = w * (xx3 + yy3) + x2
  const y = h * (-xx3 + yy3) + y2

  return { x, y }
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.internals.positionAbsolute, ...node }
  const nx = Math.round(n.x)
  const ny = Math.round(n.y)
  const px = Math.round(intersectionPoint.x)
  const py = Math.round(intersectionPoint.y)

  if (px <= nx + 1) {
    return Position.Left
  }
  if (px >= nx + n.measured.width - 1) {
    return Position.Right
  }
  if (py <= ny + 1) {
    return Position.Top
  }
  if (py >= n.y + n.measured.height - 1) {
    return Position.Bottom
  }

  return Position.Top
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target)
  const targetIntersectionPoint = getNodeIntersection(target, source)

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint)
  const targetPos = getEdgePosition(target, targetIntersectionPoint)

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos
  }
}

export function initialElements() {
  const nodes = []
  const edges = []
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

  nodes.push({ id: 'target', data: { label: 'Target' }, position: center })

  for (let i = 0; i < 8; i++) {
    const degrees = i * (360 / 8)
    const radians = degrees * (Math.PI / 180)
    const x = 250 * Math.cos(radians) + center.x
    const y = 250 * Math.sin(radians) + center.y

    nodes.push({ id: `${i}`, data: { label: 'Source' }, position: { x, y } })

    edges.push({
      id: `edge-${i}`,
      target: 'target',
      source: `${i}`,
      type: 'floating',
      markerEnd: {
        type: MarkerType.Arrow
      }
    })
  }

  return { nodes, edges }
}
```

---

## RemoteCodeViewer

```jsx
<RemoteCodeViewer route='examples/edges/floating-edges' framework='react' />
```

---

**Note:**

- All code and configuration is shown for clarity and LLM understanding.
- For further details, see the referenced files and comments in each code block.
