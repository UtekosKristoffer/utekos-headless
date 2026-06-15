'use client'

import dynamic from 'next/dynamic'

export const LazyMikrofiberImageSection = dynamic(
  () => import('./MikrofiberImageSection').then(module => module.MikrofiberImageSection),
  {
    ssr: false,
    loading: () => (
      <div
        className='aspect-square w-full rounded-xl bg-cloud-dancer/12'
        aria-hidden='true'
      />
    )
  }
)
