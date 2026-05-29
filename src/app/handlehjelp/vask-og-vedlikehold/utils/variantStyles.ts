// Path: src/app/handlehjelp/vask-og-vedlikehold/utils/variantStyles.ts

import { Check, Minus } from 'lucide-react'

export const variantStyles = {
  do: {
    container: 'border-havdyp/16 bg-[color-mix(in_oklab,var(--cloud-dancer)_78%,var(--ancient-water)_22%)]',
    iconWrap: 'border-havdyp/40 bg-havdyp text-cloud-dancer',
    Icon: Check
  },
  dont: {
    container:
      'border-demitasse/16 bg-[color-mix(in_oklab,var(--cloud-dancer)_82%,var(--bleached-mauve)_18%)]',
    iconWrap: 'border-maritime-darkest/18 bg-overcast text-maritime-darkest',
    Icon: Minus
  }
} as const
