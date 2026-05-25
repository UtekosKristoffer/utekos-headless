import type { LucideIcon } from 'lucide-react'

export interface UseCase {
  icon: LucideIcon
  time: string
  title: string
  description: string
  temperature: string
}

export interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  benefitColor: string
  iconColor: string
}

export interface Destination {
  name: string
  season: string
  highlight: string
  bgColor: string
  iconBgColor: string
  iconColor: string
  textColor: string
}
