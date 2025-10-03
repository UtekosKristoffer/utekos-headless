---
title: Computing Flows
description:
  This examples demonstrates how to use the helpers to handle data flow
---

This example shows how to use the computing flow helpers `useNodesData`,
`useNodeConnections`, and `updateNode`. You can find more detailed information
in the [Computing Flows Guide](/learn/advanced-use/computing-flows).

```jsx
<RemoteCodeViewer
  route='examples/interaction/computing-flows'
  framework='react'
/>
```

## App.jsx

```jsx
import { useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    Background,
    type Edge,
    type OnConnect,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import TextNode from './TextNode';
import ResultNode from './ResultNode';
import UppercaseNode from './UppercaseNode';
import { type MyNode } from './initialElements';

const nodeTypes = {
    text: TextNode,
    result: ResultNode,
    uppercase: UppercaseNode,
};

const initNodes: MyNode[] = [
    {
        id: '1',
        type: 'text',
        data: {
            text: 'hello',
        },
        position: { x: -100, y: -50 },
    },
    {
        id: '2',
        type: 'text',
        data: {
            text: 'world',
        },
        position: { x: 0, y: 100 },
    },
    {
        id: '3',
        type: 'uppercase',
        data: { text: '' },
        position: { x: 100, y: -100 },
    },
    {
        id: '4',
        type: 'result',
        data: {},
        position: { x: 300, y: -75 },
    },
];

const initEdges: Edge[] = [
    {
        id: 'e1-3',
        source: '1',
        target: '3',
    },
    {
        id: 'e3-4',
        source: '3',
        target: '4',
    },
    {
        id: 'e2-4',
        source: '2',
        target: '4',
    },
];

const CustomNodeFlow = () => {
    const [nodes, , onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
        >
            <Controls />
            <Background />
        </ReactFlow>
    );
};

export default CustomNodeFlow;
```

## ResultNode.tsx

```jsx
import { memo } from 'react';
import {
    Handle,
    Position,
    useNodeConnections,
    useNodesData,
} from '@xyflow/react';
import { isTextNode, type MyNode } from './initialElements';

function ResultNode() {
    const connections = useNodeConnections({
        handleType: 'target',
    });
    const nodesData = useNodesData<MyNode>(
        connections.map((connection) => connection.source),
    );
    const textNodes = nodesData.filter(isTextNode);

    return (
        <div>
            <Handle type="target" position={Position.Left} />
            <div>
                incoming texts:{' '}
                {textNodes.map(({ data }, i) => <div key={i}>{data.text}</div>) ||
                    'none'}
            </div>
        </div>
    );
}

export default memo(ResultNode);
```

## TextNode.tsx

```jsx
import { memo } from 'react';
import { Position, Handle, useReactFlow, type NodeProps, type Node } from '@xyflow/react';

function TextNode({ id, data }: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();

    return (
        <div>
            <div>node {id}</div>
            <div>
                <input
                    onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
                    value={data.text}
                    className="xy-theme__input"
                />
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default memo(TextNode);
```

## UppercaseNode.tsx

```jsx
import { memo, useEffect } from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useNodeConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import { isTextNode, type MyNode } from './initialElements';

function UppercaseNode({ id }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useNodeConnections({
        handleType: 'target',
    });
    const nodesData = useNodesData<MyNode>(connections[0]?.source);
    const textNode = isTextNode(nodesData) ? nodesData : null;

    useEffect(() => {
        updateNodeData(id, { text: textNode?.data.text.toUpperCase() });
    }, [textNode]);

    return (
        <div>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={connections.length === 0}
            />
            <div>uppercase transform</div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default memo(UppercaseNode);
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

## index.tsx

```jsx
import { createRoot } from 'react-dom/client'
import App from './App'

import './index.css'

const container = document.querySelector('#app')
const root = createRoot(container)

root.render(<App />)
```

## initialElements.ts

```ts
import { type Node } from '@xyflow/react'

export type TextNode = Node<{ text: string }, 'text'>
export type ResultNode = Node<{}, 'result'>
export type UppercaseNode = Node<{ text: string }, 'uppercase'>
export type MyNode = TextNode | ResultNode | UppercaseNode

export function isTextNode(
  node: any
): node is TextNode | UppercaseNode | undefined {
  return !node ? false : node.type === 'text' || node.type === 'uppercase'
}
```
