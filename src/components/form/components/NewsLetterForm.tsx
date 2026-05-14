'use client'

import { useActionState, useEffect, useRef } from 'react'
import { subscribeToNewsletter } from '@/lib/actions/subscribeToNewsLetters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    <div className='w-full min-w-6 mx-auto space-y-3 text-left'>
      <div className='flex flex-col space-y-3'>
        <div className='font-semibold text-2xl md:text-3xl flex items-center gap-2 text-sidebar-foreground'>
          <div className='flex items-center size-full flex-nowrap gap-2'>
            <Mail data-icon='inline-start' size='42' />
            <p className='text-neutral-300 w-fit md:min-w-2xl text-4xl'>
              Meld deg på Utekos sitt nyhetsbrev!
            </p>
          </div>
        </div>
        <p className='text-base mt-2! mx-auto!self-center text-center justify-center mc-auto! z-10 text-neutral-300 w-fit md:min-xl'>
          Meld deg inn i vår medlemsklubb og få nyhetsbrev, inspirasjon og
          eksklusive rabatter i innboksen din.
        </p>
        <form
          ref={formRef}
          action={handleSubmit}
          className='mt-4! flex w-full items-center space-x-2 md:ml-12!'
        >
          <Input
            type='email'
            name='email'
            placeholder='Din e-postadresse...'
            required
            className='bg-sidebar-accent-foreground w-full py-4 px-6 border border-neutral-300 text-neutral-400 placeholder:text-neutral-400'
          />
          <Button
            type='submit'
            disabled={isPending}
            className='ml-4 py-6 min-h-6 px-6 group shrink-0'
          >
            {isPending ? '...' : 'Meld meg inn'}
            <ArrowRight className='ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1' />
          </Button>
        </form>
      </div>
    </div>
  )
}
