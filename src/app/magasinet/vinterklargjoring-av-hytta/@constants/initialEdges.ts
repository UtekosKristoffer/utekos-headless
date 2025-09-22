import type { Edge } from '@xyflow/react'

export const initialEdges: Edge[] = [
  // Ute
  {
    id: 'e-ute-tak',
    source: 'ute',
    target: 'tak',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-ute-vannkraner',
    source: 'ute',
    target: 'vannkraner',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-ute-mobler',
    source: 'ute',
    target: 'mobler',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  // Inne
  {
    id: 'e-inne-mus',
    source: 'inne',
    target: 'mus',
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-inne-kjoleskap',
    source: 'inne',
    target: 'kjoleskap',
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-inne-tekstiler',
    source: 'inne',
    target: 'tekstiler',
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  // Systemer
  {
    id: 'e-systemer-vann',
    source: 'systemer',
    target: 'vann',
    type: 'smoothstep',
    style: { stroke: '#22d3ee', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-systemer-strom',
    source: 'systemer',
    target: 'strom',
    type: 'smoothstep',
    style: { stroke: '#22d3ee', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-systemer-komfort',
    source: 'systemer',
    target: 'personlig-komfort',
    type: 'smoothstep',
    style: { stroke: '#f472b6', strokeWidth: 2, strokeDasharray: '5 5' }
  }
]
