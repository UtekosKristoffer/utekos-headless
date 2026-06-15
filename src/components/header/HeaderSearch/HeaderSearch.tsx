'use client'

import { cn } from '@/lib/utils/className'
import { useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { HeaderSearchInputField } from './HeaderSearchInputField'
import { useCommandK } from './useCommandK'
import { searchIndexQueryOptions } from './searchIndexQueryOption'

const HeaderSearchDialog = dynamic(
  () => import('./HeaderSearchDialog').then(module => module.HeaderSearchDialog),
  {
    ssr: false
  }
)

export function HeaderSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  useCommandK(open, setOpen)

  const handlePrefetch = () => {
    queryClient.prefetchQuery(searchIndexQueryOptions)
  }

  const handleOpen = () => {
    handlePrefetch()
    setOpen(true)
  }

  const buttonProps = {
    'type': 'button' as const,
    'onClick': handleOpen,
    'onMouseEnter': handlePrefetch,
    'onFocus': handlePrefetch,
    'onTouchStart': handlePrefetch,
    'aria-label': 'Åpne søk (⌘/Ctrl + K)',
    'className': cn(
      'group relative hidden h-11 w-64 items-center gap-3 rounded-md border border-cloud-dancer/15 bg-cloud-dancer/6 px-3 text-left text-sm text-foreground/70 outline-none transition md:flex lg:w-52 xl:mr-3 xl:w-56 2xl:w-60',
      'hover:border-cloud-dancer/30 hover:text-foreground focus-visible:border-cloud-dancer/35',
      className
    )
  }

  return (
    <>
      <button {...buttonProps}>
        <HeaderSearchInputField />
      </button>

      {open ? <HeaderSearchDialog open={open} setOpen={setOpen} className={className} /> : null}
    </>
  )
}
