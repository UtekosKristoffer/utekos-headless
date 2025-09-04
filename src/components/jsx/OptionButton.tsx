// src/components/OptionButton.tsx
'use client'

import type { ReactNode } from 'react'
type OptionButtonProps = {
  isSelected: boolean
  onClick: () => void
  children: ReactNode
}

export function OptionButton({
  isSelected,
  onClick,
  children
}: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      role='radio'
      aria-checked={isSelected}
      // Use data-attributes for clean, state-driven styling in Tailwind
      data-selected={isSelected}
      className='
        flex w-full items-center justify-between rounded-lg border p-4 text-left 
        transition-all duration-200 ease-in-out
        data-[selected=true]:border-foreground-on-dark data-[selected=true]:ring-2 data-[selected=true]:ring-foreground-on-dark
        data-[selected=false]:border-white/20 data-[selected=false]:bg-surface-raised/40 data-[selected=false]:hover:border-foreground-on-dark/50
      '
    >
      {children}
    </button>
  )
}
