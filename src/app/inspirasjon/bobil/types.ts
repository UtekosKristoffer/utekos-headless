import type { LucideIcon } from 'lucide-react'

export interface UseCase {
  icon: LucideIcon
  time: string
  title: string
  description: string
  temperature: string
  color: string
  iconColor: string
}

export interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

export interface Destination {
  name: string
  season: string
  highlight: string
  color: string
}
