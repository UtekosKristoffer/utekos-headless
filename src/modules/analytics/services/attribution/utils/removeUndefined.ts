// Path: src/modules/analytics/services/attribution/utils/removeUndefines.ts
export function removeUndefined(obj: Record<string, any>): any {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  )
}
