import CartLineItem from '@/components/cart/CartLineItem'
import type { Cart } from '@/types/cart'
import * as React from 'react'
import { Separator } from '../../ui/Separator'
/**
 * Renders the populated cart with a list of line items.
 * This is extracted into its own function because the rendering logic is more complex.
 * @returns {React.JSX.Element} The rendered list of cart items.
 */
export const renderPopulatedCart = (cart: Cart): React.JSX.Element => (
  <div className='flex-1 overflow-y-auto'>
    <div className='px-4 py-2'>
      <ul className='space-y-0'>
        {cart.lines.map((line, index) => (
          <React.Fragment key={line.id}>
            <CartLineItem line={line} />
            {index < cart.lines.length - 1 && <Separator className='my-4' />}
          </React.Fragment>
        ))}
      </ul>
    </div>
  </div>
)
