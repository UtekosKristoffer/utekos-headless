'use client'

import { SoldOutButton } from './SoldOutButton'
import { ActiveSubmitButton } from './ActiveSubmitButton'

interface ModalSubmitButtonProps {
  availableForSale: boolean
  isPending: boolean
  isDisabled: boolean
}

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
