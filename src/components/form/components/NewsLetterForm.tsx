// src/components/form/components/NewsLetterForm.tsx

'use client'

import { useActionState, useEffect, useRef } from 'react'
import { subscribeToNewsletter } from '@/lib/actions/subscribeToNewsLetters'
import { Input } from '@/components/ui/input'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { trackNewsletterConversion } from '@/components/analytics/Meta/trackNewsletterConversion'

const initialState = {
  status: 'idle' as 'success' | 'error' | 'idle',
  message: ''
}

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const submittedEmailRef = useRef<string | null>(null)

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message)

      if (submittedEmailRef.current) {
        trackNewsletterConversion(submittedEmailRef.current, 'footer')
        submittedEmailRef.current = null
      }

      formRef.current?.reset()
    } else if (state.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  const handleSubmit = (formData: FormData) => {
    const email = formData.get('email') as string

    if (email) {
      submittedEmailRef.current = email
    }

    formAction(formData)
  }

  return (
    <article className='mx-auto w-full text-center'>
      <hgroup className='flex w-full flex-col items-center space-y-3'>
        <div className='flex items-center justify-center gap-3 text-cloud-dancer'>
          <Mail data-icon='inline-start' className='size-10 shrink-0' />

          <h2 className='max-w-2xl text-balance text-left text-3xl text-cloud-dancer sm:text-4xl'>
            Meld deg på Utekos sitt nyhetsbrev!
          </h2>
        </div>

        <h3 className='mx-auto mt-2! w-full max-w-4xl text-center   text-base leading-[1.5]   text-cloud-dancer/80'>
          Som medlem i vår kundeklubb får du personlige tilbud og tilgang til salg og kampanjer først. Du får
          også masse tips og inspirasjon rett inn i innboksen din.
        </h3>

        <form
          ref={formRef}
          action={handleSubmit}
          className='mx-auto mt-4! flex w-full max-w-xl items-center space-x-2'
        >
          <Input
            type='email'
            name='email'
            placeholder='Din e-postadresse...'
            required
            className='w-full border border-cloud-dancer bg-cloud-dancer px-6 py-4 text-background placeholder:text-background/70 transition-colors duration-300 focus:ring-2 focus:ring-cloud-dancer focus:ring-offset-2 focus:ring-offset-background'
          />

          <BrandBadge
            asChild
            backgroundColor='var(--color-primary)'
            textColor='var(--color-background)'
            className='ml-4 shrink-0 px-6 py-3 text-base font-medium transition-colors duration-300 hover:brightness-95'
          >
            <button type='submit' disabled={isPending} className='group'>
              {isPending ? '...' : 'Meld meg inn'}
              <ArrowRight className='ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1' />
            </button>
          </BrandBadge>
        </form>
      </hgroup>
    </article>
  )
}
