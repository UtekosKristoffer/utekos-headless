'use client'
import dynamic from 'next/dynamic'

const HytteSeasonsTabs = dynamic(
  () => import('./HytteSeasonsTabs').then(mod => mod.HytteSeasonsTabs),
  {
    ssr: false
  }
)

export function Tabs() {
  return (
    <div className='hytte-seasons-fade-in-delayed'>
      <HytteSeasonsTabs />
    </div>
  )
}
