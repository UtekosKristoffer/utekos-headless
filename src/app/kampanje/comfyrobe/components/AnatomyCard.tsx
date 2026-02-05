import React from 'react'
import Image from 'next/image'
import type { AnatomyLayerData } from '../utils/anatomyData'

interface AnatomyCardProps {
  data: AnatomyLayerData
  index: number
  total: number
}

export function AnatomyCard({ data, index, total }: AnatomyCardProps) {
  const Icon = data.icon
  const zIndex = total - index

  return (
    <div
      className={`tech-card absolute inset-0 rounded-3xl border border-slate-700 shadow-2xl flex items-center justify-center backface-hidden will-change-transform ${data.colors.bgGradient}`}
      style={{ zIndex }}
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]' />

      <div className='relative z-10 text-center p-4 w-full h-full flex flex-col justify-center items-center'>
        {/* Conditional Rendering: Bilde eller Ikon */}
        {data.imageSrc ?
          <div className='relative w-48 h-48 lg:w-64 lg:h-64 mb-4'>
            <Image
              src={data.imageSrc}
              alt={data.title}
              fill
              className='object-contain drop-shadow-2xl'
              sizes='(max-width: 768px) 200px, 300px'
            />
          </div>
        : <Icon
            className={`w-20 h-20 mx-auto mb-4 drop-shadow-lg ${data.colors.icon}`}
          />
        }

        <div
          className={`text-xs font-mono mb-2 border-b pb-1 w-full max-w-[200px] opacity-50 ${data.colors.text} ${data.colors.border}`}
        >
          {data.layerLabel}
        </div>

        <div className={`text-2xl font-bold ${data.colors.text}`}>
          {data.title}
        </div>

        <div className={`text-sm mt-1 ${data.colors.subText}`}>
          {data.subtitle}
        </div>
      </div>
    </div>
  )
}
