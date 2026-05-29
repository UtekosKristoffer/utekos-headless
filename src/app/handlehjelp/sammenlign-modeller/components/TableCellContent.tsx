// Path: src/app/handlehjelp/sammenlign-modeller/components/TableCellContent.tsx
import { Check } from 'lucide-react'

export function TableCellContent({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ?
        <span className='inline-flex size-8 items-center justify-center rounded-full bg-primary-button text-maritime-darkest'>
          <Check className='size-4' aria-hidden='true' />
          <span className='sr-only'>Ja</span>
        </span>
      : <span className='font-utekos-text text-sm text-havdyp/70'>Nei</span>
  }

  return (
    <span className='font-utekos-text text-sm leading-[1.45] tracking-tight text-havdyp/82'>{value}</span>
  )
}
