'use client'

import {
  nodes,
  initialEdges,
  iconMap,
  type IconName,
  type FlowNode
} from './initialElements'
import { useMediaQuery } from '@/hooks/use-media-query'
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
    <svg viewBox='0 0 620 450' className='size-full' aria-hidden='true'>
      {initialEdges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source)!
        const targetNode = nodes.find(n => n.id === edge.target)!
        const sourceX = sourceNode.position.x + sourceNode.width
        const sourceY = sourceNode.position.y + sourceNode.height / 2
        const targetX = targetNode.position.x
        const targetY = targetNode.position.y + targetNode.height / 2
        const pathD = `M ${sourceX},${sourceY} C ${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`
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
  const inputNode = nodes.find(node => node.type === 'input')
  const customNodes = nodes.filter(node => node.type === 'custom')

  return (
    <div className='flex flex-col gap-4'>
      {inputNode && (
        <h3 className='text-center font-semibold text-foreground'>
          {inputNode.data.label}
        </h3>
      )}
      {customNodes.map(node => (
        <CustomNodeCard key={node.id} node={node} />
      ))}
    </div>
  )
}

export default function BobilPrepFlow() {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className='h-[450px] w-full rounded-lg bg-sidebar-foreground dot-pattern' />
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
