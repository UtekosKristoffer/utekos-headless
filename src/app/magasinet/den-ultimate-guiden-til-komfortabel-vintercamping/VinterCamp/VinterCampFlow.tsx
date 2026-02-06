'use client'

import {
  edges,
  nodes,
  iconMap,
  type IconName,
  type FlowNode
} from './initialElements'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useState, useEffect } from 'react'

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={className} /> : null
}

function CustomNodeCard({ node }: { node: FlowNode }) {
  if (node.type !== 'custom') return null

  return (
    <div className='flex h-full w-full items-center rounded-lg border border-neutral-700 bg-background p-4 shadow-lg'>
      <div className='flex items-center gap-3'>
        <IconRenderer
          name={node.data.icon}
          className={`h-5 w-5 flex-shrink-0 ${node.data.iconColor}`}
        />
        <div>
          <h4 className='text-base font-bold text-foreground'>
            {node.data.label}
          </h4>
          <p className='text-sm text-article-white'>{node.data.description}</p>
        </div>
      </div>
    </div>
  )
}

function DesktopLayout() {
  return (
    <svg viewBox='0 0 900 320' className='size-full' aria-hidden='true'>
      {/* Linjer */}
      {edges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source)!
        const targetNode = nodes.find(n => n.id === edge.target)!
        const sourceX = sourceNode.position.x + sourceNode.width / 2
        const sourceY = sourceNode.position.y + sourceNode.height
        const targetX = targetNode.position.x + targetNode.width / 2
        const targetY = targetNode.position.y
        const pathD = `M ${sourceX},${sourceY} C ${sourceX},${sourceY + 60} ${targetX},${targetY - 60} ${targetX},${targetY}`
        return (
          <path
            key={edge.id}
            d={pathD}
            fill='none'
            strokeWidth={2}
            style={edge.style}
          />
        )
      })}
      {/* Noder */}
      {nodes.map(node => (
        <foreignObject
          key={node.id}
          x={node.position.x}
          y={node.position.y}
          width={node.width}
          height={node.height}
        >
          {node.type === 'input' && (
            <div className='flex h-full items-center justify-center rounded-md border border-neutral-700 bg-sidebar-foreground p-4 text-center font-semibold text-foreground'>
              {node.data.label}
            </div>
          )}
          {node.type === 'custom' && <CustomNodeCard node={node} />}
        </foreignObject>
      ))}
    </svg>
  )
}

function MobileLayout() {
  const customNodes = nodes.filter(node => node.type === 'custom')
  const titleNode = nodes.find(node => node.type === 'input')

  return (
    <div className='flex flex-col gap-4'>
      {titleNode && (
        <h3 className='text-center font-semibold text-foreground'>
          {titleNode.data.label}
        </h3>
      )}
      {customNodes.map(node => (
        <CustomNodeCard key={node.id} node={node} />
      ))}
    </div>
  )
}

export function VintercampFlow() {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Viser en placeholder på serveren for å unngå layout-shift
  if (!isClient) {
    return (
      <div className='h-[340px] w-full rounded-lg bg-sidebar-foreground dot-pattern p-4' />
    )
  }

  return (
    <div className='w-full rounded-lg bg-sidebar-foreground dot-pattern p-4'>
      {isMobile ?
        <MobileLayout />
      : <DesktopLayout />}
    </div>
  )
}
