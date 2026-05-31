// Path: src/app/handlehjelp/vask-og-vedlikehold/components/CareList.tsx

import { cn } from '@/lib/utils/className'
import type { CareListProps } from '../types'
import { variantStyles } from '../utils/variantStyles'

export function CareList({ variant, title, items }: CareListProps) {
  const { container, iconWrap, Icon } = variantStyles[variant]

  return (
    <div className={cn('rounded-2xl border p-5 sm:p-6', container)}>
      <div className='flex items-center gap-3'>
        <span
          aria-hidden='true'
          className={cn('flex size-9 shrink-0 items-center justify-center rounded-full border', iconWrap)}
        >
          <Icon className='size-[1.05rem]' strokeWidth={2.4} />
        </span>
        <h4 className='text-base font-semibold   text-background sm:text-lg'>{title}</h4>
      </div>
      <ul className='mt-4 space-y-2.5 text-sm   leading-relaxed text-background sm:text-base'>
        {items.map(item => (
          <li key={item} className='flex gap-2.5'>
            <span aria-hidden='true' className='mt-[0.55em] size-1 shrink-0 rounded-full bg-background/44' />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
