// Path: src/components/common/SertifisertEhandelBadge.tsx
'use client'

import Script from 'next/script'
import { cn } from '@/lib/utils/className'
/**
 * Laster "Sertifisert E-handel"-merket med optimalisert ytelsesstrategi.
 * Bruker 'next/script' med 'afterInteractive' for å unngå å blokkere
 * den kritiske lastestien. Wrapperen forhindrer Cumulative Layout Shift (CLS).
 */
export function SertifisertEhandelBadge() {
  const badgeSize = '80px' // Basert på 'size=80px' i script-URLen

  return (
    <div
      className={cn('flex w-full place-self-start justify-start')}
      style={{ minHeight: badgeSize, minWidth: badgeSize }}
    >
      <a id='celink526' href='http://www.ehandelssertifisering.no/'>
        sertifisert ehandel
      </a>
      <Script
        id='ehandel-sertifisering-script'
        src='https://www.ehandelssertifisering.no/lv6/bootstrap.php?url=utekos.no&size=80px&lang=no&autolang=off&grayscale=&opacity=&shadow=&nr=526'
        strategy='afterInteractive'
      />
    </div>
  )
}
