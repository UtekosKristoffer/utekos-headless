import type { ReactNode } from 'react'

export const OptionsColumn = ({
  children
}: {
  readonly children: ReactNode
}) => <div className='lg:col-span-4 '>{children}</div>
