'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

function getTimeOfDayFactor(): number {
  const hour = new Date().getHours()
  if (hour >= 1 && hour < 7) return 0.3 // Natt: færre folk
  if (hour >= 7 && hour < 17) return 0.8 // Dagtid (hverdag): folk er på jobb
  if (hour >= 17 && hour < 23) return 1.2 // Kveld: peak-tid
  return 0.9 // Sen kveld
}
function getDayOfWeekFactor(): number {
  const day = new Date().getDay() // 0 = Søndag, 6 = Lørdag
  if (day === 0 || day === 6) return 1.3 // Helg: høyere trafikk
  if (day === 5) return 1.1 // Fredag
  return 0.9 // Vanlig ukedag
}

interface SmartRealTimeActivityProps {
  baseViewers: number // Et basistall for produktets popularitet
}

export function SmartRealTimeActivity({
  baseViewers
}: SmartRealTimeActivityProps) {
  // Initialiserer med et "smart" tall
  const [viewers, setViewers] = useState(() => {
    const smartBase = Math.round(
      baseViewers * getTimeOfDayFactor() * getDayOfWeekFactor()
    )
    return Math.max(2, smartBase + getRandomInt(-1, 1)) // Sørger for at det aldri er under 2
  })

  useEffect(() => {
    // Oppdaterer tallet med lengre, mer tilfeldige intervaller
    const interval = setInterval(
      () => {
        setViewers(prev => {
          const change = Math.random() > 0.55 ? 1 : -1
          const newViewers = prev + change
          return Math.max(2, newViewers) // Holder tallet over 1
        })
      },
      getRandomInt(8000, 22000)
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode='popLayout'>
      <motion.div
        key={viewers}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        // Text-color was: text-sky-400
        className='flex items-center gap-2 text-sm text-button mt-4'
      >
        <EyeIcon className='h-4 w-4 text-neutral-400' />
        <span className='font-semibold'>{viewers}</span>
        <span>andre ser på dette produktet akkurat nå</span>
      </motion.div>
    </AnimatePresence>
  )
}
