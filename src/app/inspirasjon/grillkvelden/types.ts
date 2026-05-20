import type { LucideIcon } from 'lucide-react'

export interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

export interface HostTip {
  name: string
  highlight: string
  icon: LucideIcon
  color: string
}
