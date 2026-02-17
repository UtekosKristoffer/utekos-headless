// Path: src/components/cart/ModalSubmitButton.tsx

'use client'

import { SoldOutButton } from './SoldOutButton'
import { ActiveSubmitButton } from './ActiveSubmitButton'
import type { ModalSubmitButtonProps } from '@types'
export function ModalSubmitButton({
  availableForSale,
  isPending,
  isDisabled
}: ModalSubmitButtonProps) {
  if (!availableForSale) {
    return <SoldOutButton />
  }

  return <ActiveSubmitButton isPending={isPending} isDisabled={isDisabled} />
}
