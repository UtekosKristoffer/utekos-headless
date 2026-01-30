'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID

export function SnapPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [initialized, setInitialized] = useState(false)

  // Håndter PageView ved navigasjon
  useEffect(() => {
    if (!initialized || !SNAP_PIXEL_ID) return

    // Snap Pixel sporer automatisk første pageview ved init,
    // så vi sporer kun ved endringer i pathname/params etter init.
    if (window.snaptr) {
      window.snaptr('track', 'PAGE_VIEW')
    }
  }, [pathname, searchParams, initialized])

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

        snaptr('init', '${SNAP_PIXEL_ID}', {
          'user_email': '__INSERT_USER_EMAIL__' // Kan settes hvis du har innlogget bruker
        });
        snaptr('track', 'PAGE_VIEW');
        `
      }}
      onLoad={() => setInitialized(true)}
    />
  )
}
