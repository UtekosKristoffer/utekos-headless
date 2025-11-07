'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { nodes, iconMap, edges, type IconName } from './initialElements'

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

export default function HyttekosFlow() {
  const [isMobile, setIsMobile] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobil-versjon: Enkel vertikal layout med animasjoner
  if (isMobile) {
    return (
      <div ref={ref} className='space-y-4 p-4'>
        {/* Senter-node */}
        <div
          className={`flex items-center justify-center rounded-lg border border-neutral-700 bg-sidebar-foreground p-4 text-center text-sm font-semibold transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Den perfekte hyttekosen
        </div>

        {/* Custom nodes med staggered animation */}
        {nodes
          .filter(n => n.type === 'custom')
          .map((node, index) => (
            <div
              key={node.id}
              className={`relative overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground p-4 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: `${(index + 1) * 150}ms`
              }}
            >
              {/* Gradient overlay */}
              <div
                className='absolute inset-0 opacity-5'
                style={{
                  background: `linear-gradient(135deg, ${node.data.shadowColor}20 0%, transparent 100%)`
                }}
              />

              {/* Glød-effekt */}
              <div
                className='absolute inset-0 rounded-lg blur-xl opacity-20'
                style={{ background: node.data.shadowColor }}
              />

              <div className='relative z-10'>
                <div className='mb-3 flex items-center gap-3'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
                    <IconRenderer
                      name={node.data.icon!}
                      className={`h-5 w-5 ${node.data.iconColor}`}
                    />
                  </div>
                  <h3 className='text-base font-semibold'>{node.data.label}</h3>
                </div>
                <p className='text-sm leading-relaxed text-article-white/80'>
                  {node.data.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    )
  }

  // Desktop-versjon: SVG flow med animasjoner og hover-effekter
  return (
    <div
      ref={ref}
      className={`h-auto w-full overflow-hidden rounded-lg border border-neutral-800 bg-background dot-pattern p-4 transition-all duration-700 ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <style>{`
        @keyframes stroke-draw {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
      <svg
        viewBox='0 0 600 570'
        className='size-full'
        preserveAspectRatio='xMidYMid meet'
        aria-hidden='true'
      >
        {/* Linjer */}
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source)!
          const targetNode = nodes.find(n => n.id === edge.target)!

          const sourceX = sourceNode.position.x + sourceNode.width / 2
          const sourceY = sourceNode.position.y + sourceNode.height / 2

          let targetX = targetNode.position.x + targetNode.width / 2
          let targetY = targetNode.position.y + targetNode.height / 2

          switch (targetNode.data.handlePosition) {
            case 'top':
              targetY = targetNode.position.y
              targetX = targetNode.position.x + targetNode.width / 2
              break
            case 'bottom':
              targetY = targetNode.position.y + targetNode.height
              targetX = targetNode.position.x + targetNode.width / 2
              break
            case 'left':
              targetX = targetNode.position.x
              targetY = targetNode.position.y + targetNode.height / 2
              break
            case 'right':
              targetX = targetNode.position.x + targetNode.width
              targetY = targetNode.position.y + targetNode.height / 2
              break
          }

          const pathD = `M ${sourceX},${sourceY} C ${sourceX},${(sourceY + targetY) / 2} ${targetX},${(sourceY + targetY) / 2} ${targetX},${targetY}`

          return (
            <path
              key={edge.id}
              d={pathD}
              fill='none'
              strokeWidth={2}
              strokeDasharray='5 5'
              style={{
                ...edge.style,
                animation: 'stroke-draw 1s linear infinite'
              }}
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
            {node.type === 'default' && (
              <div className='flex h-full items-center justify-center rounded-lg border border-neutral-700 bg-sidebar-foreground p-3 text-center text-xs font-semibold text-foreground'>
                {node.data.label}
              </div>
            )}
            {node.type === 'custom' && (
              <div className='group relative h-full w-full rounded-lg border border-neutral-800 bg-sidebar-foreground p-4 transition-all duration-300 hover:border-neutral-600 hover:shadow-lg cursor-default overflow-hidden'>
                {/* Gradient overlay */}
                <div
                  className='absolute inset-0 opacity-5'
                  style={{
                    background: `linear-gradient(135deg, ${node.data.shadowColor}20 0%, transparent 100%)`
                  }}
                />

                {/* Glød-effekt med hover */}
                <div
                  className='absolute inset-0 rounded-lg blur-xl opacity-20 transition-opacity duration-300 group-hover:opacity-30'
                  style={{ background: node.data.shadowColor }}
                />

                <div className='relative z-10'>
                  <div className='mb-2 flex items-center gap-2'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-transform duration-300 group-hover:scale-110'>
                      <IconRenderer
                        name={node.data.icon!}
                        className={`h-5 w-5 ${node.data.iconColor} transition-all duration-300`}
                      />
                    </div>
                    <h3 className='text-sm font-semibold'>{node.data.label}</h3>
                  </div>
                  <p className='text-xs leading-relaxed text-article-white/80'>
                    {node.data.description}
                  </p>
                </div>
              </div>
            )}
          </foreignObject>
        ))}
      </svg>
    </div>
  )
}
