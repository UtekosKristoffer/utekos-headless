'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils/className'
import { Check, ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

type CountryOption = {
  value?: string
  label: string
  divider?: boolean
}

type CountrySelectProps = {
  value?: string
  onChange: (value: string) => void
  options: CountryOption[]
  disabled?: boolean
}

function FlagIcon({ country }: { country: string }) {
  return (
    <Image
      alt={country}
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
      width={24}
      height={18}
    />
  )
}

export function CountrySelect({
  value,
  onChange,
  options,
  disabled
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='control'
          role='combobox'
          aria-expanded={open}
          className='h-12 w-[80px] justify-between rounded-none border-r border-neutral-800 bg-background pl-3 pr-2'
          disabled={disabled}
        >
          {value ?
            <FlagIcon country={value} />
          : '...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='dark w-[250px] p-0'>
        <Command>
          <CommandInput placeholder='Søk land...' />
          <CommandList>
            <CommandEmpty>Ingen land funnet.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => {
                if (option.divider) {
                  return <CommandSeparator key={`divider-${index}`} />
                }

                const key = option.value || `option-${index}`
                return (
                  <CommandItem
                    key={key}
                    value={option.label}
                    onSelect={() => {
                      onChange(option.value || '')
                      setOpen(false)
                    }}
                    className='flex cursor-pointer items-center gap-2 data-[selected=true]:!bg-neutral-800'
                  >
                    {option.value ?
                      <FlagIcon country={option.value} />
                    : <div className='w-6' />}
                    <span>{option.label}</span>
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
