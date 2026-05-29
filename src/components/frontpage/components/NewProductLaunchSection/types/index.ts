import type { CSSProperties } from 'react'

export type NewProductLaunchSectionViewProps = {
  onDiscoverClick: () => void
  onQuickViewClick: () => void
}

export type LaunchMotionStyle = CSSProperties & {
  '--launch-delay'?: string
  '--launch-duration'?: string
  '--launch-hidden-transform'?: string
  '--launch-hidden-filter'?: string
  '--launch-hidden-opacity'?: string
}
