import { Button } from '@/components/ui/Button'
import { Minus, Plus } from 'lucide-react'
import { getQuantityAriaLabel } from './utils/getQuantityAriaLabel'

import type { CartLine } from '@types'

const QuantityControls = ({
  line,
  isPending,
  onQuantityChange
}: {
  line: CartLine
  isPending: boolean
  onQuantityChange: (_newQuantity: number) => void
}): React.JSX.Element => (
  <div className='flex items-center gap-2'>
    <Button
      variant='outline'
      size='icon'
      aria-label={getQuantityAriaLabel('decrease', line.merchandise.title)}
      disabled={isPending || line.quantity <= 1}
      onClick={() => onQuantityChange(line.quantity - 1)}
    >
      <Minus className='size-4' />
    </Button>
    <span className='w-8 text-center text-sm font-medium' aria-live='polite'>
      {line.quantity}
    </span>
    <Button
      variant='outline'
      size='icon'
      aria-label={getQuantityAriaLabel('increase', line.merchandise.title)}
      disabled={isPending}
      onClick={() => onQuantityChange(line.quantity + 1)}
    >
      <Plus className='size-4' />
    </Button>
  </div>
)

export default QuantityControls
