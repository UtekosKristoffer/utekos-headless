// Path: src/lib/utils/parseRawFields.ts

import type { RawField } from '@types'

export const parseRawFields = (
  fields: RawField[]
): Record<string, { value: string | null }> => {
  const obj: Record<string, { value: string | null }> = {}
  for (const field of fields) {
    const camelCaseKey = field.key.replace(/_([a-z])/g, (_, char) =>
      char.toUpperCase()
    )
    obj[camelCaseKey] = { value: field.value }
  }
  return obj
}
