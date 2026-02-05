import React from 'react'
import type { AnatomyLayerData } from '../utils/config'

interface AnatomyTextProps {
  data: AnatomyLayerData
}

export function AnatomyText({ data }: AnatomyTextProps) {
  return (
    <div className='tech-text-item w-full text-center lg:text-left hidden'>
      <h3 className={`text-2xl lg:text-4xl font-bold mb-3 ${data.colors.icon}`}>
        {data.title}
      </h3>
      <p className='text-slate-300 leading-relaxed text-sm lg:text-lg'>
        {data.description}
      </p>
    </div>
  )
}
