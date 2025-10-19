'use client'

import {
  nodes,
  edges,
  iconMap,
  type IconName,
  type CustomNodeData
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

function CustomNodeCard({ data }: { data: CustomNodeData }) {
  return (
    <div className='relative flex h-full w-full flex-col justify-center rounded-xl border border-neutral-800 bg-sidebar-foreground p-5'>
      <div
        className='absolute inset-0 rounded-lg blur-xl opacity-20'
        style={{ background: data.shadowColor }}
      />
      <div className='relative z-10'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
            <IconRenderer
              name={data.icon}
              className={`h-6 w-6 ${data.iconColor}`}
            />
          </div>
          <h3 className='text-base font-semibold'>{data.label}</h3>
        </div>
        <p className='text-sm leading-relaxed text-access/70'>
          {data.description}
        </p>
      </div>
    </div>
  )
}

function DesktopLayout() {
  return (
    <svg viewBox='0 0 880 960' className='size-full' aria-hidden='true'>
      {/* Linjer */}
      {edges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.sourceId)!
        const targetNode = nodes.find(n => n.id === edge.targetId)!

        // Presis beregning fra kant til kant
        const sourceX = sourceNode.position.x + sourceNode.width
        const sourceY = sourceNode.position.y + sourceNode.height / 2
        const targetX = targetNode.position.x
        const targetY = targetNode.position.y + targetNode.height / 2

        const pathD = `M ${sourceX},${sourceY} C ${sourceX + 80},${sourceY} ${targetX - 80},${targetY} ${targetX},${targetY}`

        return <path key={edge.id} d={pathD} style={edge.style} fill='none' />
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
          {node.type === 'default' && (
            <div className='flex h-full items-center justify-center rounded-lg border border-neutral-700 bg-sidebar-foreground p-3 text-center text-sm font-semibold text-foreground'>
              {node.data.label}
            </div>
          )}
          {node.type === 'custom' && (
            <CustomNodeCard data={node.data as CustomNodeData} />
          )}
        </foreignObject>
      ))}
    </svg>
  )
}

function MobileLayout() {
  const centerNode = nodes.find(node => node.type === 'default')
  const customNodes = nodes.filter(node => node.type === 'custom')

  return (
    <div className='flex flex-col gap-4'>
      {centerNode && (
        <h3 className='rounded-lg border border-neutral-700 bg-sidebar-foreground p-3 text-center text-sm font-semibold text-foreground'>
          {centerNode.data.label}
        </h3>
      )}
      {customNodes.map(node => (
        <CustomNodeCard key={node.id} data={node.data as CustomNodeData} />
      ))}
    </div>
  )
}

export default function BalpanneFlow() {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className='h-[600px] w-full rounded-lg border border-neutral-800 bg-background dot-pattern' />
    )
  }

  return (
    <div className='w-full rounded-lg border border-neutral-800 bg-background dot-pattern p-4'>
      {isMobile ?
        <MobileLayout />
      : <DesktopLayout />}
    </div>
  )
}
