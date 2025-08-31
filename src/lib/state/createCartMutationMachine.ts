// Path: src/lib/state/createCartMutationMachine.ts
'use client'

import { assign, fromPromise, setup, type ErrorActorEvent } from 'xstate'
import type { CartMutationContext, CartActions, CartActionsResult, CartMutationEvent } from '@/types'

export const createCartMutationMachine = (serverActions: CartActions, revalidateCart: () => void) =>
  setup({
    types: {
      context: {} as CartMutationContext,
      events: {} as CartMutationEvent
    },
    actors: {
      cartMutator: fromPromise<CartActionsResult, CartMutationEvent>(async ({ input: event }) => {
        switch (event.type) {
          case 'ADD_LINES':
            return serverActions.addLine(event.input)
          case 'UPDATE_LINE':
            return serverActions.updateLineQuantity(event.input)
          case 'REMOVE_LINE':
            return serverActions.removeLine(event.input)
          case 'CLEAR':
            return serverActions.clearCart()
          default: {
            // Type-safe exhaustiveness check
            const exhaustiveCheck: never = event
            throw new Error(`Unhandled event type: ${String(exhaustiveCheck)}`)
          }
        }
      })
    }
  }).createMachine({
    id: 'CartMutation',
    initial: 'idle',
    context: { error: null },
    states: {
      idle: {
        entry: assign({ error: null }),
        on: {
          '*': 'mutating'
        }
      },
      mutating: {
        invoke: {
          src: 'cartMutator',
          input: ({ event }) => event,
          onDone: {
            target: 'idle',
            actions: revalidateCart
          },
          onError: {
            target: 'idle',
            actions: assign({
              error: ({ event }: { event: ErrorActorEvent }) => {
                const serverActionResult = event.error as CartActionsResult
                return serverActionResult?.message ?? 'An unknown error occurred.'
              }
            })
          }
        }
      }
    }
  })
