import type { ReactNode } from 'react'

export const GalleryColumn = ({
  children
}: {
  readonly children: ReactNode
}) => <div className='lg:col-span-8'>{children}</div>
