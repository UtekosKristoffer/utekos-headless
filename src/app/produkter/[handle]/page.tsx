// Path: src/app/produkter/[handle]/page.tsx

import { Suspense } from 'react'
import type { Metadata } from 'next'
import { VideoSkeleton } from '@/app/produkter/(oversikt)/components/VideoSkeleton'
import { ProductVideoSection } from '@/app/produkter/(oversikt)/components/ProductVideoSection'
import { IntersportSection } from '@/app/om-oss/components/IntersportSection'
import { ProductPageSkeleton } from './components/ProductPageSkeleton'
import { AsyncProductContent } from './components/AsyncProductContent'
import { generateProductMetadata } from './utils/generateProductMetadata'
import { generateProductStaticParams } from './utils/generateProductStaticParams'
import { connection } from 'next/server'

import type { GenerateMetadataProps, ProductPageProps } from './types'

export async function generateStaticParams(): Promise<Array<{ handle: string }>> {
  return generateProductStaticParams()
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { handle } = await params

  return generateProductMetadata(handle)
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  await connection()
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
