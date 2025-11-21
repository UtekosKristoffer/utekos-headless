export function toNumberSafe(s: string | undefined | null): number | undefined {
  if (s == null || typeof s !== 'string') return undefined
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}
