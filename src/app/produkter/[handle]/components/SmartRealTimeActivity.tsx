'use client'

import { EyeIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getRandomIntInclusive } from '../../(oversikt)/utils/getRandomInInclusive'
import { getTimeOfDayMultiplier } from '../../(oversikt)/utils/getTimeOfDayMultiplier'
import { getDayOfWeekMultiplier } from '../../(oversikt)/utils/getDayOfWeekMultiplier'
import type { SmartRealTimeActivityProps } from '@types'

export function SmartRealTimeActivity({
  baseViewers
}: SmartRealTimeActivityProps) {
  const [currentViewerCount, setCurrentViewerCount] = useState<number>(() => {
    const smartBase = Math.round(
      baseViewers * getTimeOfDayMultiplier() * getDayOfWeekMultiplier()
    )
    return Math.max(2, smartBase + getRandomIntInclusive(-1, 1))
  })

  useEffect(() => {
    const intervalId = window.setInterval(
      () => {
        setCurrentViewerCount(prev =>
          Math.max(2, prev + (Math.random() > 0.55 ? 1 : -1))
        )
      },
      getRandomIntInclusive(8000, 22000)
    )

    return () => window.clearInterval(intervalId)
  }, [])

  const [isEntering, setIsEntering] = useState<boolean>(false)
  const isFirstRenderRef = useRef<boolean>(true)

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    setIsEntering(true)

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setIsEntering(false))
      return () => cancelAnimationFrame(raf2)
    })
    return () => cancelAnimationFrame(raf1)
  }, [currentViewerCount])

  return (
    <div
      aria-live='polite'
      className='mt-4 flex items-center gap-2 text-sm text-button'
    >
      <EyeIcon className='h-4 w-4 text-neutral-400' />
      <span
        // Transition på transform+opacity (GPU-vennlig)
        className={[
          'font-semibold transform transition-opacity duration-400 ease-out',
          isEntering ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
        ].join(' ')}
      >
        {currentViewerCount}
      </span>
      <span>andre ser på dette produktet akkurat nå</span>
    </div>
  )
}
