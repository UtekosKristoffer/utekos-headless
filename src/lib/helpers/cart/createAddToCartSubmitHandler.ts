// Path: src/lib/helpers/cart/createAddToCartSubmitHandler.ts

import type { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { AddToCartFormValues } from '@types'
import type { ActorRefFrom } from 'xstate'

export const createAddToCartSubmitHandler =
  (processRef: ActorRefFrom<ReturnType<typeof createCartMutationMachine>>) =>
  (values: AddToCartFormValues) => {
    processRef.send({
      type: 'ADD_LINES',

      input: [
        {
          variantId: values.variantId,
          quantity: values.quantity
        }
      ]
    })
  }
