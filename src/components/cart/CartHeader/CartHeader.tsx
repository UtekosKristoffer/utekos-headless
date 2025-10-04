// Path: src/components/cart/CartHeader.tsx
'use client'
import { Button } from '@/components/ui/button'
import { cartStore } from '@/lib/state/cartStore'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { memo } from 'react' // Importer memo

const CartHeaderComponent = () => (
  <div className='flex items-center justify-between border-b px-6 py-4'>
    <h2 className='text-lg font-semibold'>Din handlepose</h2>
    <Button
      size='icon'
      onClick={() => cartStore.send({ type: 'CLOSE' })}
      className='h-10 w-10 p-0 border border-neutral-600'
    >
      <XMarkIcon className='h-5 w-5' />
      <span className='sr-only'>Lukk handleposen</span>
    </Button>
  </div>
)

export const CartHeader = memo(CartHeaderComponent) // Eksporter den memoized versjonen
