'use client'

import { useState } from 'react'
import { initialNodes, categories } from './initialElements'
import { CustomNode } from './CustomNode'
import { cn } from '@/lib/utils/className'

export function MobileFlow() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof categories>('UTE')

  const parentNode = initialNodes.find(
    n => n.id === activeCategory.toLowerCase()
  )
  const childNodeIds = categories[activeCategory]
  const childNodes = initialNodes.filter(n => childNodeIds.includes(n.id))
  const visibleNodes = [parentNode, ...childNodes].filter(Boolean)

  return (
    <div className='flex w-full flex-col'>
      <div className='flex justify-center gap-2 border-b border-neutral-800 p-4'>
        {(Object.keys(categories) as Array<keyof typeof categories>).map(
          category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                activeCategory === category ?
                  'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
              )}
            >
              {category}
            </button>
          )
        )}
      </div>
      {/* Fjernet 'flex-grow' fra denne linjen */}
      <div className='space-y-4 overflow-y-auto p-4'>
        {visibleNodes.map(node => {
          if (!node) return null
          return (
            <div key={node.id}>
              {(
                node.id === 'ute'
                || node.id === 'inne'
                || node.id === 'systemer'
              ) ?
                <h3 className='py-2 text-center text-lg font-semibold'>
                  {node.data.label}
                </h3>
              : <CustomNode data={node.data} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
