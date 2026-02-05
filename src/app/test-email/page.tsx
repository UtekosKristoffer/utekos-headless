'use client'

import { useActionState } from 'react' // Eller bruk 'react-dom' avhengig av Next.js versjon
import { subscribeToNewsletter } from '@/lib/actions/subscribeToNewsLetters'

const initialState = {
  status: 'idle' as const,
  message: ''
}

export default function TestNewsletterPage() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState
  )

  return (
    <div className='max-w-md mx-auto mt-20 p-6 border rounded shadow-lg'>
      <h1 className='text-2xl font-bold mb-4'>Test Nyhetsbrev Flyt</h1>

      <form action={formAction} className='flex flex-col gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>
            E-postadresse
          </label>
          <input
            name='email'
            type='email'
            placeholder='test+1@utekos.no'
            required
            className='w-full border p-2 rounded'
          />
          <p className='text-xs text-gray-500 mt-1'>
            Tips: Bruk alias (f.eks. din.epost+test1@gmail.com) for å teste
            flere ganger.
          </p>
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50'
        >
          {isPending ? 'Kjører...' : 'Test Påmelding'}
        </button>
      </form>

      {state.message && (
        <div
          className={`mt-4 p-3 rounded ${state.status === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          <p className='font-bold'>
            {state.status === 'success' ? 'Suksess!' : 'Feil:'}
          </p>
          <p>{state.message}</p>
        </div>
      )}
    </div>
  )
}
