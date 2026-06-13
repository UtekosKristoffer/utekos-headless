import { Suspense } from 'react'
import { TensorPixVideoCacheWrapper } from '@/app/produkter/(oversikt)/components/TensorPixVideoCacheWrapper'

export default function TensorPixVideoPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <TensorPixVideoCacheWrapper variant='embed' />
      </Suspense>
    </main>
  )
}
