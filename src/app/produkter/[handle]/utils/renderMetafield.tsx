// Path: src/app/produkter/[handle]/ProductPageAccordion/helpers/renderMetafield.tsx

import { RichTextRenderer } from '@/components/RichTextRenderer/RichTextRenderer'
import { safeJsonParse } from '@/lib/utils/safeJsonParse'
import type { RootNode } from '@types'

/**
 * Renders a metafield value as rich text or fallback message
 * @why Handles nullable metafield content from Shopify API
 * @param fieldValue - The metafield value to render, can be null from API
 * @returns React node with rendered content or fallback message
 */
export const renderMetafield = (
  fieldValue: string | null | undefined
): React.ReactNode => {
  if (!fieldValue)
    return (
      <p className='text-muted-foreground'>Ingen informasjon tilgjengelig</p>
    )

  const parsed = safeJsonParse(fieldValue, null) as RootNode | null

  if (!parsed) {
    return <p className='text-muted-foreground'>Kunne ikke laste innhold</p>
  }

  return <RichTextRenderer content={parsed} />
}
