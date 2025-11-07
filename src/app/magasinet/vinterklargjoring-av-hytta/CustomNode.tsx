'use client'

import { initialNodes } from './initialElements'
import { IconRenderer } from './VinterklargjoringFlow'
export function CustomNode({
  data
}: {
  data: (typeof initialNodes)[0]['data']
}) {
  if (!data.icon) return null
  return (
    <div className='relative flex h-full w-full flex-col justify-center rounded-xl border border-neutral-800 bg-sidebar-foreground p-5'>
      <div
        className='absolute inset-0 rounded-lg blur-xl opacity-20'
        style={{ background: data.shadowColor }}
      />
      <div className='relative z-10'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
            <IconRenderer
              name={data.icon}
              className={`h-6 w-6 ${data.iconColor}`}
            />
          </div>
          <h3 className='text-base md:text-lg font-semibold'>{data.label}</h3>
        </div>
        <p className='text-sm md:text-[20px] md:w-full leading-relaxed text-article-white/80'>
          {data.description}
        </p>
      </div>
    </div>
  )
}
