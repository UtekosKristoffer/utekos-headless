'use client'

import dynamic from 'next/dynamic'
const AlertDialogTitle = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogTitle),
  { ssr: false }
)

export { AlertDialogTitle }