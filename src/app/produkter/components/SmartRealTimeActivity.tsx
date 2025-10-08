'use client'

import { EyeIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/** Tilfeldig heltall i [min, max] */
const getRandomIntInclusive = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

function getTimeOfDayMultiplier(): number {
  const hour = new Date().getHours()
  if (hour >= 1 && hour < 7) return 0.3 // Natt
  if (hour >= 7 && hour < 17) return 0.8 // Dagtid
  if (hour >= 17 && hour < 23) return 1.2 // Kveld
  return 0.9 // Sen kveld
}
function getDayOfWeekMultiplier(): number {
  const day = new Date().getDay() // 0 = søn, 6 = lør
  if (day === 0 || day === 6) return 1.3 // Helg
  if (day === 5) return 1.1 // Fre
  return 0.9 // Vanlig ukedag
}

interface SmartRealTimeActivityProps {
  /** Basistall for produktets popularitet (kalibreres per produkt) */
  baseViewers: number
}
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

  /**
   * Enkel “enter” animasjon på hvert tallskifte:
   * Vi setter først en "pre" klasse (opacity-0/translate-y-2), og i neste frame
   * fjerner vi den slik at CSS transition tar oss til opacity-100/translate-y-0.
   */
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
