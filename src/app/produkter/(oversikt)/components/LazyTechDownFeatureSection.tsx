'use client'

import dynamic from 'next/dynamic'

export const LazyTechDownFeatureSection = dynamic(
  () =>
    import('./TechDownFeatureSection/TechDownFeatureSection').then(
      module => module.TechDownFeatureSection
    ),
  {
    ssr: false,
    loading: () => (
      <section
        className='min-h-[760px] rounded-[1.75rem] bg-background/40 py-16 sm:min-h-[840px] sm:py-24'
        aria-hidden='true'
      />
    )
  }
)
