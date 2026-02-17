// Path: src/components/common/SertifisertEhandelBadge.tsx
'use client'

import Script from 'next/script'
import { cn } from '@/lib/utils/className'
/**
 * Laster "Sertifisert E-handel"-merket med optimalisert ytelsesstrategi.
 * Bruker 'next/script' med 'afterInteractive' for å unngå å blokkere
 * den kritiske lastestien. Wrapperen forhindrer Cumulative Layout Shift (CLS).
 */
export function CertificationSmall() {
  const badgeSize = '100px'
  return (
    <div
      className={cn('flex w-full py-2 place-self-center justify-center')}
      style={{ minHeight: badgeSize, minWidth: badgeSize }}
    >
      <a id='celink376' href='http://www.ehandelssertifisering.no/'>
        sertifisert ehandel
      </a>
      <Script
        id='ehandel-sertifisering-script'
        src='https://www.ehandelssertifisering.no/lv6/bootstrap.php?url=utekos.no&size=100px&lang=no&autolang=off&popup=no&nr=376'
        strategy='afterInteractive'
      />
    </div>
  )
}
