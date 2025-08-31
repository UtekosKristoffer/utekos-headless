// Fil: src/components/product/QuantitySelector.tsx
'use client'

import { Minus, Plus } from 'lucide-react'
import Button from '@/components/ui/button'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
}

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  const handleDecrement = () => {
    const newValue = Math.max(1, value - 1)
    onChange(newValue)
  }

  const handleIncrement = () => {
    const newValue = value + 1
    onChange(newValue)
  }

  return (
    <div className='flex items-center rounded-lg border border-white/20 p-2'>
      <Button type='button' variant={'outline'} size='icon' onClick={handleDecrement} disabled={value <= 1} className='size-6 shrink-0 rounded-full'>
        <Minus />
      </Button>

      {/* Viser 'value'-propen direkte */}
      <span className='w-10 text-center' aria-live='polite'>
        {value}
      </span>

      <Button type='button' variant={'outline'} size='icon' onClick={handleIncrement} className='size-6 shrink-0 rounded-full'>
        <Plus />
      </Button>
    </div>
  )
}

export default QuantitySelector
