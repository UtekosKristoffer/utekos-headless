'use client'
import { iconMap, type IconName } from './initialElements'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { DesktopFlow } from './DesktopFlow'
import { MobileFlow } from './MobileFlow'
export function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={className} /> : null
}

export default function VinterklargjoringFlow() {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className='md:h-[900px] w-full overflow-hidden rounded-lg border border-neutral-800 bg-background' />
    )
  }

  return (
    <div className='md:h-[900px] w-full overflow-hidden rounded-lg border border-neutral-800 bg-background'>
      {isMobile ?
        <MobileFlow />
      : <DesktopFlow />}
    </div>
  )
}
