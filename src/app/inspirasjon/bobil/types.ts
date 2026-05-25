import type { ComponentType } from 'react'

export type SectionIcon = ComponentType<{ className?: string }>

export interface UseCase {
  icon: SectionIcon
  time: string
  title: string
  description: string
  temperature: string
  color: string
  iconColor: string
}

export interface Benefit {
  icon: SectionIcon
  title: string
  description: string
  color: string
}

export interface Destination {
  name: string
  season: string
  highlight: string
  color: string
  backgroundColor: string
}
