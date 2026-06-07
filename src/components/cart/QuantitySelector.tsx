'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { AddToCartFormValues } from 'types/cart'

export function QuantitySelector() {
  const { watch, setValue } = useFormContext<AddToCartFormValues>()
  const quantity = watch('quantity')

  const updateQuantity = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity || 1)
    setValue('quantity', validQuantity, { shouldValidate: true })
  }

  return (
    <div className='inline-flex h-10 items-center rounded-lg bg-very-peri text-background'>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='h-full text-background hover:bg-cloud-dancer/35 hover:text-egg-white disabled:text-destructive'
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        <MinusIcon className='size-4 text-background' />
        <span className='sr-only'>Reduser antall</span>
      </Button>

      <Input
        type='text'
        inputMode='numeric'
        pattern='[0-9]*'
        value={quantity}
        onChange={e => updateQuantity(parseInt(e.target.value, 10))}
        className='h-full w-10 bg-transparent text-center text-base text-background focus-visible:ring-0'
      />

      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='h-full text-background hover:bg-havdyp/35 hover:text-egg-white'
        onClick={() => updateQuantity(quantity + 1)}
      >
        <PlusIcon className='size-4 text-background' />
        <span className='sr-only'>Øk antall</span>
      </Button>
    </div>
  )
}
