// Path: src/lib/state/createCartMutationMachine.ts
/*eslint-disable max-params*/
import { assign, fromPromise, setup, type ErrorActorEvent } from 'xstate'
import { extractCartErrorMessage } from '@/lib/errors/extractCartErrorMessage'
import type {
  Cart,
  CartActions,
  CartActionsResult,
  CartMutationContext,
  CartMutationEvent
} from '@types'

export const createCartMutationMachine = (
  serverActions: CartActions,
  updateCartCache: (cart: Cart) => void, // ENDRET: Mer presis funksjon
  setCartId: (cartId: string) => void
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
              guard: ({ event }) => !event.output.success,
              target: 'idle',
              actions: assign({
                error: ({ event }) =>
                  event.output.message || 'En uventet feil oppstod'
              })
            },
            {
              target: 'idle',
              actions: [
                assign({ error: null }),
                ({ event }) => {
                  const newCart = event.output.cart
                  if (newCart?.id) {
                    setCartId(newCart.id)
                    updateCartCache(newCart)
                  }
                }
              ]
            }
          ],
          onError: {
            target: 'idle',
            actions: assign({
              error: ({ event }: { event: ErrorActorEvent }) => {
                try {
                  const serverActionResult = event.error as CartActionsResult
                  if (serverActionResult?.message) {
                    return serverActionResult.message
                  }
                  return extractCartErrorMessage(event.error)
                } catch (extractionError) {
                  console.error(
                    'Error extracting cart error message:',
                    extractionError
                  )
                  return 'En uventet feil oppstod under behandling av handleposen'
                }
              }
            })
          }
        }
      }
    }
  })
