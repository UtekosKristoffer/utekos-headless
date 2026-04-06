import type { ReactNode } from 'react'
import { FrontPageJsonLd } from '@/components/frontpage/components/FrontPageJsonLd/FrontPageJsonLd'

export default function HomeLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <FrontPageJsonLd />
      {children}
    </>
  )
}
