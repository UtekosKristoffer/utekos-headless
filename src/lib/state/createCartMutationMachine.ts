// Path: src/lib/state/createCartMutationMachine.ts

/**
 * @fileoverview XState machine for cart mutations with Zod v4 + zod-validation-error integration.
 *
 * This machine orchestrates cart mutations through server actions and provides
 * consistent error handling with Norwegian error messages. It integrates with
 * the centralized error extraction utilities to ensure users receive meaningful
 * feedback regardless of error source.
 *
 * The machine isolates side effects (server actions) while maintaining
 * predictable state transitions for UI components to consume.
 *
 * @module lib/state/createCartMutationMachine
 */

import { assign, fromPromise, setup, type ErrorActorEvent } from 'xstate'

import { extractCartErrorMessage } from '@/lib/errors/extractCartErrorMessage'
import type {
  CartActions,
  CartActionsResult,
  CartMutationContext,
  CartMutationEvent
} from '@types'

/**
 * Creates a state machine for handling cart mutations with comprehensive error handling.
 *
 * The machine delegates actual mutation operations to server actions while providing
 * a predictable interface for UI components. Error messages are automatically extracted
 * using the centralized error utilities, ensuring consistent Norwegian messaging.
 *
 * @param serverActions - The collection of cart server actions
 * @param revalidateCart - Function to invalidate cached cart data
 * @returns Configured XState machine for cart mutations
 */
export const createCartMutationMachine = (
  serverActions: CartActions,
  revalidateCart: () => void
) =>
  setup({
    types: {
      context: {} as CartMutationContext,
      events: {} as CartMutationEvent
    },
    actors: {
      cartMutator: fromPromise<CartActionsResult, CartMutationEvent>(
        async ({ input: event }) => {
          switch (event.type) {
            case 'ADD_LINES':
              return serverActions.addCartLine(event.input)
            case 'UPDATE_LINE':
              return serverActions.updateCartLineQuantity(event.input)
            case 'REMOVE_LINE':
              return serverActions.removeCartLine(event.input)
            case 'CLEAR':
              return serverActions.clearCart()
            default: {
              // Type-safe exhaustiveness check ensures all events are handled
              const exhaustiveCheck: never = event
              throw new Error(
                `Unhandled event type: ${String(exhaustiveCheck)}`
              )
            }
          }
        }
      )
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
          onDone: [
            {
              // Handle successful server action response that indicates failure
              guard: ({ event }) => {
                const result = event.output
                return !result.success
              },
              target: 'idle',
              actions: assign({
                error: ({ event }) => {
                  const result = event.output
                  return result.message || 'En uventet feil oppstod'
                }
              })
            },
            {
              // Handle successful server action with success result
              target: 'idle',
              actions: [assign({ error: null }), revalidateCart]
            }
          ],
          onError: {
            target: 'idle',
            actions: assign({
              error: ({ event }: { event: ErrorActorEvent }) => {
                // Use centralized error message extraction for consistent Norwegian messages
                try {
                  const serverActionResult = event.error as CartActionsResult

                  // If the error is a structured server action result, use its message
                  if (serverActionResult?.message) {
                    return serverActionResult.message
                  }

                  // Otherwise, extract from the raw error using our utilities
                  return extractCartErrorMessage(event.error)
                } catch (extractionError) {
                  console.error(
                    'Error extracting cart error message:',
                    extractionError
                  )
                  return 'En uventet feil oppstod under behandling av handlekurven'
                }
              }
            })
          }
        }
      }
    }
  })
