import type { Edge } from '@xyflow/react'

export const initialEdges: Edge[] = [
  {
    id: 'e-c-lys',
    source: 'center',
    target: 'lys',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: '#facc15',
      strokeWidth: 2,
      strokeDasharray: '5 5'
    }
  },
  {
    id: 'e-c-lyd',
    source: 'center',
    target: 'lyd',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: '#a78bfa',
      strokeWidth: 2,
      strokeDasharray: '5 5'
    }
  },
  {
    id: 'e-c-tekstur',
    source: 'center',
    target: 'tekstur',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: '#fb923c',
      strokeWidth: 2,
      strokeDasharray: '5 5'
    }
  },
  {
    id: 'e-c-varme',
    source: 'center',
    target: 'varme',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: '#f472b6',
      strokeWidth: 2,
      strokeDasharray: '5 5'
    }
  }
]
