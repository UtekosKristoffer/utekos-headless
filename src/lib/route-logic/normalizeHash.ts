import crypto from 'node:crypto'

export function normalizeAndHash(
  value: string | undefined | null
): string | undefined {
  if (value == null || typeof value !== 'string') {
    return undefined
  }
  const trimmedValue = value.trim()
  if (trimmedValue === '') {
    return undefined
  }

  if (/^[\d\s\-()+]+$/.test(trimmedValue)) {
    const digitsOnly = trimmedValue.replace(/\D/g, '')
    if (digitsOnly === '') return undefined
    return crypto.createHash('sha256').update(digitsOnly, 'utf8').digest('hex')
  }

  const normalized = trimmedValue.toLowerCase()
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex')
}
