import Image from 'next/image'
import UtekosLogo from '@public/icon.png'
import { iconMap, nodes, edges, type IconName } from './initialElements'

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

export function CustomerNetwork() {
  return (
    <div className='relative mx-auto w-full max-w-[450px] aspect-square'>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 450 450'
        aria-hidden='true'
      >
        {/* Edges (Lines) */}
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.sourceId)!
          const targetNode = nodes.find(n => n.id === edge.targetId)!

          const sourceX = sourceNode.position.x + sourceNode.width / 2
          const sourceY = sourceNode.position.y + sourceNode.height / 2
          const targetX = targetNode.position.x + targetNode.width / 2
          const targetY = targetNode.position.y + targetNode.height / 2

          const midX = (sourceX + targetX) / 2
          const midY = (sourceY + targetY) / 2

          const pathD = `M ${sourceX},${sourceY} Q ${sourceX},${midY} ${midX},${midY} T ${targetX},${targetY}`

          return (
            <g key={edge.id}>
              <path
                d={pathD}
                stroke={edge.data.color}
                strokeWidth={2}
                fill='none'
                strokeDasharray='5 5'
                className='animate-pulse'
              />
              <circle
                cx={targetX}
                cy={targetY}
                r='6'
                fill={edge.data.color}
                opacity='0.3'
                filter='blur(4px)'
              />
            </g>
          )
        })}

        {/* Nodes (HTML inside SVG) */}
        {nodes.map(node => (
          <foreignObject
            key={node.id}
            x={node.position.x}
            y={node.position.y}
            width={node.width}
            height={node.height}
          >
            {node.type === 'center' && (
              <div className='relative'>
                <div className='flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-700 bg-background shadow-2xl'>
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-transparent'>
                    <Image
                      src={UtekosLogo}
                      alt='Utekos Logo'
                      className='h-12 w-12'
                    />
                  </div>
                </div>
                <div className='absolute inset-0 rounded-full bg-primary/20 blur-xl' />
              </div>
            )}
            {node.type === 'benefit' && node.data && (
              <div className='rounded-lg border border-neutral-800 bg-sidebar-foreground p-3 shadow-lg'>
                <div className='flex items-center gap-2'>
                  <IconRenderer
                    name={node.data.icon}
                    className={`h-4 w-4 flex-shrink-0 ${node.data.iconColor}`}
                  />
                  <span className='whitespace-nowrap text-xs font-medium'>
                    {node.data.text}
                  </span>
                </div>
              </div>
            )}
          </foreignObject>
        ))}
      </svg>
    </div>
  )
}