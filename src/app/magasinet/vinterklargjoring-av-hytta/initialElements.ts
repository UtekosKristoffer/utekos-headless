import { type Node, type Edge } from '@xyflow/react'
import { HomeModernIcon as Roof } from '@heroicons/react/24/outline'

import {
  Armchair,
  Droplets,
  Plug,
  Rat,
  Refrigerator,
  Shirt,
  ShowerHead,
  UserCheck
} from 'lucide-react'
export const initialNodes: Node[] = [
  {
    id: 'ute',
    position: { x: 0, y: 0 },
    data: { label: 'UTE' },
    type: 'default',
    style: {
      width: 280,
      textAlign: 'center',
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid neutral-800',
      borderRadius: '8px'
    }
  },
  {
    id: 'tak',
    position: { x: 0, y: 120 },
    data: {
      icon: Roof,
      label: 'Tak & Takrenner',
      description:
        'Rensk for løv og sjekk for skader for å unngå lekkasjer og isdannelse.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    },
    type: 'custom'
  },
  {
    id: 'vannkraner',
    position: { x: 0, y: 310 },
    data: {
      icon: ShowerHead,
      label: 'Vannkraner & Slanger',
      description:
        'Steng utekranen fra innsiden og tøm alle hageslanger for vann for å unngå frostspreng.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    },
    type: 'custom'
  },
  {
    id: 'mobler',
    position: { x: 0, y: 500 },
    data: {
      icon: Armchair,
      label: 'Møbler & Løsøre',
      description:
        'Sett inn eller dekk til utemøbler. Sikre alt som kan bli tatt av høst- og vinterstormene.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    },
    type: 'custom'
  },

  {
    id: 'inne',
    position: { x: 350, y: 0 },
    data: { label: 'INNE' },
    type: 'default',
    style: {
      width: 280,
      textAlign: 'center',
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid neutral-800',
      borderRadius: '8px'
    }
  },
  {
    id: 'mus',
    position: { x: 350, y: 120 },
    data: {
      icon: Rat,
      label: 'Mus & Skadedyr',
      description:
        'Tett alle små åpninger og fjern mat som kan tiltrekke seg ubudne gjester.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    },
    type: 'custom'
  },
  {
    id: 'kjoleskap',
    position: { x: 350, y: 310 },
    data: {
      icon: Refrigerator,
      label: 'Kjøleskap & Mat',
      description:
        'Tøm, vask ut og la døren stå på gløtt for å unngå mugg og dårlig lukt.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    },
    type: 'custom'
  },
  {
    id: 'tekstiler',
    position: { x: 350, y: 500 },
    data: {
      icon: Shirt,
      label: 'Tekstiler & Verdi',
      description:
        'Pakk sengetøy og håndklær i plastkasser. Ta med verdisaker hjem.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    },
    type: 'custom'
  },

  {
    id: 'systemer',
    position: { x: 700, y: 0 },
    data: { label: 'SYSTEMER' },
    type: 'default',
    style: {
      width: 280,
      textAlign: 'center',
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid neutral-800',
      borderRadius: '8px'
    }
  },
  {
    id: 'vann',
    position: { x: 700, y: 120 },
    data: {
      icon: Droplets,
      label: 'Vann & Avløp',
      description:
        'Hovedregelen: Alt vann må ut! Steng hovedkranen og tøm rør, tanker og vannlåser.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    },
    type: 'custom'
  },
  {
    id: 'strom',
    position: { x: 700, y: 310 },
    data: {
      icon: Plug,
      label: 'Strøm & Oppvarming',
      description:
        'Skru av alt unødvendig. Sett på en lav vedlikeholdsvarme for å holde hytten tørr.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    },
    type: 'custom'
  },
  {
    id: 'personlig-komfort',
    position: { x: 700, y: 500 },
    data: {
      icon: UserCheck,
      label: 'Personlig Komfort',
      description:
        'Legg igjen en Utekos. Da har du garantert øyeblikkelig varme ved ankomst til en kald hytte.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6'
    },
    type: 'custom'
  }
]

// --- Konstanter for layout ---
const NODE_WIDTH = 280
const CARD_HEIGHT = 180
const ROW_GAP = 250 // Vertikal avstand mellom hver rad
const CARD_HORIZONTAL_GAP = 40

export const getLayoutedElements = (
  nodes: Node[],
  isMobile: boolean
): { nodes: Node[]; edges: Edge[] } => {
  const categories: Record<string, { parent: Node; children: Node[] }> = {
    ute: { parent: nodes.find(n => n.id === 'ute')!, children: [] },
    inne: { parent: nodes.find(n => n.id === 'inne')!, children: [] },
    systemer: {
      parent: nodes.find(n => n.id === 'systemer')!,
      children: []
    }
  }

  // Grupper barnenoder under riktig kategori
  nodes.forEach(node => {
    const edge = initialEdges.find(e => e.target === node.id)
    if (edge) {
      const parentId = edge.source
      if (categories[parentId]) {
        categories[parentId].children.push(node)
      }
    }
  })

  const layoutedNodes: Node[] = []

  // --- MOBIL LAYOUT ---
  if (isMobile) {
    let currentY = 0
    Object.values(categories).forEach(category => {
      // Plasser forelder
      category.parent.position = { x: 0, y: currentY }
      layoutedNodes.push(category.parent)
      currentY += 100 // Avstand fra tittel til kort

      // Plasser barn vertikalt
      category.children.forEach(child => {
        child.position = { x: 0, y: currentY }
        layoutedNodes.push(child)
        currentY += CARD_HEIGHT + 40
      })
      currentY += 80 // Ekstra avstand mellom kategorier
    })
    // Vi skjuler kanter på mobil for et renere utseende
    return { nodes: layoutedNodes, edges: [] }
  }

  // --- DESKTOP LAYOUT ---
  Object.values(categories).forEach((category, rowIndex) => {
    const rowY = rowIndex * ROW_GAP
    const childrenCount = category.children.length
    const totalRowWidth =
      childrenCount * NODE_WIDTH + (childrenCount - 1) * CARD_HORIZONTAL_GAP
    const rowStartX = -totalRowWidth / 2

    // Plasser forelder i midten over barna
    category.parent.position = { x: 0, y: rowY - 80 }
    layoutedNodes.push(category.parent)

    // Plasser barn horisontalt
    category.children.forEach((child, childIndex) => {
      child.position = {
        x: rowStartX + childIndex * (NODE_WIDTH + CARD_HORIZONTAL_GAP),
        y: rowY
      }
      layoutedNodes.push(child)
    })
  })

  // Returner noder med korrekte posisjoner og de opprinnelige kantene
  return { nodes: layoutedNodes, edges: initialEdges }
}

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
