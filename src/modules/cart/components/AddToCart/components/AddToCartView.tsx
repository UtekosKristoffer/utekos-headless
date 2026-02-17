// Path: src/components/cart/AddToCartView.tsx

import { Form } from '@/components/ui/form'
import { ModalSubmitButton } from './ModalSubmitButton'
import { QuantitySelector } from './QuantitySelector'
import type { AddToCartViewProps } from '@types'

export function AddToCartView({
  form,
  onSubmit,
  isPending,
  isAvailable
}: AddToCartViewProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div>
          <label className='mb-2 block text-sm font-medium'>Antall</label>
          <QuantitySelector />
        </div>
        <ModalSubmitButton
          isPending={isPending}
          isDisabled={!isAvailable || isPending}
          availableForSale={isAvailable}
        />
      </form>
    </Form>
  )
}
