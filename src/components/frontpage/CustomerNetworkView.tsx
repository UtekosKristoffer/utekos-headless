import Image from 'next/image'
import type { CSSProperties } from 'react'
import UtekosLogo from '@public/icon.png'
import { iconMap, type IconName } from './initialElements'
import type { CustomerNetworkViewProps } from 'types/flow.types'

function IconRenderer({
  name,
  className,
  style
}: {
  name: IconName
  className?: string
  style?: CSSProperties
}) {
  const Icon = iconMap[name]

  return Icon ? <Icon aria-hidden='true' className={className} style={style} /> : null
}

export function CustomerNetworkView({ nodes, edges, centerNode }: CustomerNetworkViewProps) {
  const benefitNodes = nodes.filter(node => node.type !== 'center')

  return (
    <div className='relative mx-auto aspect-square w-full max-w-[520px]'>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 520 520'
        aria-hidden='true'
        className='absolute inset-0 overflow-visible'
      >
        {edges.map(edge => {
          const sourceNode = nodes.find(node => node.id === edge.sourceId)
          const targetNode = nodes.find(node => node.id === edge.targetId)

          if (!sourceNode || !targetNode) return null

          const sourceX = sourceNode.position.x + sourceNode.width / 2
          const sourceY = sourceNode.position.y + sourceNode.height / 2
          const targetX = targetNode.position.x + targetNode.width / 2
          const targetY = targetNode.position.y + targetNode.height / 2

          const midX = (sourceX + targetX) / 2
          const midY = (sourceY + targetY) / 2
          const pathD = `M ${sourceX},${sourceY} Q ${sourceX},${midY} ${midX},${midY} T ${targetX},${targetY}`

          return (
            <path
              key={edge.id}
              d={pathD}
              stroke={edge.data.color}
              strokeWidth={2}
              strokeLinecap='round'
              strokeDasharray='5 7'
              strokeOpacity={0.72}
              vectorEffect='non-scaling-stroke'
              fill='none'
            />
          )
        })}

        {benefitNodes.map(node => {
          const accentColor = node.data?.color ?? 'var(--ancient-water)'

          const nodeStyle = {
            '--network-accent': accentColor,
            'borderColor': `color-mix(in oklch, ${accentColor} 72%, var(--maritime-darkest) 28%)`,
            'background': `color-mix(in oklch, ${accentColor} 86%, var(--cloud-dancer) 14%)`
          } as CSSProperties

          return (
            <foreignObject
              key={node.id}
              x={node.position.x}
              y={node.position.y}
              width={node.width}
              height={node.height}
            >
              <div
                className='flex size-full items-center justify-center rounded-full border px-4 text-maritime-darkest shadow-[0_18px_40px_-28px_rgba(14,18,35,0.68)] ring-1 ring-cloud-dancer/35'
                style={nodeStyle}
              >
                {node.data ?
                  <div className='flex min-w-0 items-center justify-center gap-2.5'>
                    <span
                      className='flex size-8 shrink-0 items-center justify-center rounded-full border border-maritime-darkest/12 bg-maritime-darkest shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                      style={{
                        color: accentColor
                      }}
                    >
                      <IconRenderer name={node.data.icon as IconName} className='h-4 w-4' />
                    </span>

                    <span className='whitespace-nowrap text-sm font-medium leading-none tracking-wide text-maritime-darkest'>
                      {node.data.text}
                    </span>
                  </div>
                : null}
              </div>
            </foreignObject>
          )
        })}
      </svg>

      {centerNode ?
        <div className='pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
          <div className='relative flex h-28 w-28 items-center justify-center rounded-full border border-ancient-water/40 bg-[var(--maritime-darkest)] shadow-[0_0_0_8px_rgba(255,255,255,0.025),0_24px_54px_-32px_rgba(0,0,0,0.9)]'>
            <div className='relative h-24 w-24 overflow-hidden rounded-full border-2 border-cloud-dancer/55 bg-cloud-dancer'>
              <Image
                src={UtekosLogo}
                alt='Utekos'
                fill
                priority
                sizes='96px'
                className='scale-[1.08] object-cover'
              />
            </div>
          </div>
        </div>
      : null}
    </div>
  )
}
