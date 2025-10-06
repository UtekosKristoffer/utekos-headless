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
import { ClientContactFormSchema } from '@/db/zod/schemas/ClientContactFormSchema'
import {
  submitContactForm,
  type ContactFormState
} from '@/lib/actions/submitContactForm'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useActionState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from '@/db/zod/zodClient'

type ContactFormData = z.infer<typeof ClientContactFormSchema>

const initialState: ContactFormState = { message: '' }

// Viser feilmelding kun når feltet er berørt (touched) eller skjemaet er sendt inn
function useShouldShowError(form: ReturnType<typeof useForm<ContactFormData>>) {
  return useMemo(
    () => (name: keyof ContactFormData) =>
      form.formState.isSubmitted || !!form.formState.touchedFields[name],
    [form.formState.isSubmitted, form.formState.touchedFields]
  )
}

export function SupportForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  )

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ClientContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      orderNumber: '',
      message: '',
      privacy: false
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  })

  const shouldShowError = useShouldShowError(form)
  const messageValue = form.watch('message') ?? ''
  const messageChars = messageValue.length
  const messageMin = 10

  useEffect(() => {
    if (!state.message) return

    if (state.errors) {
      toast.error('Validering feilet', {
        description: 'Vennligst sjekk feltene med feilmeldinger.'
      })
      // Sett server-feil på feltene uten å trigge ny validering
      Object.entries(state.errors).forEach(([key, value]) => {
        if (value && value.length > 0) {
          form.setError(key as keyof ContactFormData, {
            type: 'server',
            message: value[0] ?? 'Det oppstod en ukjent feil.'
          })
        }
      })
    } else {
      toast.success(state.message)
      form.reset({
        name: '',
        email: '',
        phone: '',
        country: '',
        orderNumber: '',
        message: '',
        privacy: false
      })
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
              {shouldShowError('email') && <FormMessage />}
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
                {shouldShowError('name') && <FormMessage />}
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
                  <Input
                    type='tel'
                    placeholder='+47 123 45 678'
                    autoComplete='tel'
                    {...field}
                    className='h-12 rounded-none border-neutral-800 bg-background'
                  />
                </FormControl>
                {shouldShowError('phone') && <FormMessage />}
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
              <Select
                // Viktig: kontroller verdien som tom streng istedenfor undefined
                value={field.value ?? ''}
                onValueChange={value => {
                  field.onChange(value)
                }}
              >
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
              {shouldShowError('country') && <FormMessage />}
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
              {shouldShowError('orderNumber') && <FormMessage />}
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

              {/* Live tilbakemelding: tegn-teller og minstekrav */}
              <div className='mt-1 flex items-center justify-between text-xs text-muted-foreground'>
                <span>
                  {messageChars < messageMin ?
                    `Melding må være minst ${messageMin} tegn.`
                  : 'Ser bra ut ✅'}
                </span>
                <span>
                  {messageChars}/{messageMin} tegn
                </span>
              </div>

              {shouldShowError('message') && <FormMessage />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='privacy'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between border border-neutral-800 p-4'>
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
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {shouldShowError('privacy') && (
          <p className='text-sm text-destructive'>
            {/* FormMessage funker ikke utenfor FormField, derfor enkel p */}
            Du må godta personvernerklæringen.
          </p>
        )}

        <SupportPageButton
          type='submit'
          isBusy={isPending}
          disabled={isPending}
        >
          {isPending ? 'Sender…' : 'Snakk med Utekos'}
        </SupportPageButton>
      </form>
    </Form>
  )
}
