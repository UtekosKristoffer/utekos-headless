'use client'

import { useActionState, useEffect, useRef } from 'react'
import { subscribeToNewsletter } from '@/lib/actions/subscribeToNewsLetters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

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

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message)
      formRef.current?.reset() // Tømmer skjemaet ved suksess
    } else if (state.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className='flex w-full mx-auto max-w-sm items-center space-x-2'
    >
      <Input
        type='email'
        name='email'
        placeholder='Din e-postadresse...'
        required
        className='bg-sidebar-foreground border-neutral-700'
      />
      <Button type='submit' disabled={isPending} className='group'>
        {isPending ?
          'Sender...'
        : <>
            Meld deg på
            <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </>
        }
      </Button>
    </form>
  )
}
