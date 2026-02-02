import type { AccordionSectionData } from '@types'

export function mapOptionalContent(
  value: string | null | undefined
): Partial<Pick<AccordionSectionData, 'content'>> {
  return value != null ? { content: value } : {}
}
