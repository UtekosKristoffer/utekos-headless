// Path: src/components/frontpage/CachedPromiseSection.tsx
import { PromiseSection } from '@/components/frontpage/PromiseSection'
import { cacheLife, cacheTag } from 'next/cache'

export async function CachedPromiseSection() {
  'use cache'
  cacheLife('days')
  cacheTag('static-sections', 'promise-section')

  return <PromiseSection />
}
