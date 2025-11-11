// Path: src/components/jsx/OptionButton.tsx

import type { OptionButtonProps } from '@types'

export function OptionButton({
  isSelected,
  onClick,
  children
}: OptionButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      role='radio'
      aria-checked={isSelected}
      data-selected={isSelected}
      className='
        flex w-full bg-sidebar-foreground border-neutral-700 items-center justify-between rounded-lg border p-4 text-left 
        transition-all duration-200 ease-in-out
        data-[selected=true]:border-foreground-on-dark data-[selected=true]:ring-1 data-[selected=true]:ring-foreground-on-dark
        data-[selected=false]:border-white/20 data-[selected=false]:bg-surface-raised/40 data-[selected=false]:hover:border-foreground-on-dark/50
      '
    >
      {children}
    </button>
  )
}
