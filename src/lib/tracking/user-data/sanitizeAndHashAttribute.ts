// Path: src/lib/tracking/user-data/sanitizeAndHashAttribute.ts
import { sha256 } from '@/lib/tracking/hash/sha256'

export function sanitizeAndHashAttribute(
  value: string | null | undefined
): string[] | undefined {
  if (!value) return undefined

  const normalized = value.trim().toLowerCase()
  if (!normalized) return undefined

  return [sha256(normalized)]
}
