'use client'

import React from 'react'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
type AddToCartProps = {
  isPending: boolean
  isDisabled: boolean
}
/**
 * Renders the presentational fields for the AddToCart.
 *
 * This component exists to separate the form's UI (the "what") from its
 * parent's logic and state management (the "how"), adhering to the
 * Separation of Concerns (SoC) principle. It is a "dumb" component that
 * receives its state as props and contains no hooks or business logic.
 *
 * @param {object} props - The component's props.
 * @param {boolean} props.isPending - True if the form submission is in progress, used to show a loading state.
 * @param {boolean} props.isDisabled - True if the form should be disabled (e.g., no product variant is selected).
 * @returns {JSX.Element} The rendered form fields and submit button.
 */

export function AddToCartButton({ isPending, isDisabled }: AddToCartProps) {
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
              <Button
                type='submit'
                disabled={isPending || isDisabled}
                className='flex-1'
              >
                {isPending ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
