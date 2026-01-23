'use client'

import { useActionState, useEffect, useRef } from 'react'
import { subscribeToNewsletter } from '@/lib/actions/subscribeToNewsLetters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Mail } from 'lucide-react'
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
      formRef.current?.reset()
    } else if (state.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className='w-full max-w-sm mx-auto space-y-3 text-left'>
      <div className='flex flex-col space-y-1'>
        <h3 className='font-semibold text-lg flex items-center gap-2 text-foreground'>
          <Mail className='w-5 h-5' />
          Få 800kr rabatt på Comfyrobe™
        </h3>
        <p className='text-sm text-muted-foreground'>
          Meld deg på nyhetsbrevet og motta en eksklusiv rabattkode i innboksen
          din.
        </p>
      </div>
      <form
        ref={formRef}
        action={formAction}
        className='flex w-full items-center space-x-2'
      >
        <Input
          type='email'
          name='email'
          placeholder='Din e-postadresse...'
          required
          className='bg-background border-input'
        />
        <Button type='submit' disabled={isPending} className='group shrink-0'>
          {isPending ?
            '...'
          : <>
              Få rabatt
              <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
            </>
          }
        </Button>
      </form>
    </div>
  )
}
