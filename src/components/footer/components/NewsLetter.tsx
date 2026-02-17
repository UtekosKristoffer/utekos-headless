'use client'
import { NewsletterForm } from '@/components/form/components/NewsLetterForm'

export function NewsLetter() {
  return (
    <>
      <div className='mt-12 border-t mx-auto border-neutral-800 pt-12 pb-12'>
        <div className='mx-auto max-w-lg text-center'>
          <NewsletterForm />
        </div>
      </div>
    </>
  )
}
