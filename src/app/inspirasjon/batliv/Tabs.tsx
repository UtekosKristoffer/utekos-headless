'use client'

import dynamic from 'next/dynamic'

const BoatSeasonsTabs = dynamic(
  () => import('./BoatingSeasonsTabs').then(mod => mod.BoatSeasonsTabs),
  {
    ssr: false
  }
)

export function Tabs() {
  return (
    <div className='boat-seasons-fade-in-delayed'>
      <BoatSeasonsTabs />
    </div>
  )
}
