import type { Edge } from '@xyflow/react'

export const initialEdges: Edge[] = [
  {
    id: 'e-c-tekstiler',
    source: 'center',
    target: 'tekstiler',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#fb923c', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-belysning',
    source: 'center',
    target: 'belysning',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#facc15', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-levegg',
    source: 'center',
    target: 'levegg',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#22d3ee', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-varme',
    source: 'center',
    target: 'varme',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f472b6', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-drikke',
    source: 'center',
    target: 'drikke',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#4ade80', strokeWidth: 2, strokeDasharray: '5 5' }
  }
]
