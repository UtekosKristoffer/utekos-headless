import type { Route } from 'next'
import type { LucideIcon } from 'lucide-react'
import type { SizeOptionKey } from '@/app/kampanje/comfyrobe/utils/sizeSelectorData'
export type SizeVariant = 'medium' | 'large'

export type Mode = 'parkas' | 'oppfestet' | 'fulldekket'
export interface StockDisplayProps {
  count: number
  available: boolean
  theme?: 'light' | 'dark'
}

export interface NavLink {
  label: string
  href: Route
  icon: React.ReactNode
  description: string
}
