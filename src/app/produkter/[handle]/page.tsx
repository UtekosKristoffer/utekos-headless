// Path: src/app/produkter/[handle]/page.tsx

import { Suspense } from 'react'
import { VideoSkeleton } from '@/app/produkter/(oversikt)/components/VideoSkeleton'
import { ProductVideoSection } from '@/app/produkter/(oversikt)/components/ProductVideoSection'
import { ProductPageSkeleton } from './components/ProductPageSkeleton'
import { generateProductMetadata } from './utils/generateProductMetadata'
import { AsyncProductContent } from './components/AsyncProductContent'
import { IntersportSection } from '@/app/om-oss/components/IntersportSection'
import type { GenerateMetadataProps, ProductPageProps } from './types'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { handle } = await params

  return generateProductMetadata(handle)
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { handle } = await params

  return (
    <>
      <Suspense fallback={<ProductPageSkeleton />}>
        <AsyncProductContent handle={handle} searchParams={searchParams} />
      </Suspense>

      <IntersportSection />

      <Suspense fallback={<VideoSkeleton />}>
        <ProductVideoSection />
      </Suspense>
    </>
  )
}
