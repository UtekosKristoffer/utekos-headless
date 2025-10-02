// Path: src/app/kontaktskjema/SupportForm.tsx
'use client'

import { SupportPageButton } from '@/app/kontaktskjema/Buttons/SupportPageButton'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { countries } from '@/constants/countries'
import { ContactFormSchema } from '@/db/zod/schemas/ContactFormSchema'
import {
  submitContactForm,
  type ContactFormState
} from '@/lib/actions/submitContactForm'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

const DynamicPhoneInput = dynamic(
  () => import('@/components/ui/phone-input').then(mod => mod.CustomPhoneInput),
  {
    ssr: false,
    loading: () => (
      <Input
        disabled
        className='h-12 rounded-none border-neutral-800 bg-background'
      />
    )
  }
)

// STEG 1: Definer skjematypen eksplisitt
type ContactFormData = z.infer<typeof ContactFormSchema>

const initialState: ContactFormState = {
  message: ''
}

export function SupportForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  )

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      orderNumber: '',
      message: '',
      privacy: false
    }
  })

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast.error('Validering feilet', {
          description: 'Vennligst sjekk feltene med feilmeldinger.'
        })
        Object.entries(state.errors).forEach(([key, value]) => {
          if (value && value.length > 0) {
            // STEG 3: Bruk den eksplisitte typen her også
            form.setError(key as keyof ContactFormData, {
              type: 'server',
              message: value[0] ?? 'Det oppstod en ukjent feil.'
            })
          }
        })
      } else {
        toast.success(state.message)
        form.reset()
      }
    }
  }, [state, form])

  return (
    <Form {...form}>
      <form action={formAction} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-medium'>E-post</FormLabel>
              <FormControl>
                <Input
                  placeholder='din@epost.no'
                  autoComplete='email'
                  {...field}
                  className='h-12 rounded-none border-neutral-800 bg-background'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium'>Fullt navn</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ditt navn'
                    autoComplete='name'
                    {...field}
                    className='h-12 rounded-none border-neutral-800 bg-background'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium'>
                  Telefon (valgfritt)
                </FormLabel>
                <FormControl>
                  <DynamicPhoneInput autoComplete='tel' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-medium'>Land</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='h-12 w-full rounded-none border-neutral-800 bg-background'>
                    <SelectValue placeholder='Velg ditt land' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='dark'>
                  {countries.map(country => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='orderNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-medium'>
                Ordrenummer (valgfritt)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='F.eks. #12345'
                  {...field}
                  className='h-12 rounded-none border-neutral-800 bg-background'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-medium'>
                Hvordan kan vi hjelpe?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Skriv meldingen din her...'
                  {...field}
                  className='min-h-[160px] rounded-none border-neutral-800 bg-background'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='privacy'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-none border border-neutral-800 p-4'>
              <div className='flex-1 space-y-0.5 pr-4'>
                <FormLabel className='text-base'>Personvern</FormLabel>
                <FormDescription>
                  Jeg godtar at Utekos behandler mine data, som beskrevet i{' '}
                  <Link href='/personvern' className='underline'>
                    Personvernerklæringen
                  </Link>
                  .
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <SupportPageButton
          type='submit'
          isBusy={isPending}
          disabled={isPending}
        >
          {isPending ? 'Sender...' : 'Snakk med Utekos'}
        </SupportPageButton>
      </form>
    </Form>
  )
}
