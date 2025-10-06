'use client'

import dynamic from 'next/dynamic'

const SeasonsTabs = dynamic(
  () => import('./SeasonTabs').then(mod => mod.SeasonsTabs),
  {
    ssr: false
  }
)

export function Tabs() {
  return (
    <div className='hytte-seasons-fade-in-delayed'>
      <SeasonsTabs />
    </div>
  )
}
