import { CompareModelsJsonLd } from '@/app/handlehjelp/sammenlign-modeller/components/CompareModelsJsonLd'
import type { ReactNode } from 'react'

export default function CompareModelsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CompareModelsJsonLd />

      {children}
    </>
  )
}
