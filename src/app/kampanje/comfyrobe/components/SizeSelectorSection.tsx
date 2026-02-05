'use client'

import { SizeControls } from './SizeControls'
import { SizeVisualizer } from './SizeVisualizer'
import { SizeInfoPanel } from './SizeInfoPanel'
import { SIZE_DATA, type SizeOptionKey } from '../utils/sizeSelectorData'

interface SizeSelectorSectionProps {
  selectedSize: SizeOptionKey
  onSelect: (key: SizeOptionKey) => void
}

export function SizeSelectorSection({
  selectedSize,
  onSelect
}: SizeSelectorSectionProps) {
  const currentProfile = SIZE_DATA[selectedSize]

  return (
    <section
      id='size-selector'
      className='relative bg-[#0a0a0a] py-24 lg:py-32 overflow-hidden'
    >
      <div className='absolute inset-0 pointer-events-none'>
        <div
          className={`absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-sky-900/20 rounded-full blur-[120px] transition-all duration-1000 ${selectedSize === 'S' ? 'opacity-100 scale-100' : 'opacity-20 scale-50'}`}
        />
        <div
          className={`absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-orange-900/20 rounded-full blur-[120px] transition-all duration-1000 ${selectedSize === 'L' ? 'opacity-100 scale-100' : 'opacity-20 scale-50'}`}
        />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl lg:text-5xl font-bold text-white mb-4'>
            Finn din{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white'>
              perfekte match
            </span>
          </h2>
          <p className='text-slate-400 max-w-lg mx-auto'>
            Vi er utsolgt for størrelse Medium, men sjansen er stor for at en av
            våre spesial-profiler passer deg <i>bedre</i>.
          </p>
        </div>

        <SizeControls selected={selectedSize} onSelect={onSelect} />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto'>
          <div className='order-1 lg:order-1'>
            <SizeVisualizer profile={currentProfile} />
          </div>
          <div className='order-2 lg:order-2'>
            <SizeInfoPanel profile={currentProfile} />
          </div>
        </div>
      </div>
    </section>
  )
}
