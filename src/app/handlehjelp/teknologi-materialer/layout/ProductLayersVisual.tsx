'use client'

import { motion } from 'framer-motion'

const layerMapping: { [key: string]: 'outer' | 'insulation' | 'inner' } = {
  'Fillpower 650 – Premium varme, minimal vekt': 'insulation',
  'Hollow Fiber – Lett og luftig isolasjon': 'insulation',
  '140 g/m² – Optimal balanse': 'insulation',
  'Shell Fabrix 20D / 380T – Fjærlett og robust beskyttelse': 'outer',
  'Flammehemmende Nylon med DWR – Trygghet rundt bålpannen': 'outer',
  'Nylon Taffeta – Silkemyk komfort på innsiden': 'inner'
}

export function ProductLayersVisual({ activeTech }: { activeTech: string }) {
  const activeLayer = layerMapping[activeTech] || 'insulation'

  return (
    <div className='sticky top-28 h-[50vh] w-full'>
      <div className='relative flex h-full w-full items-center justify-center'>
        <svg viewBox='0 0 200 200' className='h-[80%] w-[80%] drop-shadow-lg'>
          <defs>
            <filter id='glow'>
              <feGaussianBlur stdDeviation='3.5' result='coloredBlur' />
              <feMerge>
                <feMergeNode in='coloredBlur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          {/* Inner Layer */}
          <motion.path
            d='M 50 150 A 100 100 0 0 1 150 50'
            strokeWidth='12'
            strokeLinecap='round'
            fill='none'
            className='stroke-green-500'
            animate={{
              opacity: activeLayer === 'inner' ? 1 : 0.2,
              filter: activeLayer === 'inner' ? 'url(#glow)' : 'none'
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          {/* Insulation Layer */}
          <motion.path
            d='M 40 160 A 120 120 0 0 1 160 40'
            strokeWidth='12'
            strokeLinecap='round'
            fill='none'
            
            className='stroke-pink-500'
            animate={{
              opacity: activeLayer === 'insulation' ? 1 : 0.2,
              filter: activeLayer === 'insulation' ? 'url(#glow)' : 'none'
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          {/* Outer Layer */}
          <motion.path
            d='M 30 170 A 140 140 0 0 1 170 30'
            strokeWidth='12'
            strokeLinecap='round'
            fill='none'
            className='stroke-blue-500'
            animate={{
              opacity: activeLayer === 'outer' ? 1 : 0.2,
              filter: activeLayer === 'outer' ? 'url(#glow)' : 'none'
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </div>
  )
}
