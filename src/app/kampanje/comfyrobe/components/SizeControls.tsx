'use client'

import React from 'react'
import type { SizeOptionKey } from '../utils/sizeSelectorData'

interface SizeControlsProps {
  selected: SizeOptionKey
  onSelect: (key: SizeOptionKey) => void
}

export function SizeControls({ selected, onSelect }: SizeControlsProps) {
  return (
    <div className='flex justify-center mb-12'>
      <div className='relative p-1 bg-slate-900 rounded-full border border-slate-800 flex shadow-inner'>
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-700 rounded-full transition-all duration-300 ease-out shadow-lg ${selected === 'XS/S' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
        />

        <button
          onClick={() => onSelect('XS/S')}
          className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-colors duration-300 ${selected === 'XS/S' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
        >
          XS / S (KOMPAKT)
        </button>

        <button
          onClick={() => onSelect('L/XL')}
          className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-colors duration-300 ${selected === 'L/XL' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
        >
          L / XL (ROMSLIG)
        </button>
      </div>
    </div>
  )
}
