import { ChristmasCampaignJsonLd } from './ChristmasCampaignJsonLd'
import type { ReactNode } from 'react'
export default function ChristmasCampaignLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <ChristmasCampaignJsonLd />

      {children}
    </>
  )
}
