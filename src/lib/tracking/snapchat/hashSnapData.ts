// Path: src/lib/snapchat/hashSnapData.ts
import { createHash } from 'crypto'
export function hashSnapData(value: string | undefined): string | undefined {
  if (!value) return undefined

  const normalized = value.trim().toLowerCase()
  return createHash('sha256').update(normalized).digest('hex')
}
