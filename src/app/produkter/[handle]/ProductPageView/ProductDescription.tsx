// Path: src/app/produkter/[handle]/ProductPageView/components/ProductDescription.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import safeJsonParse from '@/lib/utils/safeJsonParse'
import { richTextToHtml } from '@/lib/utils/richTextToHtml'
import type { ProductDescriptionProps } from '@types'

export function ProductDescription({
  descriptionHtml: descriptionJson
}: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const richTextObject = safeJsonParse(descriptionJson, null)
  const finalHtml = richTextToHtml(richTextObject)

  if (!finalHtml) {
    return null
  }

  return (
    <article aria-label='Produktbeskrivelse' className='mt-12'>
      <AnimatePresence initial={false}>
        <motion.div
          key='description'
          initial={{ height: 'auto' }}
          animate={{ height: isExpanded ? 'auto' : '120px' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='relative overflow-hidden'
        >
          <div
            className='prose prose-invert max-w-none text-foreground-on-dark/80'
            dangerouslySetInnerHTML={{ __html: finalHtml }}
          />
          {!isExpanded && (
            <div className='absolute bottom-0 h-16 w-full bg-gradient-to-t from-background to-transparent' />
          )}
        </motion.div>
      </AnimatePresence>
      <div className='mt-4'>
        <Button
          variant='link'
          onClick={() => setIsExpanded(!isExpanded)}
          className='p-0 text-base text-link hover:text-link/80'
        >
          {isExpanded ? 'Vis mindre' : 'Les mer'}
        </Button>
      </div>
    </article>
  )
}
