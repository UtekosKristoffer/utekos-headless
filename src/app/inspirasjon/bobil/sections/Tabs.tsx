'use client'

import dynamic from 'next/dynamic'

const BobilSeasonsTabs = dynamic(
  () => import('./BobilSeasonsTabs').then(mod => mod.BobilSeasonsTabs),
  {
    ssr: false
  }
)

export function Tabs() {
  return (
    <div className='bobil-seasons-fade-in-delayed'>
      <BobilSeasonsTabs />
    </div>
  )
}
