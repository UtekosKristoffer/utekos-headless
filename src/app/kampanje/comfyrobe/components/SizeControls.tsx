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
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-700 rounded-full transition-all duration-300 ease-out shadow-lg ${selected === 'S' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
        />

        <button
          onClick={() => onSelect('S')}
          className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-colors duration-300 ${selected === 'S' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Small
        </button>

        <button
          onClick={() => onSelect('L')}
          className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-colors duration-300 ${selected === 'L' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Large
        </button>
      </div>
    </div>
  )
}
