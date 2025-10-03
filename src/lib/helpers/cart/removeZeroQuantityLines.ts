import type { OptimisticCartLines } from '@types'

export const removeZeroQuantityLines = (
  lines: OptimisticCartLines['lines']
): OptimisticCartLines['lines'] => {
  return Object.fromEntries(
    Object.entries(lines).filter(([, quantity]) => quantity > 0)
  )
}
