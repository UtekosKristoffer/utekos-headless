import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils/className'

interface CareListProps {
  variant: 'do' | 'dont'
  title: string
  items: readonly string[]
}

const variantStyles = {
  do: {
    container:
      'border-maritime-blue/16 bg-[color-mix(in_oklab,var(--cloud-dancer)_78%,var(--ancient-water)_22%)]',
    iconWrap: 'border-maritime-blue/40 bg-maritime-blue text-cloud-dancer',
    Icon: Check
  },
  dont: {
    container:
      'border-demitasse/16 bg-[color-mix(in_oklab,var(--cloud-dancer)_82%,var(--bleached-mauve)_18%)]',
    iconWrap: 'border-maritime-darkest/18 bg-overcast text-maritime-darkest',
    Icon: Minus
  }
} as const

export function CareList({ variant, title, items }: CareListProps) {
  const { container, iconWrap, Icon } = variantStyles[variant]

  return (
    <div className={cn('rounded-2xl border p-5 sm:p-6', container)}>
      <div className='flex items-center gap-3'>
        <span
          aria-hidden='true'
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full border',
            iconWrap
          )}
        >
          <Icon className='size-[1.05rem]' strokeWidth={2.4} />
        </span>
        <h4 className='text-base font-semibold tracking-tight text-maritime-darkest sm:text-lg'>
          {title}
        </h4>
      </div>
      <ul className='mt-4 space-y-2.5 text-sm font-utekos-text leading-relaxed text-maritime-darkest sm:text-base'>
        {items.map(item => (
          <li key={item} className='flex gap-2.5'>
            <span
              aria-hidden='true'
              className='mt-[0.55em] size-1 shrink-0 rounded-full bg-maritime-darkest/44'
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
