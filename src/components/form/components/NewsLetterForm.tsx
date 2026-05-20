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
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState
  )
  const formRef = useRef<HTMLFormElement>(null)

  const submittedEmailRef = useRef<string | null>(null)

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message)

      if (submittedEmailRef.current) {
        trackNewsletterConversion(submittedEmailRef.current, 'footer')
        submittedEmailRef.current = null // Nullstill etter sporing
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
    <div className='mx-auto w-full space-y-3 text-center'>
      <div className='flex flex-col items-center space-y-3'>
        <div className='flex flex-col items-center gap-3 text-cloud-dancer'>
          <Mail data-icon='inline-start' className='size-10' />
          <p className='max-w-xl text-3xl leading-[1.05] font-semibold tracking-normal text-cloud-dancer sm:text-4xl'>
            Meld deg på Utekos sitt nyhetsbrev!
          </p>
        </div>
        <p className='z-10 mx-auto mt-2! max-w-xl text-base leading-[1.5] tracking-normal text-cloud-dancer/80'>
          Meld deg inn i vår medlemsklubb og få nyhetsbrev, inspirasjon og
          eksklusive rabatter i innboksen din.
        </p>
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
            className='bg-ancient-water w-full py-4 px-6 border border-cloud-dancer text-cloud-dancer placeholder:text-maritime-darkest focus:ring-2 focus:ring-cloud-dancer focus:ring-offset-2 focus:ring-offset-maritime-darkest transition-colors duration-300'
          />
          <BrandBadge
            asChild
            backgroundColor='var(--color-primary-button)'
            textColor='var(--color-maritime-darkest)'
            className='ml-4 shrink-0 px-6 py-3 text-base font-medium transition-colors duration-300 hover:brightness-95'
          >
            <button type='submit' disabled={isPending} className='group'>
              {isPending ? '...' : 'Meld meg inn'}
              <ArrowRight className='ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1' />
            </button>
          </BrandBadge>
        </form>
      </div>
    </div>
  )
}
