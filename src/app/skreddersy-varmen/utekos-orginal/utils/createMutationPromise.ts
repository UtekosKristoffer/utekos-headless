import type { ActorRef, StateFrom } from 'xstate'
import type { CartMutationEvent } from '@types'
import type { CartMutationMachine } from '@/lib/context/CartMutationContext'
export const createMutationPromise = (
  event: CartMutationEvent,
  actor: ActorRef<StateFrom<CartMutationMachine>, CartMutationEvent>
): Promise<StateFrom<CartMutationMachine>> => {
  return new Promise(resolve => {
    let isInitialEmission = true
    const subscription = actor.subscribe(snapshot => {
      if (isInitialEmission) {
        isInitialEmission = false
        return
      }
      if (snapshot.matches('idle')) {
        subscription.unsubscribe()
        resolve(snapshot)
      }
    })
    actor.send(event)
  })
}
