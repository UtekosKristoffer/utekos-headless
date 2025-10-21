'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { AddToCartFormValues } from '@types'

export function QuantitySelector() {
  const { watch, setValue } = useFormContext<AddToCartFormValues>()
  const quantity = watch('quantity')

  const updateQuantity = (newQuantity: number) => {
    // Sørger for at verdien aldri er mindre enn 1 eller NaN
    const validQuantity = Math.max(1, newQuantity || 1)
    setValue('quantity', validQuantity, { shouldValidate: true })
  }

  return (
    <div className='inline-flex h-10 items-center bg-background rounded-lg text-foreground'>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='h-full'
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        <MinusIcon className='h-4 w-4' />
        <span className='sr-only'>Reduser antall</span>
      </Button>

      <Input
        type='text'
        inputMode='numeric'
        pattern='[0-9]*'
        value={quantity}
        onChange={e => updateQuantity(parseInt(e.target.value, 10))}
        className='h-full w-10  bg-transparent text-center text-base focus-visible:ring-0'
      />

      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='h-full '
        onClick={() => updateQuantity(quantity + 1)}
      >
        <PlusIcon className='h-4 w-4' />
        <span className='sr-only'>Øk antall</span>
      </Button>
    </div>
  )
}
