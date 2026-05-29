import type { LaunchMotionStyle } from '../types'

export const launchMotionStyle = ({
  delay,
  duration,
  hiddenTransform = 'translate3d(0, 0, 0)',
  hiddenFilter = 'none',
  hiddenOpacity = '0'
}: {
  delay: number
  duration: number
  hiddenTransform?: string
  hiddenFilter?: string
  hiddenOpacity?: string
}): LaunchMotionStyle => ({
  '--launch-delay': `${delay}ms`,
  '--launch-duration': `${duration}ms`,
  '--launch-hidden-transform': hiddenTransform,
  '--launch-hidden-filter': hiddenFilter,
  '--launch-hidden-opacity': hiddenOpacity
})
