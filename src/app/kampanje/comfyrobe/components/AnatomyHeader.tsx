import React from 'react'
import { Layers } from 'lucide-react'

interface AnatomyHeaderProps {
  activeLayer: number
  totalLayers: number
}

export function AnatomyHeader({
  activeLayer,
  totalLayers
}: AnatomyHeaderProps) {
  return (
    <div className='absolute top-8 left-0 w-full text-center z-20'>
      <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-4 shadow-lg'>
        <Layers className='w-4 h-4 text-sky-400' />
        <span className='text-xs font-medium text-sky-200 uppercase tracking-widest'>
          Tech Breakdown
        </span>
      </div>
      <div className='flex justify-center gap-2 mt-2'>
        {Array.from({ length: totalLayers }).map((_, i) => {
          const layerNum = i + 1
          const isActive = activeLayer === layerNum
          return (
            <div
              key={layerNum}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isActive ? 'bg-sky-400' : 'bg-slate-800'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
