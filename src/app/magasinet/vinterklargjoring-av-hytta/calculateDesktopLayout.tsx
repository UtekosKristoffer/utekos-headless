'use client'

import { categories, initialNodes } from './initialElements'

export function calculateDesktopLayout() {
  const layoutedNodes: any[] = []
  const edges: any[] = []
  const ROW_GAP = 370 // Økt fra 250 for å unngå overlapp
  const CARD_HORIZONTAL_GAP = 80
  const NODE_WIDTH = 280
  const Y_OFFSET = 30

  Object.keys(categories).forEach((key, rowIndex) => {
    const categoryKey = key.toLowerCase()
    const parent = initialNodes.find(n => n.id === categoryKey)!
    const children = initialNodes.filter(n =>
      categories[key as keyof typeof categories].includes(n.id)
    )
    const rowY = Y_OFFSET + rowIndex * ROW_GAP
    const childrenCount = children.length
    const totalRowWidth =
      childrenCount * NODE_WIDTH + (childrenCount - 1) * CARD_HORIZONTAL_GAP
    const rowStartX = (1200 - totalRowWidth) / 2

    layoutedNodes.push({
      ...parent,
      position: { x: (1200 - NODE_WIDTH) / 2, y: rowY - 120 }
    })

    children.forEach((child, childIndex) => {
      layoutedNodes.push({
        ...child,
        position: {
          x: rowStartX + childIndex * (NODE_WIDTH + CARD_HORIZONTAL_GAP),
          y: rowY
        }
      })
      edges.push({
        id: `e-${parent.id}-${child.id}`,
        sourceId: parent.id,
        targetId: child.id,
        style: {
          stroke: child.data.shadowColor,
          strokeWidth: 2,
          strokeDasharray: '5 5'
        }
      })
    })
  })
  return { nodes: layoutedNodes, edges }
}
