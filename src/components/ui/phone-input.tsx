// Path: src/components/ui/phone-input.tsx
'use client'
import { cn } from '@/lib/utils/className'
import type { E164Number } from 'libphonenumber-js/core'
import * as React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { CountrySelect } from './country-select'

type PhoneInputProps = {
  id?: string
  name?: string
  value: string | undefined
  onChange: (value: E164Number | undefined) => void
  className?: string
  autoComplete?: string
} & Pick<
  React.ComponentProps<'input'>,
  'aria-describedby' | 'aria-invalid' | 'aria-labelledby'
>

export const CustomPhoneInput = React.forwardRef<
  HTMLInputElement,
  PhoneInputProps
>(({ id, name, value, onChange, className, autoComplete, ...aria }, ref) => {
  return (
    <PhoneInput
      international
      defaultCountry='NO'
      className={cn('phone-input', className)}
      value={value || ''}
      onChange={onChange}
      name={name}
      inputRef={ref as React.Ref<HTMLInputElement>}
      countrySelectComponent={CountrySelect as React.ElementType}
      numberInputProps={{ id, name, autoComplete, ...aria }}
    />
  )
})
CustomPhoneInput.displayName = 'CustomPhoneInput'
