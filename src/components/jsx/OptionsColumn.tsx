import type { ReactNode } from 'react'

export const OptionsColumn = ({
  children
}: {
  readonly children: ReactNode
}) => (
  <div aria-labelledby='product-options' className='lg:col-span-3'>
    {children}
  </div>
)
