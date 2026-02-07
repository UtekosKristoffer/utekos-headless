import { Check, Minus } from 'lucide-react'

export function TableCellContent({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ?
        <Check className='mx-auto h-5 w-5 text-green-500' />
      : <Minus className='mx-auto h-5 w-5 text-neutral-600' />
  }

  return (
    <span className='text-sm leading-relaxed text-muted-foreground'>
      {value}
    </span>
  )
}
