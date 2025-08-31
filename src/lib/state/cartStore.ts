// Path: src/lib/state/cartStore.ts
'use client'

import { createStore } from '@xstate/store'
import type { CartUserInterfaceContext, UserInterfaceEventMap, OptimisticLines } from '@/types'
import type { EventPayloadMap } from '@xstate/store'

/**
 * Removes items with a quantity of 0 from a line object.
 */
const removeZeroQuantityLines = (lines: OptimisticLines['lines']): OptimisticLines['lines'] => {
  return Object.fromEntries(Object.entries(lines).filter(([, quantity]) => quantity > 0))
}

export const cartStore = createStore<CartUserInterfaceContext, UserInterfaceEventMap, EventPayloadMap>({
  context: {
    open: false,
    pending: 0,
    optimisticLines: { lines: {} }
  },
  on: {
    OPEN: context => ({ ...context, open: true }),
    CLOSE: context => ({ ...context, open: false }),
    TOGGLE: context => ({ ...context, open: !context.open }),
    PENDING_INC: context => ({ ...context, pending: context.pending + 1 }),
    PENDING_DEC: context => ({
      ...context,
      pending: Math.max(0, context.pending - 1)
    }),
    SET_LAST_OPERATION: (context, event) => ({
      ...context,
      lastOperation: event.value
    }),
    OPTIMISTIC_LINES_UPDATE: (context, event) => {
      const mergedLines = { ...context.optimisticLines.lines, ...event.delta }
      const nextLines = removeZeroQuantityLines(mergedLines)
      return { ...context, optimisticLines: { ...context.optimisticLines, lines: nextLines } }
    },
    OPTIMISTIC_CLEAR: context => ({
      ...context,
      optimisticLines: { lines: {} }
    })
  }
})
