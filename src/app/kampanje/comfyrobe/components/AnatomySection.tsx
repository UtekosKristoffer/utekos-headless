'use client'

import React, { useRef, useState } from 'react'
import { AnatomyHeader } from './AnatomyHeader'
import { AnatomyCard } from './AnatomyCard'
import { AnatomyText } from './AnatomyText'
import { ANATOMY_LAYERS } from '../utils/anatomyData'
import { useAnatomyAnimation } from '../utils/useAnatomyAnimation'

export function AnatomySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  const [activeLayer, setActiveLayer] = useState(1)

  useAnatomyAnimation({
    containerRef: sectionRef,
    triggerRef,
    cardsContainerRef,
    setActiveLayer
  })

  return (
    <section ref={sectionRef} className='relative bg-[#0a0a0a] text-slate-200'>
      <div
        ref={triggerRef}
        className='h-[100dvh] w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden relative px-4 pt-20 lg:pt-0'
      >
        <AnatomyHeader
          activeLayer={activeLayer}
          totalLayers={ANATOMY_LAYERS.length}
        />

        <div className='relative w-full h-[45vh] lg:h-full lg:w-1/2 flex items-center justify-center perspective-2000 z-10 lg:order-2'>
          <div
            ref={cardsContainerRef}
            className='relative w-[280px] h-[380px] lg:w-[400px] lg:h-[550px] preserve-3d'
          >
            {ANATOMY_LAYERS.map((layer, index) => (
              <AnatomyCard
                key={layer.id}
                data={layer}
                index={index}
                total={ANATOMY_LAYERS.length}
              />
            ))}
          </div>
        </div>

        <div className='relative h-[25vh] lg:h-auto w-full lg:w-1/3 flex flex-col items-center lg:items-start justify-center px-4 lg:pl-20 z-20 lg:order-1'>
          <div ref={textContainerRef} className='relative w-full max-w-md'>
            {ANATOMY_LAYERS.map(layer => (
              <AnatomyText key={layer.id} data={layer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
