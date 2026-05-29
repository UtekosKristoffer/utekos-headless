import type { LaunchMotionStyle } from '../types'

export const launchLetterStyle = (index: number): LaunchMotionStyle => ({
  '--launch-delay': `${1500 + index * 58}ms`,
  '--launch-duration': '1500ms',
  '--launch-hidden-transform': 'translate3d(0, 0.28em, 0)',
  '--launch-hidden-filter': 'blur(0.25px)',
  '--launch-hidden-opacity': '0'
})
