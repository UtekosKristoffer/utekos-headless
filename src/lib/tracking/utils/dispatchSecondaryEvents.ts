import type { TrackingContext } from 'types/tracking/user/TrackingContext'

export function dispatchSecondaryEvents(context: TrackingContext): Promise<void> {
  void context
  return Promise.resolve()
}
