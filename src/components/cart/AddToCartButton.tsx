// Path: src/components/cart/AddToCartButton.tsx
import { SubmitButton } from '@/components/cart/AddToCartButton/SubmitButton'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { AddToCartButtonProps } from '@types'

interface ExtendedAddToCartButtonProps extends AddToCartButtonProps {
  availableForSale: boolean
}

export function AddToCartButton({
  isPending,
  isDisabled,
  availableForSale
}: ExtendedAddToCartButtonProps) {
  return (
    <>
      <FormField
        name='variantId'
        render={({ field }) => <input type='hidden' {...field} />}
      />
      <FormField
        name='quantity'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Antall</FormLabel>
            <div className='flex items-center gap-2'>
              <FormControl>
                <Input
                  type='number'
                  inputMode='numeric'
                  min={1}
                  className='w-24'
                  {...field}
                  onChange={e =>
                    field.onChange(parseInt(e.target.value, 10) || 1)
                  }
                  disabled={isDisabled}
                />
              </FormControl>
              <SubmitButton
                availableForSale={availableForSale}
                selectedVariantId={field.value}
                isPending={isPending}
                isDisabled={isDisabled}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
