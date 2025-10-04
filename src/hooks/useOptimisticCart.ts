// Path: src/hooks/useOptimisticCart.ts
'use client'

import { useCartQuery } from '@/hooks/useCartQuery'
import { useCartStoreSnapshot } from '@/hooks/useCartStoreSnapshot'
import { useMemo } from 'react'
import type { Cart, CartLine } from '@types'

export const useOptimisticCart = (): Cart | null => {
  const { data: serverCart } = useCartQuery()
  const snapshot = useCartStoreSnapshot()
  const { optimisticCartLines } = snapshot.context

  return useMemo(() => {
    if (!serverCart) return null

    if (
      !optimisticCartLines?.lines
      || Object.keys(optimisticCartLines.lines).length === 0
    ) {
      return serverCart
    }

    const mergedLines: CartLine[] = serverCart.lines.map(line => {
      const optimisticQuantity = optimisticCartLines.lines[line.id]

      // If we have an optimistic quantity update for this line
      if (typeof optimisticQuantity === 'number') {
        // Create new line object with updated quantity
        return {
          ...line,
          quantity: optimisticQuantity
        }
      }

      return line
    })

    const totalQuantity = mergedLines.reduce((sum: number, line: CartLine) => {
      return sum + (line.quantity ?? 0)
    }, 0)

    return {
      ...serverCart,
      lines: mergedLines,
      totalQuantity
    }
  }, [serverCart, optimisticCartLines])
}
