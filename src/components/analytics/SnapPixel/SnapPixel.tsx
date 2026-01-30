'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID

// Hjelpefunksjon for å lese cookies på klientsiden
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export function SnapPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [initialized, setInitialized] = useState(false)

  // Initialiserings-effekt
  useEffect(() => {
    if (!SNAP_PIXEL_ID) return

    // Vi venter til window.snaptr er tilgjengelig (lastet av Script-taggen)
    // Men siden Script-taggen er 'afterInteractive', kjører koden i 'dangerouslySetInnerHTML' først.
    // Vi bruker denne effekten for å håndtere navigasjon (SPA transitions)

    if (window.snaptr) {
      // Ved navigasjon i Next.js (SPA), trigg et nytt PAGE_VIEW
      // Dette sikrer at URL oppdateres i Snaps systemer
      window.snaptr('track', 'PAGE_VIEW')
    }
  }, [pathname, searchParams])

  if (!SNAP_PIXEL_ID) return null

  return (
    <Script
      id='snap-pixel'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
        (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
        {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
        a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
        r.src=n;var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);})(window,document,
        'https://sc-static.net/scevent.min.js');

        var clickId = ('; ' + document.cookie).split('; ute_sc_cid=').pop().split(';').shift();
        var externalId = ('; ' + document.cookie).split('; ute_ext_id=').pop().split(';').shift();
        
        var initData = {};
        if (clickId) initData.click_id = clickId;
        if (externalId) initData.external_id = externalId;

        snaptr('init', '${SNAP_PIXEL_ID}', initData);
        snaptr('track', 'PAGE_VIEW');
        `
      }}
      onLoad={() => setInitialized(true)}
    />
  )
}
