// Path: src/components/cart/CartHeader.tsx

import { Button } from '@/components/ui/button'
import { cartStore } from '@/modules/cart/state/cartStore'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const CartHeader = () => (
  <div className='flex flex-shrink-0 items-center justify-between border-b px-6 py-4'>
    <h2 className='text-lg font-semibold'>Handlekurv</h2>
    <Button
      size='icon'
      onClick={() => cartStore.send({ type: 'CLOSE' })}
      className='h-10 w-10 p-0 border border-neutral-600'
    >
      <XMarkIcon className='h-5 w-5' />
      <span className='sr-only'>Lukk handlekurven</span>
    </Button>
  </div>
)
