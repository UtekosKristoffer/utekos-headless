// Path: src/lib/utils/ensure.ts

/**
 * Coerces unknown values to a strict string or undefined.
 * * DESIGN RATIONALE:
 * With "exactOptionalPropertyTypes: true", we cannot assign 'null' or empty strings
 * to optional fields. This function ensures we get either a valid, non-empty string
 * or strictly 'undefined', allowing for safe conditional spreading.
 * * @example
 * ...(ensureString(someValue) && { key: someValue })
 */
export function ensureString(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }
  if (typeof value === 'number') {
    return String(value)
  }
  return undefined
}

/**
 * Coerces unknown values to a strict number or undefined.
 * Filters out NaN and infinite values.
 */
export function ensureNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    if (!isNaN(parsed) && isFinite(parsed)) {
      return parsed
    }
  }
  return undefined
}
