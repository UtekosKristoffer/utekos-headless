/**
 * Calculates the total number of items from optimistic cart lines.
 * Developer-facing function, so comment in English.
 */
export const calculateItemCount = (lines: Record<string, number>): number =>
  Object.keys(lines).length
