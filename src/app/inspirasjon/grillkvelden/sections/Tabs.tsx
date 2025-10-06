'use client'

import dynamic from 'next/dynamic'

const GrillSeasonsTabs = dynamic(
  () => import('./GrillSeasonsTabs').then(mod => mod.GrillSeasonsTabs),
  {
    ssr: false
  }
)

export function Tabs() {
  return (
    <div className='grill-seasons-fade-in-delayed'>
      <GrillSeasonsTabs />
    </div>
  )
}
