'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ACCORDION_DATA } from '../utils/offerSpecsData'

function AccordionItem({
  item,
  isOpen,
  onToggle
}: {
  item: (typeof ACCORDION_DATA)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
        isOpen ?
          'border-slate-700 bg-slate-800/30 shadow-lg shadow-black/10'
        : 'border-slate-800/60 bg-slate-900/20 hover:border-slate-700 hover:bg-slate-800/20'
      }`}
    >
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between p-4 lg:p-5 text-left group'
      >
        <div className='flex items-center gap-3 lg:gap-4'>
          <div
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isOpen ?
                'bg-sky-500/20 text-sky-400'
              : 'bg-slate-800 text-slate-500 group-hover:text-slate-400'
            }`}
          >
            {item.icon}
          </div>
          <span
            className={`font-medium lg:text-lg transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
            }`}
          >
            {item.title}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-sky-400' : 'group-hover:text-slate-400'
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className='overflow-hidden'>
          <div className='p-5 pt-2 lg:p-6 lg:pt-2 border-t border-slate-700/50 mx-1 text-sm lg:text-base text-slate-300'>
            {item.content}
          </div>
        </div>
      </div>
    </div>
  )
}

export function OfferSpecs() {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(prev => (prev === id ? null : id))
  }

  const midPoint = Math.ceil(ACCORDION_DATA.length / 2)
  const leftColumnData = ACCORDION_DATA.slice(0, midPoint)
  const rightColumnData = ACCORDION_DATA.slice(midPoint)

  return (
    <div className='w-full'>
      <div className='flex items-center gap-4 mb-8 lg:mb-12'>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent lg:via-slate-700' />
        <p className='text-sm font-bold text-sky-500 uppercase tracking-widest px-2'>
          Tekniske Spesifikasjoner
        </p>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent lg:via-slate-700' />
      </div>

      <div className='block lg:hidden space-y-3'>
        {ACCORDION_DATA.map(item => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openAccordionId === item.id}
            onToggle={() => toggleAccordion(item.id)}
          />
        ))}
      </div>
      <div className='hidden lg:grid lg:grid-cols-2 gap-6 items-start'>
        <div className='space-y-4'>
          {leftColumnData.map(item => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openAccordionId === item.id}
              onToggle={() => toggleAccordion(item.id)}
            />
          ))}
        </div>

        <div className='space-y-4'>
          {rightColumnData.map(item => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openAccordionId === item.id}
              onToggle={() => toggleAccordion(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
